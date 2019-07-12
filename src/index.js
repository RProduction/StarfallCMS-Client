import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

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
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root')
);

serviceWorker.unregister();