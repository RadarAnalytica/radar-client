import React, { useContext, useEffect, useState, useRef } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import styles from './LinkedShops.module.css'
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../service/AuthContext";
import wblogo from "../assets/wblogo.png";
import redcircle from "../assets/redcircle.png";
import greencircle from "../assets/greencircle.png";
import { URL } from "../service/config";

import Modal from "react-bootstrap/Modal";
import InputField from "../components/InputField";
import DragDropFile from "../components/DragAndDropFiles";
import { ServiceFunctions } from "../service/serviceFunctions";
import WbIcon from "../assets/WbIcon";
import {
  getFileClickHandler,
  saveFileClickHandler,
} from "../service/getSaveFile";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchShops } from "../redux/shops/shopsActions";
import { editShop } from "../redux/editShop/editShopActions";
//import { addShop } from "../redux/addShop/addShopActions";
import { deleteShop } from "../redux/deleteShop/deleteShopActions";
import { areAllFieldsFilled } from "../service/utils";
import NoSubscriptionPage from "./NoSubscriptionPage";
import warningIcon from "../assets/warning.png";
import MobilePlug from "../components/sharedComponents/mobilePlug/mobilePlug";
import { addShop } from "../service/api/api";
import Sidebar from "../components/sharedComponents/sidebar/sidebar";
import Header from "../components/sharedComponents/header/header";
import { fetchFilters } from "../redux/apiServicePagesFiltersState/filterActions";
import { actions as filterActions } from '../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice'

const LinkedShops = () => {
  const { user, authToken, logout } = useContext(AuthContext);
  const loading = useAppSelector((state) => state.loadingSlice);
  const dispatch = useAppDispatch();
  const shops = useAppSelector((state) => state.shopsSlice.shops);
  const prevShopsLengthRef = useRef(shops.length);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeShop, setActiveShop] = useState(null);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSelfcost, setShowSelfcost] = useState(false);
  const [error, setError] = useState("");

  const [file, setFile] = useState();

  const handleClose = () => setShow(false);
  const handleCloseError = () => setShowError(false);
  const handleSelfcostClose = () => setShowSelfcost(false);
  const handleShow = () => setShow(true);

  const [brandName, setBrandName] = useState();
  const [tkn, setTkn] = useState();

  // const status =
  //   user && user.stage && user.stage?.indexOf('Предприниматель') >= 0
  //     ? 'ИП'
  //     : (user && user.stage?.indexOf('Менеджер') >= 0) ||
  //       (user && user.stage?.indexOf('менеджер') >= 0)
  //     ? 'Менеджер'
  //     : null;

  // const getTokenExp = async (user) => {
  //   const res = await fetch(`${URL}/api/user/exp/${user.id}`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       authorization: 'Bearer ' + authToken,
  //     },
  //   });
  //   const data = await res.json();
  //   return data;
  // };

  // const editShop = async (shop, is_active, is_delete, authtoken, brand_name, token) => {

  //     const res = await fetch(URL + '/api/shop/' + shop?.id, {
  //         method: 'PATCH',
  //         headers: {
  //             'content-type': 'application/json',
  //             'authorization': 'JWT ' + authtoken
  //         },
  //         body: JSON.stringify({
  //             brand_name : brand_name,
  //             token : token,
  //             is_active : is_active,
  //             is_delete : is_delete

  //         })
  //     })
  //     const data = await res.json()
  //     if(res.status === 200){
  //         ServiceFunctions.getAllShops(authToken).then(data => {
  //             setData(data)})
  //     }

  //     // setData(data)
  //     setBrandName()
  //     setTkn()
  //     return data

  // }

  // const deleteShop = async (shop, authtoken) => {
  //     const res = await fetch(URL + '/api/shop/' + shop?.id, {
  //         method: 'DELETE',
  //         headers: {
  //             'content-type': 'application/json',
  //             'authorization': 'JWT ' + authtoken
  //         }
  //     })

  //     if(res.status === 204){
  //         ServiceFunctions.getAllShops(authToken).then(data => setData(data))
  //     }else{
  //         throw new Error('Произошла ошибка при удалении магазина')
  //     }
  // }

  useEffect(() => {
    if (user && shops.length > 0) {
      dispatch(fetchShops(authToken));

      const prevShopsLength = prevShopsLengthRef.current;

      if (shops.length > prevShopsLength) {
        // A shop was added
        const newAddedShop = shops[shops.length - 1]; // Assuming the new shop is added at the end
        if (newAddedShop) {
          localStorage.setItem("activeShop", JSON.stringify(newAddedShop));
        }
      } else if (shops.length < prevShopsLength) {
        // A shop was removed
        if (shops.length > 0) {
          // If there are still shops, set the first one as active
          localStorage.setItem("activeShop", JSON.stringify(shops[0]));
        } else {
          // If no shops left, remove activeShop from localStorage
          localStorage.removeItem("activeShop");
        }
      }

      prevShopsLengthRef.current = shops.length;
    } else {
      localStorage.removeItem("activeShop");
    }
  }, [shops.length]);

  useEffect(() => {
    dispatch(fetchShops(authToken));
  }, []);

  const editData = {
    activeShop: activeShop,
    is_active: true,
    is_delete: false,
    authToken: authToken,
    brandName: brandName,
    tkn: tkn,
  };

  const addShopData = {
    brandName: brandName,
    tkn: tkn,
    authToken: authToken,
  };

  const deleteShopData = {
    shop: activeShop,
    authToken: authToken,
  };

  const handleDeleteShop = () => {
    dispatch(deleteShop(deleteShopData));
    dispatch(fetchShops(authToken));
    dispatch(fetchFilters(authToken));
  };

  const handleVisitDashboard = () => {
    setShowSuccess(false);
    navigate("/dashboard");
  };

  const handleAddShop = async (e) => {
    if (!areAllFieldsFilled(addShopData)) {
      e.preventDefault();
      setError("Введите корректное значение для всех полей");
      setShowError(true);
      return;
    }

    try {
      await addShop(addShopData)
      handleClose();
      setShowSuccess(true);
      dispatch(fetchShops(authToken));
      dispatch(fetchFilters(authToken));

    } catch {
      setError("Не удалось добавить магазин. Проверьте корректность введенных данных.");
      setShowError(true);
    }
  };

  const handleEditShop = (e) => {
    if (!areAllFieldsFilled(editData)) {
      e.preventDefault();
      setError("Введите корректное значение для всех полей");
      setShowError(true);
      return;
    }
    dispatch(editShop(editData));
    dispatch(fetchShops(authToken));
    dispatch(fetchFilters(authToken));
    setShowEdit(false);
  };

  const redirect = () => {
    navigate("/dashboard");
  };

  const checkIdQueryParam = () => {
    const searchParams = new URLSearchParams(location.search);
    const idQueryParam = searchParams.get("id");
    if (idQueryParam && parseInt(idQueryParam) !== user.id) {
      logout();
      navigate("/signin");
    } else {
      return;
    }
  };

  useEffect(() => {
    if (location.search) {
      checkIdQueryParam();
    }
  }, [location.search]);

  // if (user?.subscription_status === "expired") {
  //   return <NoSubscriptionPage title={"Подключенные магазины"} />;
  // }

  return (
    <main className={styles.page}>
      <MobilePlug />
      {/* ------ SIDE BAR ------ */}
      <section className={styles.page__sideNavWrapper}>
        <Sidebar />
      </section>
      {/* ------ CONTENT ------ */}
      <section className={styles.page__content}>
        {/* header */}
        <div className={styles.page__headerWrapper}>
          <Header title='Подключенные магазины' />
        </div>
        {/* !header */}
        <div className={styles.content}>
          {shops && shops.length
            ? shops.map((item, i) => (
              // <div className='linked-shop-block col me-2' key={i}>
              <div className={styles.shopCard} key={i}>
                <div className={styles.shopCard__header}>
                  <WbIcon />
                  <div className={styles.shopCard__titleWrapper}>
                    <h3 className={styles.shopCard__title}>{item.brand_name}</h3>
                    <span
                      className={styles.shopCard__subtitle}
                    >
                      Последнее обновление{" "}
                      {new Date(
                        item?.updated_at?.split(" ")[0]
                      ).toLocaleDateString() || null}
                    </span>
                  </div>
                </div>

                <div className={styles.shopCard__buttonsWrapper}>
                  <svg
                    onClick={() => {
                      setActiveShop(item);
                      setShowEdit(true);
                    }}
                    style={{ cursor: "pointer" }}
                    width='168'
                    height='42'
                    viewBox='0 0 168 42'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      width='168'
                      height='42'
                      rx='8'
                      fill='#5329FF'
                      fillOpacity='0.05'
                    />
                    <g clipPath='url(#clip0_944_7891)'>
                      <path
                        d='M14.94 23.036C14.707 23.66 14.51 24.236 14.334 24.819C15.294 24.122 16.435 23.68 17.752 23.515C20.265 23.201 22.498 21.542 23.628 19.457L22.172 18.002L23.585 16.587L24.585 15.586C25.015 15.156 25.5 14.362 26.013 13.218C20.42 14.085 16.995 17.51 14.939 23.036H14.94ZM25 18.001L26 19C25 22 22 25 18 25.5C15.331 25.834 13.664 27.667 12.998 31H11C12 25 14 11 29 11C28 13.997 27.002 15.996 26.003 16.997L25 18.001Z'
                        fill='#5329FF'
                      />
                    </g>
                    <path
                      d='M41.328 27V15.72H46.112C47.3173 15.72 48.24 16.0133 48.88 16.6C49.5307 17.176 49.856 17.976 49.856 19C49.856 20.024 49.5307 20.8293 48.88 21.416C48.24 22.0027 47.3173 22.296 46.112 22.296H42.992V27H41.328ZM42.992 20.968H45.936C46.6933 20.968 47.264 20.7973 47.648 20.456C48.032 20.1147 48.224 19.6293 48.224 19C48.224 18.3813 48.032 17.9013 47.648 17.56C47.264 17.2187 46.6933 17.048 45.936 17.048H42.992V20.968ZM55.2736 27.144C53.9723 27.144 52.9483 26.776 52.2016 26.04C51.455 25.304 51.0816 24.2853 51.0816 22.984C51.0816 22.1413 51.2416 21.4053 51.5616 20.776C51.8923 20.1467 52.3456 19.6613 52.9216 19.32C53.5083 18.968 54.1856 18.792 54.9536 18.792C55.711 18.792 56.3456 18.952 56.8576 19.272C57.3696 19.592 57.759 20.0453 58.0256 20.632C58.2923 21.208 58.4256 21.8907 58.4256 22.68V23.192H52.3456V22.264H57.3216L57.0496 22.472C57.0496 21.672 56.8683 21.0533 56.5056 20.616C56.1536 20.168 55.6416 19.944 54.9696 19.944C54.223 19.944 53.647 20.2053 53.2416 20.728C52.8363 21.24 52.6336 21.9493 52.6336 22.856V23.016C52.6336 23.9653 52.863 24.68 53.3216 25.16C53.791 25.64 54.4523 25.88 55.3056 25.88C55.775 25.88 56.2123 25.816 56.6176 25.688C57.0336 25.5493 57.4283 25.3253 57.8016 25.016L58.3296 26.12C57.9563 26.4507 57.503 26.7067 56.9696 26.888C56.4363 27.0587 55.871 27.144 55.2736 27.144ZM59.6035 29.08V25.752H60.4995C60.8515 25.2187 61.1075 24.5947 61.2675 23.88C61.4275 23.1653 61.5075 22.3013 61.5075 21.288V18.936H67.4115V25.752H68.7075V29.08H67.3155V27H60.9955V29.08H59.6035ZM61.9875 25.768H65.8915V20.184H62.8995V21.608C62.8995 22.3867 62.8195 23.1493 62.6595 23.896C62.5102 24.632 62.2862 25.256 61.9875 25.768ZM73.4618 27.144C72.7471 27.144 72.1231 26.9787 71.5898 26.648C71.0564 26.3173 70.6404 25.8373 70.3418 25.208C70.0538 24.5787 69.9098 23.832 69.9098 22.968C69.9098 22.0933 70.0538 21.3467 70.3418 20.728C70.6404 20.1093 71.0564 19.6347 71.5898 19.304C72.1231 18.9627 72.7471 18.792 73.4618 18.792C74.1658 18.792 74.7791 18.968 75.3018 19.32C75.8244 19.672 76.1711 20.152 76.3418 20.76H76.1658L76.3258 18.936H77.8938C77.8618 19.2667 77.8298 19.5973 77.7978 19.928C77.7764 20.248 77.7658 20.5627 77.7658 20.872V27H76.1498V25.208H76.3258C76.1551 25.8053 75.8031 26.28 75.2698 26.632C74.7471 26.9733 74.1444 27.144 73.4618 27.144ZM73.8618 25.88C74.5551 25.88 75.1098 25.6347 75.5258 25.144C75.9524 24.6533 76.1658 23.928 76.1658 22.968C76.1658 22.008 75.9524 21.288 75.5258 20.808C75.1098 20.3173 74.5551 20.072 73.8618 20.072C73.1578 20.072 72.5924 20.3173 72.1658 20.808C71.7498 21.288 71.5418 22.008 71.5418 22.968C71.5418 23.928 71.7498 24.6533 72.1658 25.144C72.5818 25.6347 73.1471 25.88 73.8618 25.88ZM80.2473 27V18.936H81.8473V22.232H83.2393L85.7513 18.936H87.5113L84.5033 22.904L84.1033 22.392C84.4126 22.424 84.6793 22.504 84.9033 22.632C85.1273 22.7493 85.3459 22.9253 85.5593 23.16C85.7726 23.3947 85.9913 23.704 86.2153 24.088L87.8953 27H86.1673L84.7273 24.536C84.5673 24.2587 84.4126 24.0453 84.2633 23.896C84.1139 23.736 83.9433 23.6293 83.7513 23.576C83.5593 23.512 83.3246 23.48 83.0473 23.48H81.8473V27H80.2473ZM90.8034 27V20.232H87.9554V18.936H95.2674V20.232H92.4034V27H90.8034ZM96.5598 27V18.936H98.0318V25.448H97.5838L102.448 18.936H103.792V27H102.336V20.472H102.8L97.9038 27H96.5598ZM106.28 30.456V20.872C106.28 20.5627 106.264 20.248 106.232 19.928C106.211 19.5973 106.184 19.2667 106.152 18.936H107.72L107.88 20.76H107.704C107.875 20.152 108.216 19.672 108.728 19.32C109.251 18.968 109.869 18.792 110.584 18.792C111.299 18.792 111.923 18.9627 112.456 19.304C112.989 19.6347 113.4 20.1093 113.688 20.728C113.987 21.3467 114.136 22.0933 114.136 22.968C114.136 23.832 113.987 24.5787 113.688 25.208C113.4 25.8373 112.989 26.3173 112.456 26.648C111.923 26.9787 111.299 27.144 110.584 27.144C109.88 27.144 109.267 26.9733 108.744 26.632C108.232 26.28 107.891 25.8053 107.72 25.208H107.896V30.456H106.28ZM110.184 25.88C110.888 25.88 111.448 25.6347 111.864 25.144C112.291 24.6533 112.504 23.928 112.504 22.968C112.504 22.008 112.291 21.288 111.864 20.808C111.448 20.3173 110.888 20.072 110.184 20.072C109.48 20.072 108.915 20.3173 108.488 20.808C108.072 21.288 107.864 22.008 107.864 22.968C107.864 23.928 108.072 24.6533 108.488 25.144C108.915 25.6347 109.48 25.88 110.184 25.88ZM119.674 27.144C118.874 27.144 118.18 26.9787 117.594 26.648C117.007 26.3067 116.554 25.8267 116.234 25.208C115.914 24.5787 115.754 23.832 115.754 22.968C115.754 22.104 115.914 21.3627 116.234 20.744C116.554 20.1147 117.007 19.6347 117.594 19.304C118.18 18.9627 118.874 18.792 119.674 18.792C120.474 18.792 121.167 18.9627 121.754 19.304C122.351 19.6347 122.81 20.1147 123.13 20.744C123.46 21.3627 123.626 22.104 123.626 22.968C123.626 23.832 123.46 24.5787 123.13 25.208C122.81 25.8267 122.351 26.3067 121.754 26.648C121.167 26.9787 120.474 27.144 119.674 27.144ZM119.674 25.88C120.378 25.88 120.938 25.6347 121.354 25.144C121.77 24.6533 121.978 23.928 121.978 22.968C121.978 22.008 121.77 21.288 121.354 20.808C120.938 20.3173 120.378 20.072 119.674 20.072C118.98 20.072 118.426 20.3173 118.01 20.808C117.594 21.288 117.386 22.008 117.386 22.968C117.386 23.928 117.588 24.6533 117.994 25.144C118.41 25.6347 118.97 25.88 119.674 25.88ZM125.622 27V18.936H129.686C130.657 18.936 131.372 19.1227 131.83 19.496C132.3 19.8587 132.534 20.376 132.534 21.048C132.534 21.5707 132.358 22.0027 132.006 22.344C131.665 22.6853 131.212 22.8933 130.646 22.968V22.76C131.318 22.792 131.846 22.9893 132.23 23.352C132.614 23.7147 132.806 24.184 132.806 24.76C132.806 25.4533 132.545 26.0027 132.022 26.408C131.51 26.8027 130.78 27 129.83 27H125.622ZM127.142 25.96H129.702C130.225 25.96 130.625 25.8533 130.902 25.64C131.18 25.416 131.318 25.096 131.318 24.68C131.318 24.264 131.18 23.9493 130.902 23.736C130.625 23.5227 130.225 23.416 129.702 23.416H127.142V25.96ZM127.142 22.376H129.526C130.006 22.376 130.38 22.2693 130.646 22.056C130.913 21.8427 131.046 21.5493 131.046 21.176C131.046 20.792 130.913 20.4987 130.646 20.296C130.38 20.0827 130.006 19.976 129.526 19.976H127.142V22.376ZM137.868 27.144C137.153 27.144 136.529 26.9787 135.996 26.648C135.463 26.3173 135.047 25.8373 134.748 25.208C134.46 24.5787 134.316 23.832 134.316 22.968C134.316 22.0933 134.46 21.3467 134.748 20.728C135.047 20.1093 135.463 19.6347 135.996 19.304C136.529 18.9627 137.153 18.792 137.868 18.792C138.572 18.792 139.185 18.968 139.708 19.32C140.231 19.672 140.577 20.152 140.748 20.76H140.572L140.732 18.936H142.3C142.268 19.2667 142.236 19.5973 142.204 19.928C142.183 20.248 142.172 20.5627 142.172 20.872V27H140.556V25.208H140.732C140.561 25.8053 140.209 26.28 139.676 26.632C139.153 26.9733 138.551 27.144 137.868 27.144ZM138.268 25.88C138.961 25.88 139.516 25.6347 139.932 25.144C140.359 24.6533 140.572 23.928 140.572 22.968C140.572 22.008 140.359 21.288 139.932 20.808C139.516 20.3173 138.961 20.072 138.268 20.072C137.564 20.072 136.999 20.3173 136.572 20.808C136.156 21.288 135.948 22.008 135.948 22.968C135.948 23.928 136.156 24.6533 136.572 25.144C136.988 25.6347 137.553 25.88 138.268 25.88ZM146.382 27V20.232H143.534V18.936H150.846V20.232H147.982V27H146.382ZM152.138 27V18.936H153.738V21.752H156.026C157.082 21.752 157.877 21.976 158.41 22.424C158.943 22.8613 159.21 23.5013 159.21 24.344C159.21 24.888 159.087 25.3627 158.842 25.768C158.597 26.1627 158.234 26.4667 157.754 26.68C157.285 26.8933 156.709 27 156.026 27H152.138ZM153.738 25.896H155.85C156.447 25.896 156.906 25.7733 157.226 25.528C157.546 25.272 157.706 24.8827 157.706 24.36C157.706 23.8373 157.546 23.4587 157.226 23.224C156.917 22.9787 156.458 22.856 155.85 22.856H153.738V25.896Z'
                      fill='#5329FF'
                    />
                    <defs>
                      <clipPath id='clip0_944_7891'>
                        <rect
                          width='24'
                          height='24'
                          fill='white'
                          transform='translate(8 9)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  {/* DELETE */}
                  <svg
                    onClick={() => {
                      setActiveShop(item);
                      setShowDelete(true);
                    }}
                    style={{ cursor: "pointer" }}
                    width='115'
                    height='40'
                    viewBox='0 0 115 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      width='115'
                      height='40'
                      rx='8'
                      fill='#F93C65'
                      fillOpacity='0.05'
                    />
                    <g clipPath='url(#clip0_944_7894)'>
                      <path
                        d='M12 16H28V29C28 29.2652 27.8946 29.5196 27.7071 29.7071C27.5196 29.8946 27.2652 30 27 30H13C12.7348 30 12.4804 29.8946 12.2929 29.7071C12.1054 29.5196 12 29.2652 12 29V16ZM14 18V28H26V18H14ZM17 20H19V26H17V20ZM21 20H23V26H21V20ZM15 13V11C15 10.7348 15.1054 10.4804 15.2929 10.2929C15.4804 10.1054 15.7348 10 16 10H24C24.2652 10 24.5196 10.1054 24.7071 10.2929C24.8946 10.4804 25 10.7348 25 11V13H30V15H10V13H15ZM17 12V13H23V12H17Z'
                        fill='#F93C65'
                      />
                    </g>
                    <path
                      d='M43.136 26L45.104 22.288L45.12 22.864L39.888 14.72H41.68L45.936 21.408H45.6L49.12 14.72H50.848L44.864 26H43.136ZM51.1348 28.08V24.752H52.0308C52.3828 24.2187 52.6388 23.5947 52.7988 22.88C52.9588 22.1653 53.0388 21.3013 53.0388 20.288V17.936H58.9427V24.752H60.2388V28.08H58.8468V26H52.5268V28.08H51.1348ZM53.5188 24.768H57.4228V19.184H54.4308V20.608C54.4308 21.3867 54.3508 22.1493 54.1908 22.896C54.0414 23.632 53.8174 24.256 53.5188 24.768ZM64.993 26.144C64.2783 26.144 63.6543 25.9787 63.121 25.648C62.5877 25.3173 62.1717 24.8373 61.873 24.208C61.585 23.5787 61.441 22.832 61.441 21.968C61.441 21.0933 61.585 20.3467 61.873 19.728C62.1717 19.1093 62.5877 18.6347 63.121 18.304C63.6543 17.9627 64.2783 17.792 64.993 17.792C65.697 17.792 66.3103 17.968 66.833 18.32C67.3557 18.672 67.7023 19.152 67.873 19.76H67.697L67.857 17.936H69.425C69.393 18.2667 69.361 18.5973 69.329 18.928C69.3077 19.248 69.297 19.5627 69.297 19.872V26H67.681V24.208H67.857C67.6863 24.8053 67.3343 25.28 66.801 25.632C66.2783 25.9733 65.6757 26.144 64.993 26.144ZM65.393 24.88C66.0863 24.88 66.641 24.6347 67.057 24.144C67.4837 23.6533 67.697 22.928 67.697 21.968C67.697 21.008 67.4837 20.288 67.057 19.808C66.641 19.3173 66.0863 19.072 65.393 19.072C64.689 19.072 64.1237 19.3173 63.697 19.808C63.281 20.288 63.073 21.008 63.073 21.968C63.073 22.928 63.281 23.6533 63.697 24.144C64.113 24.6347 64.6783 24.88 65.393 24.88ZM71.4425 26.208L70.8985 24.928C71.2612 24.7787 71.5652 24.592 71.8105 24.368C72.0665 24.1333 72.2638 23.8347 72.4025 23.472C72.5518 23.1093 72.6585 22.6613 72.7225 22.128C72.7865 21.5947 72.8185 20.9493 72.8185 20.192V17.936H78.8985V26H77.2985V19.2H74.3065V20.24C74.3065 21.456 74.2105 22.464 74.0185 23.264C73.8265 24.064 73.5172 24.6987 73.0905 25.168C72.6745 25.6267 72.1252 25.9733 71.4425 26.208ZM81.3254 26V17.936H82.7974V24.448H82.3494L87.2134 17.936H88.5574V26H87.1014V19.472H87.5654L82.6694 26H81.3254ZM92.7096 26V19.232H89.8616V17.936H97.1736V19.232H94.3096V26H92.7096ZM98.466 26V17.936H100.066V20.752H102.354C103.41 20.752 104.205 20.976 104.738 21.424C105.271 21.8613 105.538 22.5013 105.538 23.344C105.538 23.888 105.415 24.3627 105.17 24.768C104.925 25.1627 104.562 25.4667 104.082 25.68C103.613 25.8933 103.037 26 102.354 26H98.466ZM100.066 24.896H102.178C102.775 24.896 103.234 24.7733 103.554 24.528C103.874 24.272 104.034 23.8827 104.034 23.36C104.034 22.8373 103.874 22.4587 103.554 22.224C103.245 21.9787 102.786 21.856 102.178 21.856H100.066V24.896Z'
                      fill='#F93C65'
                    />
                    <defs>
                      <clipPath id='clip0_944_7894'>
                        <rect
                          width='24'
                          height='24'
                          fill='white'
                          transform='translate(8 8)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>


                <div
                  className={styles.shopCard__footer}
                >
                  <div className={styles.shopCard__token}>
                    <svg
                      width='30'
                      height='30'
                      viewBox='0 0 30 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='15'
                        cy='15'
                        r='14'
                        stroke='#8C8C8C'
                        strokeWidth='2'
                      />
                      <path
                        d='M15.9769 19.6808L15.4884 20.5534L15.9769 19.6808C15.3699 19.3411 14.6301 19.3411 14.0231 19.6808L9.93771 21.9676L10.8502 17.3755C10.9857 16.6933 10.7571 15.9896 10.2464 15.5174L6.80904 12.3386L11.4584 11.7873C12.1491 11.7054 12.7477 11.2706 13.039 10.6389L15 6.38751L16.961 10.6389C17.2523 11.2706 17.8509 11.7054 18.5416 11.7873L23.191 12.3386L19.7536 15.5174C19.2429 15.9896 19.0143 16.6933 19.1498 17.3755L20.0623 21.9676L15.9769 19.6808Z'
                        stroke='#8C8C8C'
                        strokeWidth='2'
                      />
                    </svg>
                    Токен
                  </div>
                  {item.is_valid !== undefined &&
                    item.is_valid === false ? (
                    <div
                      className='d-flex token-status'
                      style={{ marginTop: "10px" }}
                    >
                      <svg
                        width='120'
                        height='40'
                        fill='#00B69B'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          width='120'
                          height='40'
                          rx='8'
                          fill='#F93C65'
                          fillOpacity='0.15'
                        />
                        <circle cx='15' cy='18' r='5' fill='#F93C65' />
                        <text
                          x='30'
                          y='25'
                          font-family='Arial'
                          font-size='18'
                          font-weight='400'
                          fill='black'
                        >
                          Ошибка
                        </text>
                      </svg>
                    </div>
                  ) : item.is_primary_collect ? (
                    <div
                      className='d-flex token-status'
                      style={{ marginTop: "10px" }}
                    >
                      <svg
                        width='120'
                        height='40'
                        fill='#00B69B'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          width='120'
                          height='40'
                          rx='8'
                          fill='#00B69B'
                          fillOpacity='0.15'
                        />
                        <circle cx='15' cy='18' r='5' fill='#00B69B' />
                        <text
                          x='30'
                          y='25'
                          font-family='Arial'
                          font-size='18'
                          font-weight='400'
                          fill='black'
                        >
                          Активен
                        </text>
                      </svg>
                    </div>
                  ) : (
                    <div
                      className='d-flex token-status'
                      style={{ marginTop: "10px" }}
                    >
                      <svg
                        width='160'
                        height='40'
                        fill='#00B69B'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          width='160'
                          height='40'
                          rx='8'
                          fill='rgba(128, 128, 128, 1)'
                          fillOpacity='0.15'
                        />
                        <circle
                          cx='15'
                          cy='18'
                          r='5'
                          fill='rgba(128, 128, 128, 1)'
                        />
                        <text
                          x='30'
                          y='25'
                          font-family='Arial'
                          font-size='18'
                          font-weight='400'
                          fill='black'
                        >
                          Сбор данных
                        </text>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))
            : null}
          {loading ? null : (
            <div className={styles.shopCard}>
              <div className={styles.shopCard__header}>
                <svg
                  width='60'
                  height='60'
                  viewBox='0 0 60 60'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    width='60'
                    height='60'
                    rx='10'
                    fill='#5329FF'
                    fillOpacity='0.15'
                  />
                  <path
                    d='M38.5455 42H19.4545C19.0929 42 18.746 41.8606 18.4903 41.6124C18.2346 41.3643 18.0909 41.0277 18.0909 40.6767V28.7673H14L28.0823 16.3445C28.3333 16.1228 28.6606 16 29 16C29.3394 16 29.6667 16.1228 29.9177 16.3445L44 28.7673H39.9091V40.6767C39.9091 41.0277 39.7654 41.3643 39.5097 41.6124C39.254 41.8606 38.9071 42 38.5455 42ZM20.8182 39.3535H37.1818V26.3286L29 19.1115L20.8182 26.3286V39.3535ZM23.5455 34.0604H34.4545V36.7069H23.5455V34.0604Z'
                    fill='#5329FF'
                  />
                </svg>
                <div className={`${styles.shopCard__titleWrapper} ${styles.shopCard__titleWrapper_oneItem}`}>
                  <h3 className={styles.shopCard__title}>Новый магазин</h3>
                </div>
              </div>
              <p
                className={styles.shopCard__text}
              >
                Добавьте новые данные, чтобы отслеживать
                <br /> статистику по всем вашим магазинам в одном месте
              </p>
              <button
                className={styles.shopCard__addButton}
                onClick={() => handleShow()}
              >
                Подключить
              </button>
            </div>
          )}
        </div>
      </section>

      <Modal show={show} onHide={handleClose} className='add-token-modal'>
        <Modal.Header closeButton>
          <div className='d-flex align-items-center gap-2'>
            <WbIcon />
            <div style={{ width: "100%" }}>
              <div className='d-flex justify-content-between'>
                <h4 className='fw-bold mb-0'>Подключение магазина</h4>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <InputField
            type={"text"}
            placeholder={"Например, тестовый"}
            label={"Название магазина"}
            required={true}
            callback={(e) => setBrandName(e.target.value.trim())}
          />
          <InputField
            type={"text"}
            placeholder={"Что-то вроде: GJys67G7sbNw178F"}
            label={"Токен"}
            required={true}
            callback={(e) => setTkn(e.target.value.trim())}
          />
          <div className='d-flex justify-content-between w-100 mt-2'>
            <button
              className='prime-btn'
              style={{ padding: "16px 20px" }}
              onClick={(e) => {
                handleAddShop(e);
              }}
            >
              Сохранить
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* EDIT */}
      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        className='add-token-modal'
      >
        <Modal.Header closeButton>
          <div className='d-flex align-items-center gap-2'>
            <WbIcon />
            <div style={{ width: "100%" }}>
              <div className='d-flex justify-content-between'>
                <h4 className='fw-bold mb-0'>Редактирование магазина</h4>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <InputField
            type={"text"}
            placeholder={"Например, тестовый"}
            label={"Название магазина"}
            defautlValue={activeShop?.brand_name}
            callback={(e) => setBrandName(e.target.value)}
          />
          <InputField
            type={"text"}
            placeholder={"Что-то вроде: GJys67G7sbNw178F"}
            label={"Токен"}
            callback={(e) => setTkn(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {activeShop?.is_primary_collect &&
              <>
                <span>Себестоимость</span>
                <div className='d-flex token-status'>
                  {/* <svg width="150" height="40" fill='#00B69B' xmlns="http://www.w3.org/2000/svg">
                        <rect width="150" height="40" rx="8" fill="#00B69B" fillOpacity="0.15" />
                        <circle cx="15" cy="18" r="5" fill="#00B69B" />
                        <text x="30" y="25" font-family="Arial" font-size="18" font-weight="400" fill="black">Установлена</text>
                    </svg> */}
                  <Link
                    to='/selfcost'
                    onClick={() => activeShop && dispatch(filterActions.setActiveShop(activeShop))}
                    className='link'
                  >
                    Изменить
                  </Link>

                </div>
              </>
            }
          </div>
          {/* <div className="mt-3 d-flex align-items-center justify-content-between">
                        <span>Себестоимость</span>
                        <div className="d-flex align-items-center gap-2">
                            <svg width="149" height="36" viewBox="0 0 149 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="149" height="36" rx="8" fill="#00B69B" fillOpacity="0.1" />
                                <circle cx="20" cy="18" r="4" fill="#00B69B" />
                                <path d="M35.2 24L37.152 20.32L37.184 20.864L31.936 12.72H33.552L37.92 19.536H37.6L41.2 12.72H42.752L36.768 24H35.2ZM46.4083 24.144C45.6083 24.144 44.9149 23.9787 44.3283 23.648C43.7416 23.3067 43.2829 22.8213 42.9523 22.192C42.6323 21.552 42.4723 20.7947 42.4723 19.92C42.4723 19.056 42.6376 18.32 42.9683 17.712C43.2989 17.0933 43.7576 16.624 44.3443 16.304C44.9309 15.9733 45.6189 15.808 46.4083 15.808C46.9309 15.808 47.4376 15.8987 47.9283 16.08C48.4189 16.2507 48.8189 16.5013 49.1283 16.832L48.6323 17.856C48.3229 17.5573 47.9816 17.3387 47.6083 17.2C47.2349 17.0507 46.8669 16.976 46.5043 16.976C45.7149 16.976 45.0963 17.232 44.6483 17.744C44.2003 18.2453 43.9763 18.976 43.9763 19.936C43.9763 20.9067 44.2003 21.6533 44.6483 22.176C45.0963 22.6987 45.7149 22.96 46.5043 22.96C46.8563 22.96 47.2189 22.8907 47.5923 22.752C47.9656 22.6133 48.3123 22.3947 48.6323 22.096L49.1283 23.104C48.8083 23.4453 48.3976 23.7067 47.8963 23.888C47.4056 24.0587 46.9096 24.144 46.4083 24.144ZM52.7573 24V17.12H49.8613V15.952H57.0933V17.12H54.1973V24H52.7573ZM61.5399 24.144C60.8359 24.144 60.2172 23.9787 59.6839 23.648C59.1505 23.3173 58.7345 22.8373 58.4359 22.208C58.1372 21.5787 57.9879 20.832 57.9879 19.968C57.9879 19.104 58.1372 18.3627 58.4359 17.744C58.7345 17.1147 59.1505 16.6347 59.6839 16.304C60.2172 15.9733 60.8359 15.808 61.5399 15.808C62.2545 15.808 62.8732 15.9893 63.3959 16.352C63.9292 16.704 64.2812 17.1893 64.4519 17.808H64.2599L64.4359 15.952H65.8439C65.8119 16.272 65.7799 16.592 65.7479 16.912C65.7265 17.232 65.7159 17.5467 65.7159 17.856V24H64.2599V22.16H64.4359C64.2652 22.768 63.9132 23.2533 63.3799 23.616C62.8572 23.968 62.2439 24.144 61.5399 24.144ZM61.8759 22.992C62.6012 22.992 63.1825 22.736 63.6199 22.224C64.0572 21.712 64.2759 20.96 64.2759 19.968C64.2759 18.976 64.0572 18.2293 63.6199 17.728C63.1825 17.2267 62.6012 16.976 61.8759 16.976C61.1505 16.976 60.5639 17.2267 60.1159 17.728C59.6785 18.2293 59.4599 18.976 59.4599 19.968C59.4599 20.96 59.6785 21.712 60.1159 22.224C60.5532 22.736 61.1399 22.992 61.8759 22.992ZM68.2793 24V15.952H69.7193V19.28H73.9753V15.952H75.4153V24H73.9753V20.432H69.7193V24H68.2793ZM81.3443 24.144C80.5549 24.144 79.8723 23.9787 79.2963 23.648C78.7203 23.3067 78.2723 22.8267 77.9523 22.208C77.6323 21.5787 77.4723 20.832 77.4723 19.968C77.4723 19.1147 77.6323 18.3787 77.9523 17.76C78.2723 17.1307 78.7203 16.6507 79.2963 16.32C79.8723 15.9787 80.5549 15.808 81.3443 15.808C82.1336 15.808 82.8163 15.9787 83.3923 16.32C83.9789 16.6507 84.4269 17.1307 84.7362 17.76C85.0563 18.3787 85.2163 19.1147 85.2163 19.968C85.2163 20.832 85.0563 21.5787 84.7362 22.208C84.4269 22.8267 83.9789 23.3067 83.3923 23.648C82.8163 23.9787 82.1336 24.144 81.3443 24.144ZM81.3443 22.992C82.0696 22.992 82.6509 22.736 83.0883 22.224C83.5256 21.712 83.7443 20.96 83.7443 19.968C83.7443 18.976 83.5256 18.2293 83.0883 17.728C82.6509 17.2267 82.0696 16.976 81.3443 16.976C80.6083 16.976 80.0216 17.2267 79.5843 17.728C79.1576 18.2293 78.9443 18.976 78.9443 19.968C78.9443 20.96 79.1576 21.712 79.5843 22.224C80.0216 22.736 80.6083 22.992 81.3443 22.992ZM87.2949 24V15.952H91.2629C92.2122 15.952 92.9162 16.1333 93.3749 16.496C93.8442 16.8587 94.0789 17.3813 94.0789 18.064C94.0789 18.576 93.9029 19.008 93.5509 19.36C93.1989 19.7013 92.7402 19.9093 92.1749 19.984V19.776C92.8469 19.7973 93.3749 19.9947 93.7589 20.368C94.1535 20.7307 94.3509 21.2 94.3509 21.776C94.3509 22.4587 94.0895 23.0027 93.5669 23.408C93.0549 23.8027 92.3349 24 91.4069 24H87.2949ZM88.6709 23.04H91.3109C91.8549 23.04 92.2709 22.928 92.5589 22.704C92.8469 22.4693 92.9909 22.1387 92.9909 21.712C92.9909 21.2747 92.8469 20.944 92.5589 20.72C92.2709 20.496 91.8549 20.384 91.3109 20.384H88.6709V23.04ZM88.6709 19.424H91.1349C91.6362 19.424 92.0255 19.312 92.3029 19.088C92.5802 18.864 92.7189 18.5547 92.7189 18.16C92.7189 17.7547 92.5802 17.4453 92.3029 17.232C92.0255 17.0187 91.6362 16.912 91.1349 16.912H88.6709V19.424ZM95.9265 24.192L95.4145 23.056C95.7878 22.8853 96.0972 22.6827 96.3425 22.448C96.5985 22.2027 96.7958 21.8933 96.9345 21.52C97.0838 21.1467 97.1905 20.6827 97.2545 20.128C97.3185 19.5733 97.3505 18.9013 97.3505 18.112V15.952H103.286V24H101.847V17.088H98.6945V18.144C98.6945 19.3813 98.5985 20.4053 98.4065 21.216C98.2252 22.016 97.9318 22.6507 97.5265 23.12C97.1318 23.5893 96.5985 23.9467 95.9265 24.192ZM109.491 24.144C108.211 24.144 107.198 23.776 106.451 23.04C105.715 22.304 105.347 21.2907 105.347 20C105.347 19.1467 105.507 18.4107 105.827 17.792C106.158 17.1627 106.611 16.6773 107.187 16.336C107.763 15.984 108.435 15.808 109.203 15.808C109.939 15.808 110.563 15.968 111.075 16.288C111.587 16.5973 111.977 17.04 112.243 17.616C112.51 18.192 112.643 18.8747 112.643 19.664V20.144H106.483V19.28H111.651L111.379 19.488C111.379 18.656 111.193 18.0107 110.819 17.552C110.457 17.0933 109.918 16.864 109.203 16.864C108.425 16.864 107.822 17.136 107.395 17.68C106.969 18.2133 106.755 18.944 106.755 19.872V20.016C106.755 20.9973 106.995 21.7387 107.475 22.24C107.966 22.7413 108.643 22.992 109.507 22.992C109.987 22.992 110.435 22.9227 110.851 22.784C111.267 22.6453 111.667 22.416 112.051 22.096L112.531 23.104C112.169 23.4347 111.715 23.6907 111.171 23.872C110.638 24.0533 110.078 24.144 109.491 24.144ZM114.67 24V15.952H116.11V19.28H120.366V15.952H121.806V24H120.366V20.432H116.11V24H114.67ZM127.415 24.144C126.711 24.144 126.092 23.9787 125.559 23.648C125.026 23.3173 124.61 22.8373 124.311 22.208C124.012 21.5787 123.863 20.832 123.863 19.968C123.863 19.104 124.012 18.3627 124.311 17.744C124.61 17.1147 125.026 16.6347 125.559 16.304C126.092 15.9733 126.711 15.808 127.415 15.808C128.13 15.808 128.748 15.9893 129.271 16.352C129.804 16.704 130.156 17.1893 130.327 17.808H130.135L130.311 15.952H131.719C131.687 16.272 131.655 16.592 131.623 16.912C131.602 17.232 131.591 17.5467 131.591 17.856V24H130.135V22.16H130.311C130.14 22.768 129.788 23.2533 129.255 23.616C128.732 23.968 128.119 24.144 127.415 24.144ZM127.751 22.992C128.476 22.992 129.058 22.736 129.495 22.224C129.932 21.712 130.151 20.96 130.151 19.968C130.151 18.976 129.932 18.2293 129.495 17.728C129.058 17.2267 128.476 16.976 127.751 16.976C127.026 16.976 126.439 17.2267 125.991 17.728C125.554 18.2293 125.335 18.976 125.335 19.968C125.335 20.96 125.554 21.712 125.991 22.224C126.428 22.736 127.015 22.992 127.751 22.992Z" fill="#1A1A1A" />
                            </svg>

                            <a href='#' className="link"
                                onClick={() => { setShowEdit(false); setShowSelfcost(true) }}
                            >
                                Изменить
                            </a>
                        </div>
                    </div> */}
          <div className='d-flex justify-content-between w-100 mt-2'>
            <button
              className='prime-btn'
              style={{ padding: "16px 20px" }}
              onClick={(e) => {
                handleEditShop(e);
              }}
            >
              Сохранить
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* DELETE */}
      <Modal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        className='add-token-modal'
      >
        <Modal.Body>
          <div className='d-flex justify-content-between'>
            <h4 className='fw-bold mb-0'>
              Удалить магазин {activeShop?.brandName}?
            </h4>
          </div>
          <div className='d-flex justify-content-between w-100 mt-2 gap-2'>
            <button
              className='danger-btn'
              style={{ padding: "16px 20px" }}
              onClick={() => {
                handleDeleteShop();
                setShowDelete(false);
              }}
            // deleteShop(activeShop, authToken);  }}
            >
              Удалить
            </button>
            <button
              className='prime-btn'
              style={{ padding: "16px 20px" }}
              onClick={() => setShowDelete(false)}
            >
              Оставить
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* SUCCESS */}
      <Modal
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        className='add-token-modal'
      >
        <Modal.Header closeButton>
          <div className='d-flex align-items-center gap-2'>
            <svg
              width='60'
              height='60'
              viewBox='0 0 60 60'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='60'
                height='60'
                rx='12'
                fill='#00B69B'
                fillOpacity='0.1'
              />
              <path
                d='M26.6248 35.8244L43.4153 19L46 21.5878L26.6248 41L15 29.353L17.5829 26.7652L26.6248 35.8244Z'
                fill='#00B69B'
              />
            </svg>
            <div style={{ width: "100%" }}>
              <div className='d-flex justify-content-between'>
                <h4 className='fw-bold mb-0'>Токен успешно добавлен</h4>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ваш токен успешно подключен к сервису и находится на проверке. В
            ближайшее время данные начнут отображаться в разделе{" "}
            <span className='link' onClick={handleVisitDashboard}>
              Сводка продаж
            </span>
          </p>
          {/* <div className="d-flex justify-content-between">
                        <div className="grey-block d-flex align-items-center">
                            <p className='col mb-0' style={{ fontSize: '14px' }}>
                                Для максимального использования всего функционала, внесите себестоимость ваших товаров
                            </p>
                            <button className='prime-btn col'
                                style={{ fontSize: '13px', height: '75%', padding: '12px 12px' }}
                                onClick={() => { setShowSuccess(false); setShowSelfcost(true) }}
                            >
                                Внести себестоимость товаров
                            </button>
                        </div>
                    </div> */}
        </Modal.Body>
      </Modal>

      {/* SELFCOST */}
      <Modal
        show={showSelfcost}
        onHide={() => setShowSelfcost(false)}
        className='add-token-modal'
      >
        <Modal.Header closeButton>
          <div className='d-flex align-items-center gap-2'>
            <div style={{ width: "100%" }}>
              <div className='d-flex justify-content-between'>
                <h4 className='fw-bold mb-0'>Установка себестоимости товара</h4>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {file ? (
            <div>
              <div className='d-flex align-items-center justify-content-between w-100 mt-2 gap-2'>
                <div className='d-flex gap-2'>
                  <svg
                    width='17'
                    height='23'
                    viewBox='0 0 17 23'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M14 21.75H3C1.75736 21.75 0.75 20.7426 0.75 19.5V3.5C0.75 2.25736 1.75736 1.25 3 1.25H10.8588L16.25 6.32405V19.5C16.25 20.7426 15.2426 21.75 14 21.75Z'
                      stroke='black'
                      strokeOpacity='0.5'
                      strokeWidth='1.5'
                    />
                  </svg>
                  <span>{file ? file.name : ""}</span>
                </div>
                <div>
                  <span
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => setFile(null)}
                  >
                    Удалить
                  </span>
                </div>
              </div>
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <button
                  className='prime-btn'
                  style={{ height: "52px" }}
                  onClick={() => {
                    saveFileClickHandler(file, authToken, activeShop.id);
                    setFile(null);
                    handleSelfcostClose();
                  }}
                >
                  Сохранить
                </button>
              </div>
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <a href='#' className='link'>
                  Отмена
                </a>
              </div>
            </div>
          ) : (
            <div className='d-flex flex-column align-items-center justify-content-around w-100'>
              {/* <div className="file-block d-flex flex-column align-items-center justify-content-around w-100 mt-2 gap-2">
                                    <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 11C17.5147 11 15.5 13.0147 15.5 15.5V16C15.5 18.4853 17.5147 20.5 20 20.5C22.4853 20.5 24.5 18.4853 24.5 16V15.5C24.5 13.0147 22.4853 11 20 11Z" fill="#5329FF" />
                                        <path d="M11.5 47H53.5C58.4706 47 62.5 42.9706 62.5 38V30L47.8422 21.4198C44.3822 19.3944 39.9996 19.902 37.0941 22.6647L26.75 32.5L11.5 47Z" fill="#5329FF" />
                                        <path d="M11.5 47H53.5C58.4706 47 62.5 42.9706 62.5 38V30M11.5 47H10C5.30558 47 1.5 43.1944 1.5 38.5V38.5M11.5 47L26.75 32.5M62.5 30V10C62.5 5.02944 58.4706 1 53.5 1H10.5C5.52944 1 1.5 5.02944 1.5 10V38.5M62.5 30L47.8422 21.4198C44.3822 19.3944 39.9996 19.902 37.0941 22.6647L26.75 32.5M26.75 32.5L21.1388 29.258C17.7739 27.3138 13.5411 27.749 10.6422 30.3373L1.5 38.5M24.5 15.5V16C24.5 18.4853 22.4853 20.5 20 20.5V20.5C17.5147 20.5 15.5 18.4853 15.5 16V15.5C15.5 13.0147 17.5147 11 20 11V11C22.4853 11 24.5 13.0147 24.5 15.5Z" stroke="#5329FF" strokeWidth="1.5" />
                                    </svg>
                                    <h5 className='fw-bold'>Перетащите файл сюда</h5>
                                    <span className='clue-text'>или нажмите на кнопку</span>
                                    <button className='prime-btn' style={{ padding: '16px 20px' }}
                                        onClick={() => setShowDelete(false)}>
                                        Выбрать файл
                                    </button>
                                </div> */}
              <DragDropFile files={file} setFiles={setFile} />
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <a
                  onClick={() => getFileClickHandler(authToken, activeShop.id)}
                  href='#'
                  className='link'
                >
                  Скачать шаблон
                </a>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showError} onHide={handleCloseError}>
        <Modal.Header closeButton>
          <div>
            <div className='d-flex gap-3 mb-2 mt-2 align-items-center'>
              <img src={warningIcon} alt='' style={{ height: "3vh" }} />
              <p className='fw-bold mb-0'>Ошибка!</p>
            </div>
            <p className='fs-6 mb-1' style={{ fontWeight: 600 }}>
              {error}
            </p>
          </div>
        </Modal.Header>
      </Modal>
      {/* ---------------------- */}
    </main>

    // <div className='linked-shops-page'>
    //   <MobilePlug />
    //   <div style={{ height: '100vh' }}>
    //     <Sidebar />
    //   </div>
    //   {/* <SideNav /> */}
    //   <div
    //     className='linked-shops-content'
    //     //className={styles.page}
    //   >
    //     <TopNav title={"Подключенные магазины"} mikeStarinaStaticProp />
    //     {/* <div className='sub-page-grid linked-wrap p-0' style={{ border: '1px solid red'}}> */}

    //   </div>


    // </div>
  );
};

export default LinkedShops;
