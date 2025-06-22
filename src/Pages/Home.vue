<script setup>
import {reactive, watch, ref, onMounted} from 'vue';
import { inject } from 'vue';
import CardList from '../components/CardList.vue';
import axios from 'axios';

const {cart, addToCart, removeFromCart} = inject('cart')
const items = ref([]);
const filters = reactive({
  sortBy:'title',
  searchQuery:'',
});
const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
};
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
};
const onChangeSearchInput= (event) => {
  filters.searchQuery = event.target.value
};
const addToFavorite = async(item) => {
  try {
  if (!item.isFavorite) {
    const obj = {
        item_id: item.id,
    }
    item.isFavorite = true
    const {data} = await axios.post(`https://0285111e7caff723.mokky.dev/favorites`, obj);
    item.favoriteId = data.id;
  } else {
    item.isFavorite = false
    await axios.delete(`https://0285111e7caff723.mokky.dev/favorites/${item.favoriteId}`)
    item.favoriteId = null;
  }
  } catch(err) {
    console.log(err)
  }
}
const fetchFavorites = async() => {
    try { 
    const {data: favorites} = await axios.get(`https://0285111e7caff723.mokky.dev/favorites`)
    items.value = items.value.map(item => {
    const favorite = favorites.find((favorite) => favorite.item_id === item.id);
      if (!favorite) {
        return item;
      }
      return {
        ...item,
        isFavorite:true,
        favoriteID: favorite.id,
      }
    });
  } catch (err) {
  console.log(err);
}
}
const fetchItems = async () => {
    try { 
      const params = {
        sortBy: filters.sortBy,
      }

      if(filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`;
      }


    const {data} = await axios.get(`https://0285111e7caff723.mokky.dev/items`,
      {
        params
      }
    )
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite:false,
      isAdded:false,
      favoriteId: null
    }))
  } catch (err) {
  console.log(err);
}
}
onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
});
watch(filters, fetchItems);
</script>
<template>
    <div class="flex justify-between">
        <div class="flex gap-4">
            <select  @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
              <option value="name">По названию</option>
              <option value="price">По цене (дешевые)</option>
              <option value="-price">По цене (дорогие)</option>
            </select>
        
          <div class="relative">
            <img class="absolute left-3 top-3" src="/search.svg" alt="">
            <input
            @input="onChangeSearchInput"
            class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400" type="0"
            placeholder="Поиск..."
          />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList 
        :items="items" 
        @add-to-Favorite="addToFavorite" 
        @add-to-cart="onClickAddPlus"/>
      </div>
</template>