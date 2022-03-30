// import firebase from 'firebase/compat/app';
// import 'firebase/compat/messaging';
// import 'firebase/compat/firestore';
// // INITIALIZE FIREBASE

// const firebaseConfig = {
//   apiKey: 'AIzaSyBu8-dnZer9Ed8in2xSEQfsLrTmuoiFeCU',
//   authDomain: 'pwa-test-2b29e.firebaseapp.com',
//   databaseURL: 'https://pwa-test-2b29e.firebaseio.com',
//   projectId: 'pwa-test-2b29e',
//   storageBucket: 'pwa-test-2b29e.appspot.com',
//   messagingSenderId: '32448537290',
//   appId: '1:32448537290:web:10ab32e021aea485ee8a33',
//   measurementId: 'G-CEGH7KFKDG',
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();
// const db = firebase.firestore();
// const publicKey =
//   'BM7URgDJ9fmLB1neUbvTX0nlYAM2-n2K8zqD6PgLsO2vRF6-5TuNC0ysNMDpboGOJXBXDm3YcT0Qjlm3yd5FzZY';
// export const getToken = async (setTokenFound) => {
//   let currentToken = '';
//   try {
//     currentToken = await messaging.getToken({ vapidKey: publicKey });
//     if (currentToken) {
//       console.log('token : ' + currentToken);
//       setTokenFound(true);
//     } else {
//       setTokenFound(false);
//     }
//   } catch (error) {
//     console.log('An error occurred while retrieving token.', error);
//   }
//   return currentToken;
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });

// export const getUser = async () => {
//   const usersDoc = await db.collection('users').doc('0900000000').get();
//   if (usersDoc.exists) {
//     console.log(usersDoc.data());
//     // console.log(usersDoc.getCollections());
//   } else {
//     db.collection('users').doc('1').set({
//       name: '郭曉真',
//     });
//   }
// };

// export const getCoupon = async () => {
//   var couponArray = [];
//   const coupon = await db
//     .collection('users')
//     .doc('1')
//     .collection('coupon')
//     .get();
//   console.log(coupon.docs.length);
//   const couponLength = coupon.docs.length;
//   if (couponLength == 0) {

//   } else {
//     var couponCount = 0;
//     coupon.docs.map((x) => {
//       couponArray.push(x.data());
//       couponCount += 1;
//       if (couponCount == couponLength) {
//         console.log('finish');
//       }
//     });
//   }

//   // console.log(couponArray);
// };

// // useEffect(() => {
// //   console.log('aaa');
// //   messaging
// //     .requestPermission()
// //     .then(() => {
// //       return messaging.getToken();
// //     })
// //     .then((data) => {
// //       console.warn('token', data);
// //     });
// // }, []);

// // messaging.usePublicVapidKey(process.env.REACT_APP_VAPID_KEY);
