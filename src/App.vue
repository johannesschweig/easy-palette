<script setup>
import Color from './components/Color.vue'
import { ref } from 'vue'
import { generatePalette, BASE_LEVELS } from './utils.js'

const hexColor = defineModel({ default: '#FFFFFF'})
const palette = ref([])

const uiPalette = [ "#ecf4ff", "#dceaff", "#c0d7ff", "#9abbff", "#7294ff", "#516dff", "#3243f9", "#2430dc", "#222eb1", "#242f8b", "#151951" ]
const uiPalette2 = [ "#f4faf3", "#e5f5e3", "#cbeac8", "#a2d89d", "#71bd6b", "#53ae4c", "#3b8435", "#31682d", "#2b5328", "#234522", "#0e250e" ]
const uiPalette3 =  [ "#fef9ec", "#faf0cb", "#f5de92", "#f0c759", "#ecb233", "#e5941b", "#ca7015", "#a85115", "#873e17", "#713416", "#401908" ]
const uiPalette4 =  ["#ffeff3", "#ffe0ea", "#ffc6da", "#ff97bb", "#ff5d99", "#ff247b", "#ff006f", "#d7005d", "#b40057", "#990251", "#570027"]


function isHexColor(color) {
  
  if (color) {
    if (color.length === 7) {
      return true
    }
    return false
  } else {
    return false
  }
}

function getBaseColor() {
  return isHexColor(hexColor.value) ? hexColor.value : '#FFFFFF'
}

function clearInput() {
  hexColor.value = '#FFFFFF'
}

function changeHexColor() {
  if (isHexColor(hexColor.value)) {
    palette.value = generatePalette(hexColor.value)
  }
}
</script>

<template>
  <div class='text-3xl mb-4'>Easy Palette Generator</div>  
  <div class='mb-8'>
    <span class='mr-2'>Color:</span>
    <input class='border border-slate-300 rounded px-2 py-1 text-lg mr-2' v-model='hexColor' @change='changeHexColor'></input>
    <button class='border rounded bg-white px-4 py-2' @click='clearInput()'>Clear</button>
  </div>
  <Color :hexColor='getBaseColor()' name='Color'/>
  <div class='grid grid-cols-12'>
    <Color v-for='col, i in palette':hexColor='col' :name='BASE_LEVELS[i]'/>
  </div>
  <div class='grid grid-cols-12'>
      <Color v-for='col, i in uiPalette':hexColor='col' :name='BASE_LEVELS[i]'/>
    </div>
    
    <div class='grid grid-cols-12'>
        <Color v-for='col, i in uiPalette2':hexColor='col' :name='BASE_LEVELS[i]'/>
      </div>
      
      <div class='grid grid-cols-12'>
              <Color v-for='col, i in uiPalette3':hexColor='col' :name='BASE_LEVELS[i]'/>
            </div>
            
            <div class='grid grid-cols-12'>
                    <Color v-for='col, i in uiPalette4':hexColor='col' :name='BASE_LEVELS[i]'/>
                  </div>
  
</template>

<style scoped>

</style>
