<script setup>
import Color from "./components/Color.vue";
import { ref } from "vue";
import { generatePalette, BASE_LEVELS, oklchToHex } from "./utils.js";

const hexColor = defineModel({ default: "#" });
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
		palette.value = generatePalette(hexColor.value);
	}
}

function getExportJSON() {
  return BASE_LEVELS.reduce((acc, level, index) => {
      acc[level] = {
          value: oklchToHex(palette.value[index]),
          type: "color"
      };
      return acc;
  }, {});
}
</script>

<template>
  <div class='text-3xl mb-4'>Easy Palette Generator</div>  
  <div class='mb-8'>
    <span class='mr-2'>Color:</span>
    <input class='border border-slate-300 rounded px-2 py-1 text-lg mr-2' v-model='hexColor' @change='changeHexColor'></input>
  </div>
  <div v-if='palette.length'>
    <div class='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11'>
      <Color v-for='col, i in palette':color='col' :name='BASE_LEVELS[i]' :highlightColor='hexColor'/>
    </div>
    <div class='text-lg mb-2'>Tokens Studio Export</div>
    <div>{{ getExportJSON() }}</div>
  </div>
  <div v-else class='text-sm text-slate-500 italic'>Enter a color to generate a palette</div>
</template>

<style scoped>

</style>
