import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles';
import {Provider} from "react-redux";
import {store} from "./store/store";
import App from "./App";

const theme = createTheme({
    palette: {
        primary: {
            light: '#dcedc8',
            main: '#aed581',
            dark: '#c5e1a5',
            contrastText: '#fff',
        },
        secondary: {
            light: '#8bc34a',
            main: '#8bc34a',
            dark: '#c5e1a5',
            contrastText: '#000',
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App />
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
