import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';

// Inicializa o aplicativo React no elemento raiz do index.html.
createRoot(document.getElementById('root')).render(<App/>);
