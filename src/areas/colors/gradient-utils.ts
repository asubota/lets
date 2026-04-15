export interface GradientData {
  startColor: string
  endColor: string
  angle: number
}

export const parseGradient = (gradientStr: string | undefined): GradientData | null => {
  if (!gradientStr || !gradientStr.startsWith('linear-gradient')) {
    return null
  }

  try {
    // Basic parser for linear-gradient(deg, color1, color2)
    const match = gradientStr.match(/linear-gradient\((\d+)deg,\s*(#[0-9a-fA-F]{6}|rgba?\(.*?\)),\s*(#[0-9a-fA-F]{6}|rgba?\(.*?\))\)/)
    if (match) {
      return {
        angle: parseInt(match[1], 10),
        startColor: match[2],
        endColor: match[3],
      }
    }
  } catch (e) {
    console.error('Failed to parse gradient:', e)
  }

  return null
}

export const generateGradient = ({ startColor, endColor, angle }: GradientData): string => {
  return `linear-gradient(${angle}deg, ${startColor}, ${endColor})`
}
