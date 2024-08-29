<template>
    <ZChatSidebar v-model:open="isOpen" side="right">
        <template #content>
            <div class="flex items-center">
                <div class="flex flex-1 items-center leading-none">
                    <h1 class="text-xl text-primary">
                        <span class="font-bold">ZUNDER</span> <span
                        class="font-light italic"
                        >AI CHAT</span>
                    </h1>
                </div>
                <div class="md:hidden">
                    <UButton variant="ghost" color="black" icon="i-heroicons-x-mark" @click="isOpen = false" />
                </div>
            </div>
            <div class="w-full">
                <UButton variant="soft" label="Start a new chat" block icon="i-heroicons-plus" trailing />
            </div>
            <div class="flex flex-1" />
            <div class="flex items-center">
                <div>
                    <UButton variant="ghost" color="black" icon="i-heroicons-cog-6-tooth" />
                </div>
                <div class="flex flex-1 items-center justify-end leading-none">
                    <UAvatar
                        src="/avatar.png"
                        alt="Avatar"
                    />
                </div>
            </div>
        </template>
    </ZChatSidebar>
    <ZChatPage>
        <template #header-right>
            <div class="md:hidden">
                <UButton variant="ghost" color="black" icon="i-heroicons-bars-3" @click="toggle" />
            </div>
        </template>
        <template #messages>
            <ZChatMessages :messages="chatMessages" />
        </template>
        <template #input>
            <ZChatInput @submit="handleSubmit" :loading="loading" placeholder="Type your message here..." />
        </template>
    </ZChatPage>
</template>

<script setup lang="ts">
import type { ChatMessage } from '../../types/chat'

const { isOpen, toggle } = useChatSidebar();

const loading = ref(false);
const chatMessages = ref<ChatMessage[]>([]);

const exampleMessages: string[] = [
    'To create a Vue component, you can start by creating a new .vue file with a template, script, and style section.',
    'ref is used for primitive values, while reactive is used for objects. ref requires .value to access or modify, but reactive doesn\'t.',
    'Vue 3 Composition API allows for better code organization and reusability compared to the Options API.',
    'Vuex is a state management pattern and library for Vue.js applications, useful for managing complex application states.',
];

const getRandomMessage = (messages: string[]): string => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
};

const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
        isUser: true,
        avatar: '/avatar.png', // Replace with actual user avatar path
        content: text,
    };
    chatMessages.value.push(userMessage);

    loading.value = true;

    try {
        const randomContent = getRandomMessage(exampleMessages);

        const aiMessage: ChatMessage = {
            isUser: false,
            avatar: '',
            content: randomContent,
        };

        chatMessages.value.push(aiMessage);
    } catch (error) {
        console.error('Error sending message:', error);
    } finally {
        loading.value = false;
    }
};
</script>