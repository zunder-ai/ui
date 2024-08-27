export default defineAppConfig({
  myLayer: {
    name: '@zunderai/ui'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
