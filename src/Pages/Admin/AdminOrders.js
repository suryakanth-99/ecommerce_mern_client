import React, { useState, useEffect, useContext } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layouts/Layout";
import { AuthContext } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not processing",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const handleStatusChange = async (orderId, value) => {
    console.log(value);
    try {
      console.log("admin orders auth token", auth.token);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setChangeStatus(value);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">OrderDate</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>

                      <Select
                        bordered={false}
                        onChange={(value) => handleStatusChange(o._id, value)}
                        defaultValue={o?.OrderStatus}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                      <td>{o?.OrderStatus}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o.products?.map((p, i) => (
                    <div className="row mb-2 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        {" "}
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                      </div>
                      <div className="col-md-4">
                        <h4>{p?.name}</h4>
                        <p>{p.description.substring(0, 30)}</p>
                        <h4>Price : {p.price}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
