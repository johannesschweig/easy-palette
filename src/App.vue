<script setup>
import Palette from './components/Palette.vue'
import ColorInput from './components/ColorInput.vue'
import { useStore } from '@/store'
import { onMounted } from 'vue'
import {isValidHexColor} from '@/utils.js'
const store = useStore()

onMounted(() => {
  // Check for a 'color' parameter in the URL on store initialization
  const url = new URL(window.location)
  const initialColor = url.searchParams.get('color')
  if (initialColor && isValidHexColor(`#${initialColor}`)) {
    const store = useStore()
    store.hexColor = `#${initialColor}`
  }
})
</script>

<template>
  <div class='text-3xl mb-4'>Easy Palette Generator</div>
  <ColorInput />
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
