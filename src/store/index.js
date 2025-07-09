import { defineStore } from 'pinia'
import { ref, computed, watch } from "vue"
import { generatePalette, hexToOklch, oklchToHex, isValidHexColor, updateFaviconFromURL, constructOklchColor, findClosestLuminanceIndex } from '../utils.js'

export const useStore = defineStore('store', () => {
  const hexColor = ref('#')
  const lum = ref(0)
  const chroma = ref(0)
  const hue = ref(0)

  const compareColor = ref('#')
  const compareLum = ref(0)
  const compareChroma = ref(0)
  const compareHue = ref(0)
  const compareIndex = ref(-1)

  const showDetails = ref(false)

  

  const colorPalette = computed(() => {
    return isValidHexColor(hexColor.value) ? generatePalette(constructOklchColor(lum.value, chroma.value, hue.value), 'color') : []
  })

  const greyPalette = computed(() => {
    return isValidHexColor(hexColor.value) ? generatePalette(constructOklchColor(lum.value, 0.025, hue.value), 'grey') : []
  })

  const neutralPalette = computed(() => {
    return isValidHexColor(hexColor.value) ? generatePalette(constructOklchColor(lum.value, 0, hue.value), 'neutral') : []
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
      // update favicon
      updateFaviconFromURL()
    }
  })

  // Watch OKLCH values and update `hexColor` when any of them changes
  watch([lum, chroma, hue], ([newL, newC, newH]) => {
    if (newL && newC && newH) {
      const color = { mode: 'oklch', l: newL, c: newC, h: newH }
      hexColor.value = oklchToHex(color)
    }
  })

  watch(compareColor, (newHex) => {
    if (isValidHexColor(compareColor.value)) {
      const color = hexToOklch(newHex)
      compareLum.value = color.l
      compareChroma.value = color.c
      compareHue.value = color.h

      if (isValidHexColor(compareColor.value)) {
        compareIndex.value = findClosestLuminanceIndex(color, colorPalette.value)
      }
    } else {
      compareIndex.value = -1
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
    compareColor,
    compareLum,
    compareChroma,
    compareHue,
    compareIndex,
    showDetails,
    colorPalette,
    greyPalette,
    neutralPalette,
    sampleColor,
  }
})