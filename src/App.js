import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "./containers/LoadingScreen";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import MainForm from "./containers/MainForm/MainForm";

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
						<Route path="*" component={PageNotFound} />
					</Switch>
				</Router>
			)}
		</>
	);
}

export default App;
