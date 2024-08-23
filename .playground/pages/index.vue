<template>
    <ZChatPage>
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