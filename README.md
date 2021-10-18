# React EssentialRect

A React implementation of the essentialRect responsive display standard. EssentialRectImg is a React component that acts like an '<img/>' element, using image's essential rectangle to reponsiviely display the image within the client area. EssentialRectEditor is a React component that allows selection of an essential rectangle, optionally contraining to require letterbox-free display within a range of aspect ratios. EssentialRectEditor uses the react-image-crop module as a dependency.

[![EssentialRect Library on NPM](https://img.shields.io/npm/v/react-essentialrect.svg)](https://www.npmjs.com/package/react-essentialrect)

[Quick demo](https://www.essentialrect.com) |
[Editor demo](https://tool.essentialrect.com)
[Code Sandbox](https://codesandbox.io/s/sharp-forest-lm1h2)

[Learn more about react-image-crop here](https://github.com/DominicTobias/react-image-crop)


## Table of Contents

1. [What is essentiaRect?](#about)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Example](#example)
6. [Props](#props)

## What is essentialRect?

EssentialRect is a standard for responsive image display. Rather than cropping an image to a rectangle of a certain aspect ratio, a rectangle (its essentialRect) is defined for an image as "essential". This allows the image to be shown in a wide range of aspect ratios without cropping or leterboxing. The essentialRect will be guaranteed to be displayed, while the rest of the image will be considered "nice to have", and will be used to fill the remaining client area. The essentialRect will be as centered as possible while still avoiding letterboxing.

## Features

- EssentialRectImg that displays an image based on the client area and essentialRect
- EseentialRectEditor that allows editing of an essentialrect.

## Installation

For image diplay only (no editing):

```
npm i react-essentialrect --save
```

For essentialRect editing of an image:

```
npm i react-essentialrect react-image-crop --save
```

## Usage

There is no default export.  For image diplay only (no editing):

```js
import EssentialRectImg from "react-essentialrect";
import "react-essentialrect/dist/css/essentialrect-img.css";
```

For essentialRect display and editing of an image:

```js
import { EssentialRectEditor, EssentialRectImg } from "react-essentialrect/editor";
import "react-essentialrect/dist/css/essentialrect-editor.css";
```

## Example

### Image display

```js
import { EssentialRectImg } from "react-essentialrect";
import "react-essentialrect/dist/css/essentialrect-img.css";

const imageHeight = 300;
const aspectRatio = 1.91;

function App(imageUrl) {
  const imageStyles = {
    width: `${imageHeight * aspectRatio}px`,
    height: `${imageHeight}px`,
  };

  return (
    <div className="App">
      <div className="imageWrapper" style={imageStyles}>
        <EssentialRectImg src={imageUrl} essentialRect={essentialRect} />
      </div>
    </div>
  );
}
```


```js
import { EssentialRectImg, EssentialRectEditor } from "react-essentialrect/editor";
import "react-image-crop/dist/ReactCrop.css";
import "react-essentialrect/dist/css/essentialrect-img.css";
import "react-essentialrect/dist/css/essentialrect-editor.css";

const imageHeight = 300;
const aspectRatio = 1.91;
const editorSize = 300;

function App(imageUrl) {
  const [essentialRect, setEssentialRect] = useState();

  const onEssentialRectChange = (r: Rect): void => {
    setEssentialRect(r);
  };

  const imageStyles = {
    width: `${imageHeight * aspectRatio}px`,
    height: `${imageHeight}px`,
  };

  const editorStyles = {
    width: `${editorSize}px`,
    height: `${editorSize}px`,
  };

  return (
    <div className="App">
      <div className="editorWrapper" style={imageStyles}>
        <EssentialRectEditor
          imageUrl={imageUrl}
          essentialRect={essentialRect}
          onEssentialRectChange={onEssentialRectChange}
        />
      </div>
      <div className="imageWrapper" style={editorStyles}>
        <EssentialRectImg src={imageUrl} essentialRect={essentialRect} />
      </div>
    </div>
  );
}
```

## Props

### EssentialRectImg

#### src (required)

The url for the image.  Can be any url that `<img>` accepts.

#### essentialRect (optional)

A Rect object that defines the essential rectangle for the image.  If not provided, then entire image is considered essential.

### EssentialRectEditor

#### imageUrl (required)

The url for the image.  Can be any url that `<img>` accepts.

#### essentialRect (optional)

A Rect object that defines the essential rectangle for the image.  If not provided, it will be set to the rectangle of the entire image, or a centered rectangle that is contrained by minAspectRatio and/or maxAspectRatio.

#### onEssentialRectChange (optional)

The parent component should maintain the update of the essentialRect in this callback.  Without this callback provided, the editor will not function.

#### minAspectRatio (optional)

Specify that if the aspect ratio of the box the image is displayed in is above minAspectRatio, it should not be letterboxed.  This contrains the width of the essentialRect.

#### maxAspectRatio (optional)

Specify that if the aspect ratio pf the box the image is displayed in is below maxAspectRatio, it should not be letterboxed.  This contrains the height of the essentialRect.

#### onImageError (optional)

Callback if the image fails to load

#### onImageLoaded (optional)

Callback when the image successfully loads, passing the loaded HTMLImageElement as a parameter.

