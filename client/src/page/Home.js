import React, {useCallback, useEffect, useRef, useState} from 'react';
import './css/home.css';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

function Home() {
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [events, setEvents] = useState([]);
  const [showCards, setShowcards] = useState(false);
  const [userRegistrationData, setUserRegistrationData] = useState([]);
  const URL = process.env.REACT_APP_FETCH_URL;
  
  useEffect(()=>{
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  },[]);

  const fetchSingleUserRegistration = useCallback(async()=>{
    try{
      const id = sessionStorage.getItem("id");
      const response = await fetch(URL+`/api/users/${id}/registrations`);
      const data = await response.json();
      if(data.success){
        setUserRegistrationData(data.data);
      }
      
    }catch(err){
      console.error('Error fetching: '+ err);
    }
  },[URL])



  function handleCardsShow(){
    return events.map(event=>{
      return <Card userRegistrationData={userRegistrationData} key={event._id} date_time={event.date_time} title={event.title} description={event.description} location={event.location} max_capacity={event.max_capacity} created_by={event.created_by} id={event._id} onEventChange={fetchEvent} onRegistrationChange={fetchSingleUserRegistration}/>
    })
  }

  const fetchEvent = useCallback(async()=>{
    try {
      const response = await fetch(URL + "/api/events");
      const data = await response.json();
      if(data.success){
        const events = data.data;
        setEvents(events);
        setShowcards(true);
      }
      
  }catch(err){
    console.error('Some error happenned'+ err);
  }
},[URL]);

  useEffect(()=>{
    fetchEvent();
    fetchSingleUserRegistration();
  },[fetchEvent, fetchSingleUserRegistration]);

  return (
    <>
    <Navbar ref={navRef} onEventCreated={fetchEvent}/>
    <div className="home-main" style={{ paddingTop: navHeight }}>
      
      <h1 className="dashboard-title">Dashboard</h1>
      <div className='d-flex m-3 flex-wrap justify-content-center'>{showCards?handleCardsShow():null}</div>
      </div>
      </>
  )
}

export default Home