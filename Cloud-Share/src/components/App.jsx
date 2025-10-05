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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    if (files.length === 0) {
      toast.error("Please select files to upload.");
      setLoading(false);
      return;
    }
    if (senderEmail === "" || receiverEmail === "") {
      toast.error("Please enter both sender and receiver email.");
      setLoading(false);
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
    setLoading(false);
  };

  const handlereset = () => {
    setSubmit(false);
    setFiles("");
    setName("");
    setLink("");
    setSenderEmail("");
    setReceiverEmail("");
    setBase64("");
    toast.success("Reset successful! You can share another file.");
  }
  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center overflow-hidden">
      {/* Header */}
      <div className="flex justify-center bg-gradient-to-l from-blue-600 to-green-300 p-5">
        <h1 className="text-4xl [@media(max-width:400px)]:text-xl font-bold text-white">
          Welcome to Cloud Share
        </h1>
      </div>

      {/* Main Section */}
      <div className="flex flex-row [@media(max-width:400px)]:flex-col-reverse justify-evenly">
        <div className="w-1/3 [@media(max-width:400px)]:h-[470px] [@media(max-width:400px)]:mb-5  [@media(max-width:400px)]:w-[90%] [@media(max-width:400px)]:m-auto p-5 [@media(max-width:400px)]:p-2 animate-gradient h-[80vh] mt-10 [@media(max-width:400px)]:mt-5 rounded-lg shadow-lg">
          <div className="text-2xl text-center text-white font-semibold mb-4">
            Let's get started!
          </div>
          <div className="flex flex-col items-center">
            <DotLottieReact
              src="https://lottie.host/d0f2bec7-14cf-4ca7-903b-e8e2c4339098/1V8ABDe0ex.lottie"
              loop
              autoplay
              className="w-140 [@media(max-width:400px)]:w-70 h-70 [@media(max-width:400px)]:h-40"
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
            {!loading ? (<button
              onClick={handleSubmit}
              className="w-full mt-5 shadow-2xl bg-blue-500 text-white p-3 font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Finish It and Access it
            </button>):(
              <button className="w-full mt-5 shadow-2xl bg-blue-500 text-white p-3 font-semibold rounded-lg hover:bg-blue-700 transition" disabled>
                Generating Link...
              </button>
            )}
            {submit && (
              <div className="text-gray-50 font-semibold text-md text-center mt-3">
                Want to share another file?{" "}
                <span className="hover:underline cursor-pointer" onClick={handlereset}>
                  {" "}
                  Click me{" "}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Upload Box */}
        {!submit ? (
          files === "" ? (
            <div
              onClick={handleClick}
              className="w-1/3 [@media(max-width:400px)]:w-[90%] [@media(max-width:400px)]:m-auto [@media(max-width:400px)]:mt-5 [@media(max-width:400px)]:h-60 p-5 shadow-2xl mt-32 border-4 flex flex-col justify-center items-center border-dotted border-gray-400 h-96 rounded-lg bg-white/50 cursor-pointer hover:bg-white/70 transition"
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
            <div className="w-1/3 [@media(max-width:400px)]:w-[90%] [@media(max-width:400px)]:m-auto [@media(max-width:400px)]:mt-5  p-5 [@media(max-width:400px)]:p-1 gap-10 [@media(max-width:400px)]:gap-5 shadow-2xl mt-32 border-4 flex flex-col justify-center items-center border-dotted border-gray-400 h-96 rounded-lg bg-white/50 cursor-pointer hover:bg-white/70 transition">
              <FileText size={120} className="[@media(max-width:400px)]:size-30" />
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
          <div className="w-1/3 [@media(max-width:400px)]:w-[90%] [@media(max-width:400px)]:m-auto [@media(max-width:400px)]:mt-5 py-5 gap-5 flex flex-col mt-80 justify-center items-center h-35 rounded-lg bg-white/70 cursor-pointer transition">
            <div className="font-bold text-center [@media(max-width:400px)]:mt-5 text-2xl">
              Link is accessible for 1 Hour ..Click to copy 
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
