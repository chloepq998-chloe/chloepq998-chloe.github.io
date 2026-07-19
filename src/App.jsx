import { useEffect, useState } from 'react'
import Village from './components/Village.jsx'
import HouseInterior from './components/HouseInterior.jsx'
import Admin from './components/Admin.jsx'
import { fetchHouses, fetchSettings } from './supabase.js'
import { projects as seedProjects, profile } from './projects.js'

function currentPhase() {
  const h = new Date().getHours()
  if (h >= 6 && h < 8) return 'dawn'
  if (h >= 8 && h < 17) return 'day'
  if (h >= 17 && h < 20) return 'dusk'
  return 'night'
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash)
  const [houses, setHouses] = useState(null)
  const [settings, setSettings] = useState(null)
  const [selected, setSelected] = useState(null)
  const [phase, setPhase] = useState(currentPhase())

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    fetchHouses().then((d) => setHouses(d)).catch(() => setHouses(null))
    fetchSettings().then((d) => setSettings(d)).catch(() => setSettings(null))
  }, [])

  // 실시간 자동: 5분마다 시간대 갱신
  useEffect(() => {
    const id = setInterval(() => setPhase(currentPhase()), 5 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  if (route.startsWith('#admin')) {
    return <div className="app day"><Admin /></div>
  }

  const list = houses && houses.length ? houses : seedProjects
  const villageName = settings?.village_name || profile.villageName
  const bio = settings?.bio ?? profile.bio

  return (
    <div className={`app ${phase}`}>
      {selected ? (
        <HouseInterior project={selected} onBack={() => setSelected(null)} />
      ) : (
        <Village houses={list} villageName={villageName} bio={bio} phase={phase} onOpen={setSelected} />
      )}
    </div>
  )
}
