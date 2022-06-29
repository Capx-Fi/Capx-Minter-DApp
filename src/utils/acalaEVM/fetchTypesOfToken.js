import BigNumber from "bignumber.js";
import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const queryTokensForAcala = async (
    factoryURL,
) => {
    // Start Loading
    const client = new ApolloClient({
        uri: factoryURL,
        cache: new InMemoryCache(),
    });

    const query = `
    query {
        eRC20Implementations {
            nodes {
                id
                address
                name
                eRC20Compliant
                ownable
                verified
                mintable
                burnable
                capped
                pauseable
                yieldGenerator
                taxable
                liquidityGenerator
                donationCharity
                advancedFeatures
            }
        }
    }`;
    try {
        const {data} = await client.query({
            query: gql`${query}`,
        });
        let xdata = [];
        let standard = {
            "id": "0x1",
            "address": "0x91986C22d06f62878B43322Fe49d19135b29E202",
            "name": "Standard Token",
            "ERC_20_Compliant": true,
            "Ownable": true,
            "Verified": true,
            "Mintable": false,
            "Burnable": false,
            "Capped": false,
            "Pauseable": false,
            "Yield_Generator": false,
            "Taxable": false,
            "Liquidity_Generator": false,
            "Donation_Charity": false,
            "advancedFeatures": "10000000"
        }
        xdata = data.eRC20Implementations.nodes.map(async(type) => {
            return {
                id: type.id,
                address: type.address,
                name: type.name,
                ERC_20_Compliant: type.eRC20Compliant,
                Ownable: type.ownable,
                Verified: type.verified,
                Mintable: type.mintable,
                Burnable: type.burnable,
                Capped: type.capped,
                Pauseable: type.pauseable,
                Yield_Generator: type.yieldGenerator,
                Taxable: type.taxable,
                Liquidity_Generator: type.liquidityGenerator,
                Donation_Charity: type.donationCharity,
                advancedFeatures: type.advancedFeatures
            }
        });
        xdata = await Promise.all(xdata);
        xdata.push(standard);

        return xdata;
    } catch (error) {
        console.error("Query token error: ", error);
    }

}