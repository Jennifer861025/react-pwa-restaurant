// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.6/firebase-app-compat.js',
);
// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.6/firebase-messaging-compat.js',
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyBu8-dnZer9Ed8in2xSEQfsLrTmuoiFeCU',
  authDomain: 'pwa-test-2b29e.firebaseapp.com',
  projectId: 'pwa-test-2b29e',
  storageBucket: 'pwa-test-2b29e.appspot.com',
  messagingSenderId: '32448537290',
  appId: '1:32448537290:web:10ab32e021aea485ee8a33',
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
var click_action;

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };
  click_action =
    notificationTitle == '用餐時間到'
      ? 'https://react-pwa-restaurant-23ljkveff-jennifer861025.vercel.app/checkout'
      : 'https://react-pwa-restaurant-23ljkveff-jennifer861025.vercel.app/waiting';
  // click_action =
  //   notificationTitle == '用餐時間到'
  //     ? 'http://localhost:3000/checkout'
  //     : 'http://localhost:3000/waiting';
  // console.log('click_action1:' + JSON.stringify(payload.data));

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

// 監聽notifiction點擊事件
self.addEventListener('notificationclick', function (event) {
  console.log('click_action2:' + click_action);
  var url = click_action;
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({
        type: 'window',
      })
      .then((windowClients) => {
        // 如果tab是開著的，就 focus 這個tab
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        // 如果沒有，就新增tab
        if (self.clients.openWindow) {
          return self.clients.openWindow(click_action);
        }
      }),
  );
});
