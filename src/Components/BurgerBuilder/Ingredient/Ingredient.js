import React from "react";
import BreadTop from "../../../assets/top.jpg";
import BreadBottom from "../../../assets/bottom.jpg";
import Meat from "../../../assets/meat.jpg";
import Salad from "../../../assets/salad.jpg";
import Cheese from "../../../assets/cheese.jpg";
import "./Ingredient.css";

const Ingredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-top":
      ingredient = (
        <div>
          <img src={BreadTop} alt="Top Bread" />
        </div>
      );
      break;
    case "meat":
      ingredient = (
        <div>
          <img src={Meat} alt="Meat" />
        </div>
      );
      break;
    case "salad":
      ingredient = (
        <div>
          <img src={Salad} alt="Salad" />
        </div>
      );
      break;
    case "cheese":
      ingredient = (
        <div>
          <img src={Cheese} alt="Cheese" />
        </div>
      );
      break;
    case "bread-bottom":
      ingredient = (
        <div>
          <img src={BreadBottom} alt="Bottom Bread" />
        </div>
      );
      break;
    default:
      ingredient = null;
  }
  return <div className="Ingredient">{ingredient}</div>;
};

export default Ingredient;
