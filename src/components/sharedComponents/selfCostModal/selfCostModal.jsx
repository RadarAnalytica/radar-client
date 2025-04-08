import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { getFileClickHandler, saveFileClickHandler } from "../../../service/getSaveFile";
import DragDropFile from "../../../components/DragAndDropFiles";
import AuthContext from "../../../service/AuthContext";

const SelfCostModal = ({ isModalVisible, setIsModalVisible, onUpdateDashboard, shopId }) => {

    const [file, setFile] = useState();
    const { authToken } = useContext(AuthContext)

    const handleCostPriceSave = () => {
        saveFileClickHandler(file, authToken, shopId);
        setFile(null);
        onUpdateDashboard();
        setIsModalVisible(false);
    };

    const modalCloseHandler = () => {
        setIsModalVisible(false);
        onUpdateDashboard();
    };

    return (
        <Modal
            show={isModalVisible}
            onHide={modalCloseHandler}
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
                            <a href='#' className='link' onClick={modalCloseHandler}>
                                Отмена
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className='d-flex flex-column align-items-center justify-content-around w-100'>
                        <DragDropFile files={file} setFiles={setFile} />
                        <div className='d-flex justify-content-center w-100 mt-2 gap-2'>
                            <a
                                href='#'
                                className='link'
                                onClick={() => getFileClickHandler(authToken, shopId)}
                            >
                                Скачать шаблон
                            </a>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default SelfCostModal;