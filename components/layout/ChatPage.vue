<template>
  <div v-bind="attrs" :class="ui.wrapper">
    <!-- Header -->
    <header :class="ui.header.base">
      <UContainer>
        <div :class="ui.header.container">
          <h1 :class="ui.header.title">
            <span class="font-bold">ZUNDER</span> <span
              class="font-light italic"
            >AI CHAT</span>
          </h1>
          <div :class="ui.header.buttons">
            <UButton color="gray" variant="ghost" icon="i-heroicons-cog-6-tooth" />
            <ZColorModeButton />
            <slot name="header-right" />
          </div>
        </div>
      </UContainer>
    </header>

    <!-- Main chat area -->
    <main :class="ui.main.base">
      <UContainer :class="ui.main.container">
        <div :class="ui.main.messages">
          <slot name="messages" />
        </div>
        <div :class="ui.main.input">
          <slot name="input" />
        </div>
      </UContainer>
    </main>

    <!-- Footer -->
    <footer :class="ui.footer.base">
      <UContainer>
        <div :class="ui.footer.container">
          <slot name="footer" />
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const config = computed(() => ({
  wrapper: 'flex flex-col h-screen bg-gray-50 dark:bg-gray-900',
  header: {
    base: 'bg-white dark:bg-gray-800 shadow',
    container: 'flex justify-between items-center py-4',
    title: 'text-2xl text-gray-900 dark:text-white font-bold',
    buttons: 'flex items-center space-x-4'
  },
  main: {
    base: 'flex-grow overflow-hidden',
    container: 'h-full flex flex-col',
    messages: 'flex-grow overflow-y-auto py-4',
    input: 'py-4'
  },
  footer: {
    base: 'bg-white dark:bg-gray-800 shadow',
    container: 'py-2 text-center text-sm text-gray-500 dark:text-gray-400'
  }
}))

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined
  },
  ui: {
    type: Object as PropType<Partial<typeof config.value>>,
    default: () => ({})
  }
})

const { ui, attrs } = useUI(
  'chat.page',
  toRef(props, 'ui'),
  config,
  toRef(props, 'class'),
  true
)
</script>