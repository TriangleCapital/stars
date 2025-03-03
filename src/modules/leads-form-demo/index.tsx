import 'antd/dist/reset.css';
import '../../../public/globals.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import LeadsForm from './components/LeadsForm';
import { useEffect } from 'react';
import TermsAndConditions from './components/TermsAndConditions';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement!);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/solicitar-informacion" element={<LeadsForm />} />
      <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
    </Routes>
  </BrowserRouter>
);

function Lobby() {
  useEffect(() => window.location.replace('https://novafinance360.es/'), []);

  return <></>;
}
