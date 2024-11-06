<script setup>
import Color from "./components/Color.vue";
import { ref } from "vue";
import { generatePalette, BASE_LEVELS, oklchToHex, hexToOklch, getExportJSON, getColorNamesJoined } from "./utils.js";

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

function copyTokensStudioExport() {
  const text = JSON.stringify(getExportJSON(palette.value)).slice(1, -1) + ','
  navigator.clipboard.writeText(text)
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
  <div v-if='palette.length'>
    <div class='text-2xl mb-2'>{{ getColorNamesJoined(palette[5]) }}</div>
    <div class='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11'>
      <Color v-for='col, i in palette':color='col' :name='BASE_LEVELS[i]' :highlightColor='hexColor'/>
    </div>
    <div>
      <span class='text-lg mr-2'>Tokens Studio Export</span>
      <button class='px-2 py-1 border rounded border-slate-300 bg-white hover:bg-slate-100 active:bg-slate-300' @click="copyTokensStudioExport">Copy</button>
    </div>
  </div>
  <div v-else class='text-sm text-slate-500 italic'>Enter a color to generate a palette</div>
</template>

<style scoped>

</style>
