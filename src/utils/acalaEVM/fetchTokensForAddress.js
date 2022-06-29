import BigNumber from "bignumber.js";
import Web3 from "web3";
import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const fetchTokensForAddress = async (
    accountAddress,
    factoryURL,
    ERC20_ABI,
) => {
    // Start Loading
    const client = new ApolloClient({
        uri: factoryURL,
        cache: new InMemoryCache(),
    });

    const query = `
    query {
        tokenDeployeds {
          nodes {
            id
            typeOfToken
            tokenDeployer
            tokenCreatedAt
            tokenDocumentHash
          }
        }
    }`

    try {
        const { data } = await client.query({
            query: gql`${query}`,
        });
        console.log(data);
        const web3 = new Web3(Web3.givenProvider);
        let returnData = [];
        returnData = data.tokenDeployeds.nodes.map(async(token) => {
            let contract = new web3.eth.Contract(ERC20_ABI, token["id"]);
            let _name = await contract.methods.name().call();
            let _symbol = await contract.methods.symbol().call();
            let _decimal = await contract.methods.decimals().call();
            let _totalSupply = await contract.methods.totalSupply().call();
            let _owner = web3.utils.toChecksumAddress(await contract.methods.owner().call());
            let _account = web3.utils.toChecksumAddress(accountAddress);
            return {
                address: token.id,
                documentHash: token.tokenDocumentHash,
                id: token.id,
                isOwner: _owner === _account,
                tokenCreatedAt: token.tokenCreatedAt.toString(),
                tokenDecimals: _decimal.toString(),
                tokenDeployer: token.tokenDeployer,
                tokenName: _name,
                tokenOwner: _owner,
                tokenSymbol: _symbol,
                tokenTotalSupply: _totalSupply.toString(10),
                typeOfToken: token.typeOfToken.toString(),
            }
        })
        return returnData;
        
    } catch (error) {
        console.error("Failed to Fetch Deployed Token Details", error);
    }
}