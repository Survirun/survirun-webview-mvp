import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test, ItemGet, StoryPage3, Battle } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Test />} path="/test"/>
        <Route element={<ItemGet />} path="/itemget"/>
        <Route element={<StoryPage3 />} path="/story"/>
        <Route element={<Battle />} path="/battle"/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
