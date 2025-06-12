import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductsPage from './pages/ProductsPage'
import NavbarComponent from './components/NavbarComponent'
import ClothesPage from './pages/ClothesPage'
import TechPage from './pages/TechPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import { CartContext } from './contexts/CartContext'
import CartOverlay from './components/CartOverlay'
import { useContext } from 'react'

function App() {
  const { isOverlayOpen } = useContext(CartContext);

  return (
    <div className='main-content'>
      <NavbarComponent />
      {isOverlayOpen && <CartOverlay />}
      <Routes>
        <Route path="/all" element={<ProductsPage />} />
        <Route path="/clothes" element={<ClothesPage />} />
        <Route path="/tech" element={<TechPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
