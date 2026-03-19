import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ExplorePage } from './pages/ExplorePage'
import { HighscorePage } from './pages/HighscorePage'
import { MyMapPage } from './pages/MyMapPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SuggestionsPage } from './pages/SuggestionsPage'
import { TravelerSelectionPage } from './pages/TravelerSelectionPage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<TravelerSelectionPage />} />
        <Route path="mitt-kart" element={<MyMapPage />} />
        <Route path="utforsk" element={<ExplorePage />} />
        <Route path="highscore" element={<HighscorePage />} />
        <Route path="ferieforslag" element={<SuggestionsPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
