export function getDistinctColor(index){
    // Generate a color by cycling through hues for a more distinct color set
    const hue = (index * 360) / 12; // Divide the hue spectrum by the number of colors you want
    const saturation = 70; // Fixed saturation for vibrant colors
    const lightness = 50; // Fixed lightness for moderate brightness
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Return HSL color string
  };