<script setup>
import { oklchToHex, isReadableAgainstWhite } from '../utils.js'
import { useStore } from '@/store'
import { computed } from 'vue'

const props = defineProps(["color", "name", "highlightColor"]);
const store = useStore()

const isReadable = computed(() => isReadableAgainstWhite(props.color))

const isSelectedColor = computed(() => props.highlightColor === oklchToHex(props.color))

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
  <div class="mb-8 py-2" :class='isSelectedColor ? "bg-slate-200 rounded-lg px-2 border border-slate-300" : ""'>
    <div>
      <div class="text-xl mb-1">
        {{ props.name }}
        {{ isSelectedColor ? "⌖" : "" }}
      </div>
      <div class="mb-4">{{ oklchToHex(props.color) }}</div>
    </div>
    <div class='rounded' :style="getColorStyle()"></div>
    <div v-if='store.showDetails' class='mt-4 text-sm'>
      <div> L: {{ Math.round(color.l*100)/100 }} </div>
      <div> C: {{ Math.round(color.c*1000)/1000 }} </div>
      <div> H: {{ Math.round(color.h) }} </div>
      <div v-if="isReadable" 
           :title="'Readable against white according to WCAG'" 
           class="mt-2 rounded-full bg-white inline-block px-3 py-1"
           :style="{ border: `1px solid ${oklchToHex(props.color)}`, color: oklchToHex(props.color) }">
        ✓ readable
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
