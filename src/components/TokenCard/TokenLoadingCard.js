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
    <div className="token_card">
      <div className="herocontainer flex flex-col gap-y-2 px-14 py-10 w-27v rounded-2xl bg-opacity-30 mt-10 relative border-lightGrayBorder border">
        <div className="w-full flex items-center">
          <div className="mt-3 mb-4 w-10 h-9 mr-4 bg-gray-200 animate-pulse text-gray-200">
            -
          </div>
          <div className="font-bold text-heading-2 text-gray-200 h-10 w-44 animate-pulse bg-gray-200 leading-heading-2">
            -
          </div>
        </div>
        <div>
          <div className="mt-4 font-semibold text-gray-200 animate-pulse bg-gray-200 text-caption-1 leading-caption-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </div>
        </div>
        <div className="text-paragraph-2 flex justify-between mt-8 leading-paragraph-2">
          <div className="font-semibold">Token Address:</div>
          <div className="font-semibold text-gray-200 animate-pulse bg-gray-200">
            {`${"0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E".substr(
              0,
              6
            )}...${"0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E".substr(-4)}`}
          </div>
        </div>
        <div className="flex justify-between text-paragraph-2 leading-paragraph-2">
          <div className="font-semibold">Mint Date:</div>
          <div className="font-bold text-gray-200 animate-pulse bg-gray-200">
            May 24, 2022
          </div>
        </div>
        <div className="flex justify-between text-paragraph-2 leading-paragraph-2">
          <div className="font-semibold">Supply:</div>
          <div className="font-bold text-gray-200 animate-pulse bg-gray-200">
            1,000,000
          </div>
        </div>

        <div className="w-full">
          <div
            className={`bg-capxGreen cursor-not-allowed create-button-disabled rounded-xl mt-10 justify-center items-center flex px-4 py-3 w-full`}
            onClick={() => console.log("clicked")}
          >
            <div
              className={`text-white button_text twok:text-paragraph-1 twok:leading-paragraph-1 font-semibold`}
            >
              {"View Coin"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
