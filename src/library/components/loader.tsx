import React from "react";
import * as Bootstrap from "react-bootstrap";
const Loader = () => {
  return (
    <div className="bg-black">
      <Bootstrap.Modal show={true} centered>
        <Bootstrap.Modal.Body style={{ textAlign: "center" }}>
          <Bootstrap.Spinner animation="border" variant="dark" />
          <br />
          <span>Loading...</span>
        </Bootstrap.Modal.Body>
      </Bootstrap.Modal>
    </div>
  );
};

export default Loader;
