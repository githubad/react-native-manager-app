import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER_SPIN } from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
// const firebase = require('firebase');

export const emailChanged = (text) => {
    // console.log('action hit');
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passChanged = (text) => {
    // console.log('pass hit');
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, pass }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_SPIN });
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(user => {
                loginUserSuccess(dispatch, user);
            }).catch(() => {
                //  console.log(error)
                firebase.auth().createUserWithEmailAndPassword(email, pass)
                    .then(user => {
                        loginUserSuccess(dispatch, user);
                    }).catch(() => loginUserFailed(dispatch));
            });
    };
};

const loginUserFailed = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAILED
    });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();
};