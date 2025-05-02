import React from 'react';
import { useState } from 'react';
// import {SuperTable}
// import styles from './Report.module.css';
import { ConfigProvider, Button, Popover, Modal } from 'antd';
// import downloadIcon from ' ../pages/images/Download.svg';

export default function reportModal({children}) {
	const [isLoading, setIsLoading] = useState(false);
	const [isPopoverOpen, setPopoverOpen] = useState(false);
	const [isConfigOpen, setConfigOpen] = useState(true);

	function popoverOpen() {
		setPopoverOpen(true);
	}

	function popoverClose() {
		setPopoverOpen(false);
	}

	function popoverHandler(status) {
		setPopoverOpen(status);
	}

  const configOpen = () => {
    setConfigOpen(true);
    popoverClose();
  };

  const configOk = () => {
    setConfigOpen(false);
  };

  const configCancel = () => {
    setConfigOpen(false);
  };

  

	return (
      <Modal open={isConfigOpen} onCancel={configCancel} onOk={configOk}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        {children}

      </Modal>
	);
}


function Loading(status){
  if (!status){
    return
  }
  return (
    <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              backgroundColor: '#fff',
              zIndex: 999
            }}
          >
            <span className='loader'></span>
          </div>
  )
}