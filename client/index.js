import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';
import purple from '@material-ui/core/colors/purple';
import yellow from '@material-ui/core/colors/yellow';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//this creates the theme used for the theme provider
const theme = createMuiTheme({
	palette: {
		primary: {
			main: purple[700]
		},
		secondary: {
			main: yellow[500]
		}
	}
});

// establishes socket connection
import './socket';

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('app')
);
