import { useState, CSSProperties } from 'react';
import ReactDOM from 'react-dom'; 
import { EssentialRectEditor, EssentialRectImg, Rect } from '../src/editor';

import '../src/essentialrect-img.css';
import '../src/essentialrect-editor.css';
import 'react-image-crop/dist/ReactCrop.css';

// total width + height
const T = 160 * 160;

const aspectRatios: number[] = [ 1/3, 1/2, 1/1.5, 1, 1.5, 2, 3];

const viewStyles: CSSProperties[] = aspectRatios.map( (A: number) => {
   const h = Math.pow(T/A, 0.5);
   const w = Math.pow(T*A, 0.5);
   return {
    width: `${w}px`,
    height: `${h}px`,
   }
});

function App() {
  const [essentialRect, setEssentialRect] = useState<Rect>({left:858, top:0, width:649, height:942});

  const onImageLoaded = (): void => {
    console.log('onImageLoaded');
  }

  const onEssentialRectChange = (r: Rect): void => {
    setEssentialRect(r);
    console.log('onEssentialRectChange');
  }

  return (
    <div className="App">
      <div className='editorWrapper'>
        <EssentialRectEditor
          imageUrl='./sax.jpg'
          essentialRect={essentialRect}
          onEssentialRectChange={onEssentialRectChange}
          onImageLoaded={onImageLoaded}
        />
      </div>
      { viewStyles.map((s: CSSProperties, i:number) => (
        <div className="imageWrapper" style={s} key={aspectRatios[i]}>
          <EssentialRectImg
            src="./sax.jpg"
            essentialRect={essentialRect}
          />
        </div>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));

