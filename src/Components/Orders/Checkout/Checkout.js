import React, { Component } from "react";
import { Button } from "reactstrap";

export default class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
  };

  goBack = () => {
    this.props.navigate("/");
  };

  inputChangerHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitHandler = () => {
    console.log(this.state.values);
  };

  render() {
    return (
      <div>
        <form
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "2px",
          }}
        >
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            onChange={(e) => this.inputChangerHandler(e)}
            placeholder="Delivery Address"
            className="form-control"
          ></textarea>
          <br />
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={(e) => this.inputChangerHandler(e)}
            className="form-control"
            value={this.state.values.phone}
          />{" "}
          <br />
          <select
            name="paymentType"
            className="form-control"
            value={this.state.values.paymentType}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Bkash">Bkash</option>
          </select>
          <br />
          <Button
            style={{ backgroundColor: "#D70F64" }}
            className="mr-auto"
            onClick={this.submitHandler}
          >
            Place Order
          </Button>
          <Button color="secondary" className="ml-1" onClick={this.goBack}>
            Secondary
          </Button>
        </form>
      </div>
    );
  }
}
