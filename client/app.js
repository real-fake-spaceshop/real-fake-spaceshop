import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import Notifier from './components/notifier';
import {SnackbarProvider} from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const App = () => {
	return (
		<div>
			<SnackbarProvider
				maxSnack={5}
				action={[
					<IconButton key="close" aria-label="dismiss" color="inherit">
						<CloseIcon />
					</IconButton>
				]}>
				<Notifier />
			</SnackbarProvider>
			<Navbar />
			<Routes />
		</div>
	);
};

export default App;
