import React, {useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import axios from 'axios'

const Signup = () =>{

    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)

useEffect(() =>{
    if(url){
        uploadFields()
    }
},[url])

const uploadImage = (event) =>{
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
}

const uploadFields = () =>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        return M.toast({html:"Invalid Email", classes:"#e53935 red darken-3"})
    }

    fetch('/signup',
    {
        method:"post",
        headers:{        
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password,
            pic:url
        })
    }
    ).then(res => res.json())
    .then(data =>{
        if(data.error){
            M.toast({html: data.error, classes:"#e53935 red darken-3"})
        }else{
            M.toast({html: data.message, classes:"#00796b green darken-2"})
            history.push('/signin')
        }
    }).catch(err =>{
        console.log(err)
    })
}


const postData = () =>{
    if(image){
        uploadImage()
    }else{
        uploadFields()
    }
}

    return(
        <div className="mycard">
            <div className="card auth-card input-field">
            <h2 className="brand-logo">MedAble</h2>
            <input 
            type="text"
            placeholder="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input 
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {/* <div className="file-field input-field">
                <div className="btn #3f51b5 indigo darken-1">
                    <span>Upload Profile Pic</span>
                    <input 
                        type="file" 
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div> */}
            <button className="btn #3f51b5 indigo"
             onClick={() => postData()}>Signup</button>
            <h5>
                <Link to="/signin">Already have an account?</Link>
            </h5>

        </div>
      </div>
    )
}

export default Signup