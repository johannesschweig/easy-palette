<script setup>
import { oklchToHex, isReadableAgainstWhite } from '../utils.js'
import { useStore } from '@/store'
import { computed } from 'vue'

const props = defineProps(["color", "name", "highlightColor", "isClosestCompare", "compareColor"]);
const store = useStore()

const isReadable = computed(() => isReadableAgainstWhite(props.color))

const isSelectedColor = computed(() => props.highlightColor.toLowerCase() === oklchToHex(props.color))

function getColorStyle(color = props.color) {
    return {
        width: "96px",
        height: "96px",
        "background-color": `oklch(${color.l} ${color.c} ${color.h})`,
        border: props.name < 200 ? "1px solid #d8d8d8" : "none",
    };
}

// For the split rectangle
function getSplitStyle() {
    const left = `oklch(${props.color.l} ${props.color.c} ${props.color.h})`
    const right = (store.compareColor && store.compareLum !== undefined)
        ? `oklch(${store.compareLum} ${store.compareChroma} ${store.compareHue})`
        : left
    return {
        width: "96px",
        height: "96px",
        background: `linear-gradient(to right, ${left} 0 49.5%, #fff 49.5% 50.5%, ${right} 50.5% 100%)`,
        border: props.name < 200 ? "1px solid #d8d8d8" : "none",
    }
}

// LCH differences for details
const lDiff = computed(() => store.compareLum - props.color.l)
const cDiff = computed(() => store.compareChroma - props.color.c)
const hDiff = computed(() => store.compareHue - props.color.h)

function diffClass(val) {
    return val === 0 ? 'text-gray-600' : val > 0 ? 'text-green-600' : val < 0 ? 'text-red-600' : ''
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div class="mb-8 py-2" :class='isSelectedColor ? "bg-slate-200 rounded-lg px-2 border border-slate-300" : ""'>
    <div>
      <div class="text-lg mb-4 cursor-pointer group hover:font-bold" @click="copyToClipboard(oklchToHex(props.color))" >
        {{ oklchToHex(props.color) }}
        <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          ⧉
        </span>
      </div>
    </div>
    <div v-if="props.isClosestCompare" class="flex justify-center items-center">
      <div class='rounded flex justify-center items-center' :style="getSplitStyle()"></div>
    </div>
    <div v-else class='rounded text-center text-4xl flex justify-center items-center' :class="props.name >= 700 ? 'text-slate-50' : 'text-slate-800'" :style="getColorStyle()">
        <template v-if='isSelectedColor'>⌖</template>
    </div>
    <div v-if='store.showDetails' class='mt-4 text-sm'>
      <div class='text-base'> {{ props.name }} </div>
      <div>
        L: {{ Math.round(props.color.l*100)/100 }}
        <span v-if="props.isClosestCompare" :class="diffClass(lDiff)">
          ({{ lDiff > 0 ? '+' : ''}}{{ Math.round(lDiff*100)/100 }})
        </span>
      </div>
      <div>
        C: {{ Math.round(props.color.c*1000)/1000 }}
        <span v-if="props.isClosestCompare" :class="diffClass(cDiff)">
          ({{ cDiff > 0 ? '+' : ''}}{{ Math.round(cDiff*1000)/1000 }})
        </span>
      </div>
      <div>
        H: {{ Math.round(props.color.h) }}
        <span v-if="props.isClosestCompare" :class="diffClass(hDiff)">
          ({{ hDiff > 0 ? '+' : ''}}{{ Math.round(hDiff) }})
        </span>
      </div>
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
