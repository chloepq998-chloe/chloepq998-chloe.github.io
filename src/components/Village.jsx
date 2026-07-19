import Yard from './Yard.jsx'

const SKY_ICON = { day: '☀️', dawn: '🌅', dusk: '🌇', night: '🌙' }

export default function Village({ houses, villageName, bio, phase, onOpen }) {
  return (
    <div className="village">
      <div className="sky">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="sun-moon" aria-hidden="true">{SKY_ICON[phase] || '☀️'}</div>
      </div>

      <header className="village-header">
        <div className="signboard">
          <h1>{villageName}</h1>
          <p>{bio}</p>
        </div>
      </header>

      <main className="yard-grid">
        {houses.map((p) => (
          <Yard key={p.id || p.title} project={p} onOpen={onOpen} />
        ))}
      </main>

      <footer className="village-footer">
        <p>집을 눌러 안으로 들어가 보세요 · {houses.length}채의 집</p>
      </footer>
    </div>
  )
}
