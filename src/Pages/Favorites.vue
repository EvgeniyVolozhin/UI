<script setup>
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'
import InfoBlock from '../components/infoBlock.vue'

const favorites = ref([])
const isEmpty = computed(() => favorites.value.length === 0)
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
onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://0285111e7caff723.mokky.dev/favorites?_relations=items',
    )
    favorites.value = data.map((obj, index) => ({
      ...obj.item,
      imageUrl: obj.item?.imageUrl || pickProductImage(obj.item?.id, index),
    }))
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div class="flex items-end justify-between gap-4 mb-8">
    <div>
      <h2 class="text-3xl font-bold">Мои закладки</h2>
      <p class="text-slate-500 mt-2">Сохранённые модели — чтобы вернуться к ним позже.</p>
    </div>
    <RouterLink class="text-sm font-medium text-slate-600 hover:text-slate-900 transition" to="/">
      ← На главную
    </RouterLink>
  </div>

  <div v-if="isEmpty" class="py-10">
    <InfoBlock
      title="Пока пусто"
      description="Добавьте товары в закладки на главной странице."
      image-url="/empty-favorites.svg"
    />
  </div>
  <CardList v-else :items="favorites" is-favorites />
</template>
