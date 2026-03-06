<script setup>
defineProps({
  totalPrice: Number,
})
const emit = defineEmits(['openDrawer'])
</script>
<template lang="">
  <header
    class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 px-6 sm:px-10 py-6 sm:py-8"
  >
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.svg" alt="Mogilev Sneakers" class="w-10 h-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Mogilev Sneakers</h2>
          <p class="text-slate-400">Лучшие кроссовки твоего города</p>
        </div>
      </div>
    </RouterLink>
    <ul class="flex items-center gap-6 sm:gap-10">
      <li
        @click="emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} p.</b>
      </li>
      <RouterLink
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
        to="/favorites"
      >
        <img src="/heart.svg" alt="Favorites" />
        <b>Закладки</b>
      </RouterLink>
      <li class="flex items-center gap-3 cursor-not-allowed text-gray-400">
        <img src="/profile.svg" alt="Cart" />
        <b>Профиль</b>
      </li>
    </ul>
  </header>
</template>
