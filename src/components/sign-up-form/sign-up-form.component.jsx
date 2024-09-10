import { useContext, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            alert("Passwords do not match");
        }

        try {
            //Create new user with firebase
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            //Create user document in Firebase DB
            await createUserDocumentFromAuth(user, { displayName });
            // Clear form after the user is created
            resetFormFields();

        } catch(error){

            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else{
                console.log("User creation encountered an error", error);
            }
        }

    }



    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-up-container">
            <h2>Don`t have an account?</h2>
            <span> Sign up with email and password</span>
            <form onSubmit={ handleSubmit }>
               
                <FormInput 
                label= "Display Name"
                type="text" 
                required
                onChange={handleChange}
                name='displayName'
                value={displayName}
                />

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

                <FormInput 
                label= "Confrim Password"
                type="password" 
                required
                onChange={handleChange}
                name='confirmPassword'
                value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}


export default SignUpForm;