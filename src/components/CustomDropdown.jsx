import React from 'react';
import styles from './CustomDropdown.module.css';

const CustomDropdown = ({ label, options, selected, isOpen, onToggle, onSelect }) => (
    <div className={styles.selectorWrapper}>
        <div className={styles.selector} onClick={onToggle}>
            {selected}
            <svg
                width="14"
                height="9"
                viewBox="0 0 14 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arrowIcon}
            >
                <path d="M1 1.5L7 7.5L13 1.5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </div>
        {isOpen && (
            <ul className={styles.dropdownMenu}>
                {options.map((option, index) => (
                    <li key={index} onClick={() => onSelect(option, index)}>
                        {option}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default CustomDropdown;
