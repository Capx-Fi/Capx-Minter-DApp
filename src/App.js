import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "./containers/LoadingScreen";
import PageNotFound from "./containers/PageNotFound/PageNotFound";
import Main from "./containers/Main/Main";
import MyTokens from "./containers/MyTokens/MyTokens";
import TokenInfo from "./containers/TokenInfo/TokenInfo";
import fetchTokenTypes from "./utils/fetchTokenTypes";

function App() {
  const [loading, setLoading] = useState(true);
  const [tokensData, setTokensData] = useState(-1);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    fetchTokenTypes(setTokensData);
  }, []);

  return (
    <>
      {loading || tokensData === -1 ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              <Main tokenTypeData={tokensData} />
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
