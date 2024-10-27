export interface NeumorphismColors {
    darkShadow: string;
    lightShadow: string;
    borderColor: string;
    textColor: string;
    backgroundColor: string; // Add background for pressed state
}

function invertColor(color: string): string {
    const colorNum = parseInt(color.slice(1), 16);
    const r = 255 - (colorNum >> 16);
    const g = 255 - ((colorNum >> 8) & 0x00FF);
    const b = 255 - (colorNum & 0x0000FF);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function adjustColor(color: string, amount: number): string {
    let colorNum = parseInt(color.slice(1), 16);

    let r = (colorNum >> 16) + amount;
    let g = ((colorNum >> 8) & 0x00FF) + amount;
    let b = (colorNum & 0x0000FF) + amount;

    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function luminance(color: string): number {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;

    return 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
}

export function generateNeumorphismColors(mainColor: string): NeumorphismColors {
    const darkShadow = adjustColor(mainColor, -25); 
    const lightShadow = adjustColor(mainColor, 15);  
    const borderColor = adjustColor(mainColor, -15); 
    
    const mainLuminance = luminance(mainColor);
    const textColor = mainLuminance > 0.5 ? "#333333" : "#ffffff";

    // For "pressed" effect, invert the main color and swap shadows
    const invertedBackground = adjustColor(mainColor, mainLuminance > 0.5 ? -10 : 10);
    const pressedDarkShadow = lightShadow;
    const pressedLightShadow = darkShadow;
    const pressedBorderColor = invertColor(borderColor);

    return { 
        darkShadow, 
        lightShadow, 
        borderColor, 
        textColor, 
        backgroundColor: invertedBackground
    };
}