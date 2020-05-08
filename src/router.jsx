import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './pages/welcome';
import App from './pages/App';
import Lobby from './pages/lobby';

export default function Router() {
	
	return(
		<BrowserRouter>
			<nav>
				<h1>BARRETT EUCHRE</h1>
			</nav>
			<main id='main' role='main' className='pad-t-b-4'>
				<Switch>
					<Route path='/' exact component={Welcome} />
					<Route path='/:gamecode' exact component={Lobby} />
					<Route path='/:gamecode/:username' component={App} />
				</Switch>
			</main>
			<footer>
				<h4>By Tim Robillard</h4>
			</footer>
		</BrowserRouter>
	);
}