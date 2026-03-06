<script setup>
import { ref, provide, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

/* Корзина(start) */
const cart = ref([])
const isCreatingOrder = ref(false)
const drawerOpen = ref(false)
const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))
const cartIsEmpty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)
const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}
const addToCart = (item) => {
  if (cart.value.some((cartItem) => cartItem.id === item.id)) return
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = (item) => {
  cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)
  item.isAdded = false
}
const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://0285111e7caff723.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value,
    })

    const orderedItems = cart.value
    cart.value = []
    orderedItems.forEach((item) => {
      item.isAdded = false
    })

    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}
/* Корзина(end) */

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
})
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
    :button-disabled="cartButtonDisabled"
  />

  <div class="min-h-dvh py-10 px-4 sm:px-6">
    <div
      class="bg-white/85 backdrop-blur w-full max-w-6xl m-auto rounded-2xl shadow-xl ring-1 ring-black/5"
    >
      <Header :total-price="totalPrice" @open-drawer="openDrawer" />

      <div class="p-6 sm:p-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>
