import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};

class Checkout extends Component {
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
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
    };
    axios
      .post(
        "https://burgerbuilder-5f84b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        order
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h4
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          Payment: {this.props.totalPrice} BDT
        </h4>
        <form
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
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
            onChange={(e) => this.inputChangerHandler(e)}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Bkash">Bkash</option>
          </select>
          <br />
          <Button
            style={{ backgroundColor: "#D70F64", marginRight: "4px" }}
            onClick={this.submitHandler}
          >
            Place Order
          </Button>
          <Button color="secondary" onClick={this.goBack}>
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Checkout);
