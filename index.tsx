
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global error handler for easier debugging on production deployments
window.onerror = (message, source, lineno, colno, error) => {
  console.error("Global Error Caught: ", message, " at ", source, ":", lineno);
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  const errorMsg = "Could not find root element to mount to. Ensure your index.html has <div id='root'></div>";
  console.error(errorMsg);
  throw new Error(errorMsg);
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
