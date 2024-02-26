import React, { useState,useRef } from 'react'
import Header from './Header';
import { checkvalidation } from '../utils/validate';
import { auth } from '../utils/firebas';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [isSignUp,setIsSignup] = useState(true);
    const [error,setError] = useState(null);
    const emailval = useRef();
    const passval = useRef();

    const validates =()=>{ 
        let errors = checkvalidation(emailval.current.value,passval.current.value)
        setError(errors);

        if (isSignUp){
            signInWithEmailAndPassword(auth, emailval.current.value, passval.current.value)
              .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(errorMessage);
              });

        }
        else{
          createUserWithEmailAndPassword(auth, emailval.current.value, passval.current.value)
              .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                // ..
              });
        }
    }
    
    

    const toggleSignInForm = () => {
        setIsSignup(!isSignUp);
      };
  return (
    <div>
      <Header />
      <div className='absolute'> 
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background-image"/>
      </div>
      <form onSubmit={(e)=>{e.preventDefault()}}
      className='w-3/12 absolute p-12 mx-auto my-36 bg-black text-white right-0 left-0 rounded-lg bg-opacity-70'>
        <h1 className='text-3xl font-bold py-4'>{isSignUp?"Sign In":"Sign Up"}</h1>
        <input 
        ref={emailval}
        type = "text" 
        placeholder="email" 
        className='p-4 my-4 w-full bg-gray-700' 
        />
        <input 
        ref={passval}
        type = "password" 
        placeholder="Password" 
        className='p-4 my-4 w-full bg-gray-700' 
        />
        {!isSignUp && <input
        type="text"
        placeholder='FullName'
        className='p-4 my-4 bg-gray-700 w-full'
        />}
        <button 
        type = "button"
        onClick={validates}
        className='bg-red-700 text-white w-full p-4 my-6'>
            {isSignUp?"Sign In":"Sign Up"}
        </button>
        <p className='text-red-700 font-bold py-2'>{error}</p>
        <button 
        type = "button" 
        onClick={toggleSignInForm}>
        {isSignUp?"Not signed up Sign up now!!":"Already Signed up Sign in now!!"}
        </button>
      </form>
    </div>
  )
}

export default Login;
