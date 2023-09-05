import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test, ItemGet, StoryPage3, Battle, Zombie, SubCharacter, SubCharacterCheck, DeathPage } from './pages';
import Inventory from './pages/Inventory';
import AlertDialog from './module/Alert/AlertDialog';
import InventorySelectDialog from './module/InventorySelect/InventoryDialog';
import './App.css'

function App() {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 드래그 이벤트를 막습니다.
  };
  return (
    <div onDragStart={handleDragStart} draggable={true}>
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
          <Route element={<DeathPage/>} path="deathPage"/>
        </Routes>
      </BrowserRouter>
    </InventorySelectDialog>
    </AlertDialog>
    </div>
  )
}

export default App
