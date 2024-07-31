import React from 'react';
const CustomButton = ({ text, action, className }) => {
  return (
    <button className={className} onClick={action}>
      {text}
    </button>
  );
};

export default CustomButton;
