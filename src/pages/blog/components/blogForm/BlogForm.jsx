import React, { useContext, useEffect, useState, useRef } from 'react';
import uploadIcon from '../../../images/upload.svg';
import InputField from '../../../../components/InputField';
import styles from './BlogForm.module.css';

function BlogForm() {
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploadingFile(true);
    try {
      const response = await fetch(`${URL}/api/report/upload`, {
        method: "POST",
        headers: {
          authorization: "JWT " + authToken,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        await getListOfReports();
      } else {
        setError(data.message);
        setShow(true);
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFile(files[0]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFile(files[0]);
  };

  const uploadFile = (e) => {
    // Add upload logic here
    e.stopPropagation();
    handleFileUpload(selectedFile);
    setSelectedFile(null);
  };

  const deleteFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  const handleDelete = async (id) => {
    try {
      await ServiceFunctions.deleteReport(authToken, id);
      await getListOfReports();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form>
      <div className="fields-container">
        <InputField
          type={"text"}
          placeholder={"Название"}
          label={"Название"}
          // callback={emailHandler}
          // emailErrorText={emailErrorText}
          // subtext={'Обещаем не слать рекламу и звонить только по делу'}
          // required={true}
        />
      </div>
      <div
        className={styles.uploadContainer}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className={styles.uploadWrapper}
          // onClick={() => !uploadingFile && fileInputRef.current.click()}
          style={{ cursor: uploadingFile ? "not-allowed" : "pointer" }}
        >
          <div className={styles.uploadTitle}>Загрузите файл</div>
          {!uploadingFile ? (
            <div className={styles.uploadIcon}>
              <img src={uploadIcon} alt="upload" />
            </div>
          ) : (
            <div className={styles.uploadIcon}>
              <span className="small-loader"></span>
            </div>
          )}
          <div className={styles.uploadTextWrapper}>
            <div className={styles.uploadText}>
              {selectedFile ? (
                <>
                  <span>{selectedFile.name}</span>
                  <div className={styles.uploadButtonWrapper}>
                    <button
                      className={styles.deleteButton}
                      onClick={(e) => deleteFile(e)}
                    >
                      Удалить
                    </button>
                    <button
                      className={styles.uploadButton}
                      onClick={(e) => uploadFile(e)}
                    >
                      Загрузить
                    </button>
                  </div>
                </>
              ) : (
                <>
                  Перетащите мышкой файл или
                  <span className={styles.uploadTextBlue}>
                    загрузите с компьютера
                  </span>
                </>
              )}
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
            multiple
          />
        </div>
      </div>
      <div
        className={styles.uploadContainer}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className={styles.uploadWrapper}
          // onClick={() => !uploadingFile && fileInputRef.current.click()}
          style={{ cursor: uploadingFile ? "not-allowed" : "pointer" }}
        >
          <div className={styles.uploadTitle}>Загрузите картинку</div>
          {!uploadingFile ? (
            <div className={styles.uploadIcon}>
              <img src={uploadIcon} alt="upload" />
            </div>
          ) : (
            <div className={styles.uploadIcon}>
              <span className="small-loader"></span>
            </div>
          )}
          <div className={styles.uploadTextWrapper}>
            <div className={styles.uploadText}>
              {selectedFile ? (
                <>
                  <span>{selectedFile.name}</span>
                  <div className={styles.uploadButtonWrapper}>
                    <button
                      className={styles.deleteButton}
                      onClick={(e) => deleteFile(e)}
                    >
                      Удалить
                    </button>
                    <button
                      className={styles.uploadButton}
                      onClick={(e) => uploadFile(e)}
                    >
                      Загрузить
                    </button>
                  </div>
                </>
              ) : (
                <>
                  Перетащите мышкой файл или
                  <span className={styles.uploadTextBlue}>
                    загрузите с компьютера
                  </span>
                </>
              )}
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
            multiple
          />
        </div>
      </div>
      <InputField
        type={"text"}
        placeholder={"Категория"}
        label={"Категория"}
        // callback={emailHandler}
        // emailErrorText={emailErrorText}
        // subtext={'Обещаем не слать рекламу и звонить только по делу'}
        // required={true}
      />
      <button>Создать запись</button>
    </form>
  );
}

export default BlogForm;
