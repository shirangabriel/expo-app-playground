export interface NeumorphismColors {
    darkShadow: string;
    lightShadow: string;
    borderColor: string;
    textColor: string;
}

export function adjustColor(color: string, amount: number): string {
    let colorNum = parseInt(color.slice(1), 16);

    let r = (colorNum >> 16) + amount;
    let g = ((colorNum >> 8) & 0x00FF) + amount;
    let b = (colorNum & 0x0000FF) + amount;

    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function luminance(color: string): number {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;

    // Calculate luminance (using the formula for relative luminance)
    return 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
}

export function generateNeumorphismColors(mainColor: string): NeumorphismColors {
    const darkShadow = adjustColor(mainColor, -25); // Slightly darker shade for shadow
    const lightShadow = adjustColor(mainColor, 15);  // Slightly lighter shade for highlight
    const borderColor = adjustColor(mainColor, -15); // Slightly darker for border
    
    const mainLuminance = luminance(mainColor);

      // Set text color based on luminance
      let textColor: string;
    if (mainLuminance < 0.3) {
        textColor = '#ffffff'; // White for very dark colors
    } else if (mainLuminance < 0.6) {
        textColor = adjustColor(mainColor, -50); // Slightly darker for medium colors
    } else {
        textColor = '#333333'; // Dark gray for light colors, ensuring readability
    }

    return { darkShadow, lightShadow, borderColor, textColor };
}
