import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./Header.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const Header = (props) => {
  let links = null;
  if (props.token === null) {
    links = (
      <Nav className="mr-md-5">
        <NavItem>
          <Link to="/login" className="NavLink">
            Login
          </Link>
        </NavItem>
      </Nav>
    );
  } else {
    links = (
      <Nav className="mr-md-5">
        <NavItem>
          <Link to="/" className="NavLink">
            Burger Builder
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/orders" className="NavLink">
            Orders
          </Link>
        </NavItem>
      </Nav>
    );
  }
  return (
    <div className="Navigation">
      <Navbar
        style={{
          backgroundColor: "#D70F64",
          height: "70px",
        }}
      >
        <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
          <img src={Logo} alt="Logo" width="80px"></img>
        </NavbarBrand>
        {links}
      </Navbar>
    </div>
  );
};

export default connect(mapStateToProps)(Header);
