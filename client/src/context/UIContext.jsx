import React, { createContext, useContext, useState } from 'react';
import { formatCurrency, convertCurrency } from '../utils/formatters';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'booking', 'login', 'share', etc.

  const toggleChat = () => setIsChatOpen((prev) => !prev);
  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  // Convert amount to active currency and format it
  const formatPrice = (amount, itemCurrency = 'USD') => {
    if (amount === undefined || amount === null) return formatCurrency(0, currency);
    // If the item itself came priced in INR (e.g. Indian domestic route)
    if (itemCurrency === 'INR') {
      if (currency === 'INR') {
        return formatCurrency(amount, 'INR');
      }
      // If user selected USD or EUR, convert from INR to USD then to target
      const inUSD = amount / (EXCHANGE_RATES.INR || 84.10);
      const converted = convertCurrency(inUSD, currency);
      return formatCurrency(converted, currency);
    }

    // Default: item is priced in USD
    const converted = convertCurrency(amount, currency);
    return formatCurrency(converted, currency);
  };

  // Convert without formatting
  const convertPrice = (amount, itemCurrency = 'USD') => {
    if (itemCurrency === 'INR') {
      if (currency === 'INR') return amount;
      const inUSD = amount / (EXCHANGE_RATES.INR || 84.10);
      return convertCurrency(inUSD, currency);
    }
    return convertCurrency(amount, currency);
  };

  return (
    <UIContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        isChatOpen,
        setIsChatOpen,
        toggleChat,
        activeModal,
        openModal,
        closeModal,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);
