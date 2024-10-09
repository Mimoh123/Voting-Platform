import { useEffect, useRef, useState } from 'react';
import { Separator } from './components/ui/separator';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Toggle } from './components/ui/toggle';
import Title from './components/Title';
import Search from './components/Search';
import { Button } from './components/ui/button';
import Box from './components/Box';
import Hero from './components/Hero';
import LogIn from './components/LogIn';
import Register from './components/register';
import { useAuth } from './components/authContext';
function App() {
  const [text, setText] = useState('');
  const [data, setdata] = useState([]);
  const { currentUser, userLoggedIn } = useAuth();
  const [logInDivState, setlogInDivState] = useState(false);
  const [registerDivState, setregisterDivState] = useState(false);
  // const [logInStatus, setlogInStatus] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const scrollRegister = useRef(null);
  const scrollLogin = useRef(null);
  const fetchdata = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data.slice(0, 4).map((item) => {
      const itemvotesid = localStorage.getItem(`${item.id}_vote`);
      const itemdatastateup = localStorage.getItem(`${item.id}_datastateup`);
      const itemdatastatedown = localStorage.getItem(
        `${item.id}_datastatedown`
      );
      if (!itemvotesid) {
        item.vote = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        item.datastateup = false;
        item.datastatedown = false;
        return item;
      } else {
        item.vote = parseInt(itemvotesid);
        // item.datastateup = itemdatastateup;
        // item.datastatedown = itemdatastatedown;
        return item;
      }
    });
  };
  useEffect(() => {
    // localStorage.setItem('data', JSON.stringify(data));
    data.forEach((item) => {
      localStorage.setItem(`${item.id}_vote`, item.vote.toString());
      // localStorage.setItem(`${item.id}_datastateup`, item.datastateup);
      // localStorage.setItem(`${item.id}_datastatedown`, item.datastatedown);
    });
  }, [data]);
  useEffect(() => {
    fetchdata().then((elements) => {
      setdata(elements);
    });
  }, []);

  const voteup = (id) => {
    const newArray = data.map((item) => {
      console.log(item);
      if (item.id == id) {
        return { ...item, vote: item.vote + 1 };
      } else {
        return item;
      }
    });
    console.log(newArray);
    setdata(newArray);
  };
  const votedown = (id) => {
    const newArray = data.map((item) => {
      console.log(item);
      if (item.id == id) {
        // localStorage.setItem(item.id, (item.vote - 1).toString());
        return { ...item, vote: item.vote - 1 };
      } else {
        return item;
      }
    });
    // console.log(newArray);

    setdata(newArray);
  };
  const toggleupOn = (id) => {
    const newArray = data.map((item) => {
      // console.log(item);
      if (item.id == id) {
        return { ...item, datastateup: 'on' };
      } else {
        return item;
      }
    });
    // console.log(newArray);
    setdata(newArray);
  };
  const toggleupOff = (id) => {
    const newArray = data.map((item) => {
      console.log(item);
      if (item.id == id) {
        return { ...item, datastateup: 'off' };
      } else {
        return item;
      }
    });
    console.log(newArray);
    setdata(newArray);
  };
  const openRegister = () => {
    setregisterDivState(true);
    scrollRegister.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const registerDivController = (status) => {
    setregisterDivState(status);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  //   setuserInfo(userInfo);
  // };
  const loginDivController = (state) => {
    setlogInDivState(state);
  };
  const openLogin = () => {
    setlogInDivState(true);
    // scrollLogin.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    if (logInDivState) {
      scrollLogin.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logInDivState]);
  useEffect(() => {
    if (registerDivState) {
      scrollRegister.current?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <section
      className={`flex flex-col items-center bg-white p-2  h-auto w-full ${
        logInDivState ? 'backdrop-blur-md' : ''
      } `}
    >
      {console.log(data)}
      {logInDivState && (
        <LogIn
          ref={scrollLogin}
          logInDivState={logInDivState}
          loginDivController={loginDivController}
          className={` p-0 flex flex-col absolute h-[28rem] w-[25rem] top-1/4 pr-12 pl-12 bg-white items-center shadow-2xl rounded-2xl backdrop-blur-md
`}
        />
      )}
      {registerDivState && (
        <Register
          ref={scrollRegister}
          registerDivController={registerDivController}
          className={` p-0 flex flex-col absolute h-[28rem] w-[25rem] top-1/4 pr-12 pl-12 bg-white items-center shadow-2xl rounded-2xl
`}
        />
      )}
      <Title openRegister={openRegister} openLogin={openLogin} />
      <Hero></Hero>
      <Search text={text} setText={setText} handlesubmit={handlesubmit} />
      <section className='flex  flex-col gap-10 justify-center items-center mb-36'>
        {data.map((item) => {
          return (
            <Box
              // toggleupOff={toggleupOff}
              // toggleupOn={toggleupOn}
              loginDivController={loginDivController}
              key={item.id}
              item={item}
              voteup={voteup}
              votedown={votedown}
            />
          );
        })}
      </section>
      {logInDivState && <LogIn />}
    </section>
  );
}

export default App;
