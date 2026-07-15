// ★ 여기만 고치면 마을이 바뀝니다.
// 프로젝트 하나 = 집 한 채. 아래 배열에 항목을 추가/수정하세요.
//
//  title       집 이름(명패에 표시)
//  face        명패에 붙일 동물 이모지 (아무거나)
//  year        연도 배지
//  description 집 안(상세)에 보일 설명
//  tags        기술/키워드 칩 (배열)
//  repo        GitHub 링크 (없으면 '' 또는 생략 → 버튼 숨김)
//  demo        라이브 데모 링크 (없으면 '' 또는 생략 → 버튼 숨김)
//  image       public/ 안 스크린샷 파일명 (없으면 이니셜 플레이스홀더)
//  house       집 색 테마: 'cream' | 'sage' | 'navy' | 'thatch' | 'pink' | 'butter'

export const profile = {
  name: 'Chloe',
  villageName: 'Chloe의 코딩 마을',
  bio: '내가 만든 것들이 사는 작은 마을이에요. 집을 눌러 안으로 들어와 보세요.',
  github: 'https://github.com/chloepq998-chloe', // TODO: GitHub 아이디로 바꾸기
  email: 'chloepq998@naver.com',
}

export const projects = [
  {
    title: 'vocab-app',
    face: '🐨',
    year: 2025,
    house: 'cream',
    description: '단어를 외우고 복습하는 학습 앱. TODO: 무엇을 만들었고 뭘 배웠는지 적어보세요.',
    tags: ['학습', 'React'],
    repo: 'https://github.com/chloepq998-chloe/vocab-app', // TODO
    demo: '',
    image: '',
  },
  {
    title: 'wing-wife',
    face: '🐻',
    year: 2025,
    house: 'sage',
    description: 'wing-wife 프로젝트. TODO: 설명을 채워주세요.',
    tags: ['웹앱'],
    repo: 'https://github.com/chloepq998-chloe/wing-wife', // TODO
    demo: '',
    image: '',
  },
  {
    title: 'yunsa-review',
    face: '🐱',
    year: 2025,
    house: 'navy',
    description: '리뷰 관련 프로젝트. TODO: 설명을 채워주세요.',
    tags: ['리뷰'],
    repo: 'https://github.com/chloepq998-chloe/yunsa-review', // TODO
    demo: '',
    image: '',
  },
  {
    title: 'school-lost-and-found',
    face: '🐶',
    year: 2024,
    house: 'thatch',
    description: '학교 분실물 찾기 서비스. TODO: 설명을 채워주세요.',
    tags: ['서비스'],
    repo: 'https://github.com/chloepq998-chloe/school-lost-and-found', // TODO
    demo: '',
    image: '',
  },
  {
    title: 'RobloxTycoon',
    face: '🐸',
    year: 2024,
    house: 'butter',
    description: 'Roblox 타이쿤 게임. TODO: 설명을 채워주세요.',
    tags: ['게임', 'Lua'],
    repo: 'https://github.com/chloepq998-chloe/RobloxTycoon', // TODO
    demo: '',
    image: '',
  },
]
