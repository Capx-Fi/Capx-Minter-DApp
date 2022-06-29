import "./Header.scss";
import CapxLogo from "../../assets/capx-mint-logo-dark.svg";
import LogoutIcon from "../../assets/logout.svg";
import Web3 from "web3";
import { useMetamask } from "../../metamaskReactHook/index";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../../utils/connector";
import DropDown from "../DropDown/DropDown";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	MATIC_RPC,
	BSC_RPC,
	AVALANCHE_RPC,
	ACALA_RPC,
	ACALA_CHAIN_ID,
	AVALANCHE_CHAIN_ID,
	BSC_CHAIN_ID,
	ETHEREUM_CHAIN_ID,
	MATIC_CHAIN_ID,
	EXPLORER_AVALANCHE,
	EXPLORER_BSC,
	EXPLORER_MATIC,
	EXPLORER_ACALA,
	IS_TESTNET
} from "../../constants/config";

import { getSortBy } from "../../constants/getChainConfig";

function Header({hiddenNav, landing, createButton}) {
	const { active, account, library, connector, activate, deactivate, chainId } =
		useWeb3React();
	const { metaState, getChain } = useMetamask();
	const [dashboardModal, setDashboardModal] = useState(false);
	const [sortBy, setSortBy] = useState("Ethereum");
	const handleCloseSelectDashboard = () => {
		setDashboardModal(false);
	};
	const [userBalance, setUserBalance] = useState(-1);
	const provider = window.ethereum;
	const web3 = new Web3(provider);

	const [currentTicker, setCurrentTicker] = useState("");


	useEffect(() => {
		if (active) {
			if (account.length > 0) {
				web3.eth.getBalance(account).then((balance) => {
					setUserBalance(balance);
				}).catch((err) => {
					console.log(err);
				}
				);
			}
			if (sortBy === "Matic") {
				setCurrentTicker("MATIC");
			} else if (sortBy === "Avalanche") {
				setCurrentTicker("AVAX");
			} else if (sortBy === "BSC") {
				setCurrentTicker("BNB");
			} else if (sortBy === "Acala") {
				setCurrentTicker("ACA");
			} else {
				setCurrentTicker("ETH");
			}
		}
	}, [active, account, sortBy]);

	useEffect(() => {
		setSortBy(chainId && getSortBy(chainId));
	}, [chainId]);

	async function connect() {
		try {
			await activate(injected);
		} catch (ex) {
			if (ex instanceof UnsupportedChainIdError) {
			
			}
		}
	}

	const chainChange = async (chainName) => {
		if (chainName === "Ethereum") {
			try {
				await web3.givenProvider.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: ETHEREUM_CHAIN_ID.toString(16) }],
				});
			} catch (error) {}
		} else if (chainName === "Matic") {
			try {
				await web3.givenProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: MATIC_CHAIN_ID.toString(16),
							chainName: "Polygon".concat(IS_TESTNET ? " Testnet" : ""),
							nativeCurrency: {
								name: "MATIC",
								symbol: "MATIC",
								decimals: 18,
							},
							rpcUrls: [MATIC_RPC.toString()],
							blockExplorerUrls: [EXPLORER_MATIC.replace("token/","")],
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
							chainId: BSC_CHAIN_ID.toString(16),
							chainName: "BSC".concat(IS_TESTNET ? " Testnet" : ""),
							nativeCurrency: {
								name: "BNB",
								symbol: "BNB",
								decimals: 18,
							},
							rpcUrls: [BSC_RPC.toString()],
							blockExplorerUrls: [EXPLORER_BSC.replace("token/","")],
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
							chainId: AVALANCHE_CHAIN_ID.toString(16),
							chainName: "Avalanche".concat(IS_TESTNET ? " Testnet" : ""),
							nativeCurrency: {
								name: "AVAX",
								symbol: "AVAX",
								decimals: 18,
							},
							rpcUrls: [AVALANCHE_RPC.toString()],
							blockExplorerUrls: [EXPLORER_AVALANCHE.replace("token/","")],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "Acala") {
			try {
				await web3.currentProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: ACALA_CHAIN_ID.toString(16),
							chainName: "Acala".concat(IS_TESTNET ? " Testnet" : ""),
							nativeCurrency: {
								name: "ACA",
								symbol: "ACA",
								decimals: 18,
							},
							rpcUrls: [ACALA_RPC.toString()],
							blockExplorerUrls: [EXPLORER_ACALA.replace("token/","")],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		}
	};

	async function disconnect() {
		try {
			deactivate();
		} catch (ex) {
			console.log(ex);
		}
	}

	return (
    <>
      <header className={`header z-20 border-b border-darkGrayBorder`}>
        <a href="/">
          <div>
            <img className={`header_logo`} src={CapxLogo} alt="capx logo" />
          </div>
        </a>
        {active && !hiddenNav && (
          <div className="flex flex-row gap-x-4 desktop:gap-x-8 twok:gap-x-2 ml-44">
            <div className="">
              <div className="flex flex-row twok:w-32 justify-center items-center rounded-lg px-1 twok:px-2.5 py-1 twok:py-2.5 text-lg desktop:text-paragraph-2 twok:text-paragraph-1 font-semibold border-dark-200">
                <a href="https://liquid.capx.fi" target="_blank">
                  Vest{" "}
                </a>
              </div>
            </div>
            {createButton ? (
              <div className="">
                <Link to="/">
                  <div className="flex flex-row twok:w-40 justify-center items-center rounded-lg px-1 twok:px-2.5 py-1 twok:py-2.5 text-lg desktop:text-paragraph-2 twok:text-paragraph-1 font-semibold border-dark-200">
                    Mint Tokens
                  </div>
                </Link>
              </div>
            ) : (
              <div className="">
                <Link to="/tokens">
                  <div className="flex flex-row twok:w-40 justify-center items-center rounded-lg px-1 twok:px-2.5 py-1 twok:py-2.5 text-lg desktop:text-paragraph-2 twok:text-paragraph-1 font-semibold border-dark-200">
                    My Tokens
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
        {
          <div className="header_navbar">
            {active ? (
              <>
                <div className="mr-4">
                  <DropDown sortBy={sortBy} chainChange={chainChange} />
                </div>
                <div className="header_navbar_logoutbutton border-darkerGrayBorder border overflow-hidden">
                  {sortBy !== "Unknown" ? (
                    userBalance !== -1 ? (
                      <div className="flex items-center screen:w-24 desktop:w-28 twok:w-32 justify-center balance-div py-1.5 rounded-l-lg">
                        <div className="text-caption-3 desktop:text-caption-2 font-semibold leading-caption-2 text-center">
                          <span className="">
                            {web3.utils
                              .fromWei(userBalance.toString())
                              .substring(0, 6)}{" "}
                          </span>
                          {currentTicker}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center screen:w-24 desktop:w-28 twok:w-32 justify-center balance-div py-1.5 rounded-l-lg">
                        <div className="text-caption-3 desktop:text-caption-2 text-gray-300 bg-gray-300 animate-pulse font-semibold leading-caption-2 text-center">
                          <span className="">0.4242</span>
                          ETH
                        </div>
                      </div>
                    )
                  ) : null}
                  <div
                    className="flex items-center rounded-l-lg pl-3 py-1.5 border-l border-darkerGrayBorder"
                    style={{ background: "#f0f0f0" }}
                  >
                    <div className="header_navbar_logoutbutton_text">
                      {" "}
                      {`${account.substr(0, 6)}...${account.substr(-4)}`}
                    </div>
                    <img
                      className="header_navbar_logoutbutton_icon"
                      onClick={disconnect}
                      src={LogoutIcon}
                      alt="logout icon"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {!landing && (
                  <div className="header_navbar_button rounded-l-lg">
                    <div
                      onClick={connect}
                      className="header_navbar_button_text text-black"
                    >
                      Connect Wallet
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        }{" "}
      </header>
    </>
  );
}

export default Header;
