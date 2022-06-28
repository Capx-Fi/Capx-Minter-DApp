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
import CheckMark from "../../assets/check-mark-green.svg";

import Web3 from "web3";

import "./ChooseChain.scss";

const ChooseChain = ({ setShowForm, setChainIdInitial }) => {
  const provider = window.ethereum;
  const web3 = new Web3(provider);
  const [sortBy, setSortBy] = useState("Ethereum");
  const { chainId } = useWeb3React();

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
    }
  };

  return (
    <div className="vesting_steps h-screen flex choose-chain">
      <Header />
      <div className="maincontainer flex flex-col justify-center items-center m-auto mt-auto">
        <div className="herocontainer px-12 py-20 rounded-3xl text-black relative w-60v flex flex-col items-start bg-white border border-lightGrayBorder">
          <div className="title text-50px leading-lh-64 font-bold tracking-tight mt-4 w-full text-center">
            {"Choose your network for token creation"}
          </div>

          <div className="steps-container mt-10 w-full text-paragraph-2 leading-paragraph-1 flex flex-wrap justify-center items-center">
            <div
              className={`${
                sortBy === "Ethereum"
                  ? " text-container border-2 border-capxGreen"
                  : ""
              } text-container bg-opacity-50 cursor-pointer font-semibold text-2xl px-6 m-4 py-4 rounded-lg cursor-pointer w-2/5 h-20 flex items-center justify-between`}
              onClick={() => {
                chainChange("Ethereum");
              }}
            >
              <div>
                <img
                  src={EthLogo}
                  alt="Ethereum Logo"
                  className="inline-block ml-4 w-7 mr-7"
                ></img>
                {"Ethereum"}
              </div>
              {sortBy === "Ethereum" && (
                <div>
                  <img
                    src={CheckMark}
                    alt="Checkmark"
                    className="inline-block ml-4 w-7 mr-7 self-end"
                  ></img>
                </div>
              )}
            </div>

            <div
              className={`${
                sortBy === "BSC"
                  ? " text-container border-2 border-capxGreen"
                  : ""
              } text-container font-semibold text-2xl px-6 m-4 py-4 rounded-lg cursor-pointer w-2/5 h-20 flex items-center justify-between`}
              onClick={() => {
                chainChange("BSC");
              }}
            >
              <div>
                <img
                  src={BSCLogo}
                  alt="BSC Logo"
                  className="inline-block ml-4 w-7 mr-10"
                ></img>
                {"BSC"}
              </div>
              {sortBy === "BSC" && (
                <div>
                  <img
                    src={CheckMark}
                    alt="Checkmark"
                    className="inline-block ml-4 w-7 mr-7 self-end"
                  ></img>
                </div>
              )}
            </div>
            <div
              className={`${
                sortBy === "Matic"
                  ? " text-container border-2 border-capxGreen"
                  : ""
              } text-container  font-semibold text-2xl px-6 m-4 py-4 rounded-lg cursor-pointer w-2/5 h-20 flex items-center justify-between`}
              onClick={() => {
                chainChange("Matic");
              }}
            >
              <div>
                <img
                  src={MaticLogo}
                  alt="Matic Logo"
                  className="inline-block ml-4 w-7 mr-10"
                ></img>
                {"Matic"}
              </div>
              {sortBy === "Matic" && (
                <div>
                  <img
                    src={CheckMark}
                    alt="Checkmark"
                    className="inline-block ml-4 w-7 mr-7 self-end"
                  ></img>
                </div>
              )}
            </div>
            <div
              className={`${
                sortBy === "Avalanche"
                  ? " text-container border-2 border-capxGreen"
                  : ""
              } text-container  font-semibold text-2xl px-6 m-4 py-4 rounded-lg cursor-pointer w-2/5 h-20 flex items-center justify-between`}
              onClick={() => {
                chainChange("Avalanche");
              }}
            >
              <div>
                <img
                  src={AvaLogo}
                  alt="Avalanche Logo"
                  className="inline-block ml-4 w-7 mr-10"
                ></img>
                {"Avalanche"}
              </div>
              {sortBy === "Avalanche" && (
                <div>
                  <img
                    src={CheckMark}
                    alt="Checkmark"
                    className="inline-block ml-4 w-7 mr-7 self-end"
                  ></img>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`
          ${
            sortBy === "Unknown"
              ? "create-button-disabled cursor-not-allowed opacity-60"
              : "bg-capxGreen create-button cursor-pointer"
          } justify-self-end rounded-2xl mt-8 justify-center items-center flex px-4 py-6 w-full `}
          onClick={() => {
            if (sortBy !== "Unknown") {
              setShowForm(true);
              setChainIdInitial(chainId);
            }
          }}
        >
          <div
            className={`text-white button_text phone:text-caption-2 screen:text-caption-1 screen:leading-caption-1 twok:text-subheading twok:leading-text-subheading font-bold`}
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
