import 'antd/dist/reset.css';
import '../../../public/globals.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Lobby from './components/Lobby';
import AuthPortal from './components/AuthPortal';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement!);

root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <AuthPortal>
            <Lobby />
          </AuthPortal>
        }
      />
    </Routes>
  </BrowserRouter>
);
