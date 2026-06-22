import React from "react";
import { WizardOptions } from "./index.widget";

interface AppProps {
  options?: WizardOptions;
}

const Wizard: React.FC<AppProps> = ({ options }) => {
  const handleIncrease = () => {
    const event = new CustomEvent("increase-counter", {
      detail: {
        value: 1,
      },
    });

    window.dispatchEvent(event);
  };
  return (
    <div>
      <h2>Wizard</h2>
      <div>This is Rohith's Wizard {options?.name}</div>
       <button onClick={handleIncrease}>
        Add To Cart
      </button>
    </div>
  );
};

export default Wizard;

