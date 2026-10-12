export interface GradientData {
  startColor: string
  endColor: string
  angle: number
}

export const parseGradient = (gradientString: string | undefined): GradientData | null => {
  if (!gradientString?.startsWith('linear-gradient')) {
    return null
  }

  try {
    // Basic parser for linear-gradient(deg, color1, color2)
    const match =
      /linear-gradient\((\d+)deg,\s*(#[0-9a-fA-F]{6}|rgba?\(.*?\)),\s*(#[0-9a-fA-F]{6}|rgba?\(.*?\))\)/.exec(
        gradientString,
      )
    const [, angle, startColor, endColor] = match ?? []
    if (angle && startColor && endColor) {
      return {
        angle: Number.parseInt(angle, 10),
        startColor,
        endColor,
      }
    }
  } catch (error) {
    console.error('Failed to parse gradient:', error)
  }

  return null
}

export const generateGradient = ({ startColor, endColor, angle }: GradientData): string => {
  return `linear-gradient(${angle}deg, ${startColor}, ${endColor})`
}
