import React, { useEffect } from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout";

import { Route, Routes } from "react-router";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { authCheck } from "../redux/authActionCreators";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()),
  };
};

const Main = (props) => {
  useEffect(() => {
    props.authCheck();
  }, []);
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

        <Route path="/logout" element={<Logout />} />

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
