import React, { useEffect, useState } from 'react';
import Viewcard from './Viewcard';
import ShowUnregisterMessage from './ShowUnregisterMessage';

function Table({ userRegistrationData, events, onRegistrationChange, onEventChange }) {
    const [tableData, setTableData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [unregisterEvent, setUnregisterEvent] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    function handleView(eventData) {
        setSelectedEvent(eventData);
    }

    function handleUnregister(eventData) {
        setUnregisterEvent(eventData);
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

            setTableData(mergedData);
            if (mergedData.some(data => userId === data.event.created_by)) {
                setIsAdmin(true);
            }
        }
    }, [userRegistrationData, events]);

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
                    {tableData.map((data, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{data.event.title}</td>
                            <td>{new Date(data.event.date_time).toISOString().split('T')[0]}</td>
                            <td>{new Date(data.registration_date).toISOString().split('T')[0]}</td>
                            <td>{data.status}</td>
                            <td className="d-flex justify-content-between">
                                <button className="btn btn-primary btn-sm" onClick={() => handleView(data)}>
                                    View
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleUnregister(data)}>
                                    Unregister
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedEvent && (
                <Viewcard className="text-dark"
                    location={selectedEvent.event.location}
                    date_time={selectedEvent.event.date_time}
                    max_capacity={selectedEvent.event.max_capacity}
                    onRegistrationChange={onRegistrationChange}
                    userRegistrationData={userRegistrationData}
                    isAdmin={isAdmin}
                    onEventChange={onEventChange}
                    eventId={selectedEvent.event._id}
                    title={selectedEvent.event.title}
                    description={selectedEvent.event.description}
                    onClose={() => setSelectedEvent(null)} />
            )}

            {unregisterEvent && (
                <ShowUnregisterMessage
                    onClose={() => setUnregisterEvent(null)}
                    title={unregisterEvent.event.title}
                    description={unregisterEvent.event.description}
                    eventId={unregisterEvent.event_id}
                    onEventChange={onEventChange}
                    onRegistrationChange={onRegistrationChange}/>
            )}
        </>
    );
}

export default Table;
