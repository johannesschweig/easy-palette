const Color = require("color");
const chroma = require("chroma-js");
const culori = require('culori');

const BASE_LEVELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Function to convert HEX to OKLCH
const hexToOklch = (hex) => {
  const oklch = chroma(hex).oklch(); // Get OKLCH values
  return {
    l: oklch[0], // Lightness
    c: oklch[1], // Chroma
    h: oklch[2], // Hue
  };
};

// get luminance from base level
const getLumFromBaseLevel = (level) => {
  return 1 - level / 1000;
}

// get closest base level
const getBaseLevel = (lum) => {
  var distances = [];
  for (let i = 0; i < BASE_LEVELS.length; i++) {
    var lumLevel = getLumFromBaseLevel(BASE_LEVELS[i])
    distances.push(Math.abs(lum - lumLevel));
  }
  return BASE_LEVELS[distances.indexOf(Math.min(...distances))];
};

// Function to generate Tailwind color palette
const generatePalette = (hexColor) => {
  const palette = {};

  // Calculate luminance to determine where the base color falls
  const baseColor = hexToOklch(hexColor);

  // Determine the base level based on luminance
  const baseLevel = getBaseLevel(baseColor.l);
  
  // shift luminances by base level
  const lumDistToBaseLevel = getLumFromBaseLevel(baseLevel) - baseColor.l
  const luminances = BASE_LEVELS.map(level => getLumFromBaseLevel(level) - lumDistToBaseLevel)
  // const luminances = BASE_LEVELS.map(level => getLumFromBaseLevel(level))
  
  for (let i = 0; i < BASE_LEVELS.length; i++) {
    var value
    if (BASE_LEVELS[i] === baseLevel) {
      value = hexColor
    } else {
      var oklchColor = culori.oklch({ l: luminances[i], c: baseColor.c, h: baseColor.h });
      value = culori.formatHex(oklchColor);
      // value = oklchColor
    }
    palette[BASE_LEVELS[i]] = {
        value,
        type: 'color'
    };
  }
  return palette;
};
// Get input hex color from command line arguments
const inputHex = process.argv[2];

if (!inputHex) {
  console.error("Please provide a hex color code as an argument.");
  process.exit(1);
}

try {
  Color(inputHex); // Validate hex color
} catch (error) {
  console.error("Invalid hex color format. Please provide a valid hex code.");
  process.exit(1);
}

// Output the palette
// console.log(JSON.stringify(generatePalette(inputHex), null, 2));
console.log(generatePalette(inputHex));
