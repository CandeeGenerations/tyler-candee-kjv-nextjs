import ImageWithZoom from 'react-medium-image-zoom'

interface ImageElement {
  previousElementSibling: {
    tagName: string
    style: {
      background: string
    }
  }
}

const handleImageZoomBackground = (background: string) => {
  const images = Array.from(document.getElementsByClassName('Image__Zoom'))

  images.map((img: ImageElement & Element) => {
    if (
      img.previousElementSibling &&
      img.previousElementSibling.tagName === 'DIV'
    ) {
      img.previousElementSibling.style.background = background
    }
  })
}

const ImageZoom = (props) => {
  const image = {
    ...props,
    className: 'Image__Zoom',
    style: {
      display: 'block',
      margin: '0 auto',
      width: '100%',
    },
  }

  return (
    <ImageWithZoom
      zoomImage={image}
      image={image}
      onZoom={async () => handleImageZoomBackground('#fff')}
      defaultStyles={{
        zoomImage: {
          borderRadius: '5px',
        },
      }}
    />
  )
}

export default ImageZoom
