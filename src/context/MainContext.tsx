import React, { createContext, useEffect, useMemo, useState } from 'react';
import { MODE } from '../types/modeEnum';

interface IContext {
  bidPrice: string;
  askPrice: string;
  onChangeCurrentMode: () => void;
  currentMode: MODE;
  convertUserPrice: (value: string) => void;
  usdt: number;
  isLoading: boolean;
}

export const MainContext = createContext<IContext>({
  bidPrice: '',
  askPrice: '',
  onChangeCurrentMode: () => {},
  currentMode: MODE.BUY,
  convertUserPrice: () => {},
  usdt: 0,
  isLoading: false,
});

type Props = {
  children: React.ReactNode;
};

export const MainProvider: React.FC<Props> = ({ children }) => {
  const [bidPrice, setBidPrice] = useState('');
  const [askPrice, setAskPrice] = useState('');

  const [usdt, setUsdt] = useState(0);
  const [currentMode, setCurrentMode] = useState(MODE.BUY);

  useEffect(() => {
    const socket = new WebSocket(
      'wss://stream.binance.com:9443/ws/ethusdt@depth'
    );

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.b && data.b.length > 0 && data.a && data.a.length > 0) {
        setBidPrice(data.b[0][0]);
        setAskPrice(data.a[0][0]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  const onChangeCurrentMode = () => {
    setCurrentMode((prevMode) =>
      prevMode === MODE.BUY ? MODE.SELL : MODE.BUY
    );
  };

  const convertUserPrice = (value: string) => {
    let price = 0;
    
    if (currentMode === MODE.BUY && bidPrice !== '') {
      price = +value * +bidPrice;
    } else if (askPrice !== '') {
      price = +value * +askPrice;
    }
    setUsdt(price);
  };
  const isLoading = useMemo(() => !bidPrice || !askPrice, [bidPrice, askPrice]);

  const value = {
    bidPrice,
    askPrice,
    onChangeCurrentMode,
    currentMode,
    convertUserPrice,
    usdt,
    isLoading,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
