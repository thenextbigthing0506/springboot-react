import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from "../../App"
import axios from 'axios'

const Profile = () =>{
    const [mypics, setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image, setImage] = useState("")

    useEffect(() =>{
        fetch("/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
          .then(result => {
              console.log(result)
              setPics(result.mypost)
          })
    },[])

    useEffect(() =>{
        if(image){
            const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","waheedinstaclone")
        axios.post("https://api.cloudinary.com/v1_1/waheedinstaclone/image/upload",data)
        .then(res => {
            fetch('/updatePic',{ 
                method:'put',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({pic:res.data.url})
            }).then(res => res.json())
            .then(result =>{
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})
            })

        })
        .catch(err =>{
            console.log(err)
        })
        }
    },[image])

    const uploadImage = (file) =>{
        setImage(file)
    }

    return(
        <div style={{maxWidth:"620px", margin:"0px auto"}}> 
            <div style={{display:"flex",
                        justifyContent:"space-around",
                        margin:"20px 0px",
                        borderBottom:"1px solid grey"}}>
            <div>
                <img style={{width:"160px",height:"160px", borderRadius:"80px"}}
                src={state?state.pic:"loading"}
                />
            
                <div className="file-field input-field">
                    <div className="btn #3f51b5 indigo darken-1">
                        <span>Choose Pic</span>
                        <input 
                            type="file" 
                            onChange={(e) => uploadImage(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            </div>    
            <div>
            <h4>{state?state.name:"loading"}</h4> 
            <h5>{state?state.email:"loading"}</h5> 
            <div style={{display:"flex", justifyContent:"space-between", width:"110%"}}>
                <h6>{mypics.length} Posts</h6>    
                <h6>{state?state.followers.length:"0"} Followers</h6>    
                <h6>{state?state.following.length:"0"} Following</h6>    
            </div>   
            </div>

            </div>  

            <div className="gallery">
                {
                    mypics.map(item => {
                        return(
                            <img className="item" src={item.photo} alt={item.title} key={item._id}/>          
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Profile