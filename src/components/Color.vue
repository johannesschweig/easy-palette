<script setup>
import { hexToOklch, oklchToHex } from "../utils.js";

const props = defineProps(["color", "name"]);

function getColorStyle() {
	return {
		width: "96px",
		height: "96px",
		"background-color": `oklch(${props.color.l} ${props.color.c} ${props.color.h} )`,
	};
}
</script>

<template>
  <div class='mb-8'>
    <div class="text-xl mb-1">{{ props.name }}</div>
    <div class="mb-4">{{ oklchToHex(props.color) }}</div>
    <div class='rounded border mb-4' :style="getColorStyle()"></div>
    <div class=''> L: {{ Math.round(color.l*100)/100 }} </div>
    <div class=''> C: {{ Math.round(color.c*100)/100 }} </div>
    <div class=''> H: {{ Math.round(color.h) }} </div>
  </div>
</template>

<style scoped>
</style>
