import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

const Todo = ({ id, initialTitle, initialStatus, onDelete, onUpdate }) => {
  const [title, setTitle] = useState(initialTitle);
  const [status, setStatus] = useState(initialStatus);
  const [isEditing, setIsEditing] = useState(false);

  // Handle form submission
  const handleSaveChanges = () => {
    onUpdate(id, title, status);  // Call parent function to update the backend
    setIsEditing(false);          // Close modal after saving
  };

  return (
    <div className='col-11 col-lg-10 d-flex justify-content-between align-items-center p-2 border rounded-2 m-auto mb-3 bg-white text-dark'>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control me-2"
        disabled={!isEditing} // Only editable when in edit mode
      />
      <span className={`badge ${status === 'completed' ? 'bg-success' : 'bg-warning'} text-dark fw-bold p-1 rounded-3`}>
        {status}
      </span>

      <button type="button" className="btn btn-primary" onClick={() => setIsEditing(true)}>
        Edit
      </button>

      {/* Modal for Editing Title and Status */}
      {isEditing && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Todo</h5>
                <button type="button" className="btn-close" onClick={() => setIsEditing(false)}></button>
              </div>
              <div className="modal-body">
                {/* Update Status */}
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                {/* Update Title */}
                <div className="form-group mt-3">
                  <label>Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button className='btn p-0' onClick={() => onDelete(id)}>
        <MdDelete className='fw-bold fs-3 text-danger' />
      </button>
    </div>
  );
};

export default Todo;
