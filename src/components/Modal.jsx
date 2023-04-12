function Modal() {
  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex={-1}
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              Are you sure you want to delete?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              id="closeModalBtn"
            >
              Close
            </button>
            <button
              type="button"
              id="deleteModalBtn"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Delete Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
