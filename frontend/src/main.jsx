import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProSidebarProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ProSidebarProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
