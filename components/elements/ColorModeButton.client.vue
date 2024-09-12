<script setup lang="ts">
import type { ButtonColor, ButtonVariant } from '#ui/types'

interface Props {
  lightIcon?: string
  darkIcon?: string
  color?: ButtonColor
  variant?: ButtonVariant
}

const props = withDefaults(defineProps<Props>(), {
  lightIcon: 'i-heroicons-sun-20-solid',
  darkIcon: 'i-heroicons-moon-20-solid',
  color: 'gray',
  variant: 'ghost'
})

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

</script>

<template>
  <UButton
    :icon="isDark ? props.darkIcon : props.lightIcon"
    :color="props.color"
    :variant="props.variant"
    aria-label="Toggle color mode"
    @click="toggleColorMode"
  />
</template>