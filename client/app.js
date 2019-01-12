import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import Notifier from './components/notifier';

const App = () => {
	return (
		<div>
			<Notifier />
			<Navbar />
			<Routes />
		</div>
	);
};

export default App;
