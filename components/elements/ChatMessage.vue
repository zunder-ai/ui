<template>
  <div
    :class="[
      'p-3 rounded-lg',
      message.isUser ? 'col-start-6' : 'col-start-1 col-end-3'
    ]"
  >
    <div
      :class="[
        'flex items-center',
        message.isUser ? 'justify-start flex-row-reverse' : 'flex-row'
      ]"
    >
      <UAvatar
        v-if="message.isUser"
        src="/avatar.png"
        size="sm"
        :ui="{
          background: 'bg-gray-500',
          text: 'text-white font-medium',
        }"
      />
      <div
        :class="[
          'relative text-sm py-2 px-4 shadow rounded-xl',
          message.isUser ? 'mr-3 bg-gray-100 dark:bg-gray-800' : 'ml-3'
        ]"
      >
        <div>{{ message.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: Object,
    required: true
  }
})
</script>