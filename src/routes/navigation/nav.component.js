import { Fragment } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import './navigation.styles.scss'
import { useContext } from "react"
import { UserContext } from "../../contexts/user.context"
import { signoutUser } from "../../utils/firebase/firebase.utils"

const Navigation = () => {

  const { currentUser } = useContext(UserContext)
  

  const signoutHandler = async () => {
    await signoutUser()
 
  }


  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signoutHandler}>SIGN OUT</span>
            ) : (
              <Link className='nav-link' to='/auth'>
                SIGN IN
              </Link>
            )
          }

        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}
export default Navigation 