self.addEventListener('message', (event) => {
    console.log("chunker");
    const videoData = event.data;
    const chunks = [];
    const chunkSize = 5 * 1024 * 1024; // Adjust chunk size as needed (5 MB)
    for (let i = 0; i < videoData.byteLength; i += chunkSize) {
      const chunk = videoData.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    self.postMessage(chunks); // Send video chunks back to main thread
  });
  