import React, { useContext, useState } from "react";
import AuthContext from "../service/AuthContext";
import Modal from "react-bootstrap/Modal";
import {
  getFileClickHandler,
  saveFileClickHandler,
} from "../service/getSaveFile";
import DragDropFile from "./DragAndDropFiles";
import { Link } from "react-router-dom";

const SelfCostWarning = ({ activeBrand, onUpdateDashboard }) => {
  const { user, authToken } = useContext(AuthContext);
  const [file, setFile] = useState();

  // const [show, setShow] = useState(false);
  const [costPriceShow, setCostPriceShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const handleCostPriceShow = (e) => {
    // handleClose();
    setCostPriceShow(true);
  };
  const handleCostPriceClose = () => {
    setCostPriceShow(false);
    onUpdateDashboard();
    console.log("handleCostPriceClose in SelfCostWarning ....");
  };

  const handleCostPriceSave = () => {
    saveFileClickHandler(file, authToken, activeBrand);
    setFile(null);
    onUpdateDashboard();
    setCostPriceShow(false);
  };

  return (
    <div className='container dash-container d-flex gap-3 p-3'>
      <div className='p-3 selfcost-warning w-100'>
        <div className='d-flex align-items-center gap-2 mb-2'>
          <svg
            width='30'
            height='30'
            viewBox='0 0 30 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              width='30'
              height='30'
              rx='5'
              fill='#F0AD00'
              fillOpacity='0.1'
            />
            <path
              d='M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z'
              fill='#F0AD00'
            />
          </svg>
          <span className='fw-bold'>
            У ваших товаров отсутствует себестоимость
          </span>
        </div>
        <p>
          Для правильного расчета данных нам нужно знать себестоимость ваших
          товаров. Данные в блоках «прибыль», «финансы», «себестоимость
          проданных товаров» не учитывают себестоимость товаров, для которых она
          неизвестна.
        </p>
        {/* <button className='link' onClick={handleCostPriceShow}>
          Заполнить себестоимость
        </button> */}
        <Link className='link' style={{ textDecoration: 'none'}} to='/selfcost'>
          Заполнить себестоимость
        </Link>
      </div>
      <Modal
        show={costPriceShow}
        onHide={handleCostPriceClose}
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
                  <a
                    href='#'
                    className='link'
                    onClick={() => setFile(null)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    Удалить
                  </a>
                </div>
              </div>
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <button
                  onClick={handleCostPriceSave}
                  className='prime-btn'
                  style={{ height: "52px" }}
                >
                  Сохранить
                </button>
              </div>
              <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                <a href='#' className='link' onClick={handleCostPriceClose}>
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
                  href='#'
                  className='link'
                  onClick={() => getFileClickHandler(authToken, activeBrand)}
                >
                  Скачать шаблон
                </a>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SelfCostWarning;
