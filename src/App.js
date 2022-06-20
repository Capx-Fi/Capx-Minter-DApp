import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "./containers/LoadingScreen";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import MainForm from "./containers/MainForm/MainForm";
import MyTokens from "./containers/MyTokens/MyTokens";
import TokenInfo from "./containers/TokenInfo/TokenInfo";
import { queryTokenForAddressTypes } from "./contracts/queryTypesOfToken";

function App() {
  const [loading, setLoading] = useState(true);
  const [tokensData, setTokensData] = useState(-1);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const parseId = (hex) => {
    const decimal =
      parseInt(hex, 16) < 10 ? "0" + parseInt(hex, 16) : parseInt(hex, 16);

    if (parseInt(hex, 16) < 9) {
      return "f" + decimal;
    }
    return "s" + decimal;
  };

  useEffect(() => {
    async function fetchDataTypes() {
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
      console.log("FPRMATTED", formattedTokenTypes);
      setTokensData(formattedTokenTypes);
    }
    fetchDataTypes();
  }, []);

  return (
    <>
      {loading || tokensData === -1 ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              <MainForm tokenTypeData={tokensData} />
            </Route>
            <Route exact path="/tokens">
              <MyTokens tokenTypeData={tokensData} />
            </Route>
            <Route exact path="/tokenInformation">
              <TokenInfo tokenTypeData={tokensData} />
            </Route>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
