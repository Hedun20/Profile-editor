import React from "react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <small style={{ color: "red", display: "block", marginTop: "4px" }}>
      {error}
    </small>
  );
};

export default ErrorMessage;
