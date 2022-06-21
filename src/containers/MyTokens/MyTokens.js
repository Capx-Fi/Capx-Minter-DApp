import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./MyTokens.scss";
import { useWeb3React } from "@web3-react/core";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import TokenCard from "../../components/TokenCard/TokenCard";
import TokenLoadingCard from "../../components/TokenCard/TokenLoadingCard";
import React, { useState, useEffect } from "react";
import { queryTokenForAddress } from "../../contracts/queryToken";
import { queryTokenForAddressTypes } from "../../contracts/queryTypesOfToken";
import { ERC20_ABI } from "../../contracts/ERC20Token";
import Fade from "react-reveal/Fade";
import { Link, useHistory, useLocation } from "react-router-dom";


const MyTokens = () => {
  const history = useHistory();
  const { active, account, chainId } = useWeb3React();
  const [tokensData, setTokensData] = useState(-1);
  const [ipfsFetched, setIpfsFetched] = useState([]);
  const [ipfsLoaded, setIpfsLoaded] = useState(false);
  const location = useLocation();
  const [reload, setReload] = useState(false);

  const extraCard = (
      <div className="token_card">
        <div className="herocontainer flex flex-col gap-y-2 px-14 py-10 w-27v rounded-2xl bg-opacity-30 mt-10 relative">
          <div className="w-full flex items-center">
            <div className="font-bold text-heading-2 leading-heading-2 mt-4">
              Token not found?
            </div>
          </div>
          <div>
            <div className="mt-16 mb-1.5 h-16 flex items-center font-semibold text-subheading tracking-tight leading-subheading">
              <div className="w-10/12">
                If you have just minted your token, please allow some time for it to reflect. 
              </div>
            </div>
          </div>
          <a>
            <div className="w-full mt-32">
            <div
              onClick={() => { setTokensData(-1); setReload(!reload); window.scrollTo(0, 0); }}
                className={`bg-capxGreen create-button rounded-xl mt-10 justify-center items-center flex px-4 py-3 w-full cursor-pointer`}
              >
                <div
                  className={`text-black button_text twok:text-paragraph-1 twok:leading-paragraph-1 font-semibold`}
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
        let result = await queryTokenForAddress(
          account,
          "https://api.thegraph.com/subgraphs/name/varun-capx/tokenminter",
          ERC20_ABI,
          tokensData,
          setTokensData
        );

        let ipfsStatus = [];
        result?.forEach(() => {
          ipfsStatus.push({ fetched: false });
        });
        console.log(result);
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
      console.log("TRYING HASH", tokensData[index].documentHash);
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
            <div className="flex flex-wrap gap-x-16">
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
              ) : (
                <div className="mt-20 text-gray-600 text-heading-2 font-semibold leading-heading-2">
                  No tokens here! If you have just created it, please wait for
                  it to reflect.
                </div>
              )}
              <Fade>
                {tokensData !== -1 &&
                  ipfsLoaded &&
                  location?.state?.newlyCreated &&
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
