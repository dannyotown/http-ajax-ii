import React,{useEffect, useState} from "react"
import api from "../utils/api"

function UserUpdate(props){
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
    })
    useEffect(()=>{
        api().get(`/users/${props.match.params.id}`)
        .then(result =>{
            setUser(result.data)
        })
        .catch(error=>console.log(error))
    },[props.match.params.id])
    const handleChange = e =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        api().put(`/users/${user.id}`, user)
        .then(result => {
            alert('User Updated!')
            props.history.push('/users')
        })
        .catch(error => console.log(error))
    }
return(
    <>
    <h1>Update User</h1>
    <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} name="name" placeholder="Name" value={user.name}/>
        <input type="email" onChange={handleChange} name="email" placeholder="Email" value={user.email}/>
    <button type="submit">Save</button>
    </form>
    </>
)
}
export default UserUpdate