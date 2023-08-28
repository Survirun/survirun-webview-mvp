import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test, ItemGet, StoryPage3, Battle, Zombie, SubCharacter, SubCharacterCheck } from './pages';
import Inventory from './pages/Inventory';
import AlertDialog from './module/Alert/AlertDialog';
import InventorySelectDialog from './module/InventorySelect/InventoryDialog';

function App() {
  return (
    <AlertDialog>
    <InventorySelectDialog>
      <BrowserRouter>
        <Routes>
          <Route element={<Test />} path="/test"/>
          <Route element={<ItemGet />} path="/itemget"/>
          <Route element={<StoryPage3 />} path="/story"/>
          <Route element={<Battle />} path="/battle"/>
          <Route element={<Zombie />} path="/zombie"/>
          <Route element={<Inventory />} path="/inventory"/>
          <Route element={<SubCharacter />} path="/subcharacter"/>
          <Route element={<SubCharacterCheck />} path="/subcharacterCheck"/>
        </Routes>
      </BrowserRouter>
    </InventorySelectDialog>
    </AlertDialog>
  )
}

export default App
