import { useState } from 'react'
import Village from './components/Village.jsx'
import HouseInterior from './components/HouseInterior.jsx'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [night, setNight] = useState(false)

  return (
    <div className={`app${night ? ' night' : ''}`}>
      {selected ? (
        <HouseInterior project={selected} onBack={() => setSelected(null)} />
      ) : (
        <Village onOpen={setSelected} night={night} onToggleNight={() => setNight((v) => !v)} />
      )}
    </div>
  )
}
