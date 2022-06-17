import BigNumber from "bignumber.js";
import Web3 from "web3";
import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const queryTokenForAddressTypes = async (
    factoryURL,
) => {
    // Start Loading
    const client = new ApolloClient({
        uri: factoryURL,
        cache: new InMemoryCache(),
    });

    const query = `query {
        erc20Implementations {
        id
        address
        name
        ERC_20_Compliant
        Ownable
        Verified
        Mintable
        Burnable
        Capped
        Pauseable
        Yield_Generator
        Taxable
        Liquidity_Generator
        Donation_Charity
        advancedFeatures
      }
    }`
    try {
        const {data} = await client.query({
            query: gql`${query}`,
        });
        return data.erc20Implementations;
    } catch (error) {
        console.error("Query token error: ", error);
    }

}