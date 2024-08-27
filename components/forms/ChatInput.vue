<template>
  <UForm ref="chatInputFormRef" v-bind="attrs" :state="state" @submit="handleSubmit">
    <div :class="ui.wrapper">
      <UTextarea
        v-model="state.chatInputText"
        size="xl"
        :rows="1"
        :placeholder="placeholder"
        :class="ui.textarea"
        @keydown.enter.prevent="handleEnterKey"
      />
      <UButton
        color="primary"
        :loading="loading"
        :disabled="!state.chatInputText?.trim()"
        type="submit"
        size="xl"
        icon="i-codicon:arrow-up"
        :class="ui.button"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { ref, reactive, type PropType } from 'vue'

const config = computed(() => ({
  wrapper: 'flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-3xl',
  textarea: 'flex-grow resize-none',
  button: ''
}))

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Type your message here...'
  },
  loading: {
    type: Boolean,
    default: false
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
  'chat.input',
  toRef(props, 'ui'),
  config,
  toRef(props, 'class'),
  true
)

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