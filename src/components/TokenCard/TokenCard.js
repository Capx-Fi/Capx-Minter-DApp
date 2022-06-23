import React, { useEffect, useState } from "react";
import "./TokenCard.scss";
import EthLogo from "../../assets/ethereum-logo.svg";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "../../assets/copy-icon.svg";
import { Tooltip } from "@material-ui/core";
import InfoIcon from "../../assets/info-icon.svg";

let parseDesc = function (text, limit) {
  if (text.length > limit) {
    for (let i = limit; i > 0; i--) {
      if (
        text.charAt(i) === " " &&
        (text.charAt(i - 1) !== "," ||
          text.charAt(i - 1) !== "." ||
          text.charAt(i - 1) !== ";")
      ) {
        return text.substring(0, i) + "...";
      }
    }
    return text.substring(0, limit) + "...";
  } else return text;
};

export default function TokenCard({
  tokenName,
  tokenSymbol,
  tokenOwner,
  tokenDecimals,
  tokenTokenSupply,
  typeOfToken,
  address,
  documentHash,
  id,
  isOwner,
  tokenCreatedAt,
  tokenDeployer,
  hashData
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  const dateCreated = new Date(parseInt(tokenCreatedAt) * 1000);
  const dateCreatedFormatted = `${monthNames[dateCreated.getMonth()]} ${dateCreated.getDate()}, ${dateCreated.getFullYear()}`
  
  return (
    <div className="token_card">
      <div className="herocontainer flex flex-col gap-y-2 px-14 py-10 w-27v rounded-2xl bg-opacity-30 mt-10 relative">
        <div className="w-full flex items-center">
          <div className="mt-3 mb-4">
            <img
              src={hashData?.image64}
              alt="Ethereum Logo"
              className="inline-block w-14 h-14 mr-7"
            ></img>
          </div>
          <div className="font-bold text-heading-2 leading-heading-2">
            {tokenName} ({tokenSymbol})
          </div>
        </div>
        <div>
          <div className="mt-4 h-8 flex items-center font-semibold text-caption-1 leading-caption-1">
            <div>
              {hashData?.description && parseDesc(hashData.description, 48)}
            </div>
          </div>
        </div>
        <div className="text-paragraph-2 flex justify-between mt-8 leading-paragraph-2">
          <div className="font-semibold">Token Address:</div>
          <div className="font-semibold">
            {`${address.substr(0, 6)}...${address.substr(-4)}`}
            <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
              <button className="inline-block">
                <Tooltip
                  title={
                    <span className="text-caption-2 block p-1 font-medium">
                      Copied
                    </span>
                  }
                  open={copied}
                  arrow
                >
                  <img src={CopyIcon} className="w-4 ml-2" alt="Copy Icon" />
                </Tooltip>
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex justify-between text-paragraph-2 leading-paragraph-2">
          <div className="font-semibold">Mint Date:</div>
          <div className="font-bold">{dateCreatedFormatted}</div>
        </div>
        <div className="flex justify-between text-paragraph-2 leading-paragraph-2">
          <div className="font-semibold">Supply:</div>
          <div className="font-bold">{tokenTokenSupply}</div>
        </div>
        <Link
          to={{
            pathname: "/tokenInformation",
            state: {
              tokenName,
              dateCreatedFormatted,
              tokenTokenSupply,
              address,
              tokenOwner,
              tokenSymbol,
              hashData,
              typeOfToken
            },
          }}
        >
          <div className="w-full">
            <div
              className={`bg-capxGreen create-button rounded-xl mt-10 justify-center items-center flex px-4 py-3 w-full cursor-pointer`}
              onClick={() => console.log("clicked")}
            >
              <div
                className={`text-black button_text twok:text-paragraph-1 twok:leading-paragraph-1 font-semibold`}
              >
                {"View Coin"}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
