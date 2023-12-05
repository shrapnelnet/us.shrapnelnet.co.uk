import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        "/api/register": {
          target: "https://wawlt-register.shrapnelnet.workers.dev",
          changeOrigin: true
        },
        "/api/login": {
            target: "https://wawlt-login.shrapnelnet.workers.dev",
            changeOrigin: true
        },
        "/api/isloggedin": {
            target: "https://wawlt-isloggedin.shrapnelnet.workers.dev",
            changeOrigin: true
        },
        "/api/isspotifyauthenticated": {
            target: "https://wawlt-spotify-auth-isloggedin.shrapnelnet.workers.dev",
            changeOrigin: true
        },
        "/api/setcredentials": {
            target: "https://wawlt-set-spotify-credentials.shrapnelnet.workers.dev",
            changeOrigin: true
        },
        "/api/currentlyplaying": {
            target: "https://wawlt-currently-playing.shrapnelnet.workers.dev",
            changeOrigin: true
        }
    }
  }
})