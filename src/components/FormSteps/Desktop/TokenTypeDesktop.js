import { useStepperContext } from "../../../contexts/StepperContext";
import React, { useState, useEffect } from "react";
import "../Accordion.scss";
import MultiselectCheckbox from "../MultiCheck";
import NextIcon from "../../../assets/next-black.svg";
import BackIcon from "../../../assets/back-black.svg";
import Tick from "../../../assets/tick.svg";
import Cross from "../../../assets/red-cross.svg";
import InfoIcon from "../../../assets/info-icon.svg";
import { Tooltip } from "@material-ui/core";
import { tooltipInfo } from "../TokenTypeData";
import NoTokensFound from "../../../assets/No-Tokens-Found.svg";

const choiceMap = new Map([
  ["Mintable", "Mintable"],
  ["Burnable", "Burnable"],
  ["Pausable", "Pausable"],
  ["Capped", "Capped Total Supply"],
  ["Liquidity Generator", "Liquidity Generator"],
  ["Yield Generator", "Yield Generator"],
  ["Donation (Charity)", "Donation (Charity)"],
  ["Burn Tax", "Taxable (Burn Tax)"],
]);

export default function TokenType({
  setStepSkip,
  disableSteps,
  setDisableSteps,
  tokenTypeData
}) {
  const { userData, setUserData } = useStepperContext();
  const [checkboxOptions, setCheckboxOptions] = useState(userData?.checkboxOptions ? userData.checkboxOptions : [
    { label: "Mintable" },
    { label: "Burnable" },
    { label: "Pausable" },
    { label: "Capped" },
    { label: "Liquidity Generator" },
    { label: "Yield Generator" },
    { label: "Donation (Charity)" },
    { label: "Burn Tax" },
  ]);

   useEffect(() => {
     console.log("IN UE");
     if (userData.tokenType) {
       console.log("IN UE IF", userData.tokenType);
       if (userData.tokenType.substring(0, 1) === "f") {
         setStepSkip(true);
       } else {
         setStepSkip(false);
       }
     }
   }, []);

  const onChangeOptions = (data) => {
                if (data.length === 0) {
                  setRelevantTokenTypes(
                    tokenTypeData.filter((item) => {
                      return item.id === "f01";
                    })
                  );
                  return;
                }

                setRelevantTokenTypes(
                  tokenTypeData.filter((item) => {
                    let selected = true;
                    data.forEach((item2) => {
                      if (
                        !(
                          item.features[choiceMap.get(item2.label)] &&
                          item2.checked
                        )
                      ) {
                        selected = false;
                      }
                    });
                    return selected;
                  })
                );
              }

  const handleSelect = (id) => {

    setUserData({
      ...userData, tokenType: id, checkboxOptions: checkboxOptions, relevantTokenTypes: relevantTokenTypes,
      taxFeePercentage: undefined,
      burnFeePercentage: undefined,
      marketingFeePercentage: undefined,
      liquidityFeePercentage: undefined,
      autoLPThreshold: undefined,
      marketingWalletAddress: undefined,
      initialSupply: undefined,
      totalSupply: undefined,
    });
    if (id.substring(0, 1) === "f") {
      setStepSkip(true);
    } else {
      setStepSkip(false);
    }
  };
  

  const [relevantTokenTypes, setRelevantTokenTypes] = useState(userData?.relevantTokenTypes ? userData.relevantTokenTypes : [tokenTypeData[0]]);

  const currentToken = tokenTypeData.find((item) => {
    return item.id === userData.tokenType;
  });

  useEffect(() => {
    if (userData?.tokenType) {
      setDisableSteps({ ...disableSteps, second: false });
    } else {
      setDisableSteps({ ...disableSteps, second: true });
    }
  }, [userData]);


  return (
    <div className="flex flex-col text-black">
      <div className="font-bold text-2xl twok:text-heading-2 leading-8 desktop:leading-10 ml-2">
        <div
          className={`flex flex-col titleContainer ${
            userData?.tokenType ? "hidden" : "block"
          }`}
        >
          <span className="text-black">Select Features for your Token</span>
          <span className="text-greylabel text-caption-2 desktop:text-caption-1">
            Choose the additional functionality from the 15+ templates below
          </span>
        </div>

        <div
          className={`flex mt-6 ${userData?.tokenType ? "hidden" : "block"}`}
        >
          <div className="w-1/4 border-gray-300 border-r-2">
            <div className="text-2xl twok:text-subheading mb-6">Features</div>

            <MultiselectCheckbox
              data={checkboxOptions}
              setData={setCheckboxOptions}
              onChange={(data) => {
                if (data.length === 0) {
                  setRelevantTokenTypes(
                    tokenTypeData.filter((item) => {
                      return item.id === "f01";
                    })
                  );
                  return;
                }

                setRelevantTokenTypes(
                  tokenTypeData.filter((item) => {
                    let selected = true;
                    data.forEach((item2) => {
                      if (
                        !(
                          item.features[choiceMap.get(item2.label)] &&
                          item2.checked
                        )
                      ) {
                        selected = false;
                      }
                    });
                    return selected;
                  })
                );
              }}
            />
          </div>
          <div className="w-3/4 pl-10">
            <span className="text-2xl twok:text-subheading">
              Available Token Types
            </span>
            <div className="flex flex-wrap mt-6">
              {relevantTokenTypes.length > 0 ? (
                relevantTokenTypes.map((item, index) => (
                  <div className="w-1/2 py-2 pr-2" key={index}>
                    <div
                      className="rounded-lg flex justify-between border-lightGrayBorder border cursor-pointer px-3 py-1 desktop:py-1.5 twok:px-4 mr-2 twok:py-2"
                      style={{ background: "#F0F1F0" }}
                      onClick={() => handleSelect(item.id)}
                    >
                      <div className="text-caption-3 leading-caption-3 desktop:text-caption-2 desktop:ledaing-caption-2 twok:text-caption-1 font-semibold w-4/5 desktop:w-3/5 twok:leading-caption-1 h-12 desktop:h-12 twok:h-14 flex items-center">
                        <div className="block">{item.name}</div>
                      </div>
                      <div className="flex items-center cursor-pointer">
                        <img
                          alt="next_icon"
                          src={NextIcon}
                          className="w-4 twok:w-5 block"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-col text-center items-center justify-center mt-6 w-full text-paragraph-2 desktop:text-subheading font-semibold text-gray-500">
                  <div className="flex justify-center mb-6">
                    <img
                      alt="no tokens"
                      src={NoTokensFound}
                      className="block w-36 desktop:w-44"
                    />
                  </div>
                  <div>No Tokens with these set of features</div>
                  <div
                    className="text-paragraph-2 desktop:text-paragraph-1 cursor-pointer text-black"
                    onClick={() => {
                      const newData = [...checkboxOptions];
                      newData.forEach((item) => {
                        item.checked = false;
                      });
                      setCheckboxOptions(newData);
                      onChangeOptions(newData.filter((x) => x.checked));
                    }}
                  >
                    Clear all filters
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col ${
            userData?.tokenType ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between text-caption-1 w-full">
            {
              <div className="titleContainer flex flex-col text-2xl twok:text-heading-2 leading-8 desktop:leading-10">
                <span className="text-black">Feature List</span>
                <span className="text-greylabel text-caption-2 desktop:text-caption-1">
                  Features correspoing to your selected token type
                </span>
              </div>
            }
            <div
              className="flex block text-caption-2 desktop:text-caption-1 justify-center items-center cursor-pointer"
              onClick={() => {
                setUserData({ ...userData, tokenType: null });
              }}
            >
              <img
                alt="back_icon"
                src={BackIcon}
                className="w-4 desktop:w-5 mx-2 inline-block"
              />
              Back to all tokens
            </div>
          </div>
          <div
            className="w-full font-semibold border-lightGrayBorder border mt-6 rounded-lg text-paragraph-2 leading-paragraph-2 desktop:text-paragraph-1 desktop:leading-paragraph-1 twok:text-subheading twok:leading-subheading px-4 py-3 desktop:py-4 "
            style={{ background: "#F0F1F0" }}
          >
            {currentToken?.name}
          </div>
          <div className="w-full flex flex-col border-2 border-grey mt-6 rounded-lg text-caption-3 leading-caption-2 desktop:text-caption-2 desktop:leading-caption-2 font-medium px-6 py-6 ">
            <div className="w-full">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
            <div>
              <div className="flex flex-wrap w-full mt-8 gap-y-4">
                {currentToken &&
                  Object.keys(currentToken?.features).map((feature, index) => {
                    return (
                      <div className="w-1/3 flex justify-between" key={index}>
                        <div>
                          {feature}
                          <Tooltip
                            arrow
                            title={
                              <span className="text-caption-3 twok:text-caption-2 block p-1 font-medium">
                                {tooltipInfo[feature]}
                              </span>
                            }
                          >
                            <img
                              src={InfoIcon}
                              alt="info"
                              className="inline-block w-2.5 desktop:w-3 twok:w-4 ml-2 twok:ml-3"
                            />
                          </Tooltip>
                        </div>
                        {currentToken?.features[feature] ? (
                          <div className="pr-8 twok:pr-12">
                            <img
                              alt="tick"
                              src={Tick}
                              className="w-2.5 desktop:w-3.5 twok:w-4 w-4 block mt-1 twok:mt-0"
                            />
                          </div>
                        ) : (
                          <div className="pr-8 twok:pr-12">
                            <img
                              alt="cross"
                              src={Cross}
                              className="w-2.5 desktop:w-3.5 twok:w-4 w-4 block mt-1 twok:mt-0"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
