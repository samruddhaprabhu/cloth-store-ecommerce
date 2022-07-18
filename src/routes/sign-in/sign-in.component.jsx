import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { createUserDocumentFromAuth, signInwithGooglePopup } from "../../utils/firebase/firebase.util";

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInwithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <div>
            <h3>Sign In</h3>
            <button onClick={logGoogleUser}>Sign in</button>
            <SignUpForm/>
        </div>
    )
};

export default SignIn;