import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product/${params.slug}`
      );
      console.log(product);
      setProduct(data.product);
      similarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  const similarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/related-products/${pid}/${cid}`
      );
      console.log(data.products);
      setRelatedProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.slug) {
      getProduct();
    }
  }, [params.slug]);
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product?.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product?.name}</h6>
          <h6>Description: {product?.description}</h6>
          <h6>Price: {product?.price}</h6>
          <h6>Category: {product?.category.name}</h6>
          {/* <h6>Name: {product.name}</h6> */}
          {/* <h6>Name: {product.name}</h6> */}
          <button className="btn btn-secondary ms-1">ADD To Cart</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h1>Similar Products</h1>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts.map((p) => (
            <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">${p.price}</p>
                <div>
                  <button className="btn btn-secondary ms-1">
                    Add to cart{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
