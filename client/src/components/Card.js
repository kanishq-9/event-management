import { useEffect, useState } from "react";
import { GoPeople } from "react-icons/go";
import ShowDeleteMessage from "./ShowDeleteMessage";
import Viewcard from "./Viewcard";

function Card({title, location, date_time, max_capacity, description, created_by, id, onEventChange, userRegistrationData, onRegistrationChange}) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [showViewCard, setShowViewCard] = useState(false);
    useEffect(()=>{
        const userId = sessionStorage.getItem("id");
        if(userId===created_by){
            setIsAdmin(true);
        }
    },[created_by]);

    async function handleView() {
        setShowViewCard(true);
    }

  return (
    <div className="card shadow-sm m-3" style={{ width: "22rem" }}>
      <div className="card-body">
        <GoPeople />
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle text-muted">Location: {location}</h6>
        <h6 className="card-subtitle text-muted">Max Head: {max_capacity}</h6>
        <h6 className="card-subtitle text-muted">On: {new Date(date_time).toISOString().split('T')[0]}</h6>
        <h6 className="card-subtitle mb-2 text-muted">From: Admin</h6>
        <p className="card-text">
          Description: {description}
        </p>
        {
        isAdmin?
        (<div className="d-flex justify-content-between">
            <button className="btn btn-primary btn-sm" onClick={handleView}>View</button>
            <button className="btn btn-danger btn-sm" onClick={()=>setShowDeleteMessage(true)}>Delete</button>
        </div>)
        :
        (
        <div className="d-flex justify-content-between">
            <button className="btn btn-primary btn-sm" onClick={handleView}>View</button>
        </div>
        )
        }
      </div>
      {showDeleteMessage?<ShowDeleteMessage onEventChange={onEventChange} eventId={id} title={title} description={description} onClose={() => setShowDeleteMessage(false)} />:null}
      {showViewCard?<Viewcard location={location} date_time={date_time} max_capacity={max_capacity} onRegistrationChange={onRegistrationChange} userRegistrationData={userRegistrationData} isAdmin={isAdmin} onEventChange={onEventChange} eventId={id} title={title} description={description} onClose={() => setShowViewCard(false)} />:null}
    </div>
  );
}

export default Card;
