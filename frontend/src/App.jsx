import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './Login';
import Register from './Register';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AddUsers } from './redux/toolkitStore';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Userprofile from './Userprofile';
export default function App() {
  let dispatch = useDispatch()
  let nav = useNavigate()
  let getProfile = async () => {
    console.log("getprofile")
    try {
      let { data } = await axios.get("/api/users/getprofile", { withCredentials: true });
      if (data.success) {
        console.log(data)
        nav("/")
        dispatch(AddUsers({ user: data.data, error: null }))
      } else {
        nav("/login")
        dispatch(AddUsers({ user: null, error: data.message }))
      }
    } catch (error) {
      nav("/login")
      dispatch(AddUsers({ user: null, error: data.message }))
    }
  }
  useEffect(() => {
    getProfile();
  }, [dispatch])
  return (
    <>
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Userprofile />} />
        </Routes>
      </>
    </>
  )
}
