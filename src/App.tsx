import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test, ItemGet, StoryPage, Battle, SubCharacter, SubCharacterCheck, DeathPage, Lobby, ZombieHPDown, MakeStroy, BattlePage } from './pages';
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
          <Route element={<StoryPage />} path="/story"/>
          <Route element={<Battle />} path="/battle"/>
          <Route element={<Inventory />} path="/inventory"/>
          <Route element={<SubCharacter />} path="/subcharacter"/>
          <Route element={<SubCharacterCheck />} path="/subcharacterCheck"/>
          <Route element={<DeathPage/>} path="deathPage"/>
          <Route element={<Lobby/>} path="lobby"/>
          <Route element={<ZombieHPDown/>} path="zombie-hp-down"/>
          <Route element={<MakeStroy/>} path="/makeStory"/>
          <Route element={<BattlePage/>} path="/battlePage"/>
        </Routes>
      </BrowserRouter>
    </InventorySelectDialog>
    </AlertDialog>
    </div>
  )
}

export default App
