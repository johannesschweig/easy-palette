import { defineStore } from 'pinia'
import { ref } from "vue";

export const useStore = defineStore('store', () => {
  const hexColor = ref('')
  const lum = ref(0)
  const chroma = ref(0)
  const hue = ref(0)
  
  const colorPalette = ref([])
  const greyPalette = ref([])
  const neutralPalette = ref([])
    
})