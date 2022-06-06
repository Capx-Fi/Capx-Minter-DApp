import { useStepperContext } from "../../contexts/StepperContext";
import React, { useState, useEffect } from "react";
import tokenTypeData from "./TokenTypeData";
import "./Accordion.scss"

export default function TokenType({setStepSkip, disableSteps, setDisableSteps}) {
  const { userData, setUserData } = useStepperContext();
  console.log(tokenTypeData);
  const handleSelect = (id) => {
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
                  <div
                    className="tab w-full overflow-hidden rounded-2xl accordion_bg mt-6"
                    key={index}
                  >
                    <input
                      className="absolute opacity-0"
                      onChange={() => handleSelect(item.id)}
                      checked={userData?.tokenType === item.id}
                      value={item.id}
                      id={`tab-single-${index}`}
                      type="radio"
                      name={item.id}
                    />
                    <label
                      className="block p-5 leading-caption-1 cursor-pointer"
                      for={`tab-single-${index}`}
                    >
                      <span className="font-semibold text-paragraph-1 leading-subheading">
                        {item.name}
                      </span>
                      <br></br>
                      <span className="text-caption-1 font-medium leading-caption-1">
                        {item.description}
                      </span>
                    </label>

                    <div className="tab-content overflow-hidden">
                      <p className="p-5 accordion_bg_dark text-caption-2 leading-caption-2 font-medium">
                        <div className="text-caption-1 leading-caption-1">
                          <span className="font-bold text-paragraph-2">
                            Token Features
                          </span>
                          <div className="flex flex-wrap w-full mt-2 gap-y-2">
                            {Object.keys(item.features).map(
                              (feature, index) => {
                                return (
                                  <div
                                    className="w-1/2 flex justify-between"
                                    key={index}
                                  >
                                    <div>{feature}</div>
                                    {item.features[feature] ? (
                                      <div className="pr-8 text-green-600">
                                        &#10003;
                                      </div>
                                    ) : (
                                      <div className="pr-8">&#10060;</div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
