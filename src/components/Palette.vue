<script setup>
import { getExportJSON, getColorNamesUpper, BASE_LEVELS } from "../utils.js";
import Color from "./Color.vue";
import { computed } from "vue";
import { useStore } from "@/store/index.js";

const props = defineProps(["palette", "name"]);
const store = useStore()

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

const greyName = computed(() => {
  return props.name === 'neutral' ? 'Pure greys' : 'Tinted greys'
})
</script>

<template>
  <div v-if="name === 'color'" class="mb-4">
    <div>
      <div class="mb-2 inline-block">
        <div class="text-2xl ">{{ name === "color" ? getColorNamesUpper(palette[5])[0] : greyName }}</div>
        <div v-if='name === "color"' class="text-base mb-2 inline-block text-slate-700">
          {{ getColorNamesUpper(palette[5]).slice(1).join(', ') }}
        </div>
      </div>
      <button
        class="float-right px-2 py-1 border rounded border-slate-300 bg-white hover:bg-slate-100 active:bg-slate-300"
        @click="copyTokensStudioExport">
        Copy JSON
      </button>
    </div>
    <div class="flex gap-4 flex-wrap">
      <Color v-for="(col, i) in palette" :color="col" :name="BASE_LEVELS[i]" :highlightColor="store.hexColor"
        :isClosestCompare="i === store.compareIndex" :compareColor="store.compareColor" />
    </div>
  </div>
  <div v-else class="mb-4">
    <button class="px-2 py-1 border rounded border-slate-300 bg-white hover:bg-slate-100 active:bg-slate-300"
      @click="copyTokensStudioExport">
      Copy {{ greyName }} JSON
    </button>
  </div>
</template>
