import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoryPage, Test, Item } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoryPage />} path="/"/>
        <Route element={<Test />} path="/test"/>
        <Route element={<Item />} path="/test/item"/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
