import { useState } from "react"
import { createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component"
import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
    } from '../../utils/firebase/firebase.utils'
import './sign-in-form.styles.scss'
import Button from "../button/buttom.component"
const defaultFormFields = {
    email:'',
    password:'', 
}


const SignInForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields)
    const {email,password} = formFields

    const handleChage = (event) => {
        const {name,value} = event.target
        setFormFields({...formFields,[name]:value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }


    
    const SignInWithGoogle = async () => {

        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user)
        }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await signInAuthUserWithEmailAndPassword(email,password)
            console.log(response)
        } catch (error) {
           console.log(error)
        }
    
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>
                Sign up with your email and password
            </span>
            <form onSubmit={handleSubmit}>
        
               
                <FormInput label="Email" type={'email'} required onChange={handleChage} name="email" value={email}/>

                
                <FormInput label="Password" type={'password'} required onChange={handleChage} name="password" value={password}/>

                <div className="buttons-container">
                <Button type="submit">
                    Sign in
                </Button>
                <Button buttonType={'google'} onClick={SignInWithGoogle}>
                    Google sign in
                </Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm