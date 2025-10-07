import React, { useEffect, useContext, useState } from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import TestSub from "../assets/TestSub.svg";
import CloseIcon from "../assets/CloseIcon.svg";
import SunIcon from "../assets/SunIcon.svg";
import SmartSubscription from "../assets/SmartSubscription.svg";
import StatusInfo from "../components/StatusInfo";
import moment from "moment";
import "moment/locale/ru";
import { URL } from "../service/config";
import AuthContext from "../service/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import MobilePlug from "../components/sharedComponents/mobilePlug/mobilePlug";
import Sidebar from "../components/sharedComponents/sidebar/sidebar";
import Header from "../components/sharedComponents/header/header";
import { getDayDeclension } from "../service/utils";
import { fetchApi } from "@/service/fetchApi";
import { useDemoMode } from "@/app/providers";
import NoSubscriptionWarningBlock from "@/components/sharedComponents/NoSubscriptionWarningBlock/NoSubscriptionWarningBlock";

const Subscriptions = () => {
  const navigate = useNavigate();
  const { authToken, user } = useContext(AuthContext);
  const { isDemoMode } = useDemoMode();
  const [subscriptions, setSubscriptions] = useState([]);
  const [keepSubscriptionId, setKeepSubscriptionId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const fetchSubscriptions = async () => {
    const response = await fetchApi('/api/user/subscription/all', {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "JWT " + authToken,
      },
    });
    const data = await response.json();
    setSubscriptions(data);
    return data;
  };

  useEffect(() => {
    const checkSubscriptions = async () => {
      const data = await fetchSubscriptions();
      if (data.length === 0 && (user.test_days_left === null || user.test_days_left === undefined || user.test_days_left < 0)) {
        navigate('/tariffs');
      }
    };

    checkSubscriptions();
  }, []);

  const handleRestoreSubscription = async (subscriptionId) => {
    try {
      const response = await fetchApi(
        `/api/user/subscription/restore/${subscriptionId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "JWT " + authToken,
          },
        }
      );
      const data = await response.json();
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((sub) =>
          sub.id === subscriptionId ? { ...sub, active: true } : sub
        )
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      const response = await fetchApi(
        `/api/user/subscription/cancel/${subscriptionId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "JWT " + authToken,
          },
        }
      );
      const data = await response.json();
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((sub) =>
          sub.id === subscriptionId ? { ...sub, active: false } : sub
        )
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const rejectSubscription = ({ subscriptionId }) => {
    return (
      <div
        className="sub-card-toggle"
        onClick={() => {
          setOpenModal(true);
          setKeepSubscriptionId(subscriptionId);
        }}
      >
        <img src={CloseIcon} alt="Close subscription" className="mr-5" />
        <span>Отказаться от подписки</span>
      </div>
    );
  };

  const restoreSubscription = ({ subscriptionId }) => {
    return (
      <div
        className="sub-card-toggle"
        style={{ backgroundColor: "#5329FF0D", borderRadius: "8px" }}
        onClick={() => {
          handleRestoreSubscription(subscriptionId);
        }}
      >
        <span
          className="d-flex align-items-center"
          style={{ cursor: "pointer", padding: "8px" }}
        >
          <img
            src={SunIcon}
            alt="Restore subscription"
            className="mr-5"
            style={{ width: 24, height: 24 }}
          />
          <span
            style={{
              color: "#5329FF",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "25px",
            }}
          >
            Восстановить подписку
          </span>
        </span>
      </div>
    );
  };

  return (
    <div className="sub-page">
      <MobilePlug />

      <div style={{ height: '100vh' }}>
        <Sidebar />
      </div>

      <div className="sub-page-content" style={{ padding: '0 32px' }}>
        <div style={{ margin: '20px 0' }}>
          <Header title={"Моя подписка"} />
        </div>

        {isDemoMode && <NoSubscriptionWarningBlock />}

        <div className="container dash-container sub-page-grid">
          {subscriptions.map((item) => {
            const activeText = item.active ? "Активна" : "Неактивна";
            const activeColor = item.active ? "#00B69B" : "#808080";
            const activeWidth = item.active ? 120 : 140;
            const toggleText = item.active
              ? rejectSubscription({
                subscriptionId: item.id,
              })
              : restoreSubscription({
                subscriptionId: item.id,
              });
            const paymentDateEndString = item.validity_period
            const paymentDateValue = new Date(Date.parse(paymentDateEndString))
            paymentDateValue.setDate(paymentDateValue.getDate() + 1)
            const paymentDate = `${paymentDateValue.getDate()} ${months[paymentDateValue.getMonth()]}`

            const activeTillPeriodValue = new Date(Date.parse(paymentDateEndString))
            const activeTillPeriod = `${activeTillPeriodValue.getDate()} ${months[activeTillPeriodValue.getMonth()]}`

            return (
              <div className="sub-card">
                <div className="sub-card-row">
                  <div className="sub-card-content-wrap">
                    <img src={TestSub} alt="subImg" />
                    <div className="sub-card-content">
                      <span className="sub-card-content-title">
                        {item.name}
                      </span>
                      <span className="sub-card-content-text">
                        Действует до {activeTillPeriod}
                      </span>
                    </div>
                  </div>

                  <StatusInfo
                    title={activeText}
                    fill={activeColor}
                    width={activeWidth}
                  />
                </div>
                {item.active && (
                  <span className="sub-card-content-text sub-card-content-pay">{`Следующее списание средств ${paymentDate}`}</span>
                )}
                <p className="sub-divider" />
                <div className="sub-card-toggle">{toggleText}</div>
              </div>
            );
          })}

          {/* тестовый период */}
          {user && user.test_days_left !== null && user.test_days_left !== undefined && user.test_days_left >= 0 &&
            <div className="sub-card">
              <div className="sub-card-row">
                <div className="sub-card-content-wrap">
                  <img src={TestSub} alt="subImg" />
                  <div className="sub-card-content">
                    <span className="sub-card-content-title">
                      тестовый период
                    </span>
                    <span className="sub-card-content-text">
                      Осталось {getDayDeclension(user.test_days_left.toString())}
                    </span>
                  </div>
                </div>

                <StatusInfo
                  title="Активен"
                  fill="#00B69B"
                  width={120}
                />
              </div>
            </div>}
        </div>
      </div>

      <Modal
        show={openModal}
        onHide={() => setOpenModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: "100%" }}>
              <div className="d-flex justify-content-between">
                <span className="cancel-subscription-modal">
                  Вы уверены, что хотите отменить подписку?
                </span>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span className="cancel-subscription-modal-text">
              Ваши данные могут быть удалены
            </span>
            <div className="button-box">
              <div className="button-stay" onClick={() => setOpenModal(false)}>
                Остаться
              </div>
              <div
                className="button-cancel"
                onClick={() => {
                  handleCancelSubscription(keepSubscriptionId);
                  setOpenModal(false);
                }}
              >
                Отменить подписку
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Subscriptions;
