import { useStepperContext } from "../../contexts/StepperContext";
import React, { useState, useEffect } from "react";
import tokenTypeData from "./TokenTypeData";
import "./Accordion.scss";
import Accordion from "./Accordion";

export default function TokenType({
  setStepSkip,
  disableSteps,
  setDisableSteps,
}) {
  const { userData, setUserData } = useStepperContext();
  console.log(tokenTypeData);

  // useEffect(() => {
  //   document.getElementById(`specialdiv`).scrollIntoView();
  // }, []);

  const handleSelect = (id) => {
    // document.getElementById(`specialdiv`).scrollIntoView();
    setUserData({ ...userData, tokenType: id });
    if (id.substring(0, 1) === "f") {
      setStepSkip(true);
    } else {
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
      <div className="font-bold text-heading-2 leading-10 ml-2">
        <div className="titleContainer flex flex-col ">
          <span className="text-black">Select Features for your Token</span>
          <span className="text-greylabel text-caption-2">
            Choose the additional functionality from the 15+ templates below
          </span>
        </div>
        <div className="accordion2">
          <div className="w-full mt-2 mx-auto">
            <div className="scrollbar-styling">
              {tokenTypeData.map((item, index) => {
                return (
                  <Accordion
                    key={index}
                    index={index}
                    item={item}
                    handleSelect={handleSelect}
                    userData={userData}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
