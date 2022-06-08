import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "./containers/LoadingScreen";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import MainForm from "./containers/MainForm/MainForm";
import MyTokens from "./containers/MyTokens/MyTokens";
import TokenInfo from "./containers/TokenInfo/TokenInfo";

function App() {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => setLoading(false), 1500);
	}, []);

	return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={MainForm} />
            <Route exact path="/tokens" component={MyTokens} />
            <Route exact path="/tokenOne" component={TokenInfo} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
