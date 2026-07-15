import Yard from './Yard.jsx'
import { projects, profile } from '../projects.js'

export default function Village({ onOpen, night, onToggleNight }) {
  return (
    <div className="village">
      <div className="sky">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="sun-moon" aria-hidden="true">{night ? '🌙' : '☀️'}</div>
      </div>

      <header className="village-header">
        <div className="signboard">
          <h1>{profile.villageName}</h1>
          <p>{profile.bio}</p>
        </div>
        <div className="header-actions">
          <button className="pill" onClick={onToggleNight} aria-pressed={night}>
            {night ? '☀️ 낮으로' : '🌙 밤으로'}
          </button>
          {profile.github && (
            <a className="pill" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          )}
          {profile.email && (
            <a className="pill" href={`mailto:${profile.email}`}>메일</a>
          )}
        </div>
      </header>

      <main className="yard-grid">
        {projects.map((p) => (
          <Yard key={p.title} project={p} onOpen={onOpen} />
        ))}
      </main>

      <footer className="village-footer">
        <p>집을 눌러 안으로 들어가 보세요 · {projects.length}채의 집</p>
      </footer>
    </div>
  )
}
