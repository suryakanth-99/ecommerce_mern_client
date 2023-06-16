import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
const Dashboard = () => {
  const ctx = useContext(AuthContext);
  return (
    <Layout title={"Dashboard - Ecomerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{ctx.auth?.user?.name}</h3>
              <h3>{ctx.auth?.user?.email}</h3>
              <h3>{ctx.auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
