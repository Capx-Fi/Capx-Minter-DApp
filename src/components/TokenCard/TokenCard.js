import React, { useEffect, useState } from "react";
import "./TokenCard.scss";
import EthLogo from "../../assets/ethereum-logo.svg";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "../../assets/copy-icon.svg";
import { Tooltip } from "@material-ui/core";
import InfoIcon from "../../assets/info-icon.svg";
import ImageLoader from "../ImageLoader/ImageLoader";
import { useWeb3React } from "@web3-react/core";

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

  const { chainId, account } = useWeb3React(); 
  const dateCreated = new Date(parseInt(tokenCreatedAt) * 1000);
  const dateCreatedFormatted = `${monthNames[dateCreated.getMonth()]} ${dateCreated.getDate()}, ${dateCreated.getFullYear()}`
  
  return (
    <div className="token_card">
      <div className="herocontainer flex flex-col gap-y-1 desktop:gap-y-2 px-6 py-6 desktop:px-8 desktop:py-6 twok:px-14 twok:py-10 w-25v desktop:w-25v twok:w-27v rounded-2xl bg-opacity-30 mt-10 relative border-lightGrayBorder border">
        <div className="w-full flex items-center">
          <div className="mt-3 mb-4">
            <ImageLoader
              styling="w-10 h-10 twok:w-14 twok:h-14 mr-4 desktop:mr-6 twok:mr-7"
              src={hashData?.image64}
              alt="Token Logo"
              loader={
                <div className="w-10 h-10 twok:w-14 twok:h-14 mr-4 desktop:mr-6 twok:mr-7 bg-gray-200 animate-pulse text-gray-200">
                  -
                </div>
              }
            />
          </div>
          <div className="font-bold text-paragraph-1 leading-paragraph-1 desktop:text-subheading desktop:leading-subheading twok:text-heading-2 twok:leading-heading-2">
            {tokenName} ({tokenSymbol})
          </div>
        </div>
        <div>
          <div className="desktop:mt-4 h-6 desktop:h-6 twok:h-8 flex items-center font-semibold text-caption-2 leading-caption-2 desktop:text-caption-1 desktop:leading-caption-1">
            <div>
              {hashData?.description && parseDesc(hashData.description, 48)}
            </div>
          </div>
        </div>
        <div className="text-caption-2 leading-caption-2 desktop:leading-caption-1 desktop:text-caption-1 twok:text-paragraph-2 twok:leading-paragraph-2 flex justify-between mt-4 twok:mt-8 ">
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
                  <img
                    src={CopyIcon}
                    className="w-3 desktop:w-3.5 twok:w-4 ml-2"
                    alt="Copy Icon"
                  />
                </Tooltip>
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex justify-between text-caption-2 leading-caption-2 desktop:leading-caption-1 desktop:text-caption-1 twok:text-paragraph-2 twok:leading-paragraph-2">
          <div className="font-semibold">Mint Date:</div>
          <div className="font-bold">{dateCreatedFormatted}</div>
        </div>
        <div className="flex justify-between text-caption-2 leading-caption-2 desktop:leading-caption-1 desktop:text-caption-1 twok:text-paragraph-2 twok:leading-paragraph-2">
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
              typeOfToken,
              initialChain : {chainId:chainId, account:account}
            },
          }}
        >
          <div className="w-full">
            <div
              className={`bg-capxGreen rounded-lg desktop:rounded-xl mt-6 desktop:mt-10 justify-center items-center flex px-4 py-1.5 desktop:py-2 twok:py-3 w-full cursor-pointer`}
              onClick={() => console.log("clicked")}
            >
              <div
                className={`text-white button_text text-caption-2 desktop:text-caption-1 twok:text-paragraph-1 twok:leading-paragraph-1 font-semibold`}
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
