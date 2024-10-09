import React from 'react';
import { Button } from './ui/button';
import { useAuth } from './authContext';
import { doSignOut } from './auth';
function Title({ scrollRegister, openLogin, openRegister }) {
  const authContext = useAuth();
  console.log(authContext);
  const { currentUser, userLoggedIn } = useAuth();
  return (
    <div className='w-full pb-5 flex justify-between pt-3 pl-9 pr-9 items-center'>
      <h1 className=' font-bold text-lg text-need-blue'>Voting platform</h1>

      {!userLoggedIn && (
        <div>
          <Button
            className='bg-need-gray text-need-blue mr-3'
            onClick={openLogin}
          >
            Log in{' '}
          </Button>
          <Button onClick={openRegister} className='bg-need-blue'>
            Create Account
          </Button>
        </div>
      )}
      {userLoggedIn && currentUser && (
        <div className='flex items-center'>
          <h1 className='mr-5'>{currentUser.displayName}</h1>
          <Button onClick={doSignOut}>Sign Out</Button>
        </div>
      )}
    </div>
  );
}

export default Title;
