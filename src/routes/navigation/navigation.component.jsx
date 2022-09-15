import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

import {NavigationContainer, NavLinks, NavLink, LogoContainer, CrownLogo} from './navigation.styles';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo/>
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>
                       Shop
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span'  onClick={signOutUser}>SignOut</NavLink>
                        ):(
                            <NavLink to='/auth'>SignIn</NavLink>
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