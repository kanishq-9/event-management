import React, {useEffect, useRef, useState} from 'react';
import './css/eventregistration.css';
import Navbar from '../components/Navbar';

function EventRegistration() {
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
    <div className="registration-main" style={{ paddingTop: navHeight }}>
      
      <h1 className="dashboard-title">My Registered Events</h1>
      </div>
      </>  )
}

export default EventRegistration