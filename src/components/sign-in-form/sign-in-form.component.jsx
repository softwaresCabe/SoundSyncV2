import { useState, useContext } from "react";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword

} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

       

        try {

            const { user } = await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();

        } catch(error){
            console.log(error);
            alert("Sign in Failed", error);
            
        }

    }



    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <h1> Sign in with your email and password</h1>
            <form onSubmit={ handleSubmit }>
               

                <FormInput 
                label= "Email"
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={email}
                />

                <FormInput 
                label= "Password"
                type="password"
                required
                onChange={handleChange}
                name='password'
                value={password}
                />

                <div className="buttons-container">
                    <Button type="sign-in">Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
                
            </form> 
        </div>
    )
}


export default SignInForm;