import React, { useEffect, useRef, useState, useCallback } from 'react';
import './css/eventregistration.css';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { useNavigate } from 'react-router';




function EventRegistration() {
  const navRef = useRef(null);
  const URL = process.env.REACT_APP_FETCH_URL;
  const [navHeight, setNavHeight] = useState(0);
  const [userRegistrationData, setUserRegistrationData] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const currentUserId = sessionStorage.getItem("id");
    const currentUserName = sessionStorage.getItem("name");
    const currentUserEmail = sessionStorage.getItem("email");
    if(!currentUserEmail || !currentUserId || !currentUserName){
      navigate("/login");
    }
  },[]);
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  const fetchSingleUserRegistration = useCallback(async () => {
    try {
      const id = sessionStorage.getItem("id");
      const response = await fetch(URL + `/api/users/${id}/registrations`);
      const data = await response.json();
      if (data.success) {
        setUserRegistrationData(data.data);
      }

    } catch (err) {
      console.error('Error fetching: ' + err);
    }
  }, [URL]);

  const fetchEvent = useCallback(async()=>{
      try {
        const response = await fetch(URL + "/api/events");
        const data = await response.json();
        if(data.success){
          const events = data.data;
          setEvents(events);
        }
        
    }catch(err){
      console.error('Some error happenned'+ err);
    }
  },[URL]);

  useEffect(() => {
        fetchEvent();
    fetchSingleUserRegistration();
  }, [fetchEvent,fetchSingleUserRegistration]);

  return (
    <>
      <Navbar ref={navRef} />
      <div className="registration-main" style={{ paddingTop: navHeight }}>

        <h1 className="dashboard-title">My Registered Events</h1>
        <Table userRegistrationData={userRegistrationData} events={events} onRegistrationChange={fetchSingleUserRegistration} onEventChange={fetchEvent}/>
      </div>
    </>)
}

export default EventRegistration