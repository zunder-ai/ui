<template>
  <nav
    ref="sidebar"
    v-bind="attrs"
    :class="[ui.wrapper.base, ui.wrapper[props.side]]"
  >
    <!-- Sidebar -->
    <div
      :class="[
        ui.container.base,
        ui.container[props.side],
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ]"
    >
      <!-- Sidebar shadow -->
      <div
        :class="[ui.shadow.base, ui.shadow[props.side]]"
        style="
          opacity: 0;
          transform: translate3d(0px, 0px, 0px);
          backface-visibility: hidden;
        "
        :style="{ opacity: sidebarShadowOpacity }"
      />
      <!-- Sidebar background -->
      <div
        v-if="props.side === 'left'"
        ref="sidebarBackground"
        :class="[ui.background.base, ui.background[props.side]]"
        style="opacity: 0; transform: translateX(-25%) translateZ(0px)"
      />
      <div
        v-else
        ref="sidebarBackground"
        :class="[ui.background.base, ui.background[props.side]]"
        style="opacity: 0; transform: translateX(25%) translateZ(0px)"
      />
      <!-- Sidebar content -->
      <div :class="[ui.content.base]">
        <div
          v-if="props.side === 'left'"
          ref="sidebarContent"
          :class="[ui.content.container, isOpen ? 'pointer-events-auto' : 'pointer-events-none']"
          style="
            opacity: 0;
            filter: blur(2px);
            transform: translateX(-15%) translateZ(0px);
          "
        >
          <slot name="content" />
        </div>
        <div
          v-else
          ref="sidebarContent"
          :class="[ui.content.container, isOpen ? 'pointer-events-auto' : 'pointer-events-none']"
          style="
            opacity: 0;
            filter: blur(2px);
            transform: translateX(15%) translateZ(0px);
          "
        >
          <slot name="content" />
        </div>
      </div>
      <!-- Sidebar tools -->
      <div :class="[ui.tools]">
        <slot name="tools" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const config = computed(() => ({
  wrapper: {
    base: 'z-20 h-screen pointer-events-none md:pointer-events-auto fixed w-[4.5rem] top-0',
    left: 'left-0',
    right: 'right-0'
  },
  container: {
    base: 'fixed bottom-0 top-0 z-20 px-3 pb-4 pt-2.5 w-[18rem] will-change-transform',
    left: 'left-0',
    right: 'right-0'
  },
  shadow: {
    base: 'from-black/15 to-black/0 w-[18rem] fixed top-0 h-full to-80% transition-opacity hidden md:block pointer-events-none',
    left: 'left-0 bg-gradient-to-r',
    right: 'right-0 bg-gradient-to-l'
  },
  background: {
    base: 'w-[18rem] bg-white border-primary-300 absolute will-change-transform overflow-hidden backdrop-blur border-t-0.5 border-b-0.5 bottom-1 top-1 shadow-[-80px_200px_120px_0_rgba(0,0,0,0.1),_-8px_20px_48px_0_rgba(0,0,0,0.15)]',
    left: 'left-0 rounded-r-xl border-r-0.5',
    right: 'right-0 rounded-l-xl border-l-0.5'
  },
  content: {
    base: 'flex h-full flex-col gap-2 pointer-events-none',
    container: 'flex min-h-0 flex-1 flex-col gap-4'
  },
  tools: ''
}))

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  side: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  animationDuration: {
    type: Number,
    default: 150
  },
  animationEasing: {
    type: String as PropType<'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'>,
    default: 'linear'
  },
  leaveDelay: {
    type: Number,
    default: 300
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

const model = defineModel('open', {
  type: Boolean,
  default: false
})

const { ui, attrs } = useUI(
  'chat.sidebar',
  toRef(props, 'ui'),
  config,
  toRef(props, 'class'),
  true
)

const sideTransform = computed(() =>
  props.side === 'left'
    ? { background: -25, content: -15 }
    : { background: 25, content: 15 }
)

const isOpen = ref(false)
const sidebarShadowOpacity = ref(0)
const sidebarBackground = ref<HTMLDivElement | null>(null)
const sidebarContent = ref<HTMLDivElement | null>(null)
const sidebar = ref<HTMLElement | null>(null)
const leaveTimeout = ref<NodeJS.Timeout | null>(null)

watch(model, (value) => {
  if (isOpen.value !== value) {
    if (value) {
      handleMouseEnter()
    } else {
      closeSidebar()
    }
  }
})

watch(isOpen, (value) => {
  if (model.value !== value) {
    model.value = value
  }
})

const handleMouseMoveShadow = (e?: MouseEvent) => {
  if (!sidebar.value) return
  const x = e?.clientX || 0
  const rect = sidebar.value.getBoundingClientRect()

  let percentage
  if (props.side === 'left') {
    const startPoint = 680
    const endPoint = rect.width
    if (endPoint > startPoint) return
    const range = endPoint - startPoint
    percentage = ((x - startPoint) / range) * 100
    percentage = Math.max(0, Math.min(100, percentage))
  } else {
    const screenWidth = window.innerWidth
    const startPoint = screenWidth - 680
    const endPoint = rect.left
    if (endPoint < startPoint) return
    const range = startPoint - endPoint
    percentage = ((x - endPoint) / range) * 100
    percentage = 100 - Math.max(0, Math.min(100, percentage))
  }

  sidebarShadowOpacity.value = Number((percentage / 100).toFixed(5))
}

function ease (progress: number, easing: string): number {
  switch (easing) {
  case 'linear':
    return progress
  case 'ease-in':
    return progress * progress
  case 'ease-out':
    return progress * (2 - progress)
  case 'ease-in-out':
    return progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress
  default:
    return progress
  }
}

const handleMouseEnter = () => {
  if (leaveTimeout.value) {
    clearTimeout(leaveTimeout.value)
    leaveTimeout.value = null
  }
  if (isOpen.value) return
  isOpen.value = true
  const animationDuration = props.animationDuration
  const animationEasing = props.animationEasing
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / animationDuration, 1)
    const easedProgress = ease(progress, animationEasing)

    if (sidebarBackground.value) {
      (sidebarBackground.value as HTMLElement).style.transform = `translateX(${
        sideTransform.value.background * (1 - easedProgress)
      }%) translateZ(0px)`;
      (sidebarBackground.value as HTMLElement).style.opacity =
        easedProgress.toString()
    }

    if (sidebarContent.value) {
      (sidebarContent.value as HTMLElement).style.filter = `blur(${
        2 * (1 - easedProgress)
      }px)`;
      (sidebarContent.value as HTMLElement).style.transform = `translateX(${
        sideTransform.value.content * (1 - easedProgress)
      }%) translateZ(0px)`;
      (sidebarContent.value as HTMLElement).style.opacity =
        easedProgress.toString()
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

const closeSidebar = () => {
  if (!isOpen.value) return
  isOpen.value = false
  const animationDuration = props.animationDuration
  const animationEasing = props.animationEasing
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / animationDuration, 1)
    const easedProgress = ease(progress, animationEasing)

    if (sidebarBackground.value) {
      (sidebarBackground.value as HTMLElement).style.transform = `translateX(${
        sideTransform.value.background * easedProgress
      }%) translateZ(0px)`;
      (sidebarBackground.value as HTMLElement).style.opacity = (
        1 - easedProgress
      ).toString()
    }

    if (sidebarContent.value) {
      (sidebarContent.value as HTMLElement).style.filter = `blur(${
        2 * easedProgress
      }px)`;
      (sidebarContent.value as HTMLElement).style.transform = `translateX(${
        sideTransform.value.content * easedProgress
      }%) translateZ(0px)`;
      (sidebarContent.value as HTMLElement).style.opacity = (
        1 - easedProgress
      ).toString()
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
  leaveTimeout.value = null
}

const handleMouseLeave = () => {
  if (leaveTimeout.value) return
  leaveTimeout.value = setTimeout(
    () => {
      closeSidebar()
    },
    props.leaveDelay < 0 ? 300 : props.leaveDelay
  )
}

const handleResize = () => {
  if (window.innerWidth >= 768) {
    window.addEventListener('mousemove', handleMouseMoveShadow, {
      passive: true
    })
    sidebar.value?.addEventListener('mouseenter', handleMouseEnter)
    sidebar.value?.addEventListener('mouseleave', handleMouseLeave)
  } else {
    window.removeEventListener('mousemove', handleMouseMoveShadow)
    sidebar.value?.removeEventListener('mouseenter', handleMouseEnter)
    sidebar.value?.removeEventListener('mouseleave', handleMouseLeave)
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize, { passive: true })
  handleResize()
  if (isOpen.value !== model.value) {
    handleMouseEnter()
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMoveShadow)
  window.removeEventListener('resize', handleResize)
  sidebar.value?.removeEventListener('mouseenter', handleMouseEnter)
  sidebar.value?.removeEventListener('mouseleave', handleMouseLeave)
})
</script>
