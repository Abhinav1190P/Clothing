import { useEffect } from 'react';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect, auth} from '../../utils/firebase/firebase.utils'

import { getRedirectResult } from 'firebase/auth';

const SignIn = () =>{

    useEffect(()=>{
        async function fetchData() {
            const response = await getRedirectResult(auth)
            if(response){
                const userdoc = await createUserDocumentFromAuth(response.user)
            }
          }
          fetchData();
    },[])

    const logGoogleUser = async () => {

    const {user} = await signInWithGooglePopup();
    const userdoc = await createUserDocumentFromAuth(user)
    }

    

    return(
        <div>
            <h1>
                Sign in Page
            </h1>
            <button onClick={logGoogleUser}>
                Sign in with Google popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button>
        </div>
    )
}

export default SignIn