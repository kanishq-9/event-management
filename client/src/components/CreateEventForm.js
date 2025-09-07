import { useState } from "react";

function CreateEventForm({ onClose, onEventCreated }) {
  const today = new Date().toISOString().split("T")[0]
  const [title, setTitle] = useState("");
  const [date_time, setDateTime] = useState(today);
  const [location, setLocation] = useState("");
  const [max_capacity, setMaxCapacity] = useState("");
  const [description, setDescription] = useState("");
  const URL = process.env.REACT_APP_FETCH_URL;

  function handleTitle(event) {
    setTitle(event.target.value);
  }
  function handleDate(event) {
    setDateTime(event.target.value);
  }
  function handleLocation(event) {
    setLocation(event.target.value);
  }
  function handleParticipants(event) {
    setMaxCapacity(event.target.value);
  }
  function handleDescription(event) {
    setDescription(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const created_by = sessionStorage.getItem('id');

    try {
      const response = await fetch(URL + "/api/events", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          location,
          date_time,
          max_capacity,
          created_by
        })
      });
      const data = await response.json();
      if (data.success) {
        onEventCreated();
        onClose();
      }
      setTitle("");
      setDateTime(today);
      setLocation("");
      setMaxCapacity("");
      setDescription("");

    } catch (err) {
      console.error(`some error occurred: ` + err);
    }

  }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
      <div className="bg-white rounded shadow-lg p-4" style={{ width: "400px" }}>
        <h4 className="mb-3">Create Event</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Event Title</label>
            <input type="text" value={title} onChange={handleTitle} className="form-control" placeholder="Enter event title" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input type="date" min={today} value={date_time} className="form-control" onChange={handleDate} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" value={location} onChange={handleLocation} className="form-control" placeholder="Enter location" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Max Participants</label>
            <input type="number" value={max_capacity} min={1} onChange={handleParticipants} className="form-control" placeholder="Enter max participants" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" value={description} onChange={handleDescription} rows="3" placeholder="Event details..."></textarea>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventForm;
