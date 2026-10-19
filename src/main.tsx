import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import './styles/toanCuc.css';
import './styles/nenTrang.css';
import App from './App';
import { store } from './app/store';
import { ThemeProvider } from './contexts/ThemeContext';

const root = document.getElementById('root');
if (!root) throw new Error('Không tìm thấy phần tử root.');

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
