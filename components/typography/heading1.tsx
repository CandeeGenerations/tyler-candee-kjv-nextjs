const H1 = ({size = '5xl', className = '', children}) => {
  return (
    <h1
      className={`text-3xl md:text-4xl lg:text-${size} font-semibold mb-4 ${className}`}
    >
      {children}
    </h1>
  )
}

export default H1
