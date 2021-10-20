# React EssentialRect Editor

EssentialRectEditor is a React component that allows selection of an essential rectangle, optionally contraining to require letterbox-free display within a range of aspect ratios. EssentialRectEditor uses the react-image-crop module as a dependency.

[Also see react-essentialrect](https://www.npmjs.com/package/react-essentialrect)

[![EssentialRect Library on NPM](https://img.shields.io/npm/v/react-essentialrect-editor.svg)](https://www.npmjs.com/package/react-essentialrect-editor)

[Editor demo](https://tool.essentialrect.com)

## Table of Contents

1. [What is essentiaRect?](#about)
2. [Dependencies](#dependencies)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Example](#example)
6. [Props](#props)

## What is essentialRect?

EssentialRect is a standard for responsive image display. Rather than cropping an image to a rectangle of a certain aspect ratio, a rectangle (its essentialRect) is defined for an image as "essential". This allows the image to be shown in a wide range of aspect ratios without cropping or leterboxing. The essentialRect will be guaranteed to be displayed, while the rest of the image will be considered "nice to have", and will be used to fill the remaining client area. The essentialRect will be as centered as possible while still avoiding letterboxing.

## Dependencies

[react-essentialrect](https://www.npmjs.com/package/react-essentialrect)

[react-image-crop](https://github.com/DominicTobias/react-image-crop)

## Installation

```
npm i react-essentialrect-editor --save
```

## Usage

There is no default export.

```js
import { EssentialRectEditor } from "react-essentialrect-editor";
import "react-essentialrect-editor/dist/essentialrect-editor.css";
```

## Example

```js
import { useState } from "react";
import { EssentialRectEditor } from "react-essentialrect-editor";
import { Rect } from "react-essentialrect";
import "react-image-crop/dist/ReactCrop.css";
import "react-essentialrect-editor/dist/css/essentialrect-editor.css";

const editorSize = 300;

function App(imageUrl) {
  const [essentialRect, setEssentialRect] = useState();

  const onEssentialRectChange = (r: Rect): void => {
    setEssentialRect(r);
  };

  const editorStyles = {
    width: `${editorSize}px`,
    height: `${editorSize}px`,
  };

  return (
    <div className="App">
      <EssentialRectEditor
        style={editorStyles}
        imageUrl={imageUrl}
        essentialRect={essentialRect}
        onEssentialRectChange={onEssentialRectChange}
      />
    </div>
  );
}
```

## Props

#### imageUrl (required)

The url for the image. Can be any url that `<img>` accepts.

#### essentialRect (optional)

A Rect object that defines the essential rectangle for the image. If not provided, it will be set to the rectangle of the entire image, or a centered rectangle that is contrained by minAspectRatio and/or maxAspectRatio.

#### onEssentialRectChange (optional)

The parent component should maintain the update of the essentialRect in this callback. Without this callback provided, the editor will not function.

#### minAspectRatio (optional)

Specify that if the aspect ratio of the box the image is displayed in is above minAspectRatio, it should not be letterboxed. This contrains the width of the essentialRect.

#### maxAspectRatio (optional)

Specify that if the aspect ratio pf the box the image is displayed in is below maxAspectRatio, it should not be letterboxed. This contrains the height of the essentialRect.

#### onImageError (optional)

Callback if the image fails to load

#### onImageLoaded (optional)

Callback when the image successfully loads, passing the loaded HTMLImageElement as a parameter.

#### className (optional)

CSS class to add class to the EssentialRectEditor.

#### style (optional)

CSSProperties object to add styles to the EssentialRectEditor.
