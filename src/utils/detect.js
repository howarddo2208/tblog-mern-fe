const explicitimageClasses = ['Hentai', 'Porn', 'Sexy']

export const imageIsExplicit = (predictions) => {
  for (let i = 0; i < predictions.length; i++) {
    const item = predictions[i]
    if (explicitimageClasses.includes(item.className) && item.probability > 0.4) {
      return true
    }
  }
  return false
}
