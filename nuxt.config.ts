import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  alias: { '#zunder-ui': resolve('./') },
  modules: [
    '@morev/vue-transitions/nuxt'
  ],
  components: [
    { path: '#zunder-ui/components', prefix: 'Z', pathPrefix: false }
  ]
})
