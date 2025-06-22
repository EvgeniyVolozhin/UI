<script setup>
    defineProps({
        totalPrice: Number
    })
    const emit = defineEmits(['openDrawer']);
</script>
<template lang="">
    <header class="flex justify-between 
        border-b border-slate-200 px-10 py-8">
    <RouterLink to="/">
            <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10"/>
        <div>
            <h2 class="text-xl font-bold uppercase">Mogilev Sneakers</h2>
            <p class="text-slate-400">Лучшие кроссовки твоего города</p>
        </div>
    </div>
    </RouterLink>
    <ul class="flex items-center gap-10 ">
        <li @click="() => emit('openDrawer')" class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
            <img src="/cart.svg" alt="Cart">
            <b>{{totalPrice}} p.</b>
        </li>
        <RouterLink to="/favorites">
            <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
            <img src="/heart.svg" alt="Cart">
            <b>Закладки</b>
        </li>
        </RouterLink>
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
            <img src="/profile.svg" alt="Cart">
            <b>Профиль</b>
        </li>
    </ul>
    </header>
</template>
