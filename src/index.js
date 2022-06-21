import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MetamaskStateProvider } from "./metamaskReactHook/index";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3(provider);
}
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});
ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskStateProvider>
          <App />
      </MetamaskStateProvider>
    </Web3ReactProvider>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
