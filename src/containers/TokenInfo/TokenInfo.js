import EthLogo from "../../assets/ethereum-logo.svg";
import CopyIcon from "../../assets/copy-icon.svg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import tokenTypeData from "../../components/FormSteps/TokenTypeData";
import "./TokenInfo.scss";
import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import CrossIcon from "../../assets/modal-cross-grey.svg";
import { Tooltip } from "@material-ui/core";
import InfoIcon from "../../assets/info-icon.svg";

const TokenInfo = () => {
  const { active, account, chainId } = useWeb3React();
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedOwner, setCopiedOwner] = useState(false);

  return (
    <>
      {!active ? (
        <MetamaskModal />
      ) : (
        <div className="token_info h-screen flex-col">
          <Header hiddenNav={true} />
          <div
            className={`maincontainer text-black flex flex-col justify-center items-center m-auto mt-auto px-24 py-32`}
          >
            <div className="herocontainer flex flex-col px-10 py-8 w-3/4 rounded-2xl bg-opacity-30 mt-10 relative">
              <div className="w-full flex flex-row-reverse">
                <Link to="/tokens">
                  <img
                    src={CrossIcon}
                    alt="cross"
                    className="block cursor-pointer w-4"
                  ></img>
                </Link>
              </div>
              <div className="py-8 px-10">
                <div className="w-full flex justify-between">
                  <div className="flex gap-x-4">
                    <div className="flex items-center">
                      <img
                        src={EthLogo}
                        alt="Ethereum Logo"
                        className="block ml-4 w-7 mr-7"
                      ></img>
                    </div>
                    <div className="flex flex-col">
                      <div className="w-full flex items-center">
                        <div className="font-bold text-40px tracking-tight">
                          CapCoin (CC)
                        </div>
                        <div>
                          <img
                            src={EthLogo}
                            alt="Ethereum Logo"
                            className="inline-block ml-4 w-5"
                          ></img>
                        </div>
                      </div>
                      <div>
                        0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E{" "}
                        <CopyToClipboard
                          text="0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E"
                          onCopy={() => setCopiedToken(true)}
                        >
                          <button className="inline-block">
                            <img
                              src={CopyIcon}
                              className="w-4 ml-1"
                              alt="Copy Icon"
                            />
                          </button>
                        </CopyToClipboard>
                        {copiedToken && (
                          <div className="inline-block text-caption-1 ml-2 text-grey">
                            Copied
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-bold block mt-2">
                          Owner Address:
                        </span>
                        0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E{" "}
                        <CopyToClipboard
                          text="0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E"
                          onCopy={() => setCopiedOwner(true)}
                        >
                          <button className="inline-block">
                            <img
                              src={CopyIcon}
                              className="w-4 ml-1"
                              alt="Copy Icon"
                            />
                          </button>
                        </CopyToClipboard>
                        {copiedOwner && (
                          <div className="inline-block text-caption-1 ml-2 text-grey">
                            Copied
                          </div>
                        )}
                      </div>
                      <div className="flex mt-4">
                        <div className="w-1/3 flex-col">
                          <div className="font-bold">Website:</div>
                          <div>https://capx.fi</div>
                        </div>
                        <div className="w-1/3 flex-col">
                          <div className="font-bold">Telegram:</div>
                          <div>t.me/capx</div>
                        </div>{" "}
                        <div className="w-1/3 flex-col">
                          <div className="font-bold">Twitter:</div>
                          <div>www.twitter.com/capx</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-4 mt-10">
                    <div
                      className={`bg-capxGreen create-button rounded-lg justify-center w-52 items-center flex px-6 h-11 cursor-pointer`}
                      onClick={() => console.log("clicked")}
                    >
                      <div
                        className={`text-black button_text twok:text-caption-1 twok:leading-text-caption-1 font-semibold`}
                      >
                        {"Ropsten Etherscan"}
                      </div>
                    </div>
                    <div
                      className={`bg-capxGreen create-button rounded-lg justify-center w-52 items-center flex px-6 h-11 cursor-pointer`}
                      onClick={() => console.log("clicked")}
                    >
                      <div
                        className={`text-black button_text twok:text-caption-1 twok:leading-text-caption-1 font-semibold`}
                      >
                        {"Download Audit"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-8 font-bold text-subheading leading-subheading">
                  Project Description
                </div>
                <div>
                  <div className="mt-2 text-caption-1 leading-caption-1 font-semibold">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </div>
                </div>
                <div className="mt-8">
                  <div className="text-caption-1 leading-caption-1">
                    <div className="font-bold text-subheading leading-subheading mb-4">
                      Token Features
                    </div>
                    <div className="flex flex-wrap w-full mt-2 gap-y-2">
                      {Object.keys(tokenTypeData[0].features).map(
                        (item, index) =>
                          tokenTypeData[0].features[item] ? (
                            <div
                              className="w-1/2 font-bold text-paragraph-2 leading-paragraph-2"
                              key={index}
                            >
                              <span className="text-capxGreenDark">
                                {item}
                                <Tooltip title="Information">
                                  <img
                                    src={InfoIcon}
                                    alt="info"
                                    className="inline-block w-4 ml-3"
                                  />
                                </Tooltip>
                              </span>
                            </div>
                          ) : null
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <div className="flex flex-col text-paragraph-2 leading-paragraph-2">
                    <div>Date Minted</div>
                    <div className="font-bold text-paragraph-1 leading-paragraph-1">
                      May 24, 2022
                    </div>
                  </div>
                  <div className="flex flex-col text-paragraph-2 leading-paragraph-2">
                    <div>Total Supply</div>
                    <div className="font-bold text-paragraph-1 leading-paragraph-1">
                      1,000,000
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
