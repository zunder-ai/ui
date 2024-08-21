<template>
    <div class="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Header -->
        <header class="bg-white dark:bg-gray-800 shadow">
            <UContainer>
                <div class="flex justify-between items-center py-4">
                    <h1 class="text-2xl text-gray-900 dark:text-white"><span class="font-bold">ZUNDER</span> <span
                            class="font-light italic">AI CHAT</span></h1>
                    <div class="flex items-center space-x-4">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-cog-6-tooth" />
                        <ZColorModeButton />
                        <ZColorPicker />
                    </div>
                </div>
            </UContainer>
        </header>

        <!-- Main chat area -->
        <main class="flex-grow overflow-hidden">
            <UContainer class="h-full flex flex-col">
                <div class="flex-grow overflow-y-auto py-4">
                    <slot name="messages"></slot>
                </div>
                <div class="py-4">
                    <slot name="input"></slot>
                </div>
            </UContainer>
        </main>

        <!-- Footer -->
        <footer class="bg-white dark:bg-gray-800 shadow">
            <UContainer>
                <div class="py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    © 2024 ZUNDERAI. All rights reserved.
                </div>
            </UContainer>
        </footer>
    </div>
</template>

<script setup lang="ts">
// You can add any necessary imports or logic here
</script>