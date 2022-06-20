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

const MyTokens = () => {
  const { active, account, chainId } = useWeb3React();
  const [tokensData, setTokensData] = useState(-1);
  const [ipfsFetched, setIpfsFetched] = useState([]);
  const [ipfsLoaded, setIpfsLoaded] = useState(false);

  

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

  }, [active]);

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
              ) : (
                tokensData?.length > 0 ? tokensData?.map((token, index) => (
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
                )) : <div className="mt-20 text-gray-600 text-heading-2 font-semibold leading-heading-2">No tokens here! If you have just created it, please wait for it to reflect.</div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default MyTokens;
