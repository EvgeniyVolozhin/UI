<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})

const showFavoriteButton = computed(() => typeof props.onClickFavorite === 'function')
const showAddButton = computed(() => typeof props.onClickAdd === 'function')

const formattedPrice = computed(() => {
  const n = Number(props.price)
  if (!Number.isFinite(n)) return ''
  return new Intl.NumberFormat('ru-RU').format(n)
})
</script>

<template lang="">
  <article
    class="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 backdrop-blur transition will-change-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
  >
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
      <div class="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-lime-300/20 blur-2xl"></div>
      <div class="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-sky-300/20 blur-2xl"></div>
    </div>

    <header class="relative p-5">
      <button
        v-if="showFavoriteButton"
        type="button"
        @click.stop="onClickFavorite"
        class="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-lime-400/60"
        :aria-label="isFavorite ? 'Убрать из закладок' : 'Добавить в закладки'"
      >
        <img class="h-5 w-5" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="" />
      </button>

      <div
        class="aspect-square w-full rounded-2xl bg-slate-50 ring-1 ring-slate-100 overflow-hidden"
      >
        <img
          class="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
          :src="imageUrl || '/placeholder-product.svg'"
          :alt="title || 'Sneakers'"
          loading="lazy"
        />
      </div>
    </header>

    <div class="relative px-5 pb-5">
      <h3 class="text-base font-semibold leading-snug line-clamp-2">
        {{ title }}
      </h3>

      <div class="mt-4 flex items-center justify-between gap-4">
        <div class="flex flex-col">
          <span class="text-xs font-medium text-slate-500">Цена</span>
          <span class="text-lg font-extrabold tracking-tight">
            {{ formattedPrice }} <span class="text-slate-500 font-semibold">р.</span>
          </span>
        </div>

        <button
          v-if="showAddButton"
          type="button"
          @click.stop="onClickAdd"
          class="inline-flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold transition focus:outline-none focus:ring-2 focus:ring-lime-400/60"
          :class="
            isAdded
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-lime-500 text-white hover:bg-lime-600'
          "
          :aria-label="isAdded ? 'Убрать из корзины' : 'Добавить в корзину'"
        >
          <img class="h-5 w-5" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="" />
          <span class="hidden sm:inline">{{ isAdded ? 'В корзине' : 'В корзину' }}</span>
        </button>
      </div>
    </div>
  </article>
</template>
