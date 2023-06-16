/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Select } from "antd";
import axios from "axios";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      // console.log(data);
      const data = await res.data;
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productFormData = new FormData();
      productFormData.append("name", name);
      productFormData.append("description", description);
      productFormData.append("price", price);
      productFormData.append("quantity", quantity);
      productFormData.append("photo", photo);
      productFormData.append("category", category);

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/create-product`,
        productFormData,
        {
          headers: {
            Authorization: ctx.auth.token,
          },
        }
      );
      const data = await res.data;
      if (data.success) {
        toast.success("product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            {console.log(categories)}
            <div className="m-1 w-50">
              <Select
                bordered={false}
                placeholder="select a category"
                size="large"
                showSearch
                className="form-select mb-3 "
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label
                  htmlFor="uploadImage"
                  className="btn btn-outline-secondary col-md-12"
                >
                  {photo ? photo.name : "upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    id="uploadImage"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                    {/* {console.log(URL.createObjectURL(photo))} */}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="Description"
                  value={description}
                  placeholder="write description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="product price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="product quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  size="large"
                  placeholder="Select shipping"
                  showSearch
                  className="form-control mb-3"
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <div className="btn btn-primary" onClick={handleProductSubmit}>
                  {" "}
                  CREATE PRODUCT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
