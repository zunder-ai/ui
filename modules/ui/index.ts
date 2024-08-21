import { createResolver, defineNuxtModule, addImportsDir, hasNuxtModule, addComponentsDir, addPlugin } from '@nuxt/kit'


export default defineNuxtModule({
    meta: {
        name: 'zunder-ui',
        configKey: 'zunderUi',
        compatibility: {
            nuxt: '^3.10.0'
        }
    },
})