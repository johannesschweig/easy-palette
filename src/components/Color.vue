<script setup>
import { oklchToHex } from '../utils.js'
import { useStore } from '@/store'

const props = defineProps(["color", "name", "highlightColor"]);
const store = useStore()

function getColorStyle() {
	return {
		width: "96px",
		height: "96px",
		"background-color": `oklch(${props.color.l} ${props.color.c} ${props.color.h} )`,
		border: props.name < 200 ? "1px solid #d8d8d8" : "none",
	};
}
</script>

<template>
  <div class="mb-8" :class='props.highlightColor === oklchToHex(props.color) ? "font-bold" : ""'>
    <div>
      <div class="text-xl mb-1">{{ props.name }}</div>
      <div class="mb-4">{{ oklchToHex(props.color) }}</div>
    </div>
    <div class='rounded' :style="getColorStyle()"></div>
    <div v-if='store.showLch' class='mt-4 text-sm'>
      <div> L: {{ Math.round(color.l*100)/100 }} </div>
      <div> C: {{ Math.round(color.c*1000)/1000 }} </div>
      <div> H: {{ Math.round(color.h) }} </div>
    </div>
  </div>
</template>

<style scoped>
</style>
