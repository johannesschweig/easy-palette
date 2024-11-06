<script setup>
import { getExportJSON, getColorNamesJoined, BASE_LEVELS  } from "../utils.js";
import Color from "./Color.vue";

const props = defineProps(["palette", "hexColor"]);

function copyTokensStudioExport() {
  const text = JSON.stringify(getExportJSON(palette.value)).slice(1, -1) + ','
  navigator.clipboard.writeText(text)
}
</script>

<template>
<div class='text-2xl mb-2'>{{ getColorNamesJoined(palette[5]) }}</div>
  <div class='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11'>
    <Color v-for='col, i in palette':color='col' :name='BASE_LEVELS[i]' :highlightColor='hexColor'/>
  </div>
  <div>
    <span class='text-lg mr-2'>Tokens Studio Export</span>
    <button class='px-2 py-1 border rounded border-slate-300 bg-white hover:bg-slate-100 active:bg-slate-300' @click="copyTokensStudioExport">Copy</button>
  </div>
</template>