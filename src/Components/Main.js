import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import Auth from "./Auth/Auth";

import { Route, Routes } from "react-router";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const Main = (props) => {
  const navigation = useNavigate();
  let routes = null;
  if (props.token === null) {
    routes = (
      <Routes>
        <Route path="login" element={<Auth />}></Route>
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout navigate={navigation} />} />

        <Route path="/" element={<BurgerBuilder navigate={navigation} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
  return (
    <div>
      <Header />
      <div className="container">{routes}</div>
    </div>
  );
};

export default connect(mapStateToProps)(Main);
