<template>
  <div v-bind="attrs" :class="ui.wrapper">
    <!-- Header -->
    <header v-if="$slots.header" :class="ui.header">
      <UContainer>
        <slot name="header" />
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
    <footer v-if="$slots.footer" :class="ui.footer">
      <UContainer>
        <slot name="footer" />
      </UContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const config = computed(() => ({
  wrapper: 'flex flex-col flex-grow w-full h-screen bg-gray-50 dark:bg-gray-900',
  header: 'bg-white dark:bg-gray-800 shadow',
  main: {
    base: 'flex-grow overflow-hidden',
    container: 'h-full flex flex-col',
    messages: 'flex-grow overflow-y-auto py-4',
    input: 'py-4'
  },
  footer: 'bg-white dark:bg-gray-800 shadow'
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
