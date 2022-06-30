import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NextIcon from "../../assets/next.svg";
import { getSortBy } from "../../constants/getChainConfig";
import { useWeb3React } from "@web3-react/core";
import EthLogo from "../../assets/ethereum-logo.svg";
import MaticLogo from "../../assets/matic-logo.svg";
import BSCLogo from "../../assets/bsc-logo.svg";
import AvaLogo from "../../assets/avalanche-logo.svg";
import AcalaLogo from "../../assets/acala.svg";
import CheckMark from "../../assets/check-mark-green.svg";



import Web3 from "web3";

import "./ChooseChain.scss";

const ChooseChain = ({ setShowForm, setChainIdInitial }) => {
  const provider = window.ethereum;
  const web3 = new Web3(provider);
  const [sortBy, setSortBy] = useState("Ethereum");
  const { chainId, account } = useWeb3React();

  useEffect(() => {
    setSortBy(chainId && getSortBy(chainId));
  }, [chainId]);

  const chainChange = async (chainName) => {
    if (chainName === "Ethereum") {
      try {
        await web3.givenProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
      } catch (error) {}
    } else if (chainName === "Matic") {
      try {
        await web3.givenProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              chainName: "Polygon Matic",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: [process.env.REACT_APP_MATIC_RPC_URL],
              blockExplorerUrls: ["https://polygonscan.com/"],
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    } else if (chainName === "BSC") {
      try {
        await web3.givenProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: [process.env.REACT_APP_BSC_RPC_URL],
              blockExplorerUrls: ["https://bscscan.com/"],
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    } else if (chainName === "Avalanche") {
      try {
        await web3.givenProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xA869",
              chainName: "Avalanche Fuji",
              nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18,
              },
              rpcUrls: [process.env.REACT_APP_AVALANCHE_RPC_URL],
              blockExplorerUrls: ["https://snowtrace.io/"],
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    }else if(chainName === "Acala"){
      try {
        await web3.givenProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x253",
              chainName: "Acala",
              nativeCurrency: {
                name: "ACA",
                symbol: "ACA",
                decimals: 18,
              },
              rpcUrls: [process.env.REACT_APP_ACALA_RPC_URL],
              blockExplorerUrls: ["https://acala.io/"],
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="vesting_steps h-screen flex choose-chain">
      <Header />
      <div className="maincontainer flex flex-col justify-center items-center m-auto mt-auto">
        <div className="herocontainer px-6 desktop:px-2 twok:px-12 py-10 twok:py-20 rounded-3xl text-black relative w-55v twok:w-60v flex flex-col items-start bg-white border border-lightGrayBorder">
          <div className="title text-3xl desktop:text-heading-2 leading-heading-2 twok:text-50px twok:leading-lh-64 font-bold tracking-tight mt-4 w-full text-center">
            {"Choose your network for token creation"}
          </div>

          <div className="steps-container mt-10 w-full text-paragraph-2 leading-paragraph-1 flex flex-wrap justify-center items-center">
            <div
              className={`${
                sortBy === "Ethereum"
                  ? " text-container border-2 border-capxGreen"
                  : ""
              } text-container bg-opacity-50 cursor-pointer font-semibold text-lg desktop:text-xl twok:text-2xl px-4 twok:px-6 m-3 py-4 rounded-lg cursor-pointer w-2/5 h-14 desktop:h-16 twok:h-20 flex items-center justify-between`}
              onClick={() => {
                chainChange("Ethereum");
              }}
            >
              <div>
                <img
                  src={EthLogo}
                  alt="Ethereum Logo"
                  className="inline-block ml-3 twok:ml-4 w-5 twok:w-7 mr-5 twok:mr-7"
                ></img>
                {"Ethereum"}
              </div>
              {sortBy === "Ethereum" && (
                <div>
                  <img
                    src={CheckMark}
                    alt="Checkmark"
                    className="inline-block ml-3 twok:ml-4 w-5 twok:w-7 mr-5 twok:mr-7 self-end"
                  ></img>
                </div>
              )}
            </div>

            <div
              className={`${
                sortBy === "BSC"
                  ? " text-container border-2 border-capxGreen"
                  : ""
              } text-container font-semibold text-lg desktop:text-xl twok:text-2xl px-4 twok:px-6 m-3 py-4 rounded-lg cursor-pointer w-2/5 h-14 desktop:h-16 twok:h-20 flex items-center justify-between`}
              onClick={() => {
                chainChange("BSC");
              }}
            >
              <div>
                <img
                  src={BSCLogo}
                  alt="BSC Logo"
                  className="inline-block ml-3 twok:ml-4 w-5 twok:w-7 mr-5 twok:mr-7"
                ></img>
                {"BSC"}
              </div>
              {sortBy === "BSC" && (
                <div>
                  <img
                    src={CheckMark}
                    alt="Checkmark"
                    className="inline-block ml-3 twok:ml-4 w-5 twok:w-7 mr-5 twok:mr-7 self-end"
                  ></img>
                </div>
              )}
            </div>
            <div
              className={`${
                sortBy === "Matic"
                  ? " text-container border-2 border-capxGreen"
                  : ""
              } text-container  font-semibold text-lg desktop:text-xl twok:text-2xl px-4 twok:px-6 m-3 py-4 rounded-lg cursor-pointer w-2/5 h-14 desktop:h-16 twok:h-20 flex items-center justify-between`}
              onClick={() => {
                chainChange("Matic");
              }}
            >
              <div>
                <img
                  src={MaticLogo}
                  alt="Matic Logo"
                  className="inline-block ml-3 twok:ml-4 w-5 twok:w-7 mr-5 twok:mr-7"
                ></img>
                {"Matic"}
              </div>
              {sortBy === "Matic" && (
                <div>
                  <img
                    src={CheckMark}
                    alt="Checkmark"
                    className="inline-block ml-3 twok:ml-4 w-5 twok:w-7 mr-5 twok:mr-7 self-end"
                  ></img>
                </div>
              )}
            </div>
            <div
              className={`${
                sortBy === "Avalanche"
                  ? " text-container border-2 border-capxGreen"
                  : ""
              } text-container  font-semibold text-lg desktop:text-xl twok:text-2xl px-4 twok:px-6 m-3 py-4 rounded-lg cursor-pointer w-2/5 h-14 desktop:h-16 twok:h-20 flex items-center justify-between`}
              onClick={() => {
                chainChange("Avalanche");
              }}
            >
              <div>
                <img
                  src={AvaLogo}
                  alt="Avalanche Logo"
                  className="inline-block ml-3 twok:ml-4 w-5 twok:w-7 mr-5 twok:mr-7"
                ></img>
                {"Avalanche"}
              </div>
              {sortBy === "Avalanche" && (
                <div>
                  <img
                    src={CheckMark}
                    alt="Checkmark"
                    className="inline-block ml-3 twok:ml-4 w-5 twok:w-7 mr-5 twok:mr-7 self-end"
                  ></img>
                </div>
              )}
            </div>
            <div
              className={`${
                sortBy === "Acala"
                  ? " text-container border-2 border-capxGreen"
                  : ""
              } text-container  font-semibold text-lg desktop:text-xl twok:text-2xl px-4 twok:px-6 m-3 py-4 rounded-lg cursor-pointer w-2/5 h-14 desktop:h-16 twok:h-20 flex items-center justify-between`}
              onClick={() => {
                chainChange("Acala");
              }}
            >
              <div>
                <img
                  src={AcalaLogo}
                  alt="Acala Logo"
                  className="inline-block ml-3 twok:ml-1.5 w-10 -ml-0.5 twok:w-12 mr-5 twok:mr-7"
                ></img>
                {"Acala"}
              </div>
              {sortBy === "Acala" && (
                <div>
                  <img
                    src={CheckMark}
                    alt="Checkmark"
                    className="inline-block ml-3 twok:ml-4 w-5 twok:w-7 mr-5 twok:mr-7 self-end"
                  ></img>
                </div>
              )}
            </div>
            <div
              className={`text-container cursor-not-allowed text-center font-semibold text-lg desktop:text-xl twok:text-2xl px-4 twok:px-6 m-3 py-4 rounded-lg cursor-pointer w-2/5 h-14 desktop:h-16 twok:h-20 flex items-center justify-between`}
            >
              <div className="">
                {"Coming Soon"}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`
          ${
            sortBy === "Unknown"
              ? "create-button-disabled cursor-not-allowed opacity-60"
              : "bg-capxGreen create-button cursor-pointer"
          } justify-self-end rounded-2xl mt-6 twok:mt-8 justify-center items-center flex px-4 py-3.5 desktop:py-4.5 twok:py-6 w-full `}
          onClick={() => {
            if (sortBy !== "Unknown") {
              setShowForm(true);
              setChainIdInitial({chainId: chainId, account: account});
            }
          }}
        >
          <div
            className={`text-white button_text phone:text-caption-2 screen:text-paragraph-1 screen:leading-paragraph-1 twok:text-subheading twok:leading-text-subheading font-bold`}
          >
            {"Begin Token Creation"}
            <img
              src={NextIcon}
              alt="Next Icon"
              className="inline-block w-7 ml-3 mr-2"
            ></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChooseChain;
