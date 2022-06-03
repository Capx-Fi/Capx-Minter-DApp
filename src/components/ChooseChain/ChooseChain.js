import React, {useState, useEffect} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NextIcon from "../../assets/next-black.svg";
import { getSortBy } from "../../constants/getChainConfig";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import EthLogo from "../../assets/ethereum-logo.svg"
import MaticLogo from "../../assets/matic-logo.svg";
import BSCLogo from "../../assets/bsc-logo.svg";
import AvaLogo from "../../assets/avalanche-logo.svg";
import CheckMark from "../../assets/check-mark-green.svg";

import Web3 from "web3";

import "./ChooseChain.scss";

const ChooseChain = ({setShowForm}) => {
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    const [sortBy, setSortBy] = useState("Ethereum");
    const {
      active,
      account,
      library,
      connector,
      activate,
      deactivate,
      chainId,
    } = useWeb3React();

    useEffect(() => {
      setSortBy(chainId && getSortBy(chainId));
    }, [chainId]);

    const chainChange = async (chainName) => {
      if (chainName === "Ethereum") {
        try {
          await web3.givenProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x4" }],
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
                rpcUrls: ["https://polygon-rpc.com/"],
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
                rpcUrls: ["https://bsc-dataseed.binance.org/"],
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
                rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                blockExplorerUrls: ["https://snowtrace.io/"],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      } else if (chainName === "Fantom") {
        try {
          await web3.givenProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xFA2",
                chainName: "Fantom",
                nativeCurrency: {
                  name: "FTM",
                  symbol: "FTM",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.ftm.tools/"],
                blockExplorerUrls: ["https://ftmscan.com/"],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      } else if (chainName === "Moonbeam") {
        try {
          await web3.givenProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x504",
                chainName: "Moonbeam",
                nativeCurrency: {
                  name: "GLMR",
                  symbol: "GLMR",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.api.moonbeam.network"],
                blockExplorerUrls: ["https://moonscan.io/"],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      } else if (chainName === "Arbitrum") {
        try {
          await web3.givenProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xA4B1",
                chainName: "Arbitrum",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.ankr.com/arbitrum"],
                blockExplorerUrls: ["https://testnet.arbiscan.io/"],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

  return (
    <div className="vesting_steps h-screen flex bg-white">
      <Header />
      <div className="maincontainer flex flex-col justify-center items-center m-auto mt-auto">
        <div className="herocontainer px-12 py-20 rounded-3xl text-white relative w-60v flex flex-col items-start bg-black">
          <div className="title text-50px leading-lh-64 font-bold tracking-tight mt-4 w-full text-center">
            {"Choose your network for token creation"}
          </div>

          <div className="steps-container mt-10 w-full text-paragraph-2 leading-paragraph-1 flex flex-wrap justify-center items-center">
            <div
              className={`${
                sortBy === "Ethereum"
                  ? " text-container-highlighted border-2 border-green-400"
                  : ""
              } text-container bg-opacity-50 cursor-pointer font-semibold text-2xl px-6 m-4 py-4 rounded-lg w-2/5 h-20 flex items-center justify-between`}
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
                  ? " text-container-highlighted border-2 border-green-400"
                  : ""
              } text-container  font-semibold text-2xl px-6 m-4 py-4 rounded-lg w-2/5 h-20 flex items-center justify-between`}
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
                  ? " text-container-highlighted border-2 border-green-400"
                  : ""
              } text-container  font-semibold text-2xl px-6 m-4 py-4 rounded-lg w-2/5 h-20 flex items-center justify-between`}
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
                  ? " text-container-highlighted border-2 border-green-400"
                  : ""
              } text-container  font-semibold text-2xl px-6 m-4 py-4 rounded-lg w-2/5 h-20 flex items-center justify-between`}
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
          ${sortBy==="Unknown" ? "pointer-events-none create-button opacity-60" : "bg-capxGreen create-button"} justify-self-end rounded-2xl mt-8 justify-center items-center flex px-4 py-6 w-full cursor-pointer`}
          onClick={() => setShowForm(true)}
        >
          <div className="button_text text-black phone:text-caption-2 screen:text-caption-1 screen:leading-caption-1 twok:text-subheading twok:leading-text-subheading font-bold">
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
