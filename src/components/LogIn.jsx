import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { auth } from './Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './authContext';
import { dosignInwithEmailandPw } from './auth';
import { dosignInwithGoogle } from './auth';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

const LogIn = React.forwardRef((props, ref) => {
  const {
    loginDivState,
    loginDivController,
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
      await dosignInwithEmailandPw(email, password);
      loginDivController(false);
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
        loginDivController(false);
      });
    }
    loginDivController(false);
  };

  return (
    <div ref={ref} className={className}>
      <FontAwesomeIcon
        onClick={() => {
          loginDivController(false);
        }}
        className=' text-need-blue absolute top-4 right-4 hover:cursor-pointer'
        icon={faXmark}
      />
      <h1 className=' font-bold text-lg text-need-blue mt-14 '>Log in </h1>
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
          Sign in
        </Button>
      </form>
      <Button className='mt-8 w-[16rem]' onClick={handleGoogleLogIn}>
        Sign in with Google{' '}
      </Button>
    </div>
  );
});

export default LogIn;
