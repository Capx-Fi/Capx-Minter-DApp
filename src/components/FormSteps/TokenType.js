import { useStepperContext } from "../../contexts/StepperContext";
import React, { useState, useEffect } from "react";
import tokenTypeData from "./TokenTypeData";
import "./Accordion.scss"
import Accordion from "./Accordion";

export default function TokenType({setStepSkip, disableSteps, setDisableSteps}) {
  const { userData, setUserData } = useStepperContext();
  console.log(tokenTypeData);

  useEffect(() => {
    document.getElementById(`specialdiv`).scrollIntoView();
  }, []);

  const handleSelect = (id) => {
    document.getElementById(`specialdiv`).scrollIntoView();
    setUserData({ ...userData, tokenType: id });
    if (id.substring(0,1) === "f") {
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
      <div className="font-bold text-heading-2 leading-heading-1 mb-3 ml-2">
        <span className="text-black">Choose Token Type</span>
        <div className="accordion2">
          <div className="w-full mt-8 mx-auto">
            <div className="scrollbar-styling">
              {tokenTypeData.map((item, index) => {
                return (
                  <Accordion key={index} index={index} item={item} handleSelect={handleSelect} userData={userData} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
