import React, { useEffect, useState } from "react";
import "./TokenCard.scss";


export default function TokenCard() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  }, [copied]);

  return (
    <>
      <div className="token_card">
        <div className="herocontainer flex flex-col gap-y-1 desktop:gap-y-2 px-6 py-6 desktop:px-8 desktop:py-6 twok:px-14 twok:py-10 w-25v desktop:w-25v twok:w-27v rounded-2xl bg-opacity-30 mt-10 relative border-lightGrayBorder border">
          <div className="w-full flex items-center">
            <div className="mt-3 mb-4">
              <div className="w-10 h-10 twok:w-14 twok:h-14 mr-4 desktop:mr-6 twok:mr-7 bg-gray-200 animate-pulse text-gray-200">
                -
              </div>
            </div>
            <div className="animate-pulse bg-gray-200 text-transparent font-bold text-paragraph-1 leading-paragraph-1 desktop:text-subheading desktop:leading-subheading twok:text-heading-2 twok:leading-heading-2">
              Capcoin (CC)
            </div>
          </div>
          <div>
            <div className="animate-pulse bg-gray-200 text-transparent desktop:mt-4 h-6 desktop:h-6 twok:h-8 flex items-center font-semibold text-caption-2 leading-caption-2 desktop:text-caption-1 desktop:leading-caption-1">
              <div>Yelloooo</div>
            </div>
          </div>
          <div className="text-caption-2 leading-caption-2 desktop:leading-caption-1 desktop:text-caption-1 twok:text-paragraph-2 twok:leading-paragraph-2 flex justify-between mt-4 twok:mt-8 ">
            <div className="font-semibold">Token Address:</div>
            <div className="animate-pulse bg-gray-200 text-transparent font-semibold">
              {`${"0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E".substr(
                0,
                6
              )}...${"0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E".substr(-4)}`}
            </div>
          </div>
          <div className="flex justify-between text-caption-2 leading-caption-2 desktop:leading-caption-1 desktop:text-caption-1 twok:text-paragraph-2 twok:leading-paragraph-2">
            <div className="font-semibold">Mint Date:</div>
            <div className="animate-pulse bg-gray-200 text-transparent font-bold">
              May 24, 2022
            </div>
          </div>
          <div className="flex justify-between text-caption-2 leading-caption-2 desktop:leading-caption-1 desktop:text-caption-1 twok:text-paragraph-2 twok:leading-paragraph-2">
            <div className="font-semibold">Supply:</div>
            <div className="font-bold animate-pulse bg-gray-200 text-transparent">
              1,000,000
            </div>
          </div>

          <div className="w-full">
            <div
              className={`bg-capxGreen cursor-not-allowed create-button-disabled rounded-lg desktop:rounded-xl mt-6 desktop:mt-10 justify-center items-center flex px-4 py-1.5 desktop:py-2 twok:py-3 w-full cursor-pointer`}
              onClick={() => console.log("clicked")}
            >
              <div
                className={`text-white button_text text-caption-2 desktop:text-caption-1 twok:text-paragraph-1 twok:leading-paragraph-1 font-semibold`}
              >
                {"View Coin"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
