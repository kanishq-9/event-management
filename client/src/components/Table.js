import React, { useEffect, useState } from 'react';
import Viewcard from './Viewcard';
import ShowUnregisterMessage from './ShowUnregisterMessage';

function Table({ userRegistrationData, events, onRegistrationChange, onEventChange }) {
    const [tableData, setTableData] = useState([]);
    const [showViewCard, setShowViewCard] = useState(false);
    const [showUnregisteredMessage, setShowUnregisteredMessage] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);

    async function handleView() {
        setShowViewCard(true);
    }
    function handleUnregister(){
        setShowUnregisteredMessage(true);
    }

    useEffect(() => {
        const userId = sessionStorage.getItem("id");
        

        if (userRegistrationData.length > 0 && events.length > 0) {
            const mergedData = userRegistrationData
                .map((reg) => {
                    const event = events.find(ev => ev._id === reg.event_id);
                    if (!event) return null;
                    return { ...reg, event };
                })
                .filter(item => item !== null)
                .sort((a, b) => new Date(a.event.date_time) - new Date(b.event.date_time));

            setTableData(mergedData.map((data, index) => {
                if(userId===data.event.created_by){
                    setIsAdmin(true);
                }
                return (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.event.title}</td>
                        <td>{new Date(data.event.date_time).toISOString().split('T')[0]}</td>
                        <td>{new Date(data.registration_date).toISOString().split('T')[0]}</td>
                        <td>{data.status}</td>
                        <td className="d-flex justify-content-between">
                                <button className="btn btn-primary btn-sm" onClick={handleView}>View</button>
                                <button className="btn btn-danger btn-sm" onClick={handleUnregister}>Unregister</button>
                        </td>
                        {showViewCard?<Viewcard location={data.event.location} date_time={data.event.date_time} max_capacity={data.event.max_capacity} onRegistrationChange={onRegistrationChange} userRegistrationData={userRegistrationData} isAdmin={isAdmin} onEventChange={onEventChange} eventId={data.event._id} title={data.event.title} description={data.event.description} onClose={() => setShowViewCard(false)} />:null}
                    {showUnregisteredMessage?<ShowUnregisterMessage onClose={()=>setShowUnregisteredMessage(false)} title={data.event.title} description={data.event.description} eventId={data.event_id} onEventChange={onEventChange} onRegistrationChange={onRegistrationChange}/> : null}
                    </tr>
                );
            }))
        }
    }, [userRegistrationData, events, isAdmin, onEventChange, onRegistrationChange, showViewCard, showUnregisteredMessage]);


    return (
        <>
        <table className="table w-75">
            <thead>
                <tr>
                    <th scope="col">Sno</th>
                    <th scope="col">Event</th>
                    <th scope="col">Event Date</th>
                    <th scope="col">Registration Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tableData}
            </tbody>
        </table>
        </>
    )
}

export default Table