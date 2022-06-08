import { useStepperContext } from "../../contexts/StepperContext";

import EthLogo from "../../assets/ethereum-logo.svg";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import "./BasicInformation.scss";
import { useDropzone } from "react-dropzone";

export default function BasicInformation({ disableSteps, setDisableSteps, file, setFile }) {
  const { userData, setUserData } = useStepperContext();
  const defaultWeb3 = new Web3(
    "https://rinkeby.infura.io/v3/6351bb49adde41ec86bd60b451b9f1c5"
  );

  const { account } = useWeb3React();
  const [infocus, setInfocus] = useState({});
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    if (e.target?.files[0]) {
      const extension = e.target.files[0].name.split(".").pop();
      if (extension === "jpg" || extension === "png" || extension === "jpeg" || extension === "svg") {
          setFile(URL.createObjectURL(e.target.files[0]));
      }
    } else {
      setFile(null);
    }
  }

  const handleFocus = (e) => {
    const { name } = e.target;
    setInfocus({ ...infocus, [name]: true });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setInfocus({ ...infocus, [name]: false });
  };

  useEffect(() => {
    setUserData({ ...userData, tokenOwner: account });
  }, [account]);

  useEffect(() => {
    let valid = true;
    Object.values(errors).forEach((entry) => {
      if (entry !== "") {
        console.log("due to error");
        valid = false;
      }
    });

    if (!(userData?.tokenName && userData?.tokenName?.length > 0)) {
      valid = false;
    }
    if (!(userData?.tokenSymbol && userData?.tokenSymbol?.length > 0)) {
      console.log("due to symbol");
      valid = false;
    }
    if (isNaN(parseFloat(userData?.tokenSupply))) {
      valid = false;
      console.log("due to supp");
    }
    if (!(userData?.tokenOwner && userData?.tokenOwner?.length > 0)) {
      valid = false;
      console.log("due to tokown");
    }
    if (isNaN(parseFloat(userData?.tokenDecimal))) {
      console.log("due deci");
      valid = false;
    }

    if (file === null) {
      valid = false;
    }
    setDisableSteps({...disableSteps, first:!valid});
  }, [userData, errors, file]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tokenSymbol") {
      const toSet = value.trim();
      if (toSet.length > 8) {
        setErrors({ ...errors, [name]: "Maximum length is 8 characters" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
      setUserData({ ...userData, [name]: toSet });
    } else if (name === "tokenName") {
      const toSet = value;
      if (toSet.length > 25) {
        setErrors({ ...errors, [name]: "Maximum length is 25 characters" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
      setUserData({ ...userData, [name]: toSet });
    } else if (name === "tokenDecimal") {
      if (value === "") {
        setErrors({ ...errors, [name]: "" });
        setUserData({ ...userData, [name]: "" });
      } else {
        const toSet = parseFloat(value.trim());
        if (!isNaN(toSet)) {
          if (toSet >= 0 && toSet === parseInt(toSet)) {
            if(toSet === 0){
              setErrors({ ...errors, [name]: "Value cannot be zero" });
              setUserData({ ...userData, [name]: "0" });
            } else if (toSet > 18 || toSet < 8) {
              setErrors({
                ...errors,
                [name]: "Decimal precision must be between 8 and 18",
              });
              setUserData({ ...userData, [name]: toSet });
            } else {
              setErrors({ ...errors, [name]: "" });
              setUserData({ ...userData, [name]: toSet });
            }
          }
        }
      }
    } else if (name === "tokenSupply") {
      if (value === "") {
        setErrors({ ...errors, [name]: "" });
        setUserData({ ...userData, [name]: "" });
      } else {
        const toSet = parseFloat(value.trim());
        if (!isNaN(toSet)) {
          if (
            toSet >= 0 &&
            toSet < 100000000000000 &&
            toSet === parseInt(toSet)
          ) {
            if (toSet === 0) {
              setErrors({ ...errors, [name]: "Value cannot be zero" });
              setUserData({ ...userData, [name]: "0" });
            } else {
              setErrors({ ...errors, [name]: "" });
              setUserData({ ...userData, [name]: toSet });
            }
          }
        }
      }
    } else if (name === "website") {
      const toSet = value.trim();
      if (
        !(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(toSet))
      ) {
        if (toSet.length > 0) {
          setErrors({ ...errors, [name]: "Please enter a valid URL" });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
      } else {
        setErrors({ ...errors, [name]: "" });
      }
      setUserData({ ...userData, [name]: toSet });
    } else if (name === "twitter") {
      const toSet = value.trim();
      if (!(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(toSet))) {
        if (toSet.length > 0) {
          setErrors({
            ...errors,
            [name]: "Please enter a valid twitter URL",
          });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
      } else {
        setErrors({ ...errors, [name]: "" });
      }
      setUserData({ ...userData, [name]: toSet });
    } else if (name === "telegram") {
      const toSet = value.trim();
      if (!(/(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/.test(toSet))) {
        if (toSet.length > 0) {
            setErrors({ ...errors, [name]: "Please enter a valid telegram link" });
        } else {
            setErrors({ ...errors, [name]: "" });
        }
      } else {
        setErrors({ ...errors, [name]: "" });
      }
      setUserData({ ...userData, [name]: toSet });
    } else if (name === "tokenOwner") {
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
        Basic Token Information
      </div>
      <div className="mx-2 w-full flex-1 mt-2 text-black">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Token Name
        </div>
        <input
          onChange={handleChange}
          value={userData["tokenName"] || ""}
          name="tokenName"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="eg. Capx Coin"
          className={`w-full appearance-none py-2 px-3 my-2 border-2 ${
            errors?.tokenName?.length > 0
              ? "border-red-300"
              : infocus?.tokenName
              ? "border-capxGreenLight"
              : "border-greyDark"
          } rounded-lg text-black bg-white outline-none`}
        />
        <span
          className={`${
            errors?.tokenName?.length > 0
              ? "text-red-400 font-semibold"
              : "text-gray-800"
          } text-s ml-1`}
        >
          {errors?.tokenName?.length > 0
            ? errors.tokenName
            : "Choose a name for your token"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Token Symbol
        </div>
        <input
          onChange={handleChange}
          value={userData["tokenSymbol"] || ""}
          name="tokenSymbol"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="eg. CPX"
          className={`w-full appearance-none py-2 px-3 my-2 border-2 ${
            errors?.tokenSymbol?.length > 0
              ? "border-red-300"
              : infocus?.tokenSymbol
              ? "border-capxGreenLight"
              : "border-greyDark"
          } rounded-lg text-black bg-white outline-none`}
        />
        <span
          className={`${
            errors?.tokenSymbol?.length > 0
              ? "text-red-400 font-semibold"
              : "text-gray-800"
          } text-s ml-1`}
        >
          {errors?.tokenSymbol?.length > 0
            ? errors.tokenSymbol
            : "Choose a symbol for your token"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Token Decimal
        </div>
        <input
          onChange={handleChange}
          value={userData["tokenDecimal"] || ""}
          name="tokenDecimal"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="8-18"
          className={`w-full appearance-none py-2 px-3 my-2 border-2 ${
            errors?.tokenDecimal?.length > 0
              ? "border-red-300"
              : infocus?.tokenDecimal
              ? "border-capxGreenLight"
              : "border-greyDark"
          } rounded-lg text-black bg-white outline-none`}
        />
        <span
          className={`${
            errors?.tokenDecimal?.length > 0
              ? "text-red-400 font-semibold"
              : "text-gray-800"
          } text-s ml-1`}
        >
          {errors?.tokenDecimal?.length > 0
            ? errors.tokenDecimal
            : "Choose decimal precision for your token"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Token Supply
        </div>
        <input
          onChange={handleChange}
          value={userData["tokenSupply"] || ""}
          name="tokenSupply"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Initial token supply"
          className={`w-full appearance-none py-2 px-3 my-2 border-2 ${
            errors?.tokenSupply?.length > 0
              ? "border-red-300"
              : infocus?.tokenSupply
              ? "border-capxGreenLight"
              : "border-greyDark"
          } rounded-lg text-black bg-white outline-none`}
        />
        <span
          className={`${
            errors?.tokenSupply?.length > 0
              ? "text-red-400 font-semibold"
              : "text-gray-800"
          } text-s ml-1`}
        >
          {errors?.tokenSupply?.length > 0
            ? errors.tokenSupply
            : "Choose initial supply for your token"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Token Owner
        </div>
        <input
          onChange={handleChange}
          value={userData["tokenOwner"] || ""}
          name="tokenOwner"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="0xf321..."
          className={`w-full appearance-none py-2 px-3 my-2 border-2 ${
            errors?.tokenOwner?.length > 0
              ? "border-red-300"
              : infocus?.tokenOwner
              ? "border-capxGreenLight"
              : "border-greyDark"
          } rounded-lg text-black bg-white outline-none`}
        />
        <span
          className={`${
            errors?.tokenOwner?.length > 0
              ? "text-red-400 font-semibold"
              : "text-gray-800"
          } text-s ml-1`}
        >
          {errors?.tokenOwner?.length > 0
            ? errors.tokenOwner
            : "Owner wallet address"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Token Image
        </div>
        <div className="my-2 flex flex-row rounded-lg items-center gap-x-6">
          <div className="shrink-0">
            <img
              className="w-16 h-16 rounded-lg"
              src={file === null ? EthLogo : file}
              alt="snapshot view"
            />
          </div>
          <div className="flex items-center gap-x-6 text-white">
            <div>
              
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="custom-file-input"
                />
              
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Description (Optional)
        </div>
        <input
          onChange={handleChange}
          value={userData["description"] || ""}
          name="description"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="eg. Token for internal use"
          className={`w-full appearance-none py-2 px-3 my-2 border-2 ${
            errors?.description?.length > 0
              ? "border-red-300"
              : infocus?.description
              ? "border-capxGreenLight"
              : "border-greyDark"
          } rounded-lg text-black bg-white outline-none`}
        />
        <span
          className={`${
            errors?.description?.length > 0
              ? "text-red-400 font-semibold"
              : "text-gray-800"
          } text-s ml-1`}
        >
          {errors?.description?.length > 0
            ? errors.description
            : "Add description for your token"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Website (Optional)
        </div>
        <input
          onChange={handleChange}
          value={userData["website"] || ""}
          name="website"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="www.capx.fi"
          className={`w-full appearance-none py-2 px-3 my-2 border-2 ${
            errors?.website?.length > 0
              ? "border-red-300"
              : infocus?.website
              ? "border-capxGreenLight"
              : "border-greyDark"
          } rounded-lg text-black bg-white outline-none`}
        />
        <span
          className={`${
            errors?.website?.length > 0
              ? "text-red-400 font-semibold"
              : "text-gray-800"
          } text-s ml-1`}
        >
          {errors?.website?.length > 0
            ? errors.website
            : "Add website for your token"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Twitter (Optional)
        </div>
        <input
          onChange={handleChange}
          value={userData["twitter"] || ""}
          name="twitter"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="eg. www.twitter.com/abcd"
          className={`w-full appearance-none py-2 px-3 my-2 border-2 ${
            errors?.twitter?.length > 0
              ? "border-red-300"
              : infocus?.twitter
              ? "border-capxGreenLight"
              : "border-greyDark"
          } rounded-lg text-black bg-white outline-none`}
        />
        <span
          className={`${
            errors?.twitter?.length > 0
              ? "text-red-400 font-semibold"
              : "text-gray-800"
          } text-s ml-1`}
        >
          {errors?.twitter?.length > 0
            ? errors.twitter
            : "Add twitter for your token"}
        </span>
      </div>

      <div className="mx-2 w-full flex-1 mt-2">
        <div className="mt-3 h-6 text-caption-1 tracking-wider font-semibold leading-2">
          Telegram (Optional)
        </div>
        <input
          onChange={handleChange}
          value={userData["telegram"] || ""}
          name="telegram"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="eg. t.me/abcd"
          className={`w-full appearance-none py-2 px-3 my-2 border-2 ${
            errors?.telegram?.length > 0
              ? "border-red-300"
              : infocus?.telegram
              ? "border-capxGreenLight"
              : "border-greyDark"
          } rounded-lg text-black bg-white outline-none`}
        />
        <span
          className={`${
            errors?.telegram?.length > 0
              ? "text-red-400 font-semibold"
              : "text-gray-800"
          } text-s ml-1`}
        >
          {errors?.telegram?.length > 0
            ? errors.telegram
            : "Add telegram link for your token"}
        </span>
      </div>
    </div>
  );
}
