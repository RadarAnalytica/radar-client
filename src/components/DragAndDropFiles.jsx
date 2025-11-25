import React, { useState } from 'react';

function handleFile(files) {
  // console.log(files[0]);
}

function DragDropFile({ files, setFiles }) {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(e.dataTransfer.files[0]);
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(e.target.files[0]);
      handleFile(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <form
      id='form-file-upload'
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type='file'
        id='input-file-upload'
        multiple={true}
        onChange={handleChange}
      />
      <label
        id='label-file-upload'
        htmlFor='input-file-upload'
        className={dragActive ? 'drag-active' : ''}
      >
        <div style={{ width: '100%', padding: '16px' }}>
          <svg
            className='mb-3'
            width='64'
            height='48'
            viewBox='0 0 64 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M20 11C17.5147 11 15.5 13.0147 15.5 15.5V16C15.5 18.4853 17.5147 20.5 20 20.5C22.4853 20.5 24.5 18.4853 24.5 16V15.5C24.5 13.0147 22.4853 11 20 11Z'
              fill='#5329FF'
            />
            <path
              d='M11.5 47H53.5C58.4706 47 62.5 42.9706 62.5 38V30L47.8422 21.4198C44.3822 19.3944 39.9996 19.902 37.0941 22.6647L26.75 32.5L11.5 47Z'
              fill='#5329FF'
            />
            <path
              d='M11.5 47H53.5C58.4706 47 62.5 42.9706 62.5 38V30M11.5 47H10C5.30558 47 1.5 43.1944 1.5 38.5V38.5M11.5 47L26.75 32.5M62.5 30V10C62.5 5.02944 58.4706 1 53.5 1H10.5C5.52944 1 1.5 5.02944 1.5 10V38.5M62.5 30L47.8422 21.4198C44.3822 19.3944 39.9996 19.902 37.0941 22.6647L26.75 32.5M26.75 32.5L21.1388 29.258C17.7739 27.3138 13.5411 27.749 10.6422 30.3373L1.5 38.5M24.5 15.5V16C24.5 18.4853 22.4853 20.5 20 20.5V20.5C17.5147 20.5 15.5 18.4853 15.5 16V15.5C15.5 13.0147 17.5147 11 20 11V11C22.4853 11 24.5 13.0147 24.5 15.5Z'
              stroke='#5329FF'
              strokeWidth='1.5'
            />
          </svg>
          <h5 className='fw-bold' style={{ fontSize: '14px' }}>Перетащите файл сюда</h5>
          <span className='clue-text' style={{ fontSize: '12px' }}>или нажмите на кнопку</span>
          <button
            className='prime-btn'
            style={{ width: '100%', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '220px' }}
            onClick={onButtonClick}
          >
            <span style={{ fontSize: '14px' }}>Выбрать файл</span>
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id='drag-file-element'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
}

export default DragDropFile;
