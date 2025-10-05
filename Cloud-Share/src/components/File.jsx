import React, { useState, useEffect } from "react";
import { Download, Frown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { getFile } from "./service";
import { base64ToFile } from "./Util";
import toast from "react-hot-toast";
const File = () => {
  const params = useParams();
  const id = params.id;
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    getFile(id)
      .then((res) => {
        console.log(res);
        const [filename, base64] = res.data.split("||");

        const fileObj = base64ToFile(base64, filename);

        setName(filename);
        setFile(fileObj);
        toast.success("File ready to download!");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching file. Please try again.");
      });
  }, [id]);

  const handleDownload = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert("No file to download.");
    }
  };
  const handlereset = () => {
    toast.success("You can share file now.");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="flex flex-col items-center [@media(max-width:400px)]:h-[700px] h-screen text-white animate-gradient bg-cover bg-center overflow-hidden">
      <div className="text-4xl [@media(max-width:400px)]:text-xl mt-10 [@media(max-width:400px)]:mt-5 font-bold">
        {" "}
        Welcome to Cloud Share
      </div>
      <div className="text-xl [@media(max-width:400px)]:text-md [@media(max-width:400px)]:text-center">
        {" "}
        Your one-stop solution for cloud file sharing.
      </div>
      <div className="mt-5 [@media(max-width:400px)]:mt-0">
        <div className="bg-white/50 p-5 mt-20 [@media(max-width:400px)]:mt-10 [@media(max-width:400px)]:w-[270px] [@media(max-width:400px)]:h-[430px] rounded-lg shadow-lg w-100 h-120 border-5 border-dotted border-gray-300">
          <div className="text-center text-3xl text-black">
            Your file is Ready
          </div>
          <div className="flex flex-col items-center">
            <DotLottieReact
              src="https://lottie.host/b31bbc3f-b482-431e-84bf-d6689a497740/hxvXmPFlky.lottie"
              loop
              autoplay
              className="w-140 -mt-7 h-70"
            />
            {loading ? (
              <p className="text-md -mt-7 text-black font-semibold">
                Loading...
              </p>
            ) : (
              <p className="text-md -mt-7 text-black font-semibold">{name}</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            {!loading && (
              <>
                <button className="mt-5 bg-blue-600 text-white p-3 font-semibold rounded-lg w-full hover:bg-purple-700 transition duration-200 ease-in-out">
                  <span
                    className="flex items-center justify-center gap-2"
                    onClick={handleDownload}
                  >
                    <Download /> Download File
                  </span>
                </button>

                <div className="text-black text-md font-semibold text-center mt-3">
                  Want to share file?{" "}
                  <span className="hover:underline cursor-pointer" onClick={handlereset}>
                    {" "}
                    Click me{" "}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default File;
