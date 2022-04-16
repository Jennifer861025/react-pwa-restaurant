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
          {/* 網頁首頁 */}
          <Route exact path={path.home} component={HomePage} />
          {/* 網頁訂位 */}
          <Route exact path={path.reservation} component={ReservationPage} />
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
          {/* 用餐偏好 */}
          <Route exact path={path.mealHabits} component={MealHabits} />
          {/* 點餐 */}
          <Route exact path={path.order} component={Order} />
          {/* 點餐紀錄 */}
          <Route exact path={path.orderRecord} component={OrderRecord} />
          {/* 食材介紹 */}
          <Route exact path={path.foodDetail} component={FoodDetail} />
          {/* 用餐結帳 */}
          <Route exact path={path.checkout} component={Checkout} />
          {/* 用餐意見回饋 */}
          <Route exact path={path.feedback} component={Feedback} />
          {/* 結帳選擇 */}
          <Route
            exact
            path={path.checkoutOptions}
            component={CheckoutOptions}
          />
          {/* 優惠券選擇 */}
          <Route exact path={path.couponChoose} component={CouponChoose} />
          {/* 用餐結束 */}
          <Route exact path={path.mealFinish} component={MealFinish} />
          {/* 會員 */}
          <Route exact path={path.member} component={Member} />
          {/* 消費記錄 */}
          <Route exact path={path.consumerRecord} component={ConsumerRecord} />
          {/* 消費記錄資料 */}
          <Route
            exact
            path={`${path.consumerRecord}/recordInfo`}
            component={RecordData}
          />
          {/* 優惠券 */}
          <Route exact path={path.coupon} component={Coupon} />
          {/* 偏好設定 */}
          <Route exact path={path.habitSetting} component={HabitSetting} />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default Routes;
