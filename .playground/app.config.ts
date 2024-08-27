export default defineAppConfig({
  ui: {
    primary: 'violet',
    gray: 'zinc',
    button: {
      default: {
        color: 'primary',
        variant: 'soft',
        size: 'lg',
        rounded: 'full'
      }
    },
    strategy: 'override',
    avatar: {
      default: {
        background: 'bg-gradient-to-br from-primary-400 to-primary-600',
        text: 'text-white font-bold'
      }
    },
    container: {
      constrained: 'max-w-5xl'
    },
    textarea: {
      default: {
        color: 'gray',
        variant: 'outline',
        size: 'lg',
        rounded: 'xl'
      }
    },
    chat: {
      page: {
        wrapper: 'flex flex-col h-screen bg-gray-50 dark:bg-gray-900',
        header: {
          base: 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-700',
          title: 'text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600'
        },
        main: {
          base: 'flex-grow overflow-hidden scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent'
        },
        footer: {
          base: 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200 dark:border-gray-700'
        }
      },
      message: {
        wrapper: {
          base: 'p-4 rounded-2xl transition-all duration-300 ease-in-out',
          user: 'bg-primary-100 dark:bg-primary-900 hover:shadow-md',
          assistant: 'bg-gray-100 dark:bg-gray-800 hover:shadow-md'
        },
        message: {
          base: 'text-sm py-2 px-4 rounded-xl shadow-sm transition-all duration-300 ease-in-out',
          user: 'bg-white dark:bg-gray-700 text-primary-900 dark:text-primary-100 hover:shadow-lg',
          assistant: 'bg-primary-50 dark:bg-primary-950 text-gray-900 dark:text-gray-100 hover:shadow-lg'
        }
      },
      input: {
        wrapper: 'bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700',
        input: 'focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-shadow duration-300 ease-in-out',
        button: 'hover:bg-primary-600 dark:hover:bg-primary-400 transition-colors duration-300 ease-in-out'
      }
    },
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
