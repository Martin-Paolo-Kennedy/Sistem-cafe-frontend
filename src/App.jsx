import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Home from './Components/Home/Home.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Categoria from './Components/Categoria/Categoria.jsx';
import Producto from './Components/Producto/Producto.jsx';
import Proveedor from './Components/Proveedor/Proveedor.jsx';
import Cliente from './Components/Cliente/Cliente.jsx';
import Usuario from './Components/Usuario/Usuario.jsx';
import Orden from './Components/Orden/Orden.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* La ruta del dashboard es "/intranet", y las rutas internas se manejan por el Outlet */}
        <Route path="/intranet" element={<Dashboard />}>
          <Route path="categoria" element={<Categoria />} /> {/* Ruta relativa */}
          <Route path="producto" element={<Producto />} /> {/* Ruta relativa */}
          <Route path="proveedor" element={<Proveedor />} /> {/* Ruta relativa */}
          <Route path="cliente" element={<Cliente />} /> {/* Ruta relativa */}
          <Route path="usuario" element={<Usuario />} /> {/* Ruta relativa */}
          <Route path="orden" element={<Orden />} /> {/* Ruta relativa */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
