import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Toggle } from './ui/toggle';
import { data } from 'autoprefixer';
import { useAuth } from './authContext';
function Box({ loginDivController, giveLoginStatus, item, voteup, votedown }) {
  const { id, vote, title, body } = item;
  const { userLoggedIn } = useAuth();
  const [datastateup, setdatastateup] = useState();
  useEffect(() => {
    if (userLoggedIn) {
      setdatastateup(
        localStorage.getItem(`${id}_datastateup`)
          ? localStorage.getItem(`${id}_datastateup`)
          : 'off'
      );
      setdatastatedown(
        localStorage.getItem(`${id}_datastatedown`)
          ? localStorage.getItem(`${id}_datastatedown`)
          : 'off'
      );
    } else {
      setdatastateup('off');
      setdatastatedown('off');
    }
  }, [userLoggedIn]);

  const [datastatedown, setdatastatedown] = useState('off');

  useEffect(() => {
    if (userLoggedIn) {
      localStorage.setItem(`${id}_datastateup`, datastateup);
    }
    console.log(datastateup);
  }, [datastateup, userLoggedIn, id]);
  useEffect(() => {
    if (userLoggedIn) {
      if (localStorage.getItem(`${id}_datastateup`) == null) {
        localStorage.setItem(`${id}_datastatedowm`, 'off');
      }
      localStorage.setItem(`${id}_datastatedown`, datastatedown);
    }
  }, [datastatedown, userLoggedIn, id]);
  const handleToggleUp = () => {
    if (userLoggedIn) {
      if (localStorage.getItem(`${id}_datastateup`) == null) {
        setdatastateup('on');
      }
      if (datastateup == 'off') {
        setdatastateup('on');
        if (datastatedown == 'on') {
          setdatastatedown('off');
        }
        voteup(id);
      } else {
        setdatastateup('off');
        // setdatastatedown('on');
        votedown(id);
      }
    } else {
      loginDivController(true);
    }
    // if (logInStatus) {
    // setpressStatusup(!pressStatusup);
    // setdatastateup((prevstate) => {
    //   const newdata = prevstate == 'off' ? 'on' : 'off';
    //   // settoggleupStatus(!toggleupStatus);
    //   if (newdata == 'on') {
    //     voteup(id);
    //   } else {
    //     votedown(id);
    //   }
    //   console.log(newdata);
    //   return newdata;
    // };
    // } else {
    //   loginDivController(true);
    //   setpressStatusdown(!pressStatusup);
    // }
  };
  const handleToggleDown = () => {
    // if (logInStatus) {
    // setpressStatusup(!pressStatusup);
    if (userLoggedIn) {
      if (datastatedown == 'off') {
        setdatastatedown('on');
        if (datastateup == 'on') {
          setdatastateup('off');
        }
        votedown(id);
      } else {
        setdatastatedown('off');
        // setdatastatedown('on');
        voteup(id);
      }
    } else {
      loginDivController(true);
    }
  };
  return (
    <div key={id} className=' bg-need-blue flex p-2 rounded-3xl'>
      {/* {console.log(handleToggle)} */}
      {}
      <div className=' w-20 bg-need-blue rounded-3xl  flex'>
        <section className='flex flex-col items-center ml-3 mt-9 mr-1'>
          <Toggle
            name='toggleUp'
            data-state={datastateup}
            onPressedChange={handleToggleUp}
            className='flex text-lg text-need-gray justify-center items-center'
          >
            <FontAwesomeIcon
              className=' text-center hover:cursor-pointer'
              icon={faAngleUp}
            />
          </Toggle>
          <h1 className='text-need-gray text-lg font-bold mt-4'>{vote}</h1>
          <Toggle
            data-state={datastatedown}
            onPressedChange={handleToggleDown}
            name='toggleDown'
            className='text-lg text-need-gray mt-4'
          >
            <FontAwesomeIcon
              className='hover:cursor-pointer'
              icon={faAngleDown}
            />
          </Toggle>
        </section>
      </div>
      <div className='w-96 ml-2 rounded-3xl bg-need-gray p-10'>
        <h1 className='mb-10 text-lg font-bold'>{title}</h1>
        <p className='text-black'>{body}</p>
      </div>
    </div>
  );
}

export default Box;
