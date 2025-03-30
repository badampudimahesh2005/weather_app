import { ToastContainer } from "react-toastify";
import Weather from "./components/Weather";

const App = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#e2d4ff] font-poppins overflow-x-hidden">
      <Weather />
      <ToastContainer />
    </div>
  );
};

export default App;