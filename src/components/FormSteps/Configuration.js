import { useStepperContext } from "../../contexts/StepperContext";

import { useState, useEffect } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

export default function Configuration({ setStepTwo }) {
  const { userData, setUserData } = useStepperContext();
  const defaultWeb3 = new Web3(
    "https://rinkeby.infura.io/v3/6351bb49adde41ec86bd60b451b9f1c5"
  );

  const { account } = useWeb3React();
  const [infocus, setInfocus] = useState({});
  const [errors, setErrors] = useState({});

  const handleFocus = (e) => {
    const { name } = e.target;
    setInfocus({ ...infocus, [name]: true });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setInfocus({ ...infocus, [name]: false });
  };

  useEffect(() => {
    let valid = true;
    Object.values(errors).forEach((entry) => {
      if (entry !== "") {
        console.log("due to error");
        valid = false;
      }
    });
    
    if (isNaN(parseFloat(userData?.taxFeePercentage))) {
      valid = false;
      console.log("due to supp");
    }
    if (isNaN(parseFloat(userData?.burnFeePercentage))) {
      valid = false;
      console.log("due to supp");
    }
    if (isNaN(parseFloat(userData?.liquidityFeePercentage))) {
      valid = false;
      console.log("due to supp");
    }
    if (isNaN(parseFloat(userData?.marketingFeePercentage))) {
      valid = false;
      console.log("due to supp");
    }
    if (isNaN(parseFloat(userData?.autoLPThreshold))) {
      valid = false;
      console.log("due to supp");
    }
    if (!(userData?.marketingWalletAddress && userData?.marketingWalletAddress?.length > 0)) {
      valid = false;
      console.log("due to tokown");
    }
    setStepTwo(valid);
  }, [userData, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "taxFeePercentage" || name === "burnFeePercentage" || name === "liquidityFeePercentage" || name === "marketingFeePercentage") {
      if (value === "") {
        setErrors({ ...errors, [name]: "" });
        setUserData({ ...userData, [name]: "" });
      } else {
        const toSet = parseFloat(value.trim());
        if (!isNaN(toSet)) {
          if (toSet >= 0 && toSet < 100 && toSet === parseInt(toSet)) {
            if (toSet === 0) {
              setErrors({ ...errors, [name]: "Value cannot be zero" });
              setUserData({ ...userData, [name]: "0" });
            }  else {
              setErrors({ ...errors, [name]: "" });
              setUserData({ ...userData, [name]: toSet });
            }
          }
        }
      }
    } else if (name === "autoLPThreshold") {

      if (value === "") {
        setErrors({ ...errors, [name]: "" });
        setUserData({ ...userData, [name]: "" });
      } else {
        const toSet = parseFloat(value.trim());
        if (!isNaN(toSet)) {
          if (toSet >= 0 && toSet < 100 && toSet === parseInt(toSet)) {
            if (toSet === 0) {
              setErrors({ ...errors, [name]: "Value cannot be zero" });
              setUserData({ ...userData, [name]: "0" });
            }  else if(toSet > userData.tokenSupply) {
              setErrors({ ...errors, [name]: "Must be less than total supply" });
              setUserData({ ...userData, [name]: toSet });
            } else {
              setErrors({ ...errors, [name]: "" });
              setUserData({ ...userData, [name]: toSet });
            }
          }
        }
      }
    }else if (name === "marketingWalletAddress") {
      const toSet = value.trim();
      if (!defaultWeb3.utils.isAddress(toSet)) {
        setErrors({ ...errors, [name]: "Please enter a valid address" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
      setUserData({ ...userData, [name]: toSet });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="font-bold text-heading-2 leading-heading-1 mb-3 ml-2">
        Advanced Token Configuration
      </div>
      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2 text-white">
          Tax Fee Percentage
        </div>
        <input
          onChange={handleChange}
          value={userData["taxFeePercentage"] || ""}
          name="taxFeePercentage"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=""
          className={`w-full appearance-none py-2 px-3 my-2 border-2 border-transparent ${
            errors?.taxFeePercentage?.length > 0
              ? "border-red-500"
              : infocus?.taxFeePercentage && "border-green-400"
          } rounded-lg text-gray-100 bg-dark-300 outline-none`}
        />
        <span
          className={`${
            errors?.taxFeePercentage?.length > 0
              ? "text-red-500 font-semibold"
              : "text-gray-200"
          } text-s ml-1`}
        >
          {errors?.taxFeePercentage?.length > 0
            ? errors.taxFeePercentage
            : "Enter the Tax Fee Percentage"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2 text-white">
          Burn Fee Percentage
        </div>
        <input
          onChange={handleChange}
          value={userData["burnFeePercentage"] || ""}
          name="burnFeePercentage"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=""
          className={`w-full appearance-none py-2 px-3 my-2 border-2 border-transparent ${
            errors?.burnFeePercentage?.length > 0
              ? "border-red-500"
              : infocus?.burnFeePercentage && "border-green-400"
          } rounded-lg text-gray-100 bg-dark-300 outline-none`}
        />
        <span
          className={`${
            errors?.burnFeePercentage?.length > 0
              ? "text-red-500 font-semibold"
              : "text-gray-200"
          } text-s ml-1`}
        >
          {errors?.burnFeePercentage?.length > 0
            ? errors.burnFeePercentage
            : "Choose the Burn Fee Percentage"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2 text-white">
          Liquidity Fee Percentage
        </div>
        <input
          onChange={handleChange}
          value={userData["liquidityFeePercentage"] || ""}
          name="liquidityFeePercentage"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=""
          className={`w-full appearance-none py-2 px-3 my-2 border-2 border-transparent ${
            errors?.liquidityFeePercentage?.length > 0
              ? "border-red-500"
              : infocus?.liquidityFeePercentage && "border-green-400"
          } rounded-lg text-gray-100 bg-dark-300 outline-none`}
        />
        <span
          className={`${
            errors?.liquidityFeePercentage?.length > 0
              ? "text-red-500 font-semibold"
              : "text-gray-200"
          } text-s ml-1`}
        >
          {errors?.liquidityFeePercentage?.length > 0
            ? errors.liquidityFeePercentage
            : "Choose the Liquidity Fee Percentage"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2 text-white">
          Marketing Fee Percentage
        </div>
        <input
          onChange={handleChange}
          value={userData["marketingFeePercentage"] || ""}
          name="marketingFeePercentage"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=""
          className={`w-full appearance-none py-2 px-3 my-2 border-2 border-transparent ${
            errors?.marketingFeePercentage?.length > 0
              ? "border-red-500"
              : infocus?.marketingFeePercentage && "border-green-400"
          } rounded-lg text-gray-100 bg-dark-300 outline-none`}
        />
        <span
          className={`${
            errors?.marketingFeePercentage?.length > 0
              ? "text-red-500 font-semibold"
              : "text-gray-200"
          } text-s ml-1`}
        >
          {errors?.marketingFeePercentage?.length > 0
            ? errors.marketingFeePercentage
            : "Choose initial supply for your token"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2 text-white">
          AutoLP Threshold
        </div>
        <input
          onChange={handleChange}
          value={userData["autoLPThreshold"] || ""}
          name="autoLPThreshold"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=""
          className={`w-full appearance-none py-2 px-3 my-2 border-2 border-transparent ${
            errors?.autoLPThreshold?.length > 0
              ? "border-red-500"
              : infocus?.autoLPThreshold && "border-green-400"
          } rounded-lg text-gray-100 bg-dark-300 outline-none`}
        />
        <span
          className={`${
            errors?.autoLPThreshold?.length > 0
              ? "text-red-500 font-semibold"
              : "text-gray-200"
          } text-s ml-1`}
        >
          {errors?.autoLPThreshold?.length > 0
            ? errors.autoLPThreshold
            : "Enter the AutoLP Threshold"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2 text-white">
          Marketing Wallet Address
        </div>
        <input
          onChange={handleChange}
          value={userData["marketingWalletAddress"] || ""}
          name="marketingWalletAddress"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="0xf321..."
          className={`w-full appearance-none py-2 px-3 my-2 border-2 border-transparent ${
            errors?.marketingWalletAddress?.length > 0
              ? "border-red-500"
              : infocus?.marketingWalletAddress && "border-green-400"
          } rounded-lg text-gray-100 bg-dark-300 outline-none`}
        />
        <span
          className={`${
            errors?.marketingWalletAddress?.length > 0
              ? "text-red-500 font-semibold"
              : "text-gray-200"
          } text-s ml-1`}
        >
          {errors?.marketingWalletAddress?.length > 0
            ? errors.marketingWalletAddress
            : "Enter the Marketing Wallet Address"}
        </span>
      </div>
    </div>
  );
}
