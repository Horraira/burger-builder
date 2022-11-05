import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import Spiner from "../../Spiner/Spiner";

import { connect } from "react-redux";
import { reserIngredients } from "../../../redux/actionCreators";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    userId: state.userId,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reserIngredients: () => dispatch(reserIngredients()),
  };
};

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
    isLoading: false,
    isModalOpen: false,
    modalMsg: "",
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
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      userId: this.props.userId,
    };
    axios
      .post(
        "https://burgerbuilder-5f84b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=" +
          this.props.token,
        order
      )
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Order placed Successfully",
          });
          this.props.reserIngredients();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Something went wrong!",
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: "Something went wrong!",
        });
      });
  };

  render() {
    let Form = (
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
            disabled={!this.props.purchasable}
          >
            Place Order
          </Button>
          <Button color="secondary" onClick={this.goBack}>
            Cancel
          </Button>
        </form>
      </div>
    );
    return (
      <div>
        {this.state.isLoading ? <Spiner /> : Form}
        <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
          <ModalBody>
            <p>{this.state.modalMsg}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
