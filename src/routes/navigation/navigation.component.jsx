import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo'/>
                </LogoContainer>
                
                <NavLinks>
                    <NavLink to='/shop'>
                       Shop
                    </NavLink>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>SignOut</span>
                        ):(
                            <Link className='nav-link' to='/auth'>SignIn</Link>
                        )
                    }
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;