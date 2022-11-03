import React, { Component } from "react";
import { Formik } from "formik";
import { auth } from "../../redux/authActionCreators";
import { connect } from "react-redux";
import Spiner from "../Spiner/Spiner";
const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, mode) => dispatch(auth(email, password, mode)),
  };
};

const mapStateToProps = (state) => {
  return {
    authLoading: state.authLoading,
    authFailedMsg: state.authFailedMsg,
  };
};

class Auth extends Component {
  state = {
    mode: "Sign Up",
  };

  switchModeHandler = () => {
    this.setState({
      mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
    });
  };
  render() {
    let form = null;
    if (this.props.authLoading) {
      form = <Spiner />;
    } else {
      form = (
        <Formik
          initialValues={{ email: "", password: "", passwordConfirm: "" }}
          onSubmit={(values) => {
            this.props.auth(values.email, values.password, this.state.mode);
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                values.email
              )
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 4) {
              errors.password = "Must be at least four Characters!";
            }

            if (this.state.mode === "Sign Up") {
              if (!values.passwordConfirm) {
                errors.passwordConfirm = "Required";
              } else if (values.password != values.passwordConfirm) {
                errors.passwordConfirm = "Password field doesn not match";
              }
            }

            // console.log(errors);
            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div
              style={{
                border: "1px grey solid",
                padding: "15px",
                borderRadius: "7px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  backgroundColor: "#D70F64",
                  color: "white",
                }}
                className="btn btn-large"
                onClick={this.switchModeHandler}
              >
                Switch to {this.state.mode == "Sign Up" ? "Login" : "Sign Up"}
              </button>
              <br />
              <br />
              <form onSubmit={handleSubmit}>
                <input
                  name="email"
                  placeholder="Enter your Email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.email}</span>

                <br />
                <input
                  name="password"
                  placeholder="Enter your Password"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.password}</span>
                <br />
                {this.state.mode === "Sign Up" ? (
                  <div>
                    <input
                      name="passwordConfirm"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>
                      {errors.passwordConfirm}
                    </span>

                    <br />
                  </div>
                ) : null}

                <button type="submit" className="btn btn-success">
                  {this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
                </button>
              </form>
            </div>
          )}
        </Formik>
      );
    }
    return <div>{form}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
