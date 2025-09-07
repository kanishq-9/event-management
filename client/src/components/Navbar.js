import React, {forwardRef, useState} from "react";
import "./css/navbar.css";
import { NavLink } from "react-router-dom";
import CreateEventForm from "./CreateEventForm";

const Navbar= forwardRef(({onEventCreated}, ref)=>{
    const [showForm, setShowForm] = useState(false);
    function handleForm(){
        setShowForm(true);
    }



  return (
    <>
    <nav ref={ref} className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary shadow-lg px-3">
      <div className="navbar-brand fw-bold text-uppercase">
        <span className="text-dark">Event</span> <span className="text-light">Management</span>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto gap-3 fw-bold">
            <li className="nav-item">
            <NavLink className="nav-link text-light" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <div className="nav-link text-light" style={{cursor:"pointer"}} onClick={handleForm}>
              Create Event
            </div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/registration">
              My Events
            </NavLink>
          </li>
        </ul>

        <form className="d-flex">
          <input
            className="form-control me-2 rounded-pill"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
          <button className="btn btn-light rounded-pill px-4 fw-bold" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
    {showForm && <CreateEventForm onClose={() => setShowForm(false)} onEventCreated={onEventCreated}/>}
    </>
  );
});

export default Navbar;
