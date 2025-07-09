<template>
  <div class="inline-grid grid-cols-3 mb-4 gap-x-2 gap-y-4">
    <div>
      <span class='mr-2 cursor-pointer' @click='store.sampleColor()'>Color:</span>
      <input class='border border-slate-300 rounded px-2 py-1 text-lg w-24' v-model='store.hexColor'>
      </input>
    </div>
    <button v-if="!showCompare"
      class="px-2 py-1 border rounded border-slate-300 bg-white hover:bg-slate-100 active:bg-slate-300"
      @click="showCompare = true">
      Compare
    </button>
    <div v-else>
      <span class='mr-2'>Compare:</span>
      <input class='border border-slate-300 rounded px-2 py-1 text-lg w-24 mr-2' v-model='store.compareColor'>
      </input>
      <button
        class="px-2 py-1 border rounded border-slate-300 bg-white hover:bg-slate-100 active:bg-slate-300"
        @click="hideCompare()">
        x
      </button>
    </div>
    <InputSlider class="col-start-1" :max="1" :step="0.01" :model='"lum"' />
    <InputSlider :max="0.45" :step="0.01" :model='"chroma"' />
    <InputSlider :max="360" :step="5" :model='"hue"' />
    <div class="col-span-2 mb-8">
      <input type="checkbox" id="showDetails" name="showDetails" value="showDetails" class='mr-2'
        v-model='store.showDetails'>
      <label for="showDetails" class='select-none'>Show details</label>
    </div>
  </div>
</template>

<script setup>
import InputSlider from '@/components/InputSlider.vue'
import { useStore } from '@/store'
import { ref } from 'vue'

const showCompare = ref(false)
const store = useStore()

const hideCompare = () => {
  showCompare.value = false
  store.compareColor = ''
}
</script>