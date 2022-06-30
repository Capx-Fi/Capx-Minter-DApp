import Header from "../../components/Header/Header";
import { ACALA_CHAIN_ID } from "../../constants/config";
import Footer from "../../components/Footer/Footer";
import "./MyTokens.scss";
import { useWeb3React } from "@web3-react/core";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import TokenCard from "../../components/TokenCard/TokenCard";
import TokenLoadingCard from "../../components/TokenCard/TokenLoadingCard";
import React, { useState, useEffect } from "react";
import { queryTokenForAddress } from "../../utils/queryToken";
import { ERC20_ABI } from "../../contracts/ERC20Token";
import Fade from "react-reveal/Fade";
import { useHistory, useLocation } from "react-router-dom";
import NoTokensMinted from "../../assets/No-Tokens-Minted.svg";
import { getGraphFetch, getSortBy } from "../../constants/getChainConfig";
import { fetchTokensForAddress } from "../../utils/acalaEVM/fetchTokensForAddress";

const MyTokens = () => {
  const { active, account, chainId } = useWeb3React();
  const history = useHistory();
  const [tokensData, setTokensData] = useState(-1);
  const [ipfsFetched, setIpfsFetched] = useState([]);
  const [ipfsLoaded, setIpfsLoaded] = useState(false);
  const location = useLocation();
  const [reload, setReload] = useState(false);
  const [newCardLoaded, setNewCardLoaded] = useState(false);
  if (getSortBy(chainId) === "Unknown") {
    history.push("/");
  }

  useEffect(() => {
    if (tokensData !== -1) {
     setTokensData(-1);
     setReload(!reload);
     window.scrollTo(0, 0);
    }
  }, [chainId, account]);

  const extraCard = (
    <div className="token_card text-transparent">
      <div className="herocontainer flex flex-col gap-y-1 desktop:gap-y-2 px-6 py-6 desktop:px-8 desktop:py-6 twok:px-14 twok:py-10 w-25v desktop:w-25v twok:w-27v rounded-2xl bg-opacity-30 mt-10 relative border-lightGrayBorder border">
        <div className="w-full flex items-center">
          <div className="desktop:mt-1.5 twok:mt-4 mb-4">
            <div className="mt-3 mb-4 w-10 h-9 mr-4  text-transparent">-</div>
          </div>
          <div className="text-transparent font-bold text-paragraph-1 leading-paragraph-1 desktop:text-subheading desktop:leading-subheading twok:text-heading-2 twok:leading-heading-2">
            -
          </div>
        </div>
        <div className="text-black relative -top-16 font-bold text-subheading leading-subheading twok:text-heading-1 twok:leading-heading-1">
          Token Not Found?
        </div>
        <div>
          <div className="text-black desktop:mt-4 h-6 desktop:h-6 twok:h-8 flex items-center font-semibold text-caption-1 leading-caption-1 desktop:text-paragraph-2 desktop:leading-paragraph-2 twok:text-paragraph-1 twok:leading-paragraph-1">
            <div>
              If you have just minted your token, please allow some time for it
              to reflect.
            </div>
          </div>
        </div>

        <div className="text-caption-2 text-transparent leading-caption-2 desktop:leading-caption-1 desktop:text-caption-1 twok:text-paragraph-2 twok:leading-paragraph-2 flex justify-between mt-4 twok:mt-8 ">
          <div className="font-semibold">Token Address:</div>
          <div className="text-transparent font-semibold">
            {`${"0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E".substr(
              0,
              6
            )}...${"0xF4338A1aB2cEC0dd62fA1A27b5ba28d7a8F9350E".substr(-4)}`}
          </div>
        </div>

        <div className="w-full">
          <div
            className={`bg-capxGreen rounded-lg desktop:rounded-xl mt-6 desktop:mt-10 justify-center items-center flex px-4 py-1.5 desktop:py-2 twok:py-3 w-full cursor-pointer`}
            onClick={() => {
              setTokensData(-1);
              setReload(!reload);
              window.scrollTo(0, 0);
            }}
          >
            <div
              className={`text-white button_text text-caption-2 desktop:text-caption-1 twok:text-paragraph-1 twok:leading-paragraph-1 font-semibold`}
            >
              {"Reload"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      if (active) {
        let result = null;
        if (chainId?.toString() === ACALA_CHAIN_ID.toString()) {
          result = await fetchTokensForAddress(
            account,
            getGraphFetch(chainId),
            ERC20_ABI
          );
        } else {
          result = await queryTokenForAddress(
            account,
            getGraphFetch(chainId),
            ERC20_ABI
          );
        }
        console.log("MyTokens", result);
        let ipfsStatus = [];
        result?.forEach(() => {
          ipfsStatus.push({ fetched: false });
        });
        if (location?.state?.createdAddress) {
          result.forEach((token, index) => {
            if (
              token.address.toUpperCase() ===
              location.state.createdAddress.toUpperCase()
            ) {
              setNewCardLoaded(true);
            }
          });
        }
        setIpfsFetched(ipfsStatus);
        setTokensData(result);
      }
    }

    fetchData();
  }, [active, reload]);

  const fetchIpfs = async (index) => {
    if (ipfsFetched[index].fetched) {
      return ipfsFetched[index];
    }
    let result;
    try {
      result = await fetch(
        `${process.env.REACT_APP_IPFS_ENDPOINT}${tokensData[index].documentHash}`
      );
      let data = await result.json();
      return { fetched: true, data };
    } catch (e) {
      console.error("ERROR IN IPFS FETCH", e);
    }
  };

  useEffect(() => {
    Array.isArray(tokensData) &&
      tokensData.forEach((token, index) => {
        fetchIpfs(index).then((result) => {
          setIpfsFetched((prev) => {
            let newArray = [...prev];
            newArray[index] = result;
            return newArray;
          });
        });
      });
  }, [tokensData]);

  useEffect(() => {
    console.log("IPFS FETCHED", ipfsFetched);
    if (ipfsFetched.every((token) => token.fetched)) {
      setIpfsLoaded(true);
    }
  }, [ipfsFetched]);

  return (
    <>
      {!active ? (
        <MetamaskModal />
      ) : (
        <div className="tokens_container h-screen flex-col">
          <Header createButton={true} myTokens={true} />
          <div
            className={`maincontainer text-black flex flex-col justify-center m-auto mt-auto px-16 desktop:px-20 twok:px-24 py-20 desktop:py-24 twok:py-32`}
          >
            <div className="text-subheading desktop:text-heading-2 twok:text-40px leading-lh-64 font-bold tracking-tight mt-4 w-full">
              My Tokens
            </div>
            <div className="flex flex-wrap gap-x-14 desktop:gap-x-16 twok:gap-x-16 gap-y-4 twok:gap-y-6">
              {tokensData === -1 || !ipfsLoaded ? (
                <>
                  <TokenLoadingCard />
                  <TokenLoadingCard />
                  <TokenLoadingCard />
                </>
              ) : tokensData?.length > 0 ? (
                tokensData?.map((token, index) => (
                  <Fade>
                    <TokenCard
                      key={index}
                      tokenName={token.tokenName}
                      tokenSymbol={token.tokenSymbol}
                      tokenOwner={token.tokenOwner}
                      tokenDecimals={token.tokenDecimals}
                      tokenTokenSupply={token.tokenTotalSupply}
                      typeOfToken={token.typeOfToken}
                      address={token.address}
                      hashData={ipfsFetched[index]?.data}
                      id={token.id}
                      isOwner={token.isOwner}
                      tokenCreatedAt={token.tokenCreatedAt}
                      tokenDeployer={token.tokenDeployer}
                    />
                  </Fade>
                ))
              ) : location?.state?.newlyCreated ? null : (
                <div className="mt-10 desktop:mt-16 text-gray-600 text-paragraph-1 desktop:text-subheading twok:text-heading-2 font-semibold leading-heading-2 w-full">
                  <div className="flex justify-center w-full">
                    <img
                      src={NoTokensMinted}
                      className="block w-48 desktop:w-64 twok:w-80"
                      alt="no tokens"
                    />
                  </div>
                  <div className="text-center flex justify-center flex-col items-center mt-10">
                    <div>Sorry, nothing to show here!</div>
                    <div
                      onClick={() => history.push("/")}
                      className="mt-6 desktop:mt-10 create-button text-white text-paragraph-2 desktop:text-paragraph-1 twok:text-subheading tracking-wider px-4 twok:px-6 py-1 desktop:py-2.5 twok:py-4 rounded-xl desktop:rounded-2xl cursor-pointer"
                    >
                      Begin Minting Now
                    </div>
                  </div>
                </div>
              )}
              <Fade>
                {tokensData !== -1 &&
                  ipfsLoaded &&
                  location?.state?.newlyCreated &&
                  !newCardLoaded &&
                  extraCard}
              </Fade>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default MyTokens;
