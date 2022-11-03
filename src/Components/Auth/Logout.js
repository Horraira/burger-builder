import React, { Component } from "react";
import { connect } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import { logout } from "../../redux/authActionCreators";

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Navigate to="login" replace />;
  }
}

export default connect(null, mapDispatchToProps)(Logout);
