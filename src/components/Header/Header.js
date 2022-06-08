import "./Header.scss";
import CapxLogo from "../../assets/capx-mint-logo-dark.svg";
import LogoutIcon from "../../assets/logout.svg";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { useMetamask } from "../../metamaskReactHook/index";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../../utils/connector";
import DropDown from "../DropDown/DropDown";
import { Tooltip, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CHAIN_NAMES } from "../../constants/config";

import { getSortBy } from "../../constants/getChainConfig";

function Header({hiddenNav, landing, createButton}) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { active, account, library, connector, activate, deactivate, chainId } =
		useWeb3React();
	const { metaState, getChain } = useMetamask();
	const desiredChainId = "4";
	const currentChainId = metaState.chain.id?.toString();
	const [dashboardModal, setDashboardModal] = useState(false);
	const [sortBy, setSortBy] = useState("Ethereum");
	const handleCloseSelectDashboard = () => {
		setDashboardModal(false);
	};
	const [userBalance, setUserBalance] = useState(-1);
	const provider = window.ethereum;
	console.log(provider);
	const web3 = new Web3(provider);
	console.log(web3);

	const [currentTicker, setCurrentTicker] = useState("");

	useEffect(() => {
		if (active) {
			if (sortBy === "Matic") {
				setCurrentTicker("MATIC");
			} else if (sortBy === "Avalance") {
				setCurrentTicker("AVAX");
			} else if (sortBy === "BSC") {
				setCurrentTicker("BNB");
			} else {
				setCurrentTicker("ETH");
			}
		}
	}
	, [active, sortBy]);

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
		}
	}, [active, account]);

	useEffect(() => {
		setSortBy(chainId && getSortBy(chainId));
	}, [chainId]);

	async function connect() {
		try {
			await activate(injected);
		} catch (ex) {
			if (ex instanceof UnsupportedChainIdError) {
				enqueueSnackbar(`Please connect to the ${CHAIN_NAMES} Mainnet Chain.`, {
					variant: "error",
				});
			}
		}
	}

	const chainChange = async (chainName) => {
		if (chainName === "Ethereum") {
			try {
				await web3.givenProvider.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: "0x1" }],
				});
			} catch (error) {}
		} else if (chainName === "Matic") {
			try {
				await web3.givenProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x89",
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
							chainId: "0x38",
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
							chainId: "0xA86A",
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
							chainId: "0xFA",
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

	async function disconnect() {
		try {
			deactivate();
		} catch (ex) {
			console.log(ex);
		}
	}

	return (
    <>
      <header className={`header z-20`}>
        <a href="/">
          <div>
            <img className={`header_logo`} src={CapxLogo} alt="capx logo" />
          </div>
        </a>
        {active && !hiddenNav && (
          <div className="flex flex-row gap-x-2 ml-32">
            <div className="">
              <div className="flex flex-row w-32 justify-center items-center rounded-lg px-2.5 py-2.5 text-paragraph-1 font-semibold border-dark-200">
                <a href="https://liquid.capx.fi">Vest </a>
              </div>
            </div>
            {createButton ? (
              <div className="">
                <Link to="/">
                  <div className="flex flex-row w-40 justify-center items-center rounded-lg px-2.5 py-2.5 text-paragraph-1 font-semibold border-dark-200">
                    Mint Tokens
                  </div>
                </Link>
              </div>
            ) : (
              <div className="">
                <Link to="/tokens">
                  <div className="flex flex-row w-40 justify-center items-center rounded-lg px-2.5 py-2.5 text-paragraph-1 font-semibold border-dark-200">
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
                <div className="header_navbar_logoutbutton">
                  {userBalance !== -1 ? (
                    <div className="pl-2 text-caption-2 leading-caption-2">
                      {web3.utils
                        .fromWei(userBalance.toString())
                        .substring(0, 6)}{" "}
                      {currentTicker}
                    </div>
                  ) : null}
                  {userBalance !== -1 ? (
                    <div className="px-1 text-caption-2 leading-caption-2">
                      |
                    </div>
                  ) : null}
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
              </>
            ) : (
              <>
                {!landing && (
                  <div className="header_navbar_button">
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
