import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from "../../App"
import {useParams} from 'react-router-dom'

const UserProfile = () =>{
    const [profile, setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showFollow, setShowFollow] = useState(state?!state.following.includes(userid):true)

    useEffect(() =>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
          .then(result => {
              setProfile(result)
          })
    },[])

    const followUser =() =>{
        fetch('/follow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res => res.json())
        .then(data =>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState) =>{
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }
    
    const unfollowUser =() =>{
        fetch('/unfollow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res => res.json())
        .then(data =>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState) =>{
                const newFollow = prevState.user.followers.filter(item => item != data._id)
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:newFollow
                    }
                }
            })
            setShowFollow(true)
        })
    }

    return(
        
        <>
        {profile !== null
        ?
        <div style={{maxWidth:"620px", margin:"0px auto"}}> 
            <div style={{display:"flex",
                        justifyContent:"space-around",
                        margin:"20px 0px",
                        borderBottom:"1px solid grey"}}>
            <div>
                <img style={{width:"160px",height:"160px", borderRadius:"80px"}}
                src={profile.user.pic}
                />
            
            </div>    
            <div>
            <h4>{profile.user.name}</h4>
            <h6>{profile.user.email}</h6> 
            <div style={{display:"flex", justifyContent:"space-between", width:"110%"}}>
                <h6>{profile.posts.length} Posts</h6>    
                <h6>{profile.user.followers.length} Followers</h6>    
                <h6>{profile.user.following.length} Following</h6>    
            </div>
            {
                showFollow
                ?
                <button style={{margin:"10px"}} className="btn #3f51b5 indigo" 
                    onClick={() => followUser()}>
                Follow</button>
                :
                <button style={{margin:"10px"}} className="btn #3f51b5 indigo" 
                    onClick={() => unfollowUser()}>
                Unfollow</button> 
            }
               
              
            </div>
            </div>  

            <div className="gallery">
                {
                    profile.posts.map(item => {
                        return(
                            <img className="item" src={item.photo} alt={item.title} key={item._id}/>          
                        )
                    })
                }
            </div>
        </div>
        :
            <h2>loading...!</h2>
        }

        </>
    )
}

export default UserProfile