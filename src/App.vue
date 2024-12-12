<script setup>
import Palette from './components/Palette.vue'
import { useStore } from '@/store'
const store = useStore()
</script>

<template>
  <div class='text-3xl mb-4'>Easy Palette Generator</div>
  <div class='mb-2'>
    <span class='mr-2' @click='store.sampleColor()'>Color:</span>
    <input class='border border-slate-300 rounded px-2 py-1 text-lg mr-2 w-24' v-model='store.hexColor'></input>
  </div>
  <div class='mb-2'>
    <span class='mr-2'>L:</span>
    <input
      type='number'
      min='0'
      max='1'
      step='0.05'
      class='border border-slate-300 rounded px-2 py-1 text-lg mr-6 w-24'
      v-model='store.lum'>
    </input>
    <span class='mr-2'>C:</span>
    <input
      type='number'
      min='0'
      max='1'
      step='0.05'
      class='border border-slate-300 rounded px-2 py-1 text-lg mr-6 w-24'
      v-model='store.chroma'>
    </input>
    <span class='mr-2'>H:</span>
    <input
      type='number'
      min='0'
      max='360'
      step='10'
      class='border border-slate-300 rounded px-2 py-1 text-lg mr-6 w-24'
      v-model='store.hue'>
    </input>
  </div>
  <div class='mb-8'>
    <input type="checkbox" id="showLch" name="showLch" value="showLch" class='mr-2' v-model='store.showLch'>
    <label for="showLch">Show LCH</label>
  </div>
  <Palette
    v-if='store.colorPalette.length'
    name='color'
    :palette='store.colorPalette'
    :hexColor='store.hexColor'/>
  <Palette
    v-if='store.greyPalette.length'
    name='grey'
    :palette='store.greyPalette'
    :hexColor='store.hexColor'/>
  <Palette
    v-if='store.neutralPalette.length'
    name='neutral'
    :palette='store.neutralPalette'
    :hexColor='store.hexColor'/>
  <div v-else class='text-sm text-slate-500 italic mb-12'>Enter a color to generate a palette</div>
  <div class='text-xs text-slate-500'>By <a class='underline' href='https://johannesschweig.de/'>Johannes Schweig</a> • <a class='underline' href='https://github.com/johannesschweig/easy-palette'>Github</a></div>
</template>
