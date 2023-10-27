function AudioBars() {
  return (
    <div>
      <div
        className="bar w-3 h-12 mx-1 bg-white rounded inline-block"
        style={{ animationDelay: '.3s' }}
      ></div>
      <div
        className="bar w-3 h-12 mx-1 bg-white rounded inline-block"
        style={{ animationDelay: '.6s' }}
      ></div>
      <div
        className="bar w-3 h-12 mx-1 bg-white rounded inline-block"
        style={{ animationDelay: '.9s' }}
      ></div>
    </div>
  );
}

export default AudioBars;
