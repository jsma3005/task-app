import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from "../Redux/actions/authActions";

const NavBar = () =>{
  const {isLogin} = useSelector(s => s.auth);
  const dispatch = useDispatch();

  const signOut = e => {
    e.preventDefault();

    localStorage.removeItem('taskApp');
    dispatch(logoutAction());
    window.location.reload();
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Link to="/" className="navbar-brand mr-auto">Task App</Link>
        {
          isLogin ? (
            <button onClick={signOut} className="btn btn-outline-light">Sign out</button>
          ) : (
            <Link className="btn btn-outline-light" to="/auth">Login</Link>
          )
        }
        
      </Navbar>
    </>
  )
}

export default NavBar