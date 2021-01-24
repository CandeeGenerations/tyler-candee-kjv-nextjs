import {useEffect, useState} from 'react'
import {getPassage, getVerse} from '../../api/verse.api'

const Verse = () => {
  const [showVerse, setShowVerse] = useState(false)

  const clickFunc = async (book, chapter, verse, endVerse) => {
    setShowVerse(false)

    const e: {pageX?: number; pageY?: number} & Event = window.event
    let response = null
    let content = ''

    if (endVerse) {
      response = await getPassage(book, chapter, verse, endVerse)
      content = response.content
        .trim()
        .replace(/\n\s\s\s\s/g, '')
        .replace(/\u00B6\s/g, '')
        .replace(/\n/g, '<br />')
        .replace(/\s\s/g, '<br />')
        .replace(/[\t/[]/g, '')
        .replace(/] /g, '. ')
    } else {
      response = await getVerse(book, chapter, verse)
      content = response.content.trim().replace(/\u00B6\s/g, '')
    }

    if (response) {
      let left = e.pageX

      if (window.innerWidth < 500) {
        left = 5
      } else if (window.innerWidth - e.pageX < 500) {
        left = window.innerWidth - 550
      }

      setShowVerse(true)

      const verseElement = document.getElementById('verse')

      verseElement.style.top = `${e.pageY + 10}px`
      verseElement.style.left = `${left}px`
      verseElement.innerHTML = `<p id="verse-content"><span id="verse-reference">${response.reference}</span><br /><br />${content}</p>`
    }
  }

  useEffect(() => {
    const verseElements = document.getElementsByClassName('verse')

    for (var i = 0; i < verseElements.length; i++) {
      const verseElement: {onclick?: () => void} & Element = verseElements.item(
        i,
      )
      const book = verseElement.getAttribute('data-book')
      const chapter = verseElement.getAttribute('data-chapter')
      const verse = verseElement.getAttribute('data-verse')
      const endVerse = verseElement.getAttribute('data-end-verse')

      verseElement.onclick = () => clickFunc(book, chapter, verse, endVerse)
    }

    document.addEventListener('mouseup', (e) => {
      const verseElement = document.getElementById('verse')
      let verseContent = null
      let verseReference = null

      if (verseElement) {
        verseContent = document.getElementById('verse-content')
        verseReference = document.getElementById('verse-reference')
      }

      if (
        verseElement !== e.target &&
        verseContent !== e.target &&
        verseReference !== e.target
      ) {
        setShowVerse(false)
      }
    })
  }, [])

  return showVerse && <div id="verse" className="verse-overlay"></div>
}

export default Verse
