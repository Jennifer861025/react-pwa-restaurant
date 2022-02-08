import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
// INITIALIZE FIREBASE

const firebaseConfig = {
  apiKey: 'AIzaSyBu8-dnZer9Ed8in2xSEQfsLrTmuoiFeCU',
  authDomain: 'pwa-test-2b29e.firebaseapp.com',
  projectId: 'pwa-test-2b29e',
  storageBucket: 'pwa-test-2b29e.appspot.com',
  messagingSenderId: '32448537290',
  appId: '1:32448537290:web:10ab32e021aea485ee8a33',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
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

// useEffect(() => {
//   console.log('aaa');
//   messaging
//     .requestPermission()
//     .then(() => {
//       return messaging.getToken();
//     })
//     .then((data) => {
//       console.warn('token', data);
//     });
// }, []);

// messaging.usePublicVapidKey(process.env.REACT_APP_VAPID_KEY);
