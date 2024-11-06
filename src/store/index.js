import { defineStore } from 'pinia'
import { ref, computed, watch } from "vue"
import { generatePalette, hexToOklch, oklchToHex } from '../utils.js'

export const useStore = defineStore('store', () => {
  const hexColor = ref('#')
  const lum = ref(0)
  const chroma = ref(0)
  const hue = ref(0)
  const showLch = ref(false)
  
  const colorPalette = computed(() => {
    return isValidHexColor() ? generatePalette({ mode: 'oklch', l: lum.value, c: chroma.value, h: hue.value }, 'color') : []
  })
  
  const greyPalette = computed(() => {
    return isValidHexColor() ? generatePalette({ mode: 'oklch', l: lum.value, c: 0.025, h: hue.value }, 'grey') : []
  })
  
  const neutralPalette = computed(() => {
    return isValidHexColor() ? generatePalette({ mode: 'oklch', l: lum.value, c: 0, h: hue.value }, 'neutral') : []
  })

  watch(hexColor, (newHex) => {
     if (isValidHexColor()) {
       const color = hexToOklch(newHex)
       lum.value = color.l
       chroma.value = color.c
       hue.value = color.h
     }
   })
 
   // Watch OKLCH values and update `hexColor` when any of them changes
   watch([lum, chroma, hue], ([newL, newC, newH]) => {
     if (newL && newC && newH) {
       const color = { mode: 'oklch', l: newL, c: newC, h: newH }
       hexColor.value = oklchToHex(color)
     }
   })
  
  function isValidHexColor() {
    return hexColor.value && /^#[0-9A-F]{6}$/i.test(hexColor.value)
  }
  
  // set a sample color
  function sampleColor() {
    hexColor.value = '#df7711'
  }
  
  return {
    hexColor,
    lum,
    chroma,
    hue,
    showLch,
    colorPalette,
    greyPalette,
    neutralPalette,
    sampleColor,
  }
})