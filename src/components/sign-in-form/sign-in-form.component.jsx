import './sign-in-form.styles.scss';
import { useState } from 'react';
import { createUserDocumentFromAuth, signInAuthWithEmailAndPassword, signInwithGooglePopup } from '../../utils/firebase/firebase.util';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogleUser = async () => {
        const {user} = await signInwithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
              await signInAuthWithEmailAndPassword(email, password);
              resetFormFields();
        }
        catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                   alert('incorrect password for email')
                   break
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                default:
                    console.log(error);       

            }

        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with your Email and Password</span>

            <form onSubmit={handleSubmit}>
               
                <FormInput
                   label="Email"
                   type="email" 
                   required 
                   onChange={handleChange} 
                   name='email' 
                   value={email} />

                <FormInput
                   label="Password"
                   type="password" 
                   required 
                   onChange={handleChange} 
                   name='password' 
                   value={password} />

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;