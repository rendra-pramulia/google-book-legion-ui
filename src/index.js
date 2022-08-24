import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, theme, LoginPage } from 'legion-ui';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import Favorit from './pages/Favorit';
import Beranda from './pages/Beranda';
import Detail from './pages/Detail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Beranda />} />
            <Route path='/:id' element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
