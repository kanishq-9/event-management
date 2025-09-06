function CreateEventForm({ onClose }) {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
      <div className="bg-white rounded shadow-lg p-4" style={{ width: "400px" }}>
        <h4 className="mb-3">Create Event</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Event Title</label>
            <input type="text" className="form-control" placeholder="Enter event title" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" placeholder="Enter location" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Max Participants</label>
            <input type="number" min={1} className="form-control" placeholder="Enter max participants" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="3" placeholder="Event details..."></textarea>
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
