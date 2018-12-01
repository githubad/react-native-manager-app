import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import ReduxThunk from "redux-thunk";
import LoginForm from './components/LoginForm';
import  firebase from 'firebase';
import Router from './Router';


class App extends Component {

    componentDidMount() {
        // const firebase  =  require('firebase');
        firebase.initializeApp({
                apiKey: "AIzaSyDHOwJbWurN8oubr-NuYJyYjj0RvmUmRy4",
                authDomain: "manager-ef666.firebaseapp.com",
                databaseURL: "https://manager-ef666.firebaseio.com",
                projectId: "manager-ef666",
                storageBucket: "manager-ef666.appspot.com",
                messagingSenderId: "323017521708"
              });
    }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return(
            <React.Fragment>
            <Provider store={store}>
                <Router />
            </Provider>
            </React.Fragment>
        );
    }
}

export default App;