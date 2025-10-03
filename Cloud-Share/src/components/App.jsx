import { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FileText, Clipboard } from "lucide-react";
import { fileToBase64 } from "./Util";
import { createFile } from "./service";

const App = () => {
  const fileInputRef = useRef(null);
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [files, setFiles] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [submit, setSubmit] = useState(false);
  const [base64, setBase64] = useState("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      const base64 = await fileToBase64(selectedFiles[0]);
      setBase64(base64);
      toast.success("Files selected successfully!");
      setName(selectedFiles[0].name);
      setFiles(selectedFiles);
    }
  };
  const handleSubmit = () => {
    if (files.length === 0) {
      toast.error("Please select files to upload.");
      return;
    }
    if (senderEmail === "" || receiverEmail === "") {
      toast.error("Please enter both sender and receiver email.");
      return;
    }
    let form = {
      senderEmail,
      receiverEmail,
      name,
      file: base64,
    };

    setTimeout(() => {
      console.log(form);
      createFile(form)
        .then((res) => {
          setLink(`${window.location.href}getit/${res.request.responseText}`);
          setSubmit(true);
          toast.success("Files uploaded successfully!");
        })
        .catch((err) => {
          toast.error("Error uploading file. Please try again");
        });
    }, 2000);
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
        <div className="w-1/3 p-5 animate-gradient h-[80vh] mt-10 rounded-lg shadow-lg">
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
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              type="email"
              placeholder="Enter sender email"
              className="w-full text-white p-3 mb-4  border-3 placeholder:text-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              type="email"
              placeholder="Enter receiver email"
              className="w-full text-white p-3 mb-4 border-3 placeholder:text-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="w-full mt-5 shadow-2xl bg-blue-500 text-white p-3 font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Finish It and Access it
            </button>
          </div>
        </div>

        {/* Upload Box */}
        {!submit ? (
          files === "" ? (
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
                <input
                  ref={fileInputRef}
                  value={files}
                  onChange={handleFileChange}
                  type="file"
                  className="hidden"
                  multiple
                />
                Drag & drop files here <br /> or click to select
              </p>
            </div>
          ) : (
            <div className="w-1/3 p-5 gap-10 shadow-2xl mt-32 border-4 flex flex-col justify-center items-center border-dotted border-gray-400 h-96 rounded-lg bg-white/50 cursor-pointer hover:bg-white/70 transition">
              <FileText size={120} />
              <div className="font-bold  text-center">
                <span>{name}</span>{" "}
                <span
                  className="text-red-500"
                  onClick={() => {
                    setFiles("");
                    setName("");
                    toast.success("File removed successfully!");
                  }}
                >
                  X
                </span>
              </div>
            </div>
          )
        ) : (
          <div className="w-1/3 py-5 gap-5 flex flex-col mt-80 justify-center items-center h-35 rounded-lg bg-white/70 cursor-pointer transition">
            <div className="font-bold text-center text-2xl">
              Link is Here ..Click to copy
            </div>
            <div
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link copied to clipboard!");
              }}
              className="text-center flex flex-row justify-between  bg-black text-white border rounded-xl w-full shadow-2xl p-2 font-semibold"
            >
              <div className="text-center m-auto">{link}</div>
              <div className="bg-white hover:bg-gray-400 flex justify-center items-center m-2 rounded-md h-8 w-8 text-center text-black">
                <Clipboard />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
