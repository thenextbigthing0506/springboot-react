import React, { useEffect, useState } from 'react'
import axios from 'axios'
import M from 'materialize-css'
import { useHistory } from 'react-router'


const CreatePost = () =>{
    const history = useHistory()
    const[title, setTitle] = useState("")
    const[body, setBody] = useState("")
    const[image, setImage] = useState("")
    const[url, setUrl] = useState("")

    useEffect(() =>{        // useEffect is used to call the block of code once the [url] is changed
        if(url){
            fetch('/createpost',{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    photo:url
                })
            }).then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.error){
                    M.toast({html: data.error, classes:"#e53935 red darken-3"})
                }else{
                    M.toast({html: "Photo uploaded successfully!!", classes:"#e53935 green darken-2"})
                    history.push('/')
                }
            }).catch(err =>{
                console.log(err)
            })
        }
    },[url])

    const postDetails = (event) =>{
        console.log("Post details called")

        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","waheedinstaclone")

        axios.post("https://api.cloudinary.com/v1_1/waheedinstaclone/image/upload",data)
        .then(res => {
            setUrl(res.data.url)        // useEffect will be called as url is updated here
        })
        .catch(err =>{
            console.log(err)
        })

        

        // fetch('https://api.cloudinary.com/v1_1/waheedinstaclone/image/upload',{       // this approach didnt worked for file upload
        //      mehtod:"post",
        //      body:data
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })
        // .catch(err =>{
        //     console.log(err)
        // })
    }

    return(
        <div className="card input-field"
        style={{
            maxWidth:"550px",
            margin: "10px auto",
            padding:"20px",
            textAlign:"center"
        }} >
            <input 
                type="text" 
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}

             />
            <input 
                type="text" 
                placeholder="Enter body" 
                onChange={(e) => setBody(e.target.value)}
            />

            <div className="file-field input-field">
                <div className="btn #3f51b5 indigo darken-1">
                    <span>Upload Image</span>
                    <input 
                        type="file" 
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn #3f51b5 indigo darken-1"
                onClick = {() => postDetails()}>Submit</button>

        </div>


    )
}

export default CreatePost