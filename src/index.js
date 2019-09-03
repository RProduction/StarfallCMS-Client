import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {HashRouter} from 'react-router-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './redux/reducers';
import App from './App';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const store = createStore(
    reducers, 
    applyMiddleware(thunk)
);

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
    },
    palette:{
        primary: {
            main: '#a6e0ed'
        },
        secondary: {
            main: '#56db96'
        },
        error: {
            main: '#c91448'
        },
        background:{
            dark:{
                light: '#555954',
                main: '#444743',
                dark: '#2c2e2c'
            },
            light:{
                light: '#f5f5f5',
                main: '#ededed',
                dark: '#e6e6e6'
            }
        },
        tonalOffset:  0.2,
        contrastThreshold: 3
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
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root')
);

serviceWorker.unregister();