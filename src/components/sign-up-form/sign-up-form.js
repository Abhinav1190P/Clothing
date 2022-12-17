import { useState } from "react"
import {createAuthUserWithEmail, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component"
import './sign-up-form.styles.scss'
import Button from "../button/buttom.component"
const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''  
}


const SignUpForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields)
    const {displayName,email,password,confirmPassword} = formFields

    const handleChage = (event) => {
        const {name,value} = event.target
        setFormFields({...formFields,[name]:value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
    
        if(password !== confirmPassword){
            alert("Passwords do not match")
        }

        try {
            const {user} = await createAuthUserWithEmail(email,password)
            
            await createUserDocumentFromAuth(user,{displayName})
            resetFormFields()

        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('auth/email-already-in-use')
            }
        }
    
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have and account?</h2>
            <span>
                Sign up with your email and password
            </span>
            <form onSubmit={handleSubmit}>
               
                <FormInput 
                label="Display Name"
                type={'text'} required onChange={handleChage} name="displayName" value={displayName}/>

               
                <FormInput label="Email" type={'email'} required onChange={handleChage} name="email" value={email}/>

                
                <FormInput label="Password" type={'password'} required onChange={handleChage} name="password" value={password}/>

                
                <FormInput label="Confirm password" type={'password'} required onChange={handleChage} name="confirmPassword" value={confirmPassword}/>
 
                <Button type="submit">
                    Sign up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm