import React from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
const AdminDashboard = () => {
  const ctx = useContext(AuthContext);
  return (
    <Layout title={"Dashboard - Ecommerce"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name : {ctx.auth?.user?.name}</h3>
              <h3>Admin Email : {ctx.auth?.user?.email}</h3>
              <h3>Admin Contact : {ctx.auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
