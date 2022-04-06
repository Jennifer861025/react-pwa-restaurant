import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';

import {
  SET_USER,
  SET_RESERVATION_DATA,
  SET_WAITNUM,
  SET_COUPON,
  SET_MEALHABIT,
  GET_MEALHABIT_FINISH,
  SET_USER_HISTORY,
  SET_USER_HISTORY_DETAIL,
  BEGIN_DATA_REQUEST,
  SUCCESS_DATA_REQUEST,
  FAIL_DATA_REQUEST,
  CANT_FIND_DATA,
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
const waitListRef = db.collection('waitingList');
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

export const getUser = async (dispatch, option) => {
  const { phone = '', name = '' } = option;
  const userdata = { 'name': name, 'phone': phone };
  dispatch({ type: BEGIN_DATA_REQUEST });
  try {
    const usersDoc = await userRef.doc(phone).get();
    if (usersDoc.exists) {
      if (usersDoc.data().name == name) {
        console.log('User already set');
        dispatch({
          type: SET_USER,
          payload: userdata,
        });
        dispatch({ type: SUCCESS_DATA_REQUEST });
      } else {
        alert('已是會員，但資料輸入錯誤！！');
        dispatch({ type: CANT_FIND_DATA });
      }
    } else {
      await userRef.doc(phone).set({
        name: name,
      });
      dispatch({
        type: SET_USER,
        payload: userdata,
      });
      dispatch({ type: SUCCESS_DATA_REQUEST });
      console.log('User successfully set!');
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: FAIL_DATA_REQUEST });
  }
};

export const getReservation = async (dispatch, option) => {
  const { phone = '', reservationNum = '' } = option;
  dispatch({ type: BEGIN_DATA_REQUEST });
  try {
    const reservationData = await userRef
      .doc(phone)
      .collection('reservation')
      .doc(reservationNum)
      .get();
    if (reservationData.exists) {
      dispatch({
        type: SET_RESERVATION_DATA,
        payload: reservationData.data(),
      });
      dispatch({ type: SUCCESS_DATA_REQUEST });
      localStorage.setItem(
        'reservationData',
        JSON.stringify(reservationData.data()),
      );
    } else {
      alert('查無此訂單');
      dispatch({ type: CANT_FIND_DATA });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: FAIL_DATA_REQUEST });
  }
};

export const getWaitList = async (dispatch) => {
  const waitArray = [];
  var waitListCount = 0;
  dispatch({ type: BEGIN_DATA_REQUEST });
  try {
    const waitList = await waitListRef.get();
    const waitListlength = waitList.docs.length;
    waitList.docs.map((x) => {
      waitArray.push(Number(x.id));
      waitArray.sort(function (a, b) {
        return a - b;
      });
      waitListCount += 1;
      if (waitListCount == waitListlength) {
        const waitData = {
          'waitNum': waitArray[waitListlength - 1] - waitArray[0] + 1,
          'waitLastNum': waitArray[waitListlength - 1],
        };
        dispatch({
          type: SET_WAITNUM,
          payload: waitData,
        });
        localStorage.getItem('waitData')
          ? localStorage.getItem('waitData')
          : localStorage.setItem('waitData', JSON.stringify(waitData));
        dispatch({ type: SUCCESS_DATA_REQUEST });
        console.log('finish');
      }
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: FAIL_DATA_REQUEST });
  }
};

export const setWaitList = async (option) => {
  const { waitLastNum, name, phone, date, peopleNum } = option;
  const docId = waitLastNum + 1;
  try {
    await waitListRef.doc(String(docId)).set({
      name: name,
      phone: phone,
      peopleNum: peopleNum,
    });
    const tableNum = Math.floor(Math.random() * 100);
    const userReservation = await userRef
      .doc(phone)
      .collection('reservation')
      .add({
        date: date,
        peopleNum: peopleNum,
        tableNum: tableNum,
      });
    await userRef
      .doc(phone)
      .collection('reservation')
      .doc(userReservation.id)
      .set(
        {
          reservationId: userReservation.id,
        },
        { merge: true },
      );
    const userReservationData = {
      'date': date,
      'peopleNum': peopleNum,
      'tableNum': tableNum,
      'reservationId': userReservation.id,
    };
    localStorage.setItem(
      'reservationData',
      JSON.stringify(userReservationData),
    );
    localStorage.setItem('phone', phone);
    console.log('setWaitList Finish!');
  } catch (err) {
    console.log(err);
  }
};

export const deleteWaitList = async (dispatch, option) => {
  const { phone, waitLastNum, reservationId } = option;
  dispatch({ type: BEGIN_DATA_REQUEST });
  try {
    await waitListRef.doc(String(waitLastNum)).delete();
    await userRef
      .doc(String(phone))
      .collection('reservation')
      .doc(String(reservationId))
      .delete();
    dispatch({
      type: SUCCESS_DATA_REQUEST,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: FAIL_DATA_REQUEST });
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

export const setUserHabit = async (dispatch, option) => {
  const { phone, meatHabit = [], seafoodHabit = [], seatHabit = [] } = option;
  dispatch({ type: BEGIN_DATA_REQUEST });
  try {
    await userRef.doc(phone).collection('habits').doc('mealHabit').set({
      meat: meatHabit,
      allergy: seafoodHabit,
    });
    await userRef.doc(phone).collection('habits').doc('seatHabit').set({
      seat: seatHabit,
    });
    dispatch({ type: GET_MEALHABIT_FINISH });
    dispatch({ type: SUCCESS_DATA_REQUEST });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_MEALHABIT_FINISH });
    dispatch({ type: FAIL_DATA_REQUEST });
  }
};

export const getUserHabit = async (dispatch, option) => {
  const { phone } = option;
  var habitData = {
    'meat': [],
    'allergy': [],
    'seat': [],
  };
  dispatch({ type: BEGIN_DATA_REQUEST });
  try {
    const mealHabit = await userRef
      .doc(phone)
      .collection('habits')
      .doc('mealHabit')
      .get();
    const seatHabit = await userRef
      .doc(phone)
      .collection('habits')
      .doc('seatHabit')
      .get();
    console.log(mealHabit.data());
    console.log(seatHabit.data());
    if (mealHabit.data() !== undefined && seatHabit.data() !== undefined) {
      habitData = {
        'meat': mealHabit.data().meat,
        'allergy': mealHabit.data().allergy,
        'seat': seatHabit.data().seat,
      };
      dispatch({ type: SET_MEALHABIT, payload: habitData });
    } else if (mealHabit.data() == undefined && seatHabit.data() == undefined) {
      dispatch({ type: SET_MEALHABIT, payload: habitData });
    } else if (mealHabit.data() == undefined) {
      habitData = {
        'meat': [],
        'allergy': [],
        'seat': seatHabit.data().seat,
      };
      dispatch({ type: SET_MEALHABIT, payload: habitData });
    } else {
      habitData = {
        'meat': mealHabit.data().meat,
        'allergy': mealHabit.data().allergy,
        'seat': [],
      };
      dispatch({ type: SET_MEALHABIT, payload: habitData });
    }
    dispatch({ type: SUCCESS_DATA_REQUEST });
  } catch (err) {
    console.log(err);
    dispatch({ type: FAIL_DATA_REQUEST });
  }
};

export const setOrderDetail = async (option) => {
  const { orderDetail, tableNum } = option;
  try {
    await db.collection('orderDetail').doc(String(tableNum)).set({
      orderDetail,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setUserOrderDetail = async (option) => {
  const { phone, pricePlan, date, tableNum, peopleNum, allOrderDetail } =
    option;
  try {
    const orderDetail = await userRef.doc(phone).collection('history').add({
      allOrderDetail,
    });
    await userRef.doc(phone).collection('history').doc(orderDetail.id).set(
      {
        id: orderDetail.id,
        pricePlan: pricePlan,
        date: date,
        tableNum: tableNum,
        peopleNum: peopleNum,
      },
      { merge: true },
    );
    localStorage.setItem('historyId', orderDetail.id);
  } catch (err) {
    console.log(err);
  }
};

export const setUserTotalPrice = async (option) => {
  const { phone, historyId, totalPrice } = option;
  try {
    await userRef.doc(phone).collection('history').doc(historyId).set(
      {
        totalPrice: totalPrice,
      },
      { merge: true },
    );
  } catch (err) {
    console.log(err);
  }
};

export const getUserHistory = async (dispatch, option) => {
  const { phone } = option;
  const userHistroyArray = [];
  var userHistoryCount = 0;
  dispatch({ type: BEGIN_DATA_REQUEST });
  try {
    const userHistory = await userRef.doc(phone).collection('history').get();
    const historyLength = userHistory.docs.length;
    if (historyLength == 0) {
      dispatch({ type: SET_USER_HISTORY, payload: userHistroyArray });
      dispatch({ type: SUCCESS_DATA_REQUEST });
    } else {
      userHistory.docs.map((x) => {
        console.log(x.data());
        userHistroyArray.push(x.data());
        userHistoryCount += 1;
        if (userHistoryCount == historyLength) {
          dispatch({ type: SET_USER_HISTORY, payload: userHistroyArray });
          dispatch({ type: SUCCESS_DATA_REQUEST });
        }
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: FAIL_DATA_REQUEST });
  }
};

export const getUserHistoryDetail = async (dispatch, option) => {
  const { phone, historyId } = option;
  dispatch({ type: BEGIN_DATA_REQUEST });
  try {
    const userHistoryDetail = await userRef
      .doc(phone)
      .collection('history')
      .doc(historyId)
      .get();
    if (userHistoryDetail.exists) {
      console.log(userHistoryDetail.data());
      dispatch({
        type: SET_USER_HISTORY_DETAIL,
        payload: userHistoryDetail.data(),
      });
      dispatch({ type: SUCCESS_DATA_REQUEST });
    } else {
      dispatch({ type: SUCCESS_DATA_REQUEST });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: FAIL_DATA_REQUEST });
  }
};
