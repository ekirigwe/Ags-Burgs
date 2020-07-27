import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price:<strong>NGN {props.price.toFixed(2)}</strong>
    </p>

    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        removed={() => props.ingredientRemoved(ctrl.type)}
        added={() => props.ingredientAdded(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      disabled={!props.purchasable}
      onClick={props.ordered}
      className={classes.OrderButton}
    >
      {props.isAuth ? "ORDER NOW" : "SIGNUP TO ORDER"}
    </button>
  </div>
);

export default buildControls;
