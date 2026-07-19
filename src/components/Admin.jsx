import { useEffect, useState } from 'react'
import { supabase, isConfigured, fetchHouses, saveHouse, deleteHouse, fetchSettings, saveSettings } from '../supabase.js'

const THEMES = ['coral', 'honey', 'navy', 'rose', 'mint', 'lantern', 'stone', 'shell', 'clapboard', 'log']
// 옛 색 이름 → 새 그림 스타일
const LEGACY = { cream: 'coral', thatch: 'coral', sage: 'honey', butter: 'honey', brick: 'navy', pink: 'rose' }
const normStyle = (h) => (THEMES.includes(h) ? h : LEGACY[h] || 'coral')
const FACES = ['🐨', '🐻', '🐱', '🐶', '🐸', '🐰', '🦊', '🐥', '🐼', '🐧', '🌷', '⭐️', '🏠']

function blankHouse() {
  return { title: '새 집', face: '🏠', year: new Date().getFullYear(), house: 'coral', description: '', tags: [], repo: '', demo: '', image: '', sort: 99 }
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isConfigured) { setChecking(false); return }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setChecking(false) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isConfigured) {
    return <Shell><p className="muted">Supabase가 아직 설정되지 않았어요. supabaseConfig.js를 확인하세요.</p></Shell>
  }
  if (checking) return <Shell><p className="muted">확인 중…</p></Shell>
  if (!session) return <Shell><Login /></Shell>
  return <Shell><Editor onLogout={() => supabase.auth.signOut()} /></Shell>
}

function Shell({ children }) {
  return (
    <div className="admin">
      <div className="admin-head">
        <h1>🔧 마을 관리자</h1>
        <a className="pill" href="#">← 마을 보기</a>
      </div>
      {children}
    </div>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErr(''); setBusy(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
    setBusy(false)
    if (error) setErr('로그인 실패: 이메일/비밀번호를 확인하세요.')
  }

  return (
    <form className="admin-card login" onSubmit={submit}>
      <h2>관리자 로그인</h2>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} required />
      {err && <p className="err">{err}</p>}
      <button className="pill primary" disabled={busy}>{busy ? '로그인 중…' : '로그인'}</button>
    </form>
  )
}

function SettingsCard() {
  const [s, setS] = useState(null)
  const [msg, setMsg] = useState('')
  useEffect(() => { fetchSettings().then(setS).catch(() => setS({ village_name: '', bio: '' })) }, [])
  if (!s) return null
  const save = async () => {
    setMsg('')
    try { await saveSettings(s); setMsg('저장됐어요 ✅') } catch (e) { setMsg('저장 실패: ' + (e.message || '')) }
  }
  return (
    <div className="admin-card">
      <label>마을 제목
        <input value={s.village_name || ''} onChange={(e) => setS({ ...s, village_name: e.target.value })} />
      </label>
      <label>소개 문구
        <textarea rows={2} value={s.bio || ''} onChange={(e) => setS({ ...s, bio: e.target.value })} />
      </label>
      <div className="row end">
        {msg && <span className="admin-msg">{msg}</span>}
        <button className="pill primary" onClick={save}>💾 마을 정보 저장</button>
      </div>
    </div>
  )
}

function Editor({ onLogout }) {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const data = await fetchHouses() || []
      setHouses(data.map((h) => ({ ...h, house: normStyle(h.house) })))
    } catch { setMsg('불러오기 실패') }
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const update = (i, patch) => setHouses((hs) => hs.map((h, j) => (j === i ? { ...h, ...patch } : h)))

  const save = async (i) => {
    setMsg('')
    try {
      const saved = await saveHouse(houses[i])
      update(i, saved)
      setMsg('저장됐어요 ✅')
    } catch (e) { setMsg('저장 실패: ' + (e.message || '')) }
  }

  const remove = async (i) => {
    const h = houses[i]
    if (!window.confirm(`"${h.title}" 집을 삭제할까요?`)) return
    try {
      if (h.id) await deleteHouse(h.id)
      setHouses((hs) => hs.filter((_, j) => j !== i))
      setMsg('삭제됐어요')
    } catch (e) { setMsg('삭제 실패: ' + (e.message || '')) }
  }

  const add = () => setHouses((hs) => [...hs, blankHouse()])

  return (
    <>
      <div className="admin-bar">
        <button className="pill primary" onClick={add}>＋ 새 집 추가</button>
        <button className="pill" onClick={onLogout}>로그아웃</button>
        {msg && <span className="admin-msg">{msg}</span>}
      </div>

      <h3 className="admin-section">마을 정보</h3>
      <SettingsCard />

      <h3 className="admin-section">집 목록</h3>
      {loading ? <p className="muted">불러오는 중…</p> : (
        <div className="admin-list">
          {houses.map((h, i) => (
            <div className="admin-card" key={h.id || `new-${i}`}>
              <div className="row">
                <label>이모지
                  <select value={h.face} onChange={(e) => update(i, { face: e.target.value })}>
                    {FACES.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </label>
                <label className="grow">이름
                  <input value={h.title} onChange={(e) => update(i, { title: e.target.value })} />
                </label>
                <label>연도
                  <input type="number" value={h.year ?? ''} onChange={(e) => update(i, { year: e.target.value })} />
                </label>
              </div>
              <div className="row">
                <label>집 색
                  <select value={h.house} onChange={(e) => update(i, { house: e.target.value })}>
                    {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>
                <label className="grow">태그 (쉼표로 구분)
                  <input value={(h.tags || []).join(', ')} onChange={(e) => update(i, { tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
                </label>
              </div>
              <label>설명
                <textarea value={h.description || ''} onChange={(e) => update(i, { description: e.target.value })} rows={2} />
              </label>
              <div className="row">
                <label className="grow">GitHub 링크
                  <input value={h.repo || ''} onChange={(e) => update(i, { repo: e.target.value })} placeholder="https://github.com/..." />
                </label>
                <label className="grow">데모 링크
                  <input value={h.demo || ''} onChange={(e) => update(i, { demo: e.target.value })} placeholder="https://..." />
                </label>
              </div>
              <div className="row end">
                <button className="pill" onClick={() => remove(i)}>🗑 삭제</button>
                <button className="pill primary" onClick={() => save(i)}>💾 저장</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
