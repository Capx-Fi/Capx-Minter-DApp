import "./MetamaskModal.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import FirefoxIllustration from "../../../assets/FirefoxIllustration.png";
import NextIcon from "../../../assets/NextGreen.svg";
import { injected, walletconnect } from "../../../utils/connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import React, { useState } from "react";

function MetamaskModal() {
	const { t } = useTranslation();
	const isMetamask = window.ethereum && window.ethereum.isMetaMask;
	const { active, account, library, connector, activate } = useWeb3React();
	const { error } = useWeb3React();
	const unsupportedChainIdError =
		error && error instanceof UnsupportedChainIdError;

	async function connect() {
		try {
			await activate(injected);
			if (unsupportedChainIdError) {
				
			}
		} catch (ex) {
			if (error instanceof UnsupportedChainIdError) {
				
			}
			alert(ex);
		}
	}

	return (
		<article className="metamaskmodalscreen">
			<Header hiddenNav landing />
			<section className="metamaskmodalscreen_maincontainer">
				<div className="metamaskmodalscreen_maincontainer_herocontainer border border-lightGrayBorder">
					<div className="metamaskmodalscreen_maincontainer_herocontainer_title">
						{t("please_connect_metamask")}
						<br /> {t("please_connect_metamask_2")}
					</div>
					{/* <div className="metamaskmodalscreen_maincontainer_herocontainer_title">
            {t("please_connect_metamask_2")}
          </div> */}

					<div
						className="metamaskmodalscreen_maincontainer_herocontainer_button"
						onClick={() => {
							isMetamask
								? connect()
								: window.open("https://metamask.io/", "_blank").focus();
						}}
					>
						<div className="metamaskmodalscreen_maincontainer_herocontainer_button_text">
							{isMetamask ? "Connect Metamask" : "Install Metamask"}
						</div>
						<img
							className="metamaskmodalscreen_maincontainer_herocontainer_button_icon"
							src={NextIcon}
							alt="Next Icon"
						/>
					</div>

					<img
						className="metamaskmodalscreen_maincontainer_herocontainer_firefoxillustration"
						src={FirefoxIllustration}
						alt="ETH Illustration"
					/>
				</div>
			</section>
			<Footer />
		</article>
	);
}

export default MetamaskModal;
