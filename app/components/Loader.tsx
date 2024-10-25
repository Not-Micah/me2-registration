import "./loader.css"

const Loader = () => {
  return (
    <div
    className='
    w-[100vw] h-[100vh]
    flex justify-center items-center'>
      <img src="favicon.ico"
      className='
      w-[75px] h-[75px]
      -mt-[150px]
      animate-pulse pulse-scale-animation'/>
    </div>
  )
}

export default Loader