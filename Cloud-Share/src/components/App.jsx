import { CloudUpload } from "lucide-react";
import { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const App = () => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center overflow-hidden">
      {/* Header */}
      <div className="flex justify-center bg-gradient-to-l from-blue-600 to-green-300 p-5">
        <h1 className="text-4xl font-bold text-white">
          Welcome to Cloud Share
        </h1>
      </div>

      {/* Main Section */}
      <div className="flex flex-row justify-evenly">
        <div className="w-1/3 p-5 bg-gradient-to-tl from-purple-400 to-orange-200 h-[80vh] mt-10 rounded-lg shadow-lg">
          <div className="text-2xl text-center font-semibold mb-4">
            Let's get started!
          </div>
          <div className="">
            <DotLottieReact
              src="https://lottie.host/d0f2bec7-14cf-4ca7-903b-e8e2c4339098/1V8ABDe0ex.lottie"
              loop
              autoplay
              className="w-140 -ml-12 h-70"
            />
          </div>
          <div className="mt-5">
            <input
              type="email"
              placeholder="Enter sender email"
              className="w-full p-3 mb-4  border-3 placeholder:text-black border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Enter receiver email"
              className="w-full p-3 mb-4 border-3 placeholder:text-black border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full mt-5 bg-blue-600 text-white p-3 font-semibold rounded-lg hover:bg-blue-700 transition">
              Finish It and Access it
            </button>
          </div>
        </div>

        {/* Upload Box */}
        <div
          onClick={handleClick}
          className="w-1/3 p-5 shadow-2xl mt-32 border-4 flex flex-col justify-center items-center border-dotted border-gray-400 h-96 rounded-lg bg-white/50 cursor-pointer hover:bg-white/70 transition"
        >
          <DotLottieReact
            src="https://lottie.host/5ad74bef-1cc1-4185-9b38-2cd84dd841fd/cKzS2gtcYp.lottie"
            loop
            className="w-60 h-40"
            autoplay
          />
          <p className="font-bold text-center">
            <input ref={fileInputRef} type="file" className="hidden" multiple />
            Drag & drop files here <br /> or click to select
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
