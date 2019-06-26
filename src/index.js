import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers/reducers';

const store = createStore(reducers, {});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();