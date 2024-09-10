import { Link, Outlet } from 'react-router-dom'
import { Fragment, useContext } from 'react';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { UserContext } from '../../context/user.context';


import './navigation.styles.scss'
import { signOutUser } from '../../utils/firebase/firebase.utils';


const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return(
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'> 
                <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to= '/shop'>
                    SHOP
                </ Link>
                {
                    currentUser ? (
                        <span className='nav-link' onClick={ signOutUser }>Sign Out</span>
                    ) : (
                        <Link className='nav-link' to= '/auth'>
                            SIGN IN
                        </ Link>
                    )
                }
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;