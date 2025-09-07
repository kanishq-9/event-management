import React from 'react';
import { GoPencil } from "react-icons/go";

function ShowDeleteMessage({onClose, title, description, eventId, onEventChange, isAdmin}) {
    const URL = process.env.REACT_APP_FETCH_URL;

    async function handleDeletion() {
        const response = await fetch(URL+'/api/events/'+eventId, {
            method:"DELETE"
        });
        const data = await response.json();
        if(data.success){
            onEventChange();
        }
    }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
      <div className="bg-white rounded shadow-lg p-4" style={{ width: "400px" }}>
        <h4 className="mb-3">Confirm deletion?</h4>
        <h6 className="mb-1">Title: {title}</h6>
        <h6 className="mb-1">Description: {description}</h6>
        <div className="d-flex justify-content-end gap-2">
            {isAdmin?
            (
                <>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
              Got it!
            </button>
                <button className="btn btn-primary btn-sm"><GoPencil className='me-2'/>Edit</button>
                </>
            )
        :
        (
            <>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Got it!
            </button>
            <button type="submit" className="btn btn-success" onClick={handleDeletion}>
              Register
            </button>
            </>
        )}
            
          </div>
        
      </div>
    </div>
  )
}

export default ShowDeleteMessage