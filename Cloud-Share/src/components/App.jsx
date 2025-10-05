import { useRef, useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { toast } from "react-hot-toast";
import { FileText, Clipboard } from "lucide-react";
import { fileToBase64 } from "./Util";
import { createFile } from "./service";

const App = () => {
  const fileInputRef = useRef(null);
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [files, setFiles] = useState(null); // mobile-safe
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
    if (selectedFiles && selectedFiles.length > 0) {
      const base64 = await fileToBase64(selectedFiles[0]);
      setBase64(base64);
      setName(selectedFiles[0].name);
      setFiles(selectedFiles);
      toast.success("File selected successfully!");
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    if (!files || files.length === 0) {
      toast.error("Please select files to upload.");
      setLoading(false);
      return;
    }

    if (!senderEmail || !receiverEmail) {
      toast.error("Please enter both sender and receiver email.");
      setLoading(false);
      return;
    }

    const form = {
      senderEmail,
      receiverEmail,
      name,
      file: base64,
    };

    setTimeout(() => {
      createFile(form)
        .then((res) => {
          setLink(`${window.location.href}getit/${res.request.responseText}`);
          setSubmit(true);
          toast.success("File uploaded successfully!");
          setLoading(false);
        })
        .catch(() => {
          toast.error("Error uploading file. Please try again");
          setLoading(false);
        });
    }, 2000);
  };

  const handleReset = () => {
    setSubmit(false);
    setFiles(null);
    setName("");
    setLink("");
    setSenderEmail("");
    setReceiverEmail("");
    setBase64("");
    toast.success("Reset successful! You can share another file.");
  };

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center overflow-hidden">
      {/* Header */}
      <div className="flex justify-center bg-gradient-to-l from-blue-600 to-green-300 p-5">
        <h1 className="text-4xl font-bold text-white [@media(max-width:400px)]:text-xl">
          Welcome to Cloud Share
        </h1>
      </div>

      {/* Main Section */}
      <div className="flex flex-row [@media(max-width:400px)]:flex-col-reverse [@media(max-width:400px)]:items-center [@media(max-width:400px)]:justify-center justify-evenly">
        {/* Form Section */}
        <div className="w-1/3 [@media(max-width:400px)]:mb-5 [@media(max-width:400px)]:w-[90%] p-5 [@media(max-width:400px)]:p-2 h-[80vh] [@media(max-width:400px)]:h-[480px] mt-10 [@media(max-width:400px)]:mt-10 rounded-lg shadow-lg animate-gradient">
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
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="Enter sender email"
              className="w-full p-3 mb-4 text-white border-3 border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              placeholder="Enter receiver email"
              className="w-full p-3 mb-4 text-white border-3 border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!loading ? (
              <button
                onClick={handleSubmit}
                className="w-full mt-5 p-3 font-semibold text-white bg-blue-500 rounded-lg shadow-2xl hover:bg-blue-700 transition"
              >
                Finish It and Access it
              </button>
            ) : (
              <p className="text-center text-white font-semibold mt-3">
                Generating Link...
              </p>
            )}

            {submit && (
              <div className="text-gray-50 font-semibold text-md text-center mt-3">
                Want to share another file?{" "}
                <span className="hover:underline cursor-pointer" onClick={handleReset}>
                  Click me
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Upload Box */}
        {!submit && (
          <div
            onClick={handleClick}
            className="w-1/3 [@media(max-width:400px)]:w-[90%] [@media(max-width:400px)]:m-auto [@media(max-width:400px)]:mt-5 p-5 mt-32 h-96 shadow-2xl border-4 border-dotted border-gray-400 rounded-lg flex flex-col justify-center items-center bg-white/50 cursor-pointer hover:bg-white/70 transition"
          >
            <DotLottieReact
              src="https://lottie.host/5ad74bef-1cc1-4185-9b38-2cd84dd841fd/cKzS2gtcYp.lottie"
              loop
              autoplay
              className="w-60 h-40"
            />
            <p className="font-bold text-center">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
              {files ? (
                <span>
                  {name}{" "}
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      setFiles(null);
                      setName("");
                      toast.success("File removed successfully!");
                    }}
                  >
                    X
                  </span>
                </span>
              ) : (
                "Drag & drop files here or click to select"
              )}
            </p>
          </div>
        )}

        {/* Submitted Link */}
        {submit && (
          <div className="w-1/3 [@media(max-width:400px)]:w-[90%] [@media(max-width:400px)]:m-auto [@media(max-width:400px)]:mt-5 py-5 gap-5 flex flex-col mt-80 justify-center items-center h-35 rounded-lg bg-white/70 cursor-pointer transition">
            <div className="font-bold text-center [@media(max-width:400px)]:mt-5 text-2xl">
              Link is accessible for 1 Hour ..Click to copy
            </div>
            <div
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link copied to clipboard!");
              }}
              className="flex justify-between items-center w-full p-2 text-black bg-black border rounded-xl shadow-2xl"
            >
              <div className="text-center m-auto text-white">{link}</div>
              <div className="flex justify-center items-center w-8 h-8 m-2 text-black bg-white rounded-md hover:bg-gray-400">
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
