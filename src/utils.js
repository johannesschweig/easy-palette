import { converter, formatHex } from "culori";
import namer from 'color-namer'

export function oklchToHex(oklch) {
	return formatHex(oklch)
}
// Function to convert HEX to OKLCH using culori
export function hexToOklch(hex) {
	let oklch = converter("oklch");
	return oklch(hex)
}

export const BASE_LEVELS = [
	50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
];
export const L_LEVELS = [
	0.97, 0.94, 0.89, 0.81, 0.73, 0.66, 0.58, 0.5, 0.43, 0.39, 0.26,
];
export const C_LEVELS = [
	0.02, 0.04, 0.07, 0.12, 0.16, 0.19, 0.2, 0.18, 0.15, 0.12, 0.08,
];

// get closest base level
const getBaseLevel = (lum) => {
	var distances = []
	for (let i = 0; i < BASE_LEVELS.length; i++) {
		distances.push(Math.abs(lum - L_LEVELS[i]))
	}
	return BASE_LEVELS[distances.indexOf(Math.min(...distances))]
}

// how muted or more vibrant is the color compared to
const getChromaModifier = (level, chroma) => {
	const index = BASE_LEVELS.indexOf(level);
	const chromaOrg = C_LEVELS[index];
	const chromaMod = chroma / chromaOrg;
	return chromaMod;
};

// Function to generate Tailwind color palette
export const generatePalette = (baseColor) => {
	const palette = [];

	// there is no hue returned if the color is greyscale
	if (!baseColor.h) {
	  baseColor.h = 0
	}

	// Determine the base level based on luminance
	const baseLevel = getBaseLevel(baseColor.l);
	const chromaMod = getChromaModifier(baseLevel, baseColor.c);

	for (let i = 0; i < BASE_LEVELS.length; i++) {
		var value
		if (BASE_LEVELS[i] === baseLevel) {
			value = baseColor;
		} else {
			value = {
				mode: "oklch",
				l: L_LEVELS[i],
				c: C_LEVELS.map((chroma) => chroma * chromaMod)[i],
				h: baseColor.h,
			}
		}
		palette.push(value)
	}
	return palette
};

// get json for export
export function getExportJSON(palette) {
  return {
    [getColorNames(palette[5])[0]]: BASE_LEVELS.reduce((acc, level, index) => {
      acc[level] = {
        value: oklchToHex(palette[index]),
        type: "color"
      };
      return acc;
    }, {})
  }
}

// remove color prefixes that dilute the color name
function removeColorPrefix(color) {
  return color.replace("dark", "").replace("medium", "").replace("light", "").replace("deep", "")
}

// get top 3 color names for the palette
function getColorNames(color500) {
  const hexColor500 = oklchToHex(color500)
  var flattenedColors = Object.values(namer(hexColor500, { omit: ['ntc', 'pantone']})).flat()
  flattenedColors.sort((a, b) => a.distance - b.distance)
  flattenedColors = flattenedColors.slice(0, 10).map(color => color.name).map(color => removeColorPrefix(color))
  return [...new Set(flattenedColors)].slice(0, 3)
}

// capitalize and join with comma
export function getColorNamesJoined(color500) {
  return getColorNames(color500).map(color => color.charAt(0).toUpperCase() + color.slice(1)).join(", ")
}