import { ToastContainer } from "react-toastify"
import Weather from "./components/Weather"

const App = () => {
  return (
    <div className='min-h-screen w-full font-poppins'>
      <Weather />
      <ToastContainer />
      </div>
  )
}

export default App

// bg-[#e2d4ff] 