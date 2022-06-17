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


const MyTokens = () => {
  const { active, account, chainId } = useWeb3React();
  const [tokensData, setTokensData] = useState(-1);

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

        setTokensData(result);
      }
    }

    async function fetchDataTypes() {
      if (active) {
        let result = await queryTokenForAddressTypes(
          "https://api.thegraph.com/subgraphs/name/varun-capx/tokenminter"
        );
        console.log("RESULT2", result);
      }
    }
    fetchData();

    // fetchDataTypes();
  }, [active]);

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
              {tokensData === -1 ? (
                <>
                  <TokenLoadingCard />
                  <TokenLoadingCard />
                  <TokenLoadingCard />
                </>
              ) : (
                tokensData?.map((token, index) => (
                  <TokenCard
                  key={index}
                  tokenName={token.tokenName}
                  tokenSymbol={token.tokenSymbol}
                  tokenOwner={token.tokenOwner}
                  tokenDecimals={token.tokenDecimals}
                  tokenTokenSupply={token.tokenTotalSupply}
                  typeOfToken={token.typeOfToken}
                  address={token.address}
                  documentHash={token.documentHash}
                  id={token.id}
                  isOwner={token.isOwner}
                  tokenCreatedAt={token.tokenCreatedAt}
                  tokenDeployer={token.tokenDeployer}
                  />
                ))
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
