const THEMES = {
  cream: { roof: '#B9814E', roofD: '#8E6238', ridge: '#7C5330', body: '#EFE3C8', bodyD: '#DAC198', door: '#C24E3C' },
  sage: { roof: '#C7A56B', roofD: '#A5834B', ridge: '#8E6E3A', body: '#97A46E', bodyD: '#7C8A5B', door: '#B98A4F' },
  navy: { roof: '#3E4E5A', roofD: '#2C3841', ridge: '#222C33', body: '#4E6E8A', bodyD: '#3B5470', door: '#C24E3C' },
  thatch: { roof: '#A9784C', roofD: '#835B34', ridge: '#6F4D2C', body: '#D8C79E', bodyD: '#BBA778', door: '#B33F32' },
  butter: { roof: '#E7B84E', roofD: '#C9962F', ridge: '#A87D24', body: '#F3E7C4', bodyD: '#DBCB98', door: '#C98A52' },
  pink: { roof: '#E79FB4', roofD: '#C77890', ridge: '#A85F76', body: '#FBEAF0', bodyD: '#E9C9D5', door: '#D4537E' },
}

export default function Yard({ project, onOpen }) {
  const t = THEMES[project.house] || THEMES.cream
  const uid = project.title.replace(/[^a-zA-Z0-9]/g, '') || 'y'

  return (
    <button className="yard" onClick={() => onOpen(project)} aria-label={`${project.title} 집으로 들어가기`}>
      <div className="scene-wrap">
        <svg className="scene" viewBox="0 0 300 210" role="img" aria-hidden="true">
          <defs>
            <linearGradient id={`grass-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#AEd06a" />
              <stop offset="1" stopColor="#8FBB50" />
            </linearGradient>
            <linearGradient id={`roof-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={t.roof} />
              <stop offset="1" stopColor={t.roofD} />
            </linearGradient>
            <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={t.body} />
              <stop offset="0.7" stopColor={t.body} />
              <stop offset="1" stopColor={t.bodyD} />
            </linearGradient>
            <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E7F4F8" />
              <stop offset="1" stopColor="#BEDCE8" />
            </linearGradient>
          </defs>

          {/* 잔디 마당 */}
          <rect x="6" y="6" width="288" height="198" rx="22" fill={`url(#grass-${uid})`} stroke="#7CA845" strokeWidth="2" />
          <ellipse cx="150" cy="26" rx="150" ry="26" fill="#FFFFFF" opacity="0.10" />

          {/* 집 그림자 */}
          <ellipse cx="150" cy="176" rx="92" ry="15" fill="#000000" opacity="0.10" />

          {/* 뒷 나무 (살랑) */}
          <g className="tree">
            <rect x="250" y="120" width="12" height="42" rx="5" fill="#A9744A" />
            <circle cx="256" cy="112" r="22" fill="#77B049" />
            <circle cx="242" cy="124" r="15" fill="#88C258" />
            <circle cx="270" cy="122" r="15" fill="#88C258" />
            <circle cx="258" cy="118" r="9" fill="#9BD067" opacity="0.7" />
          </g>

          {/* 뒷 산울타리 */}
          <ellipse cx="70" cy="168" rx="46" ry="18" fill="#6A9A40" />
          <ellipse cx="235" cy="168" rx="40" ry="16" fill="#6A9A40" />

          {/* 굴뚝 + 연기 */}
          <rect x="176" y="84" width="12" height="22" rx="3" fill={t.roofD} />
          <g className="smoke">
            <circle cx="182" cy="80" r="4" fill="#FFFFFF" opacity="0.75" />
            <circle cx="182" cy="80" r="5" fill="#FFFFFF" opacity="0.6" />
            <circle cx="182" cy="80" r="6" fill="#FFFFFF" opacity="0.45" />
          </g>

          {/* 지붕 */}
          <path
            d="M92,118 L92,110 C92,86 118,76 150,76 C182,76 208,86 208,110 L208,118 Z"
            fill={`url(#roof-${uid})`}
            stroke={t.ridge}
            strokeWidth="1.5"
          />
          <g stroke={t.ridge} strokeWidth="1" opacity="0.4">
            <line x1="120" y1="88" x2="116" y2="116" />
            <line x1="140" y1="82" x2="138" y2="116" />
            <line x1="160" y1="82" x2="162" y2="116" />
            <line x1="180" y1="88" x2="184" y2="116" />
          </g>
          <rect x="88" y="112" width="124" height="9" rx="4.5" fill={t.ridge} />

          {/* 몸통 */}
          <rect x="108" y="119" width="84" height="53" rx="10" fill={`url(#body-${uid})`} stroke={t.bodyD} strokeWidth="1.5" />

          {/* 창문 (밤에 불빛) */}
          <g>
            <rect x="117" y="128" width="18" height="18" rx="3" fill={`url(#glass-${uid})`} stroke={t.bodyD} strokeWidth="1.5" />
            <rect className="window-light" x="117" y="128" width="18" height="18" rx="3" fill="#FFE28A" />
            <line x1="126" y1="128" x2="126" y2="146" stroke={t.bodyD} strokeWidth="1.2" />
            <line x1="117" y1="137" x2="135" y2="137" stroke={t.bodyD} strokeWidth="1.2" />
          </g>
          <g>
            <rect x="165" y="128" width="18" height="18" rx="3" fill={`url(#glass-${uid})`} stroke={t.bodyD} strokeWidth="1.5" />
            <rect className="window-light" x="165" y="128" width="18" height="18" rx="3" fill="#FFE28A" />
            <line x1="174" y1="128" x2="174" y2="146" stroke={t.bodyD} strokeWidth="1.2" />
            <line x1="165" y1="137" x2="183" y2="137" stroke={t.bodyD} strokeWidth="1.2" />
          </g>

          {/* 문 */}
          <path d="M138,172 L138,148 Q138,135 150,135 Q162,135 162,148 L162,172 Z" fill={t.door} stroke={t.ridge} strokeWidth="1.2" />
          <circle cx="158" cy="155" r="2" fill="#FFE28A" />

          {/* 디딤돌 */}
          <ellipse cx="150" cy="184" rx="9" ry="4" fill="#E6D6B0" />
          <ellipse cx="150" cy="196" rx="10" ry="4" fill="#E6D6B0" />

          {/* 앞 산울타리 + 꽃 */}
          <ellipse cx="44" cy="188" rx="38" ry="17" fill="#79AC48" />
          <ellipse cx="150" cy="196" rx="52" ry="17" fill="#79AC48" />
          <ellipse cx="256" cy="188" rx="38" ry="17" fill="#79AC48" />
          <ellipse cx="44" cy="184" rx="38" ry="12" fill="#8AC258" opacity="0.6" />
          <ellipse cx="256" cy="184" rx="38" ry="12" fill="#8AC258" opacity="0.6" />
          <g className="flower">
            <circle cx="34" cy="182" r="3.4" fill="#E4574C" />
            <circle cx="40" cy="180" r="3.4" fill="#F0A93C" />
            <circle cx="262" cy="182" r="3.4" fill="#E77FA6" />
            <circle cx="252" cy="184" r="3.4" fill="#F0D24C" />
          </g>
        </svg>
      </div>

      <div className="plaque">
        <span className="plaque-face" aria-hidden="true">{project.face}</span>
        <span className="plaque-name">{project.title}</span>
        <span className="plaque-year">{project.year}</span>
      </div>
    </button>
  )
}
