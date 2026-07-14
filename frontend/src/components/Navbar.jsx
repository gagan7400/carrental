import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddUsers } from '../redux/toolkitStore';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
    let { user } = useSelector((state) => state.user);
    let dispatch = useDispatch()
    let nav = useNavigate()
    let logout = async () => {
        try {
            let { data } = await axios.get("/api/users/logout", { withCredentials: true });
            console.log(data)

            dispatch(AddUsers({ user: null, error: data.message }))
            nav("/login")
        } catch (error) {
            console.log(error)
            dispatch(AddUsers({ user: null, error: error.message }))
        }
    }
    return (
        <div className='d-flex justify-content-between gap-3 p-3 w-100 bg-info'>
            <p>CarRental</p>
            
            <div className="user">
                {user ? user.userName : "unknown"}
            </div>
            {user && (
                <div className='d-flex align-items-center gap-2'>
                    <NavLink to='/profile' className='btn btn-outline-light btn-sm'>Profile</NavLink>
                    <button className='btn btn-light btn-sm' onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    )
}
