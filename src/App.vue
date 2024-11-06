<script setup>
import { ref } from "vue";
import { generatePalette, oklchToHex, hexToOklch } from "./utils.js";
import Palette from './components/Palette.vue'

const hexColor = ref('#')
const lum = ref()
const chroma = ref()
const hue = ref()
const palette = ref([]);

function isHexColor(color) {
	if (color) {
		if (color.length === 7) {
			return true;
		}
		return false;
	} else {
		return false;
	}
}

function changeHexColor() {
  if (isHexColor(hexColor.value)) {
    const color = hexToOklch(hexColor.value)
    lum.value = color.l
    chroma.value = color.c
    hue.value = color.h
    palette.value = generatePalette(color);
	}
}

function changeOKLCH() {
  if (lum && chroma && hue) {
    const color = {mode: 'oklch', l: lum.value, c: chroma.value, h: hue.value}
    hexColor.value = oklchToHex(color)
    palette.value = generatePalette(color);
	}
}



// set a sample color
function sampleColor() {
  hexColor.value = '#df7711'
  changeHexColor()
}
</script>

<template>
  <div class='text-3xl mb-4'>Easy Palette Generator</div>  
  <div class='mb-4'>
    <span class='mr-2' @click='sampleColor()'>Color:</span>
    <input class='border border-slate-300 rounded px-2 py-1 text-lg mr-2 w-24' v-model='hexColor' @change='changeHexColor'></input>
  </div>
  <div class='mb-8'>
    <span class='mr-2'>L:</span>
    <input
      type='number'
      min='0'
      max='1'
      step='0.05'
      class='border border-slate-300 rounded px-2 py-1 text-lg mr-6 w-24'
      v-model='lum'
      @change='changeOKLCH'>
    </input>
    <span class='mr-2'>C:</span>
    <input
      type='number'
      min='0'
      max='1'
      step='0.05'
      class='border border-slate-300 rounded px-2 py-1 text-lg mr-6 w-24'
      v-model='chroma'
      @change='changeOKLCH'>
    </input>
    <span class='mr-2'>H:</span>
    <input
      type='number'
      min='0'
      max='360'
      step='5'
      class='border border-slate-300 rounded px-2 py-1 text-lg mr-6 w-24'
      v-model='hue'
      @change='changeOKLCH'>
    </input>
  </div>
  <Palette
    v-if='palette.length'
    :palette='palette'
    :hexColor='hexColor'/>
  <div v-else class='text-sm text-slate-500 italic'>Enter a color to generate a palette</div>
  <div class='text-xs text-slate-500 fixed bottom-4'>By <a class='underline' href='https://johannesschweig.de/'>Johannes Schweig</a> • <a class='underline' href='https://github.com/johannesschweig/easy-palette'>Github</a></div>
</template>