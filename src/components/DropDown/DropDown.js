import React, { useState } from "react";
import "./DropDown.scss";
import Web3 from "web3";
import EthLogo from "../../assets/ethereum-logo.svg";
import MaticLogo from "../../assets/matic-logo.svg";
import BSCLogo from "../../assets/bsc-logo.svg";
import AvaLogo from "../../assets/avalanche-logo.svg";
import UnknownLogo from "../../assets/warning-black.svg"

function DropDown({ sortBy, chainChange, setShowMenu }) {
	const [open, setOpen] = useState(false);
	const web3 = new Web3(Web3.givenProvider);
	window.w3 = web3;

	let image = UnknownLogo;

	if (sortBy === "Ethereum") {
		image = EthLogo;
	} else if (sortBy === "Matic") {
		image = MaticLogo;
	} else if (sortBy === "BSC") {
		image = BSCLogo;
	} else if (sortBy === "Avalanche") {
		image = AvaLogo;
	}

	return (
    <div className="relative">
      <div
        className={`header-dropdown-button border-darkerGrayBorder border ${
          open ? "border-success-color-400" : "border-dark-50"
        }`}
      >
        <img
          src={image}
          alt="Chain Logo"
          className="inline-block ml-2 w-2.5 desktop:w-3.5 twok:w-4 h-6 screen:mr-2.5 twok:mr-4"
        ></img>
        <span className={`${sortBy === "Unknown" ? "font-bold" : ""} mr-1`}>
          {sortBy}
        </span>
      </div>
    </div>
  );
}

export default DropDown;
