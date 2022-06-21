import { queryTokenForAddressTypes } from "./queryTypesOfToken";

const parseId = (hex) => {
  const decimal =
    parseInt(hex, 16) < 10 ? "0" + parseInt(hex, 16) : parseInt(hex, 16);

  if (parseInt(hex, 16) < 9) {
    return "f" + decimal;
  }
  return "s" + decimal;
};

async function fetchTokenTypes(setTokensData) {
  let result = await queryTokenForAddressTypes(
    "https://api.thegraph.com/subgraphs/name/varun-capx/tokenminter"
  );
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
