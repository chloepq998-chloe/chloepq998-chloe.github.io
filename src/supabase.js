import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig.js'

export const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
export const supabase = isConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null

// 마을 집 목록 읽기 (누구나 가능). 실패하면 null 반환 → 호출부에서 시드로 폴백.
export async function fetchHouses() {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .order('sort', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

// 마을 설정(제목·소개)
export async function fetchSettings() {
  if (!supabase) return null
  const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single()
  if (error) throw error
  return data
}

export async function saveSettings(s) {
  const { data, error } = await supabase
    .from('settings')
    .update({ village_name: s.village_name, bio: s.bio })
    .eq('id', 1)
    .select()
    .single()
  if (error) throw error
  return data
}

// --- 관리자용 (로그인 필요) ---
export async function saveHouse(house) {
  const row = {
    title: house.title,
    face: house.face,
    year: house.year === '' || house.year == null ? null : Number(house.year),
    house: house.house,
    description: house.description,
    tags: house.tags,
    repo: house.repo,
    demo: house.demo,
    image: house.image,
    sort: house.sort ?? 0,
  }
  const query = house.id
    ? supabase.from('houses').update(row).eq('id', house.id).select().single()
    : supabase.from('houses').insert(row).select().single()
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function deleteHouse(id) {
  const { error } = await supabase.from('houses').delete().eq('id', id)
  if (error) throw error
}
