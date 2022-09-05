import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import Summary from "./Summary/Summary";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

const INGREDIENT_PRICES = {
  salad: 20,
  cheese: 40,
  meat: 90,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: [
      { type: "meat", amount: 0 },
      { type: "salad", amount: 0 },
      { type: "cheese", amount: 0 },
    ],
    totalPrice: 80,
    modalOpen: false,
    purchasable: false,
  };

  addIngredient = (type) => {
    const ingredients = [...this.state.ingredients];
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    for (let item of ingredients) {
      if (item.type === type) item.amount++;
    }
    this.setState({ ingredients: ingredients, totalPrice: newPrice });
    this.updatePurchasable(ingredients);
  };

  removeIngredient = (type) => {
    const ingredients = [...this.state.ingredients];
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    for (let item of ingredients) {
      if (item.type === type) {
        if (item.amount <= 0) return;
        item.amount--;
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: newPrice });
    this.updatePurchasable(ingredients);
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  updatePurchasable = (ingredients) => {
    const sum = ingredients.reduce((sum, ele) => {
      return sum + ele.amount;
    }, 0);
    this.setState({
      purchasable: sum > 0,
    });
  };

  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.state.ingredients} />
          <Controls
            ingredientAdded={this.addIngredient}
            ingredientremoved={this.removeIngredient}
            price={this.state.totalPrice}
            toggleModal={this.toggleModal}
            purchasable={this.state.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summery</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.state.totalPrice.toFixed(0)} BDT</h5>
            <Summary ingredients={this.state.ingredients} />
          </ModalBody>
          <ModalFooter>
            <Button color="success">Continue to Checkout</Button>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
