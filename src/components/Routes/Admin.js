import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
const Admin = () => {
  const [ok, setOk] = useState(false);
  const ctx = useContext(AuthContext);
  useEffect(() => {
    console.log("in admin");
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
          {
            headers: {
              Authorization: ctx.auth.token,
            },
          }
        );
        const data = await res.data;
        console.log(res);
        if (data?.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        console.log(err);
        setOk(false);
      }
    };
    if (ctx.auth && ctx.auth.token) authCheck();
  }, [ctx.auth, ctx.auth.token]);
  console.log(ok);
  return ok ? <Outlet /> : <Spinner path="" />;
};

export default Admin;
