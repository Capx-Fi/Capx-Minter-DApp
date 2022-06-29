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
import { getGraphFetch } from "../../constants/getChainConfig";
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

  const extraCard = (
    <div className="token_card">
      <div className="herocontainer border border-lightGrayBorder flex flex-col gap-y-2 px-14 py-10 w-27v rounded-2xl bg-opacity-30 mt-10 relative">
        <div className="w-full flex items-center">
          <div className="font-bold text-heading-2 leading-heading-2 mt-4">
            Token not found?
          </div>
        </div>
        <div>
          <div className="mt-16 mb-1.5 h-16 flex items-center font-semibold text-subheading tracking-tight leading-subheading">
            <div className="w-10/12">
              If you have just minted your token, please allow some time for it
              to reflect.
            </div>
          </div>
        </div>
        <a>
          <div className="w-full mt-32">
            <div
              onClick={() => {
                setTokensData(-1);
                setReload(!reload);
                window.scrollTo(0, 0);
              }}
              className={`bg-capxGreen create-button rounded-xl mt-10 justify-center items-center flex px-4 py-3 w-full cursor-pointer`}
            >
              <div
                className={`text-white button_text twok:text-paragraph-1 twok:leading-paragraph-1 font-semibold`}
              >
                {"Reload"}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      if (active) {
        let result = null;
        if(chainId?.toString() === ACALA_CHAIN_ID.toString()) {
          result = await fetchTokensForAddress(
            account,
            getGraphFetch(chainId),
            ERC20_ABI,
          );
        } else {
          result = await queryTokenForAddress(
            account,
            getGraphFetch(chainId),
            ERC20_ABI,
          );
        }
        console.log("MyTokens",result);
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
          <Header createButton={true} />
          <div
            className={`maincontainer text-black flex flex-col justify-center m-auto mt-auto px-24 py-32`}
          >
            <div className="text-40px leading-lh-64 font-bold tracking-tight mt-4 w-full">
              My Tokens
            </div>
            <div className="flex flex-wrap gap-x-16 gap-y-6">
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
                <div className="mt-16 text-gray-600 text-heading-2 font-semibold leading-heading-2 w-full">
                  <div className="flex justify-center w-full">
                    <img
                      src={NoTokensMinted}
                      className="block w-80"
                      alt="no tokens"
                    />
                  </div>
                  <div className="text-center flex justify-center flex-col items-center mt-10">
                          <div>Sorry, nothing to show here!</div>
                          <div onClick={() => history.push('/')} className="mt-10 create-button text-white text-subheading tracking-wider px-6 py-4 rounded-2xl cursor-pointer">Begin Minting Now</div>
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
