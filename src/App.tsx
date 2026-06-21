import React from "react";
import { WizardOptions } from "./index.widget";

interface AppProps {
  options?: WizardOptions;
}

const Wizard: React.FC<AppProps> = ({ options }) => {
  return (
    <div>
      <h2>Wizard</h2>
      <div>This is Rohith's Wizard {options?.name}</div>
    </div>
  );
};

export default Wizard;

