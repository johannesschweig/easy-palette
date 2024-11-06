<script setup>
import { getExportJSON, getColorNamesJoined, BASE_LEVELS  } from "../utils.js";
import Color from "./Color.vue";

const props = defineProps(["palette", "hexColor", "name"]);

function copyTokensStudioExport() {
  const text = JSON.stringify(getExportJSON(props.palette)).slice(1, -1) + ','
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div class='mb-8'>
    <div>
      <div class='text-2xl mb-2 inline-block'>{{ name === 'color' ? getColorNamesJoined(palette[5]) : name }}</div>
      <button class='float-right px-2 py-1 border rounded border-slate-300 bg-white hover:bg-slate-100 active:bg-slate-300' @click="copyTokensStudioExport">Copy JSON</button>
    </div>
    <div class='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11'>
      <Color v-for='col, i in palette':color='col' :name='BASE_LEVELS[i]' :highlightColor='hexColor'/>
    </div>
  </div>
</template>