<script setup>
import { computed } from 'vue';
import CartItemList from './CartItemList.vue';
import DrawerHead from './DrawerHead.vue';
import InfoBlock from './infoBlock.vue';

const emit = defineEmits(['createOrder'])
const props = defineProps({
    totalPrice: Number,
    vatPrice: Number,
    disabledButton: Boolean,
})
</script>


<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 z-20 top-0 p-10">
        <DrawerHead/>
        <div  v-if="!totalPrice" class="flex h-full items-center">
        <InfoBlock 
        title="Корзина пустая" 
        description="Добавьте товар"
        image-url="/package-icon.png"
        />
        </div>
    <div v-else class="">
        <CartItemList/>
        <div v-if="totalPrice" class="flex my-9 flex-col gap-6 mt-7">
            <div class="flex gap-2">
                <span>Итого:</span>
                <div class="flex-1 border-b border-dashed"></div>
                <b>{{totalPrice}} p.</b>
            </div>
            <div class="flex gap-2">
                <span>Налог 5%:</span>
                <div class="flex-1 border-b border-dashed"></div>
                <b>{{vatPrice}} p.</b>
            </div>
            <button
            :disabled="buttonDisabled"
            @click="() => emit('createOrder')"
            class="bg-lime-500 mt-5 disabled:bg-slate-400 transition w-full active:bg-lime-700  rounded-xl py-3 text-white hover:bg-lime-600 cursor-pointer">
            Оформить заказ
            </button>
        </div>
    </div>
    </div>
</template>


