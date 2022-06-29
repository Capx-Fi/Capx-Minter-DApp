import {ACALA_CHAIN_ID} from "../constants/config";
import { getGraphFetch } from "../constants/getChainConfig";
import { queryTokenForAddressTypes } from "./queryTypesOfToken";
import { queryTokensForAcala } from "./acalaEVM/fetchTypesOfToken";

const parseId = (hex) => {
  const decimal =
    parseInt(hex, 16) < 10 ? "0" + parseInt(hex, 16) : parseInt(hex, 16);

  if (parseInt(hex, 16) < 9) {
    return "f" + decimal;
  }
  return "s" + decimal;
};

async function fetchTokenTypes(setTokensData, chainId) {
  console.log("GRAPH_URL", getGraphFetch(chainId));
  let result =null;
  if(chainId?.toString() === ACALA_CHAIN_ID.toString()){
    result = await queryTokensForAcala(
      getGraphFetch(chainId)
    );
  } else {
    result = await queryTokenForAddressTypes(
      getGraphFetch(chainId)
    );
  }
  const formattedTokenTypes = result.map((tokenType) => {
    return {
      id: parseId(tokenType.id),
      name: tokenType.name,
      description: "Token Description",
      features: {
        "ERC 20 Compliant": tokenType["ERC_20_Compliant"],
        Mintable: tokenType.Mintable,
        "Liquidity Generator": tokenType["Liquidity_Generator"],
        "Verified Source Code": tokenType["Verified"],
        Burnable: tokenType.Burnable,
        "Donation (Charity)": tokenType["Donation_Charity"],
        Ownable: tokenType.Ownable,
        Pausable: tokenType.Pauseable,
        "Yield Generator": tokenType["Yield_Generator"],
        "Capped Total Supply": tokenType["Capped"],
        "Taxable (Burn Tax)": tokenType["Taxable"],
      },
      advancedFeatures: tokenType.advancedFeatures,
    };
  });
  formattedTokenTypes.sort((a, b) => {
    return a.id.localeCompare(b.id);
  });
  setTokensData(formattedTokenTypes);
}

export default fetchTokenTypes;
