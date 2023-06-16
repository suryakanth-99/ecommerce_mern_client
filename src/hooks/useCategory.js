import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      console.log(data);
      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default useCategory;
