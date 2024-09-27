import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Categoria from './Components/Categoria/Categoria.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intranet" element={<Dashboard />}>
          {/* Ruta hija para Categoria */}
          <Route path="categoria" element={<Categoria />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
