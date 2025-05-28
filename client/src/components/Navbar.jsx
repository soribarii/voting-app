import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoIosMoon, IoMdSunny } from 'react-icons/io'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { AiOutlineClose } from 'react-icons/ai'
// import Logo from '../assets/JujutsuLogo.png'
import Logo from '../assets/JujutsuLogo1.png'
import { useSelector } from 'react-redux'


const Navbar = () => {
    const [showNav, setShowNav] = useState(window.innerWidth < 600 ? false : true)
    const [darkTheme, setDarkTheme] = useState(localStorage.getItem('voting-app-theme') || "")
    const token = useSelector(state => state?.vote?.currentVoter?.token)

    // function to close nav menu on small screens when menu line is clicked
    const closeNavMenu = () => {
      if(window.innerWidth < 600) {
          setShowNav(false);
      } else {
          setShowNav(true)
      }
    }

    // function to change/toggle theme
    const changeThemeHandler = () => {
      if(localStorage.getItem('voting-app-theme') == 'dark') {
        localStorage.setItem('voting-app-theme', '')
      } else {
        localStorage.setItem('voting-app-theme', 'dark')
      }
      setDarkTheme(localStorage.getItem('voting-app-theme'))
    }

    useEffect(() => {
        document.body.className = localStorage.getItem('voting-app-theme');
    }, [darkTheme])

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo'>
        {/* <img src={Logo} alt="Logo" className="nav__logo-img" /> */}
        Election Voting App
        </Link>
        <div>
          {token && showNav && <menu>
            <NavLink to="/elections" onClick={closeNavMenu}>Elections</NavLink>
            <NavLink to="/results" onClick={closeNavMenu}>Results</NavLink>
            <NavLink to="/logout" onClick={closeNavMenu}>Logout</NavLink>
          </menu>}
          <button className="theme__toggle-btn" onClick={changeThemeHandler}>{darkTheme ? <IoMdSunny /> : <IoIosMoon />}</button>
          <button className="nav__toggle-btn" onClick={() => setShowNav(!showNav)}>{showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar