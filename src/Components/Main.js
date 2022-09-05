import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";

import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigation = useNavigate();
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<BurgerBuilder navigate={navigation} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
