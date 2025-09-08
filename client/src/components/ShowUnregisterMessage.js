import React from 'react'

function ShowUnregisterMessage({onClose, title, description, eventId, onEventChange, onRegistrationChange}) {
    const URL = process.env.REACT_APP_FETCH_URL;

    async function handleDeletion() {
        const user_id = sessionStorage.getItem('id');
        const response = await fetch(URL+'/api/events/'+eventId+"/register", {
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                user_id,
                event_id:eventId
            })
        });
        const data = await response.json();
        if(data.success){
            onRegistrationChange();
            onClose();
        }
    }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
      <div className="bg-white rounded shadow-lg p-4" style={{ width: "400px" }}>
        <h4 className="mb-3">Confirm Unregister?</h4>
        <h6 className="mb-1">Title: {title}</h6>
        <h6 className="mb-1">Description: {description}</h6>
        <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-danger" onClick={handleDeletion}>
              Confirm
            </button>
          </div>
        
      </div>
    </div>
  )
}

export default ShowUnregisterMessage