import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { StoreProvider } from '../store/reducer';

import path from '../utils/path';
import Notifications from '../components/Notifications/Notifications';
import ReactNotificationComponent from '../components/Notifications/ReactNotification';
import { onMessageListener } from '../store/action';

import HomePage from '../layouts/Home';
import ReservationPage from '../layouts/Reservation';
import BookingConfirmPage from '../layouts/BookingConfirm';
import ReservationInfo from '../layouts/ReservationInfo';
import TableNumInfo from '../layouts/TableNumInfo';
import NoReserved from '../layouts/NoReserved';
import Waiting from '../layouts/Waiting';
import Menu from '../layouts/Menu';
import PricePlan from '../layouts/PricePlan';
import MealHabits from '../layouts/MealHabits';
import Order from '../layouts/Order';
import OrderRecord from '../layouts/OrderRecord';
import FoodDetail from '../layouts/FoodDetail';
import Checkout from '../layouts/Checkout';
import Feedback from '../layouts/Feedback';
import CheckoutOptions from '../layouts/CheckoutOptions';
import CouponChoose from '../layouts/CouponChoose';
import MealFinish from '../layouts/MealFinish';
import Member from '../layouts/Member';
import ConsumerRecord from '../layouts/ConsumerRecord';
import RecordData from '../layouts/RecordData';
import Coupon from '../layouts/Coupon';
import HabitSetting from '../layouts/HabitSetting';

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
          {/* ???????????? */}
          <Route exact path={path.home} component={HomePage} />
          {/* ???????????? */}
          <Route exact path={path.reservation} component={ReservationPage} />
          {/* ???????????? */}
          <Route
            exact
            path={path.bookingConfirm}
            component={BookingConfirmPage}
          />
          {/* ???????????? */}
          <Route
            exact
            path={path.reservationInfo}
            component={ReservationInfo}
          />
          {/* ???????????? */}
          <Route exact path={path.tableNumInfo} component={TableNumInfo} />
          {/* ???????????? */}
          <Route exact path={path.noReserved} component={NoReserved} />
          {/* ????????????*/}
          <Route exact path={path.waiting} component={Waiting} />
          {/* ?????? */}
          <Route exact path={path.menu} component={Menu} />
          {/* ???????????? */}
          <Route exact path={path.pricePlan} component={PricePlan} />
          {/* ???????????? */}
          <Route exact path={path.mealHabits} component={MealHabits} />
          {/* ?????? */}
          <Route exact path={path.order} component={Order} />
          {/* ???????????? */}
          <Route exact path={path.orderRecord} component={OrderRecord} />
          {/* ???????????? */}
          <Route exact path={path.foodDetail} component={FoodDetail} />
          {/* ???????????? */}
          <Route exact path={path.checkout} component={Checkout} />
          {/* ?????????????????? */}
          <Route exact path={path.feedback} component={Feedback} />
          {/* ???????????? */}
          <Route
            exact
            path={path.checkoutOptions}
            component={CheckoutOptions}
          />
          {/* ??????????????? */}
          <Route exact path={path.couponChoose} component={CouponChoose} />
          {/* ???????????? */}
          <Route exact path={path.mealFinish} component={MealFinish} />
          {/* ?????? */}
          <Route exact path={path.member} component={Member} />
          {/* ???????????? */}
          <Route exact path={path.consumerRecord} component={ConsumerRecord} />
          {/* ?????????????????? */}
          <Route
            exact
            path={`${path.consumerRecord}/recordInfo`}
            component={RecordData}
          />
          {/* ????????? */}
          <Route exact path={path.coupon} component={Coupon} />
          {/* ???????????? */}
          <Route exact path={path.habitSetting} component={HabitSetting} />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default Routes;
