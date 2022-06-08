import EthLogo from "../../assets/ethereum-logo.svg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Link} from "react-router-dom";
import "./MyTokens.scss";
import { useWeb3React } from "@web3-react/core";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "../../assets/copy-icon.svg";

const MyTokens = () => {
  const { active, account, chainId } = useWeb3React();
  return (
    <>
      {!active ? (
        <MetamaskModal />
      ) : (
        <div className="tokens_container h-screen flex-col">
          <Header createButton={true} />
          <div
            className={`maincontainer text-black flex flex-col justify-center m-auto mt-auto px-24 py-32`}
          >
            <div className="text-40px leading-lh-64 font-bold tracking-tight mt-4 w-full">
              My Tokens
            </div>
            <div className="herocontainer flex flex-col px-14 py-10 w-25v rounded-2xl bg-opacity-30 mt-10 relative">
              <div className="w-full">
                <img
                  src={EthLogo}
                  alt="Ethereum Logo"
                  className="inline-block ml-4 w-8 mr-7"
                ></img>
              </div>
              <div className="w-full flex items-center mt-8">
                <div className="font-bold text-heading-2 leading-heading-2">
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
                <div className="mt-4 font-semibold text-caption-1 leading-caption-1">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </div>
              </div>
              <div className="text-paragraph-2 flex justify-between mt-8 leading-paragraph-2">
                <div className="font-semibold">Token Address:</div>
                <div className="font-semibold">
                  0xF4338...
                  <CopyToClipboard text="0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E">
                    <button className="inline-block">
                      <img
                        src={CopyIcon}
                        className="w-4 ml-2"
                        alt="Copy Icon"
                      />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="flex justify-between text-paragraph-2 leading-paragraph-2">
                <div className="font-semibold">Mint Date:</div>
                <div className="font-bold">May 24, 2022</div>
              </div>
              <div className="flex justify-between text-paragraph-2 leading-paragraph-2">
                <div className="font-semibold">Supply:</div>
                <div className="font-bold">1,000,000</div>
              </div>
              <Link to="/tokenOne">
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
          <Footer />
        </div>
      )}
    </>
  );
};

export default MyTokens;
