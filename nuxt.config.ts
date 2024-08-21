import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  alias: { '#zunder-ui': resolve('./') },
  components: [
    { path: '#zunder-ui/components', prefix: 'Z', pathPrefix: false }
  ]
})
