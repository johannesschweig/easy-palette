import { converter, formatHex } from 'culori'

// Function to convert HEX to OKLCH using culori
export function hexToOklch(hex) {
    let oklch = converter('oklch')
    return oklch(hex);
}
// Function to convert hex to HSB
export function hexToHSB(hex) {
  // Remove the '#' if present
  hex = hex.replace(/^#/, '');

  // Parse the hex into RGB values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find the minimum and maximum values of RGB
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  // Calculate Brightness (B)
  let brightness = max;

  // Calculate Saturation (S)
  let delta = max - min;
  let saturation = max === 0 ? 0 : delta / max;

  // Calculate Hue (H)
  let hue;
  if (delta === 0) {
    hue = 0; // If there's no difference, the color is grey and has no hue
  } else {
    switch (max) {
      case r:
        hue = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / delta + 2;
        break;
      case b:
        hue = (r - g) / delta + 4;
        break;
    }
    hue = hue * 60; // Convert to degrees (0-360)
  }

  // Return the HSB values as an object
  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100), // Convert to percentage
    b: Math.round(brightness * 100)  // Convert to percentage
  };
}

export const BASE_LEVELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const L_LEVELS = { 50: 0.97, 100: 0.94, 200: 0.89, 300: 0.81, 400: 0.73, 500: 0.66, 600: 0.58,700: 0.5, 800: 0.43, 900: 0.39, 950: 0.26}

// get luminance from base level
const getLumFromBaseLevel = (level) => {
  console.log('x', level, L_LEVELS[level])
  return L_LEVELS[level]
}

// get closest base level
const getBaseLevel = (lum) => {
  var distances = [];
  for (let i = 0; i < BASE_LEVELS.length; i++) {
    var lumLevel = getLumFromBaseLevel(BASE_LEVELS[i])
    distances.push(Math.abs(lum - lumLevel));
  }
  return BASE_LEVELS[distances.indexOf(Math.min(...distances))];
}

// Function to generate Tailwind color palette
export const generatePalette = (hexColor) => {
  // const palette = {};
  const palette = [];

  // Calculate luminance to determine where the base color falls
  const baseColor = hexToOklch(hexColor);

  // Determine the base level based on luminance
  const baseLevel = getBaseLevel(baseColor.l);
  
  // shift luminances by base level
  const lumDistToBaseLevel = getLumFromBaseLevel(baseLevel) - baseColor.l
  // const luminances = BASE_LEVELS.map(level => getLumFromBaseLevel(level) - lumDistToBaseLevel)
  const luminances = BASE_LEVELS.map(level => getLumFromBaseLevel(level))
  
  for (let i = 0; i < BASE_LEVELS.length; i++) {
    var value
    if (BASE_LEVELS[i] === baseLevel) {
      value = hexColor
    } else {
      // var oklchColor = culori.oklch({ l: luminances[i], c: baseColor.c, h: baseColor.h });
      value = formatHex({
        mode: 'oklch',
        l: luminances[i],
        c: baseColor.c,
        h: baseColor.h
      })
      // value = oklchColor
    }
    // palette[BASE_LEVELS[i]] = {
    //     value,
    //     type: 'color'
    // }
    palette.push(value)
  }
  return palette
}