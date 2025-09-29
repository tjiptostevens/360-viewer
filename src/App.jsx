import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import Gallery from './page/gallery'
import Home from './page/home'
import Viewer360 from './page/viewer360'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/viewer' element={<Viewer360 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
