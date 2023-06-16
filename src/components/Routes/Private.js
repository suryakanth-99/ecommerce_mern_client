import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
const Private = () => {
  const [ok, setOk] = useState(false);
  const ctx = useContext(AuthContext);
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
        {
          headers: {
            Authorization: ctx.auth.token,
          },
        }
      );
      console.log(res);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (ctx.auth && ctx.auth.token) authCheck();
  }, [ctx.auth, ctx.auth.token]);
  return ok ? <Outlet /> : <Spinner />;
};

export default Private;
