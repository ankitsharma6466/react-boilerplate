import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

/**
 * Entry point into the application.
 *
 * Note: registerServiceWorker is optional,
 * if you don't want to use it, just comment
 * registerServiceWorker();
 */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
