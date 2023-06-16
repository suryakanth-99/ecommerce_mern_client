import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);
  useEffect(() => {
    // console.log("in useeffect");
    const interval = setInterval(() => {
      // console.log("in interval");
      setCount((prev) => --prev);
    }, 1000);
    // console.log("outside interval inside useffect");
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location, path]);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <h1 className="Text-center">redirecting in {count} seconds</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
