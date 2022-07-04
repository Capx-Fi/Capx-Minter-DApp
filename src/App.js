import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "./containers/LoadingScreen";
import PageNotFound from "./containers/PageNotFound/PageNotFound";
import Main from "./containers/Main/Main";
import MyTokens from "./containers/MyTokens/MyTokens";
import TokenInfo from "./containers/TokenInfo/TokenInfo";
import fetchTokenTypes from "./utils/fetchTokenTypes";
import Header from "./components/Header/Header";
import BreakPoint from "./containers/Breakpoint";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [tokensData, setTokensData] = useState(-1);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <div className="hidden screen:block">
            <Switch>
              <Route exact path="/">
                <Main
                  tokenTypeData={tokensData}
                  setTokensData={setTokensData}
                />
              </Route>
              <Route exact path="/tokens">
                <MyTokens />
              </Route>
              <Route exact path="/tokenInformation">
                <TokenInfo tokenTypeData={tokensData} />
              </Route>
              <Route path="*" component={PageNotFound} />
            </Switch>
          </div>
          <div className="screen:hidden">
            <Header landing={true} />
            <BreakPoint />
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
