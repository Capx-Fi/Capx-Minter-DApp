import { useStepperContext } from "../../contexts/StepperContext";
import React, { useState, useEffect } from "react";
import "./Accordion.scss"

export default function TokenType({setStepSkip, disableSteps, setDisableSteps}) {
  const { userData, setUserData } = useStepperContext();

  const handleSelect = (name) => {
    setUserData({ ...userData, tokenType: name });
    if (name === "first") {
      setStepSkip(true);
      // if (userData?.taxFeePercentage) {
      //   setUserData({ ...userData, taxFeePercentage: "" });
      // }
      // if (userData?.burnFeePercentage) {
      //   setUserData({ ...userData, burnFeePercentage: "" });
      // }
      // if (userData?.liquidityFeePercentage) {
      //   setUserData({ ...userData, liquidityFeePercentage: "" });
      // }
      // if (userData?.marketingFeePercentage) {
      //   setUserData({ ...userData, marketingFeePercentage: "" });
      // }
      // if (userData?.autoLPThreshold) {
      //   setUserData({ ...userData, autoLPThreshold: "" });
      // }
      // if (userData?.marketingWalletAddress) {
      //   setUserData({ ...userData, marketingWalletAddress: "" });
      // }
    } else if(name === "second") {
      setStepSkip(false); 
    }
  };

  useEffect(() => {
    if (userData?.tokenType) {
      setDisableSteps({ ...disableSteps, second: false });
    } else {
      setDisableSteps({ ...disableSteps, second: true });
    }
  }, [userData]);

  return (
    <div className="flex flex-col text-black">
      <div className="font-bold text-heading-2 leading-heading-1 mb-3 ml-2">
        <span className="text-white">Choose Token Type</span>
        <div className="accordion2">
          <div className="w-full mt-8 mx-auto">
            <div className="">
              <div className="tab w-full overflow-hidden rounded-2xl gradient_bg mt-6">
                <input
                  className="absolute opacity-0"
                  onChange={() => handleSelect("first")}
                  checked={userData?.tokenType === "first"}
                  value="first"
                  id="tab-single-one"
                  type="radio"
                  name="first"
                />
                <label
                  className="block p-5 leading-caption-1 cursor-pointer"
                  for="tab-single-one"
                >
                  <span className="font-semibold text-subheading leading-subheading">
                    Standard Token
                  </span>
                  <br></br>
                  <span className="text-caption-1 font-medium leading-caption-1">
                    Token Description
                  </span>
                </label>

                <div className="tab-content overflow-hidden">
                  <p className="p-5 gradient_bg text-caption-2 leading-caption-2 font-medium">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur, architecto, explicabo perferendis nostrum, maxime
                    impedit atque odit sunt pariatur illo obcaecati soluta
                    molestias iure facere dolorum adipisci eum? Saepe, itaque.
                  </p>
                </div>
              </div>

              <div className="tab w-full overflow-hidden rounded-2xl gradient_bg mt-6">
                <input
                  className="absolute opacity-0"
                  id="tab-single-two"
                  type="radio"
                  name="second"
                  onChange={() => handleSelect("second")}
                  checked={userData?.tokenType === "second"}
                />
                <label
                  className="block p-5 leading-caption-1 cursor-pointer"
                  for="tab-single-two"
                >
                  <span className="font-semibold text-subheading leading-subheading">
                    Taxable Token
                  </span>
                  <br></br>
                  <span className="text-caption-1 font-medium leading-caption-1">
                    Token Description
                  </span>
                </label>
                <div className="tab-content overflow-hidden">
                  <p className="p-5 gradient_bg text-caption-2 leading-caption-2 font-medium">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur, architecto, explicabo perferendis nostrum, maxime
                    impedit atque odit sunt pariatur illo obcaecati soluta
                    molestias iure facere dolorum adipisci eum? Saepe, itaque.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
