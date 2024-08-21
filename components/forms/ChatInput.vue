<template>
  <UForm ref="chatInputFormRef" :state="state" @submit="handleSubmit">
    <div class="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-3xl">
      <UTextarea
        v-model="state.chatInputText"
        size="xl"
        :rows="1"
        :placeholder="placeholder"
        class="flex-grow resize-none"
        @keydown.enter.prevent="handleEnterKey"
      />
      <UButton
        color="primary"
        :loading="loading"
        :disabled="!state.chatInputText?.trim()"
        type="submit"
        size="xl"
        icon="i-codicon:arrow-up"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

defineProps({
  placeholder: {
    type: String,
    default: 'Type your message here...'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (!state.chatInputText?.trim()) return
  emit('submit', state.chatInputText)
  state.chatInputText = ''
}

const state = reactive({
  chatInputText: undefined
})

const chatInputFormRef = ref()

const handleEnterKey = (event: KeyboardEvent) => {
  if (event.shiftKey) {
    // Allow Shift+Enter for new lines
    return
  }
  chatInputFormRef.value?.submit()
}
</script>