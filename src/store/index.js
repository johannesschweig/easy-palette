import { defineStore } from 'pinia'
import { ref, computed, watch } from "vue"
import { generatePalette, hexToOklch, oklchToHex, isValidHexColor } from '../utils.js'

export const useStore = defineStore('store', () => {
  const hexColor = ref('#')
  const lum = ref(0)
  const chroma = ref(0)
  const hue = ref(0)
  const showDetails = ref(false)

  

  const colorPalette = computed(() => {
    return isValidHexColor(hexColor.value) ? generatePalette({ mode: 'oklch', l: lum.value, c: chroma.value, h: hue.value }, 'color') : []
  })

  const greyPalette = computed(() => {
    return isValidHexColor(hexColor.value) ? generatePalette({ mode: 'oklch', l: lum.value, c: 0.025, h: hue.value }, 'grey') : []
  })

  const neutralPalette = computed(() => {
    return isValidHexColor(hexColor.value) ? generatePalette({ mode: 'oklch', l: lum.value, c: 0, h: hue.value }, 'neutral') : []
  })

  watch(hexColor, (newHex) => {
    if (isValidHexColor(hexColor.value)) {
      const color = hexToOklch(newHex)
      lum.value = color.l
      chroma.value = color.c
      hue.value = color.h
      // update html title
      document.title = `${newHex} - Easy Palette Generator`
      // update URL
      const url = new URL(window.location)
      url.searchParams.set('color', newHex.slice(1))
      window.history.pushState({}, '', url)
    }
  })

  // Watch OKLCH values and update `hexColor` when any of them changes
  watch([lum, chroma, hue], ([newL, newC, newH]) => {
    if (newL && newC && newH) {
      const color = { mode: 'oklch', l: newL, c: newC, h: newH }
      hexColor.value = oklchToHex(color)
    }
  })

  

  // set a sample color
  function sampleColor() {
    hexColor.value = '#df7711'
  }

  return {
    hexColor,
    lum,
    chroma,
    hue,
    showDetails,
    colorPalette,
    greyPalette,
    neutralPalette,
    sampleColor,
  }
})