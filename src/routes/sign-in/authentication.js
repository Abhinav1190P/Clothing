import { useEffect } from 'react';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect, auth} from '../../utils/firebase/firebase.utils'

import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form';
import SignInForm from '../../components/sign-in-form/sign-in-form';

const Authentication = () =>{


    const logGoogleUser = async () => {

    const {user} = await signInWithGooglePopup();
    const userdoc = await createUserDocumentFromAuth(user)
    }

    

    return(
        <div>
            <h1>
                Sign in Page
            </h1>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication