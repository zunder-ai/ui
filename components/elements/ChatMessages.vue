<template>
  <div class="grid grid-cols-6 gap-y-2">
    <ZChatMessage v-for="(message, index) in messages" :key="index" :message="message" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { ChatMessage } from '../../types/chat'

defineProps({
  messages: {
    type: Array as PropType<ChatMessage[]>,
    required: true
  }
})
</script>