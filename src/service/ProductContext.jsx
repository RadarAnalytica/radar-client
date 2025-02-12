import React, { createContext, useState } from 'react';

// Create the context
const ProductContext = createContext();

// Provider component to store state
const ProductProvider = ({ children }) => {
    // State variables
    const [productName, setProductName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [competitorsLinks, setCompetitorsLinks] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Function to add a keyword
    const addKeyword = (keyword) => {
        setKeywords(prevKeywords => [...keyword, ...prevKeywords]);
    };

    const addKeywords = (newKeywords) => {
        setKeywords([newKeywords, ...keywords,]);
    };

    const removeAllKeywords = () => {
        setKeywords([]);
    };

    // Function to remove a keyword
    const removeKeyword = (keywordToRemove) => {
        setKeywords((prevKeywords) =>
            prevKeywords.filter((keyword) => keyword !== keywordToRemove)
        );
    };

    return (
        <ProductContext.Provider
            value={{
                productName,
                setProductName,
                shortDescription,
                setShortDescription,
                competitorsLinks,
                setCompetitorsLinks,
                keywords,
                addKeyword,
                addKeywords,
                removeKeyword,
                inputValue,
                setInputValue,
                removeAllKeywords
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };
