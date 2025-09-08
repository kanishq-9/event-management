import React, { useCallback, useEffect, useState } from 'react';
import { GoPencil } from "react-icons/go";
import EditForm from "./EditForm";

function Viewcard({
    onClose,
    title,
    description,
    eventId,
    onEventChange,
    isAdmin,
    userRegistrationData,
    onRegistrationChange,
    max_capacity,
    location,
    date_time
}) {
    const URL = process.env.REACT_APP_FETCH_URL;
    const [showEditForm, setShowEditForm] = useState(false);
    const [disable, setDisable] = useState(false);
    const [totalRegistered, setTotalRegistered] = useState(0);
    const [cardMessage, setCardMessage] = useState(null);
    const [maxMessage, setmaxMessage] = useState(null);

    useEffect(() => {
        if (!isAdmin && userRegistrationData?.length > 0) {
            const singleData = userRegistrationData.filter(registeredEvent => eventId === registeredEvent.event_id);
            if (singleData?.length > 0) {
                setDisable(true);
            }
        }
    }, [eventId, isAdmin, userRegistrationData])

    const fetchCount = useCallback(async () => {
        try {
            const response = await fetch(URL + "/api/events/" + eventId);

            const data = await response.json();
            if (data.success) {
                setTotalRegistered(data.data.total_registered);
            } if (data.success === false) {
                setCardMessage(data.message);
            }

        } catch (err) {
            console.error('some error occurred: ' + err);
        }
    }, [URL, eventId]);

    useEffect(() => {
        fetchCount();
    }, [fetchCount])


    async function handleRegistration() {
        const userId = sessionStorage.getItem("id");
        const response = await fetch(URL + '/api/events/' + eventId + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                event_id: eventId,
                user_id: userId
            })
        });
        const data = await response.json();
        if (data.success) {
            onRegistrationChange();
            onClose();
        }if(data.success===false && data.message){
            setmaxMessage(data.message);
            setDisable(true);
        }
    }

    function handleEdit() {
        setShowEditForm(true);
    }

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
            <div className="bg-white rounded shadow-lg p-4" style={{ width: "400px" }}>
                {cardMessage ?
                    (<div>
                        <h4 className="mb-3">Event</h4>
                        <h6 className="mb-1">{cardMessage} Refresh to see the changes.</h6>
                        <div className="d-flex justify-content-end gap-2">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Got it!
                            </button>
                        </div>
                    </div>)
                    :
                    (
                        <div>
                            <h4 className="mb-3">Event</h4>
                            <h6 className="mb-1">Title: {title}</h6>
                            <h6 className="mb-1">Description: {description}</h6>
                            <h6 className="mb-1">Location: {location}</h6>
                            <h6 className="mb-1">Date: {new Date(date_time).toISOString().split("T")[0]}</h6>
                            <h6 className="mb-1">Total Registered: {totalRegistered}/{max_capacity}</h6>
                            {maxMessage?<h6 className="mb-1">max capacity reached</h6>:null}
                            <div className="d-flex justify-content-end gap-2">
                                {isAdmin ?
                                    (
                                        <>
                                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                                Got it!
                                            </button>
                                            <button className="btn btn-primary btn-sm" onClick={handleEdit}><GoPencil className='me-2' />Edit</button>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                                Got it!
                                            </button>
                                            <button type="submit" className={`btn btn-success ${disable ? "disabled" : ""}`} onClick={handleRegistration}>
                                                Register
                                            </button>
                                        </>
                                    )}

                            </div>
                        </div>)
                }

            </div>
            {showEditForm ? <EditForm onEventChange={onEventChange} eventId={eventId} onClose={() => setShowEditForm(false)} /> : null}
        </div>
    )
}

export default Viewcard;