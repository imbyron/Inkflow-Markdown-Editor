import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReactGA from 'react-ga4';

// 从环境变量中获取 Measurement ID (确保你已在 .env 文件中设置 VITE_GA_MEASUREMENT_ID)
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  // 发送初始的 pageview，因为 App.tsx 是主要的应用视图
  ReactGA.send({ 
    hitType: "pageview", 
    page: window.location.pathname + window.location.search, 
    title: document.title // 使用当前文档标题
  });
  console.log("Google Analytics initialized with ID:", GA_MEASUREMENT_ID);
} else {
  console.warn("Google Analytics Measurement ID (VITE_GA_MEASUREMENT_ID) not found in .env file. GA not initialized.");
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
    