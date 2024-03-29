import EthLogo from "../../assets/ethereum-logo.svg";
import CopyIcon from "../../assets/copy-icon.svg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./TokenInfo.scss";
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import CrossIcon from "../../assets/modal-cross-grey.svg";
import { Tooltip } from "@material-ui/core";
import InfoIcon from "../../assets/info-icon.svg";
import { useLocation, useHistory } from "react-router-dom";
import { tooltipInfo } from "../../components/FormSteps/TokenTypeData";
import { getExplorer, getSortBy } from "../../constants/getChainConfig";
import ImageLoader from "../../components/ImageLoader/ImageLoader";

const TokenInfo = ({ tokenTypeData }) => {
  const { active, account, chainId } = useWeb3React();
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedOwner, setCopiedOwner] = useState(false);
  const location = useLocation();
  const history = useHistory();

  if (getSortBy(chainId) === "Unknown") {
    history.push("/");
  }

  let tokenIndex = parseInt(location?.state?.typeOfToken) - 1;
  if (isNaN(tokenIndex)) {
    tokenIndex = 0;
  }

 

  if (location?.state) {
  } else {
    history.push("/tokens");
  }

   useEffect(() => {
     if (chainId !== location?.state?.initialChain.chainId || account !== location?.state?.initialChain.account) {
       history.push("/tokens");
     }
   }, [chainId, account]);

  useEffect(() => {
    if (copiedToken) {
      setTimeout(() => {
        setCopiedToken(false);
      }, 2000);
    }
  }, [copiedToken]);

  useEffect(() => {
    if (copiedOwner) {
      setTimeout(() => {
        setCopiedOwner(false);
      }, 2000);
    }
  }, [copiedOwner]);

  return (
    <>
      {!active ? (
        <MetamaskModal />
      ) : (
        <div className="token_info h-screen flex-col">
          <Header hiddenNav={true} />
          <div
            className={`maincontainer text-black flex flex-col justify-center items-center m-auto mt-auto px-24  py-16 desktop:py-32`}
          >
            <div className="herocontainer flex flex-col px-8 py-8 desktop:px-10 desktop:py-10 w-full twok:w-3/4 rounded-2xl bg-opacity-30 mt-10 relative border-lightGrayBorder border">
              <div className="w-full flex flex-row-reverse">
                <Link to="/tokens">
                  <img
                    src={CrossIcon}
                    alt="cross"
                    className="block cursor-pointer w-3 desktop:w-4"
                  ></img>
                </Link>
              </div>
              <div className="desktop:py-8 py-6 px-8 desktop:px-10">
                <div className="w-full flex justify-between">
                  <div className="w-full flex-col">
                    <div className="flex gap-x-4">
                      <div className="flex items-center">
                        <ImageLoader
                          styling="ml-2 w-14 desktop:w-16 twok:w-20 mr-4 desktop:mr-6 twok:ml-4 twok:mr-7"
                          src={location?.state?.hashData?.image64}
                          alt="Token Logo"
                          loader={
                            <div className="mt-3 mb-4 w-20 h-16 mr-7 bg-gray-200 animate-pulse text-gray-200">
                              -
                            </div>
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="w-full flex items-center">
                          <div className="font-bold text-subheading desktop:text-heading-2 twok:text-40px tracking-tight">
                            {location?.state?.tokenName} (
                            {location?.state?.tokenSymbol})
                          </div>
                        </div>
                        <div className="twok:mt-2 text-caption-2 desktop:text-caption-1 twok:text-paragraph-2">
                          {`${location?.state?.address}`}{" "}
                          <CopyToClipboard
                            text={location?.state?.address}
                            onCopy={() => setCopiedToken(true)}
                          >
                            <button className="inline-block">
                              <Tooltip
                                title={
                                  <span className="text-caption-2 text-white block p-1 font-medium">
                                    Copied
                                  </span>
                                }
                                open={copiedToken}
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
                    </div>
                    <div className="flex mt-6 text-caption-2 desktop:text-caption-1 twok:text-paragraph-2 justify-between w-4/5">
                      {location?.state?.hashData?.website &&
                      location.state.hashData.website.length > 0 ? (
                        <div className="flex-col">
                          <div className="font-bold">Website:</div>
                          <div>
                            <a
                              href={"//" + location.state.hashData.website}
                              target="_blank"
                            >
                              {location.state.hashData.website}
                            </a>
                          </div>
                        </div>
                      ) : null}
                      {location?.state?.hashData?.twitter &&
                      location.state.hashData.twitter.length > 0 ? (
                        <div className="flex-col">
                          <div className="font-bold">Twitter:</div>
                          <div>
                            <a
                              href={"//" + location.state.hashData.twitter}
                              target="_blank"
                            >
                              {location.state.hashData.twitter}
                            </a>
                          </div>
                        </div>
                      ) : null}
                      {location?.state?.hashData?.telegram &&
                      location.state.hashData.telegram.length > 0 ? (
                        <div className="flex-col">
                          <div className="font-bold">Telegram:</div>
                          <div>
                            <a
                              href={"//" + location.state.hashData.telegram}
                              target="_blank"
                            >
                              {location.state.hashData.telegram}
                            </a>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex gap-x-4 mt-2">
                    <a
                      href={`${getExplorer(chainId)}${
                        location?.state?.address
                      }`}
                      target="_blank"
                    >
                      <div
                        className={`bg-capxGreen rounded-lg justify-center w-40 desktop:w-44 twok:w-52 items-center flex px-6 h-8 desktop:h-10 twok:h-11 cursor-pointer`}
                        onClick={() => console.log("clicked")}
                      >
                        <div
                          className={`text-white button_text text-caption-3  desktop:text-caption-2 twok:text-caption-1 twok:leading-text-caption-1 font-semibold`}
                        >
                          {"View on Explorer"}
                        </div>
                      </div>
                    </a>
                    <div
                      className={`bg-capxGreen rounded-lg justify-center w-40 desktop:w-44 twok:w-52 items-center flex px-6 h-8 desktop:h-10 twok:h-11 cursor-pointer`}
                      onClick={() => console.log("clicked")}
                    >
                      <div
                        className={`text-white button_text text-caption-3  desktop:text-caption-2 twok:text-caption-1 twok:leading-text-caption-1 font-semibold`}
                      >
                        {"Download Audit"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-8 font-bold text-paragraph-2 desktop:text-paragraph-1 twok:text-subheading leading-subheading">
                  Project Description
                </div>
                <div>
                  <div className="mt-2 text-caption-2 leading-caption-2 twok:text-caption-1 twok:leading-caption-1 font-semibold">
                    {location?.state?.hashData?.description}
                  </div>
                </div>
                <div className="mt-8">
                  <div className="text-caption-1 leading-caption-1">
                    <div className="font-bold text-paragraph-2 desktop:text-paragraph-1 twok:text-subheading leading-subheading mb-4">
                      Token Features
                    </div>
                    <div className="flex flex-wrap w-full mt-4 gap-y-3">
                      {Object.keys(tokenTypeData[tokenIndex].features).map(
                        (item, index) =>
                          tokenTypeData[tokenIndex].features[item] ? (
                            <div
                              className="w-1/3 font-bold text-caption-2 desktop:text-caption-1 twok:text-paragraph-2 leading-paragraph-2"
                              key={index}
                            >
                              <span className="text-capxGreenDark">
                                {item}
                                <Tooltip
                                  arrow
                                  title={
                                    <span className="text-caption-2 block p-1 font-medium">
                                      {tooltipInfo[item]}
                                    </span>
                                  }
                                >
                                  <img
                                    src={InfoIcon}
                                    alt="info"
                                    className="inline-block w-3 desktop:w-3 twok:w-4 ml-2 twok:ml-3"
                                  />
                                </Tooltip>
                              </span>
                            </div>
                          ) : null
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-12">
                  <div className="text-caption-2 desktop:text-caption-1 twok:text-paragraph-2 leading-paragraph-2">
                    <span className="block">Owner Address:</span>
                    <span className="font-bold text-caption-1 leading-caption-1 desktop:text-paragraph-2 desktop:leading-paragraph-2 twok:text-paragraph-1 twok:leading-paragraph-1">
                      {`${location?.state?.tokenOwner?.substr(
                        0,
                        6
                      )}...${location?.state?.tokenOwner?.substr(-4)}`}{" "}
                    </span>
                    <CopyToClipboard
                      text={location?.state?.tokenOwner}
                      onCopy={() => setCopiedOwner(true)}
                    >
                      <button className="inline-block">
                        <Tooltip
                          title={
                            <span className="text-caption-2 block p-1 font-medium">
                              Copied
                            </span>
                          }
                          open={copiedOwner}
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
                  <div className="flex flex-col text-caption-2 desktop:text-caption-1 twok:text-paragraph-2 leading-paragraph-2">
                    <div>Total Supply</div>
                    <div className="font-bold text-caption-1 leading-caption-1 desktop:text-paragraph-2 desktop:leading-paragraph-2 twok:text-paragraph-1 twok:leading-paragraph-1">
                      {location?.state?.tokenTokenSupply}
                    </div>
                  </div>
                  <div className="flex flex-col text-caption-2 desktop:text-caption-1 twok:text-paragraph-2 leading-paragraph-2">
                    <div>Date Minted</div>
                    <div className="font-bold text-caption-1 leading-caption-1 desktop:text-paragraph-2 desktop:leading-paragraph-2 twok:text-paragraph-1 twok:leading-paragraph-1">
                      {location?.state?.dateCreatedFormatted}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default TokenInfo;
