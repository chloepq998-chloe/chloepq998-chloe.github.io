import { useEffect } from 'react'

export default function HouseInterior({ project, onBack }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onBack()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])

  return (
    <div className="interior">
      <button className="pill back" onClick={onBack}>← 마을로 나가기</button>

      <div className="interior-card">
        <div className="interior-visual">
          {project.image ? (
            <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={`${project.title} 스크린샷`} />
          ) : (
            <div className="placeholder" aria-hidden="true">
              <span className="placeholder-face">{project.face}</span>
              <span className="placeholder-init">{project.title.slice(0, 2)}</span>
            </div>
          )}
        </div>

        <div className="interior-body">
          <div className="interior-title">
            <span className="face" aria-hidden="true">{project.face}</span>
            <h2>{project.title}</h2>
            <span className="year-badge">{project.year}</span>
          </div>

          <p className="interior-desc">{project.description}</p>

          {project.tags?.length > 0 && (
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <div className="link-row">
            {project.repo && (
              <a className="pill primary" href={project.repo} target="_blank" rel="noreferrer">GitHub 코드</a>
            )}
            {project.demo && (
              <a className="pill primary" href={project.demo} target="_blank" rel="noreferrer">라이브 데모 ↗</a>
            )}
            {!project.repo && !project.demo && (
              <span className="muted">아직 링크가 없어요 — projects.js에 채워보세요.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
