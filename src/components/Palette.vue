<script setup>
import { getExportJSON, getColorNamesJoined, BASE_LEVELS } from "../utils.js";
import Color from "./Color.vue";

const props = defineProps(["palette", "hexColor", "name"]);

function copyTokensStudioExport() {
  var exportedPalette = getExportJSON(props.palette)
  if (props.name != 'color') {
    var firstKey = Object.keys(exportedPalette)[0]
    exportedPalette = {
      [props.name]: exportedPalette[[firstKey]]
    }
  }
  const text = JSON.stringify(exportedPalette).slice(1, -1) + ","
  navigator.clipboard.writeText(text)
}

function getGreyName() {
  return props.name === 'neutral' ?
    'Pure greys (Neutral)' :
    'Tinted greys (Grey)'
}
</script>

<template>
  <div class="mb-8">
    <div>
      <div class="text-2xl mb-2 inline-block">
        {{ name === "color" ? getColorNamesJoined(palette[5]) : getGreyName(name) }}
      </div>
      <button
        class="float-right px-2 py-1 border rounded border-slate-300 bg-white hover:bg-slate-100 active:bg-slate-300"
        @click="copyTokensStudioExport"
      >
        Copy JSON
      </button>
    </div>
    <div class="flex gap-4 flex-wrap">
      <Color
        v-for="(col, i) in palette"
        :color="col"
        :name="BASE_LEVELS[i]"
        :highlightColor="hexColor"
      />
    </div>
  </div>
</template>
