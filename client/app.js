import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import Notifier from './components/notifier';
import {SnackbarProvider} from 'notistack';

const App = () => {
	return (
		<div>
			<SnackbarProvider maxSnack={5}>
				<Notifier />
			</SnackbarProvider>
			<Navbar />
			<Routes />
		</div>
	);
};

export default App;
