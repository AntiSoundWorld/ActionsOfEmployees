import React from 'react';
import ReactDOM from 'react-dom';

import '@atlaskit/css-reset';
import App from './app';
import Page from './components/page/js/Page';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
