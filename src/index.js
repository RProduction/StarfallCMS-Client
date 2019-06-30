import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers/reducers';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

const store = createStore(reducers, {});

const sidebarWidth = 300;
const theme = createMuiTheme({
    sidebar: {
        width: sidebarWidth,
        flexShrink: 0
    },
    sidebarPaper: {
        width: sidebarWidth
    },
    responsive: {},
    hide: {
        display: 'none'
    }
});

theme.responsive = {
    [theme.breakpoints.up('md')]: {
        marginLeft: sidebarWidth,
        width: `calc(100% - ${sidebarWidth}px)`
    }
}

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root')
);

serviceWorker.unregister();