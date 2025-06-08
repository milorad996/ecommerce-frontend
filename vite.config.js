import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import graphqlPlugin from 'vite-plugin-graphql'

export default defineConfig({
  plugins: [
    react(),
    graphqlPlugin,
  ],
})
