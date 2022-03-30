import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';

import {
  SET_COUPON,
  BEGIN_DATA_REQUEST,
  SUCCESS_DATA_REQUEST,
  FAIL_DATA_REQUEST,
} from './actionType';

const firebaseConfig = {
  apiKey: 'AIzaSyBu8-dnZer9Ed8in2xSEQfsLrTmuoiFeCU',
  authDomain: 'pwa-test-2b29e.firebaseapp.com',
  databaseURL: 'https://pwa-test-2b29e.firebaseio.com',
  projectId: 'pwa-test-2b29e',
  storageBucket: 'pwa-test-2b29e.appspot.com',
  messagingSenderId: '32448537290',
  appId: '1:32448537290:web:10ab32e021aea485ee8a33',
  measurementId: 'G-CEGH7KFKDG',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const db = firebase.firestore();
const userRef = db.collection('users');
const publicKey =
  'BM7URgDJ9fmLB1neUbvTX0nlYAM2-n2K8zqD6PgLsO2vRF6-5TuNC0ysNMDpboGOJXBXDm3YcT0Qjlm3yd5FzZY';

export const getToken = async (setTokenFound) => {
  let currentToken = '';
  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      console.log('token : ' + currentToken);
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log('An error occurred while retrieving token.', error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export const getUser = async () => {
  const usersDoc = await userRef.doc('0900000000').get();
  if (usersDoc.exists) {
    console.log(usersDoc.data());
    // console.log(usersDoc.getCollections());
  } else {
    userRef.doc('1').set({
      name: '郭曉真',
    });
  }
};

export const getCoupon = async (dispatch, option) => {
  const { phone } = option;
  var couponArray = [];
  dispatch({ type: BEGIN_DATA_REQUEST });
  try {
    const coupon = await userRef.doc(phone).collection('coupon').get();
    const couponLength = coupon.docs.length;
    if (couponLength == 0) {
      dispatch({ type: SET_COUPON, payload: couponArray });
      dispatch({ type: SUCCESS_DATA_REQUEST });
    } else {
      var couponCount = 0;
      coupon.docs.map((x) => {
        couponArray.push(x.data());
        couponArray.sort(function (a, b) {
          return a.couponValue - b.couponValue;
        });
        couponCount += 1;
        if (couponCount == couponLength) {
          dispatch({ type: SET_COUPON, payload: couponArray });
          dispatch({ type: SUCCESS_DATA_REQUEST });
        }
      });
    }
  } catch (err) {
    dispatch({ type: FAIL_DATA_REQUEST });
  }
};

export const setCoupon = async (option) => {
  const { phone, couponValue, deadline } = option;
  try {
    const coupon = await userRef.doc(phone).collection('coupon').add({
      couponValue: couponValue,
      deadline: deadline,
    });
    await userRef.doc(phone).collection('coupon').doc(coupon.id).set(
      {
        id: coupon.id,
      },
      { merge: true },
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteCoupon = async (option) => {
  const { phone, couponId } = option;
  try {
    await userRef.doc(phone).collection('coupon').doc(couponId).delete();
    console.log('Coupon successfully deleted!');
  } catch (err) {
    console.log(err);
  }
};
