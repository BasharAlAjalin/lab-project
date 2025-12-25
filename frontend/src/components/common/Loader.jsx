import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-wrap">
      <div className="spinner" aria-label="Loading" />
      <p className="muted">{text}</p>
    </div>
  );
}
