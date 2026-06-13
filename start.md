npm run build
npx serve dist -l 4180
npx cloudflared tunnel --url http://localhost:4180