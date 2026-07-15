import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 대표 주소(username.github.io)용: base '/'.
// 저장소 이름은 반드시 '<username>.github.io' 여야 이 주소가 됩니다.
// 만약 일반 저장소(예: portfolio)에 올리면 base를 '/portfolio/'로 바꾸세요.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
