<template>
  <div
    v-bind="attrs"
    :class="[
      ui.wrapper.base,
      message.isUser ? ui.wrapper.user : ui.wrapper.assistant,
    ]"
  >
    <div
      :class="[
        ui.container.base,
        message.isUser ? ui.container.user : ui.container.assistant,
      ]"
    >
      <UAvatar
        v-if="message.isUser"
        src="/avatar.png"
        size="sm"
        :ui="ui.avatar"
      />
      <div
        :class="[
          ui.message.base,
          message.isUser ? ui.message.user : ui.message.assistant,
        ]"
      >
        <div>{{ message.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const config = computed(() => ({
  wrapper: {
    base: 'p-3 rounded-lg',
    user: 'col-start-6',
    assistant: 'col-start-1 col-end-3'
  },
  container: {
    base: 'flex items-center',
    user: 'justify-start flex-row-reverse',
    assistant: 'flex-row'
  },
  avatar: {
    background: 'bg-gray-500',
    text: 'text-white font-medium'
  },
  message: {
    base: 'relative text-sm py-2 px-4 shadow rounded-xl',
    user: 'mr-3 bg-gray-100 dark:bg-gray-800',
    assistant: 'ml-3 bg-gray-50 dark:bg-gray-800'
  }
}))

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
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
  'chat.message',
  toRef(props, 'ui'),
  config,
  toRef(props, 'class'),
  true
)
</script>
