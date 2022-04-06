import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useHistory } from 'react-router-dom';
import * as QueryString from 'query-string';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import menu from '../../assets/json/menu2.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faStar } from '@fortawesome/free-solid-svg-icons';
import plan499 from '../../assets/image/499Plan.png';
import plan699 from '../../assets/image/699Plan.png';
import plan899 from '../../assets/image/899Plan.png';

const PricePlan = () => {
  const location = useLocation();
  const history = useHistory();
  const { canChoose, price } = QueryString.parse(location.search);
  const menuChoose = menu.filter((x) => x.plan == price);
  const [value, setValue] = useState('');
  const submitHandler = () => {
    localStorage.setItem('pricePlan', price);
    history.push(path.mealHabits);
  };
  const buttonHandler = (valueClick) => {
    if (valueClick !== value) {
      setValue(valueClick);
    } else {
      setValue('');
    }
  };

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{price + '方案'}</title>
        <meta name="description" content="價格方案" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={price + '方案'}
          link={`${path.menu}?canChoose=${canChoose}`}
          linkFlag={true}
        />
        <div className={styles.screenContent}>
          <div className={styles.mainContent}>
            <div className={styles.pricePlanImg}>
              {price === '499' ? <img src={plan499}></img> : <></>}
              {price === '699' ? <img src={plan699}></img> : <></>}
              {price === '899' ? <img src={plan899}></img> : <></>}
            </div>
            {menuChoose[0].planType.map((plan) => (
              <div
                key={plan.typeID}
                className={
                  value === plan.type
                    ? styles.optionArea
                    : styles.optionArea_top
                }
              >
                <div className={styles.optionBox}>
                  <div>{plan.typeName}</div>
                  <button
                    className={
                      value === plan.type
                        ? styles.optionBtnUp
                        : styles.optionBtnDown
                    }
                    onClick={() => buttonHandler(plan.type)}
                  >
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button>
                </div>
                <div
                  className={
                    value === plan.type
                      ? styles.optionControl
                      : styles.optionControl_hide
                  }
                >
                  <div className={styles.option_list}>
                    {Number(price) > 499 ? (
                      <>
                        {plan.typeSpecial.map((option) => (
                          <div className={styles.option} key={option}>
                            <div className={styles.starIcon}>
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div>{option}</div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                    {plan.typeOption.map((option) => (
                      <div key={option} className={styles.option}>
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div
              className={
                canChoose == 'true' ? styles.button : styles.button_hide
              }
            >
              <Button
                title={'選擇此方案'}
                main={false}
                onClickHandler={submitHandler}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default PricePlan;
