import { useStepperContext } from "../../contexts/StepperContext";
import React, { useState, useEffect } from "react";
import "./Accordion.scss";
import Accordion from "./Accordion";

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
  tokenTypeData,
}) {
  const { userData, setUserData } = useStepperContext();
  const [checkboxOptions, setCheckboxOptions] = useState(
    userData?.checkboxOptions
      ? userData.checkboxOptions
      : [
          { label: "Mintable" },
          { label: "Burnable" },
          { label: "Pausable" },
          { label: "Capped" },
          { label: "Liquidity Generator" },
          { label: "Yield Generator" },
          { label: "Donation (Charity)" },
          { label: "Burn Tax" },
        ]
  );

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
          if (!(item.features[choiceMap.get(item2.label)] && item2.checked)) {
            selected = false;
          }
        });
        return selected;
      })
    );
  };

  const handleSelect = (id) => {
    setUserData({
      ...userData,
      tokenType: id,
      checkboxOptions: checkboxOptions,
      relevantTokenTypes: relevantTokenTypes,
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

  const [relevantTokenTypes, setRelevantTokenTypes] = useState(
    userData?.relevantTokenTypes
      ? userData.relevantTokenTypes
      : [tokenTypeData[0]]
  );

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
