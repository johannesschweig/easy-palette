<template>
  <div class='mb-4 w-48'>
    <div class='mb-1'>{{label}}:</div>
    <div class='mb-2'>
      <div class="max-w-300">
      <div class="pt-2">
        <input class="w-full accent-indigo-600" type="range" name="" v-model="storeModel" :min="0" :max="max" :step="step"
        />
      </div>
    </div>
    </div>
    <input
      type='number'
      :min='0'
      :max='max'
      :step='step'
      class='border border-slate-300 rounded px-2 py-1 text-sm w-full'
      v-model='storeModel'>
    </input>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import { computed } from 'vue'
const store = useStore()

const props = defineProps({
  max: {
    type: Number,
    default: 1
  },
  step: {
    type: Number,
    default: 0.05
  },
  model: {
    type: String,
    default: null
  }
});

const storeModel = computed({
  get() {
    switch (props.model) {
      case 'lum':
        return store.lum
      case 'chroma':
        return store.chroma
      case 'hue':
        return store.hue
      default:
        return null
    }
  },
  set(value) {
    switch (props.model) {
      case 'lum':
        store.lum = value
        break
      case 'chroma':
        store.chroma = value
        break
      case 'hue':
        store.hue = value
        break
    }
  }
})

const label = computed(() => {
  switch (props.model) {
    case 'lum':
      return 'Lum'
    case 'chroma':
      return 'Chroma'
    case 'hue':
      return 'Hue'
    default:
      return ''
  }
})
</script>