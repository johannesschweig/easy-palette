<script setup>
import { hexToHSB, hexToOklch } from '../utils.js'

const props = defineProps(['hexColor', 'name'])

function getColorStyle() {
  return {
    'width': '128px',
    'height': '128px',
    'background-color': getBaseColor()
  }
}

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
  return isHexColor(props.hexColor) ? props.hexColor : '#FFFFFF'
}

function getHSB() {
  return hexToHSB(getBaseColor())
}

function getOKLCH() {
  const oklch = hexToOklch(getBaseColor())
  if (oklch.h) {
    return {
      l: Math.round(oklch.l*1000)/1000,
      c: Math.round(oklch.c*1000)/1000,
      h: Math.round(oklch.h),
    }
  } else {
    return {
      l: Math.round(oklch.l*1000)/1000,
      c: Math.round(oklch.c*1000)/1000,
      h: 0 
    }
  }
}
</script>

<template>
  <div class='mb-8'>
    <div class="text-xl mb-4">{{ props.name }}</div>
    <div class='rounded border mb-4' :style="getColorStyle()"></div>
    <div class='mb-4'> Hex: {{ getBaseColor() }} </div>
    <!-- <div class=''> H: {{ getHSB().h }} </div> -->
    <!-- <div class=''> S: {{ getHSB().s }} </div> -->
    <!-- <div class='mb-4'> B: {{ getHSB().b }} </div> -->
    <div class=''> L: {{ getOKLCH().l }} </div>
    <div class=''> C: {{ getOKLCH().c }} </div>
    <div class=''> H: {{ getOKLCH().h }} </div>
  </div>
</template>

<style scoped>
</style>
