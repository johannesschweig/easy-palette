<script setup>
import { getExportJSON, getColorNamesUpper, BASE_LEVELS } from "../utils.js";
import Color from "./Color.vue";
import { ref, computed } from "vue";

const props = defineProps(["palette", "hexColor", "name"]);
const show = ref(props.name === "color" ? true : false);

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

const showGreyName = `show-${greyName.value}`
</script>

<template>
  <div class="mb-8">
    <div v-if="name != 'color'" class='mb-8'>
      <input type="checkbox" :id="showGreyName" :name="showGreyName" :value="showGreyName" class='mr-2' v-model='show'>
      <label :for="showGreyName" class="select-none">Show {{ greyName }}</label>
    </div>
    <div v-if="show">
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
        <Color v-for="(col, i) in palette" :color="col" :name="BASE_LEVELS[i]" :highlightColor="hexColor" />
      </div>
    </div>
  </div>
</template>
