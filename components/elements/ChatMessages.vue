<template>
  <div v-bind="attrs" :class="ui.wrapper">
    <ZChatMessage v-for="(message, index) in messages" :key="index" :message="message" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { ChatMessage } from '../../types/chat'

const config = computed(() => ({
  wrapper: 'grid grid-cols-6 gap-y-2'
}))

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  messages: {
    type: Array as PropType<ChatMessage[]>,
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
  'chat.messages',
  toRef(props, 'ui'),
  config,
  toRef(props, 'class'),
  true
)
</script>