
<template>
  <TransitionExpand axis="x">
    <div v-if="model" :class="ui.wrapper" v-bind="attrs">
      <slot />
    </div>
  </TransitionExpand>
</template>

<script setup lang="ts">
const config = computed(() => ({
  wrapper: 'bg-white dark:bg-gray-800/50 h-screen border-r border-gray-200 dark:border-gray-700 p-4 w-72 max-w-72 flex flex-col gap-y-4 fixed top-0 left-0 md:relative z-20'
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

const model = defineModel('open', {
  type: Boolean,
  default: false
})

const { ui, attrs } = useUI(
  'chat.collapsibleTray',
  toRef(props, 'ui'),
  config,
  toRef(props, 'class'),
  true
)
</script>