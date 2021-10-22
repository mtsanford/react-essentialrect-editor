import { useState, CSSProperties } from "react";
import ReactDOM from "react-dom";
import { EssentialRectImg, Rect } from "react-essentialrect";
import { EssentialRectEditor } from "../src/index";

import "react-essentialrect/dist/essentialrect-img.css";
import "react-image-crop/dist/ReactCrop.css";

// total width + height
const T = 160 * 160;

const aspectRatios: number[] = [1 / 3, 1 / 2, 1 / 1.5, 1, 1.5, 2, 3];

const viewStyles: CSSProperties[] = aspectRatios.map((A: number) => {
  const h = Math.pow(T / A, 0.5);
  const w = Math.pow(T * A, 0.5);
  return {
    width: `${w}px`,
    height: `${h}px`,
  };
});

function App() {
  const [essentialRect, setEssentialRect] = useState<Rect>({
    left: 858,
    top: 10,
    width: 449,
    height: 632,
  });

  return (
    <div className="App">
      <EssentialRectEditor
        className="editor"
        imageUrl="./sax.jpg"
        essentialRect={essentialRect}
        onEssentialRectChange={setEssentialRect}
        maxAspectRatio={2}
        minAspectRatio={0.5}
      />

      {viewStyles.map((s: CSSProperties, i: number) => (
        <EssentialRectImg
          src="./sax.jpg"
          className="image"
          essentialRect={essentialRect}
          style={s}
          key={aspectRatios[i]}
        />
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
