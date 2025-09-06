import React, {useEffect, useRef, useState} from 'react';
import './css/home.css';
import Navbar from '../components/Navbar';

function Home() {
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  useEffect(()=>{
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  },[]);
  return (
    <>
    <Navbar ref={navRef} />
    <div className="home-main" style={{ paddingTop: navHeight }}>
      
      <h1 className="dashboard-title">Dashboard</h1>
      </div>
      </>
  )
}

export default Home