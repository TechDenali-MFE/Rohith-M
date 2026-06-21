import React from "react";
import App from './App'
import { createRoot, Root as ReactRoot } from "react-dom/client";

export interface WizardOptions {
  containerElementId: string;
  name: string;
}

declare global {
  interface Window {
    renderWizardWidget: (config: string) => void;
    unmountWizardWidget: (id: string) => void;
  }
}

const widgetRoots: Record<string, ReactRoot> = {};

function Root({ options }: { options: WizardOptions }) {
  return <App options={options} />;
}

const getOptionsFromDataAttributes = (
  el: HTMLElement
): Partial<WizardOptions> => {
  return {
    name: el.getAttribute("data-name") || "",
  };
};

window.renderWizardWidget = (config: string) => {
  let parsedOptions: Partial<WizardOptions> = {};

  try {
    parsedOptions = JSON.parse(config);
  } catch {
    console.warn("Invalid JSON config, using data attributes");
  }

  const containerId =
    parsedOptions.containerElementId || "";

  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container "${containerId}" not found`);
    return;
  }

  const dataOptions = getOptionsFromDataAttributes(container);

  const finalOptions: WizardOptions = {
    ...dataOptions,
    ...parsedOptions,
    containerElementId: containerId,
  } as WizardOptions;

  if (!finalOptions.name) {
    console.error("Missing required field: name");
    return;
  }

  if (widgetRoots[containerId]) {
    widgetRoots[containerId].unmount();
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Root options={finalOptions} />
    </React.StrictMode>
  );

  widgetRoots[containerId] = root;
};

window.unmountWizardWidget = (containerElementId: string) => {
  const root = widgetRoots[containerElementId];

  if (root) {
    root.unmount();
    delete widgetRoots[containerElementId];
  }
};

