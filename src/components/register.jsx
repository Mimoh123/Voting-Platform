import React, { useEffect, useRef, useState } from 'react';
import { auth } from './Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './authContext';
import { docreateUserwithEmailandPw } from './auth';
import { dosignInwithGoogle } from './auth';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

function Register(props) {
  const {
    loginDivState,
    registerDivController,
    SuccessfulLogIn,
    getLoginStatus,
    getUserInfo,
    className,
  } = props;
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await docreateUserwithEmailandPw(email, password);
      registerDivController(false);
      // loginDivController(false);
    }
  };
  const handleGoogleLogIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await dosignInwithGoogle().catch((error) => {
        console.log(error);
        setIsSigningIn(false);
        // registerDivController(false);
      });
    }
    registerDivController(false);
  };
  return (
    <div className={className}>
      <FontAwesomeIcon
        onClick={() => {
          registerDivController(false);
        }}
        className=' text-need-blue absolute top-4 right-4 hover:cursor-pointer'
        icon={faXmark}
      />
      <h1 className=' font-bold text-lg text-need-blue mt-14 '>Register </h1>
      <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          className='border-b-2 ml-4 mt-10 border-need-blue bg-white mr-8'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          placeholder='Password'
          className='border-b-2  ml-4  mt-5 border-black bg-white mr-8'
          value={password}
          onChange={(e) => {
            setPasword(e.target.value);
          }}
        />
        <Button className='mt-9 ' type='submit'>
          Register
        </Button>
      </form>
      <Button className='mt-8 w-[16rem]' onClick={handleGoogleLogIn}>
        Sign in with Google{' '}
      </Button>
    </div>
  );
}

export default Register;
