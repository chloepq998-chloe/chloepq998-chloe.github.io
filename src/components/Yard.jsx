// 집 색(테마) → 실제 집 그림 파일. 옛 이름도 가까운 그림으로 매핑.
const STYLE = {
  coral: 'coral', honey: 'honey', navy: 'navy', rose: 'rose', mint: 'mint',
  lantern: 'lantern', stone: 'stone', shell: 'shell', clapboard: 'clapboard', log: 'log',
  cream: 'coral', thatch: 'coral',
  sage: 'honey', butter: 'honey',
  brick: 'navy',
  pink: 'rose',
}

export default function Yard({ project, onOpen }) {
  const file = STYLE[project.house] || 'coral'
  const src = `${import.meta.env.BASE_URL}houses/${file}.svg`

  return (
    <button className="yard" onClick={() => onOpen(project)} aria-label={`${project.title} 집으로 들어가기`}>
      <div className="scene-wrap">
        <img className="house-img" src={src} alt="" aria-hidden="true" loading="lazy" />
      </div>

      <div className="plaque">
        <span className="plaque-face" aria-hidden="true">{project.face}</span>
        <span className="plaque-name">{project.title}</span>
        {project.year ? <span className="plaque-year">{project.year}</span> : null}
      </div>
    </button>
  )
}
