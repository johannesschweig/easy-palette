<template>
  <div class='mb-2'>
    <span class='mr-2' @click='store.sampleColor()'>Color:</span>
    <input class='border border-slate-300 rounded px-2 py-1 text-lg mr-2 w-24' v-model='store.hexColor'></input>
  </div>
  <div class='mb-2 flex gap-4'>
    <InputSlider :max=1 :step=0.02 :model='"lum"' />
    <InputSlider :max=1 :step=0.02 :model='"chroma"' />
    <InputSlider :max=360 :step=5 :model='"hue"' />
  </div>
  <div class='mb-8'>
    <input type="checkbox" id="showDetails" name="showDetails" value="showDetails" class='mr-2' v-model='store.showDetails'>
    <label for="showDetails">Show details</label>
  </div>
</template>

<script setup>
import InputSlider from '@/components/InputSlider.vue'
import { useStore } from '@/store'
const store = useStore()
</script>