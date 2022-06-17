import BigNumber from "bignumber.js";
import Web3 from "web3";
import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const queryTokenForAddress = async (
    accountAddress,
    factoryURL,
    ERC20_ABI,
    tokensData,
    setTokensData
) => {
    // Start Loading
    const client = new ApolloClient({
        uri: factoryURL,
        cache: new InMemoryCache(),
    });

    const query = `query {
        tokenDeployeds {
            id
            typeOfToken
            tokenName
            tokenSymbol
            tokenDecimals
            tokenTotalSupply
            tokenDeployer
            tokenCreatedAt
            documentHash
          }
    }`

    try {
        const { data } = await client.query({
            query: gql`${query}`,
        });

        const web3 = new Web3(Web3.givenProvider);

        console.log("data", data);

        let toReturn = [];

        for (let i = 0; i < data.tokenDeployeds.length; i++) {
            const token = data.tokenDeployeds[i];

            let contract = new web3.eth.Contract(ERC20_ABI, token["id"]);
            let result = await contract.methods.owner().call();
            let tokenTemp = { ...token };
            tokenTemp["tokenOwner"] = result;
            tokenTemp["address"] = tokenTemp["id"];
            console.log("ADDRESSES", tokenTemp.tokenOwner, accountAddress);
            if (tokenTemp["tokenOwner"] === accountAddress) {
              tokenTemp["isOwner"] = true;
              toReturn.push(tokenTemp);
            } else if (tokenTemp["tokenDeployer"] === accountAddress) {
              tokenTemp["isOwner"] = false;
              toReturn.push(tokenTemp);
            }
        }

        return toReturn;
        
    } catch (error) {
        console.error("Query token error: ", error);
    }
}