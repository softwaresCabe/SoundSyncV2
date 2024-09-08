import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleuser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }


    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleuser}>
                Sign in with Google popup
            </button>
        </div>
    )
};

export default SignIn;