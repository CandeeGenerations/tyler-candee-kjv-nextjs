export default (body: string): string => {
  const paragraphs = body.split('\n').filter((x: string) => x !== '')
  let count = 0

  for (let i = 0; i < paragraphs.length; i++) {
    count += paragraphs[i].split(' ').length
  }

  const totalWords = count
  // word per minute = 200
  const wordsPerSecond = 200 / 60
  const totalReadingTimeSeconds = totalWords / wordsPerSecond
  let readingTimeDuration = Math.floor(totalReadingTimeSeconds / 60)
  const readingTimeSeconds = Math.round(
    totalReadingTimeSeconds - readingTimeDuration * 60,
  )

  if (readingTimeDuration > 0) {
    if (readingTimeSeconds > 30) {
      readingTimeDuration = readingTimeDuration + 1
    }

    return `${readingTimeDuration} min read`
  }

  return 'Less than a minute'
}
