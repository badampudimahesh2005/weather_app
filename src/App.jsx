import { ToastContainer } from "react-toastify"
import Weather from "./components/Weather"

const App = () => {
  return (
    <div className='h-[100vh] w-[100vw]  font-poppins'>
      <Weather />
      <ToastContainer />
      </div>
  )
}

export default App

// bg-[#e2d4ff] 