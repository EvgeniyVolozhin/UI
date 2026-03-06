<script setup>
import { reactive, watch, ref, onMounted, inject } from 'vue'
import CardList from '../components/CardList.vue'
import axios from 'axios'

const { cart, addToCart, removeFromCart } = inject('cart')
const items = ref([])
const favoritesByItemId = ref({})
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const productImages = [
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?fm=jpg&q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?fm=jpg&q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1579338559194-a162d19bf842?fm=jpg&q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1465453869711-7e174808ace9?fm=jpg&q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
]

const pickProductImage = (itemId, index) => {
  const n = Number.isFinite(Number(itemId)) ? Number(itemId) : index
  return productImages[Math.abs(n) % productImages.length]
}

const normalizeItems = (rawItems) => {
  return rawItems.map((obj, index) => {
    const imageUrl = obj.imageUrl || pickProductImage(obj.id, index)
    return {
      ...obj,
      imageUrl,
      isFavorite: false,
      isAdded: false,
      favoriteId: null,
    }
  })
}

const syncItemFlags = () => {
  const cartIds = new Set(cart.value.map((i) => i.id))
  items.value = items.value.map((item) => {
    const favoriteId = favoritesByItemId.value[item.id] ?? null
    return {
      ...item,
      isAdded: cartIds.has(item.id),
      isFavorite: Boolean(favoriteId),
      favoriteId,
    }
  })
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const { data } = await axios.post(`https://0285111e7caff723.mokky.dev/favorites`, {
        item_id: item.id,
      })
      favoritesByItemId.value = { ...favoritesByItemId.value, [item.id]: data.id }
    } else if (item.favoriteId) {
      await axios.delete(`https://0285111e7caff723.mokky.dev/favorites/${item.favoriteId}`)
      const { [item.id]: _, ...rest } = favoritesByItemId.value
      favoritesByItemId.value = rest
    }
    syncItemFlags()
  } catch (err) {
    console.log(err)
  }
}
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://0285111e7caff723.mokky.dev/favorites`)
    favoritesByItemId.value = favorites.reduce((acc, fav) => {
      acc[fav.item_id] = fav.id
      return acc
    }, {})
  } catch (err) {
    console.log(err)
  }
}
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://0285111e7caff723.mokky.dev/items`, {
      params,
    })
    items.value = normalizeItems(data)
  } catch (err) {
    console.log(err)
  }
}
onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
  syncItemFlags()
})
let fetchTimeout
watch(
  () => ({ ...filters }),
  () => {
    clearTimeout(fetchTimeout)
    fetchTimeout = setTimeout(async () => {
      await fetchItems()
      syncItemFlags()
    }, 250)
  },
  { deep: true },
)

watch(cart, syncItemFlags, { deep: true })
</script>
<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Кроссовки на каждый день</h1>
        <p class="text-slate-500 mt-2 max-w-xl">
          Подборка популярных моделей. Добавляйте в закладки и собирайте корзину в пару кликов.
        </p>
      </div>
      <img
        class="w-full max-w-sm lg:max-w-xs object-contain"
        src="/hero-sneakers.svg"
        alt="Sneakers"
      />
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <select
          @change="onChangeSelect"
          class="py-2 px-3 border border-slate-200 rounded-md outline-none focus:border-slate-300 bg-white"
        >
          <option value="title">По названию</option>
          <option value="price">По цене (дешевые)</option>
          <option value="-price">По цене (дорогие)</option>
        </select>

        <div class="relative">
          <img class="absolute left-3 top-3" src="/search.svg" alt="" />
          <input
            @input="onChangeSearchInput"
            class="border border-slate-200 rounded-md py-2 pl-12 pr-4 outline-none focus:border-slate-300 w-full sm:w-72"
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>
    <div class="mt-10">
      <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    </div>
  </div>
</template>
