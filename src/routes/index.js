import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { StoreProvider } from '../store/reducer';

import path from '../utils/path';
import Notifications from '../components/Notifications/Notifications';
import ReactNotificationComponent from '../components/Notifications/ReactNotification';
import { onMessageListener } from '../api';

// import HomePage from '../layouts/Home';
import BookingConfirmPage from '../layouts/BookingConfirm';
import ReservationInfo from '../layouts/ReservationInfo';
import TableNumInfo from '../layouts/TableNumInfo';
import NoReserved from '../layouts/NoReserved';
import Waiting from '../layouts/Waiting';
import Menu from '../layouts/Menu';
import PricePlan from '../layouts/PricePlan';

const Routes = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  console.log(show, notification);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log('failed: ', err));
  return (
    <StoreProvider>
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notifications />
      <Router>
        <Switch>
          {/* 首頁
          <Route exact path={path.home} component={HomePage} /> */}
          {/* 確認訂位 */}
          <Route
            exact
            path={path.bookingConfirm}
            component={BookingConfirmPage}
          />
          {/* 訂位資訊 */}
          <Route
            exact
            path={path.reservationInfo}
            component={ReservationInfo}
          />
          {/* 桌號資訊 */}
          <Route exact path={path.tableNumInfo} component={TableNumInfo} />
          {/* 登記候位 */}
          <Route exact path={path.noReserved} component={NoReserved} />
          {/* 等待叫號*/}
          <Route exact path={path.waiting} component={Waiting} />
          {/* 菜單 */}
          <Route exact path={path.menu} component={Menu} />
          {/* 價格方案 */}
          <Route exact path={path.pricePlan} component={PricePlan} />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default Routes;
