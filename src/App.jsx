import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import GuessTheWordSettings from './components/GuessTheWordSettings'
import GuessTheWordGame from './components/GuessTheWordGame'
import GuessTheWordResults from './components/GuessTheWordResults'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guess-the-word/settings" element={<GuessTheWordSettings />} />
        <Route path="/guess-the-word/game" element={<GuessTheWordGame />} />
        <Route path="/guess-the-word/results" element={<GuessTheWordResults />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

