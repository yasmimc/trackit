import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Habits from "../Habits/Habits";
import Today from "../Today/Today";
import History from "../History/History";

import UserContext from "../../contexts/UserContext";
import HabitsContext from "../../contexts/HabitsContext";
import { useState } from "react";

import "../App/App.css";

function App() {
	const [loggedUser, setLoggedUser] = useState(null);

    const [percentage, setPercentage] = useState(0);

	
	return (
		<UserContext.Provider value={{loggedUser, setLoggedUser}}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact>
						<Login></Login>
					</Route>
					<Route path="/cadastro" exact>
						<Register></Register>
					</Route>
					<HabitsContext.Provider value={{ percentage, setPercentage }}>
					<Route path="/habitos" exact>
						<Habits></Habits>
					</Route>
					<Route path="/hoje" exact>
						<Today></Today>
					</Route>
					<Route path="/historico" exact>
						<History></History>
					</Route>
					</HabitsContext.Provider>
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
