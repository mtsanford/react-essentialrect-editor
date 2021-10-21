import React, {
  CSSProperties,
  useState,
  useCallback,
  ReactElement,
} from "react";

import ReactCrop, { Crop } from "react-image-crop";

import {
  useClientRect,
  Rect,
  rectEmpty,
  rectClip,
  rectScale,
} from "react-essentialrect";

export interface EssentialRectEditorProps {
  /* URL of the image */
  imageUrl: string;

  /* essentialRect of the image */
  essentialRect?: Rect;

  /* callback when the essentialRect changes */
  onEssentialRectChange?: (newRect: Rect) => void;

  /* Specify aspect ratio range for which letterbox margins should be avoided */
  minAspectRatio?: number;
  maxAspectRatio?: number;

  /* callbacks for when the image is loaded or fails to load */
  onImageError?: React.DOMAttributes<HTMLImageElement>["onError"];
  onImageLoaded?: (image: HTMLImageElement) => void;

  /* add custom styling */
  className?: string;
  style?: CSSProperties;
}

export const EssentialRectEditor: React.FC<EssentialRectEditorProps> = ({
  imageUrl,
  essentialRect,
  onEssentialRectChange,
  minAspectRatio,
  maxAspectRatio,
  onImageError,
  onImageLoaded,
  className,
  style,
}): ReactElement => {
  const [imageRect, setImageRect] = useState<Rect | undefined>();
  const [editorRef, clientRect] = useClientRect();

  let crop: Partial<Crop> = {};
  let essentialRectClient: Rect;
  let maxCropWidth: number | undefined;
  let maxCropHeight: number | undefined;
  const classes = `EssentialRectEditor ${className || ""}`;
  const wrapperStyles: CSSProperties = style || {};

  // ratio of ReactCrop element size to image size
  let cropScale = 0;

  if (!rectEmpty(clientRect) && imageRect) {
    cropScale = clientRect.width / imageRect.width;
    
    if (essentialRect) {
      essentialRectClient = rectScale(essentialRect, cropScale);

      if (minAspectRatio) {
        maxCropWidth = Math.floor(
          Math.min(imageRect.width, imageRect.height * minAspectRatio) *
            cropScale
        );
      }

      if (maxAspectRatio) {
        maxCropHeight = Math.floor(
          Math.min(imageRect.height, imageRect.width * maxAspectRatio) *
            cropScale
        );
      }

      crop = {
        x: essentialRectClient.left,
        y: essentialRectClient.top,
        width: essentialRectClient.width,
        height: essentialRectClient.height,
        unit: "px",
      };
    }
  }

  const onCropChange = (newCrop: Crop) => {
    if (imageRect && cropScale && onEssentialRectChange) {
      const newEssentialRect = rectClip(
        rectScale(
          {
            left: newCrop.x,
            top: newCrop.y,
            width: newCrop.width,
            height: newCrop.height,
          },
          1 / cropScale
        ),
        imageRect
      );

      if (!rectEmpty(newEssentialRect)) {
        onEssentialRectChange(newEssentialRect);
      }
    }
  };

  const imageLoaded = useCallback(
    (element: HTMLImageElement): boolean => {
      const loadedImageRect = {
        left: 0,
        top: 0,
        width: element.naturalWidth,
        height: element.naturalHeight,
      };

      setImageRect(loadedImageRect);

      if (onImageLoaded) onImageLoaded(element);

      // let ReactCrop know that it does not need to initialize the crop.  We
      // set that through the essentialRect prop, and expect our parent
      // to supply it!
      return false;
    },
    [onImageLoaded]
  );

  return (
    <div className={classes} style={wrapperStyles} ref={editorRef}>
      <ReactCrop
        src={imageUrl}
        onImageLoaded={imageLoaded}
        onImageError={onImageError}
        crop={crop}
        onChange={onCropChange}
        minWidth={32}
        minHeight={32}
        maxWidth={maxCropWidth}
        maxHeight={maxCropHeight}
        style={{ width: "100%"}}
        imageStyle={{ width: "100%"}}
      />
    </div>
  );
};

export default EssentialRectEditor;
