import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test, ItemGet, StoryPage3, Battle, Zombie } from './pages';
import Inventory from './pages/Inventory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Test />} path="/test"/>
        <Route element={<ItemGet />} path="/itemget"/>
        <Route element={<StoryPage3 />} path="/story"/>
        <Route element={<Battle />} path="/battle"/>
        <Route element={<Zombie />} path="/zombie"/>
        <Route element={<Inventory />} path="/inventory"/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
