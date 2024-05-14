import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const workerRef = useRef(null);
  const videoRef = useRef(null);
  const videoDuration = 100;
  const chunkSize = 5; // Chunk size in seconds
  const totalChunks = Math.ceil(videoDuration / chunkSize);

  useEffect(() => {
    workerRef.current = new Worker('./video-chunker.js'); // Path to your Web Worker script
    workerRef.current.onmessage = (e) => {
      // Receive video chunks from the Web Worker
      console.log("Received chunk");
      setVideoChunks((prevChunks) => [...prevChunks, e.data]);
    };
  }, []);

  const handleChunkVideo = async () => {
    console.log("Pressed button");
    // if (!videoFile) return;
    const reader = new FileReader();
    reader.readAsArrayBuffer(videoFile);
    reader.onload = (e) => {
      workerRef.current.postMessage(e.target.result); // Send video data to Web Worker
    };
  };

  // ... (similar logic for video playback using buffered chunks)

  return (
    <div>
      <video ref={videoRef} controls />
      <button onClick={handleChunkVideo} type="file" accept="video/*">Chunk Video</button>
      Hlo Boys lets play COD.<br/>
      Mustu Darling
      Manish
      Asgola
      alpha
      Bravo
      Charlie
      Delta
      Eco

    </div>
  );
}

export default App;

