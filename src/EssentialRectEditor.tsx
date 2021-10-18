import React, {
  CSSProperties,
  useState,
  useCallback,
  ReactElement,
} from "react";

import ReactCrop, { Crop } from "react-image-crop";

import { Rect, rectEmpty, rectClip, rectScale } from "./Rect";

import { useClientRect } from "./use-client-rect";

const cropStyles: CSSProperties = { width: "100%" };

export interface EssentialRectEditorProps {
  /* URL of the image */
  imageUrl?: string;

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
}

export const EssentialRectEditor: React.FC<EssentialRectEditorProps> = ({
  imageUrl,
  essentialRect,
  onEssentialRectChange,
  minAspectRatio,
  maxAspectRatio,
  onImageError,
  onImageLoaded,
}): ReactElement => {
  const [imageRect, setImageRect] = useState<Rect | undefined>();
  const [imageViewerRef, clientRect] = useClientRect();

  let crop: Partial<Crop> = {};
  let cropWrapperStyles: CSSProperties = {};
  let essentialRectClient: Rect;
  let maxCropWidth: number | undefined;
  let maxCropHeight: number | undefined;

  let cropScale = 0;
  let cropTop = 0;
  let cropLeft = 0;

  // we can determine where image should be placed until we have clientrect
  // and an image rect.  We can't draw the crop until we have an essentialRect.
  const drawCrop = imageUrl && !rectEmpty(clientRect);

  if (drawCrop && imageRect) {
    cropScale = Math.min(
      clientRect.width / imageRect.width,
      clientRect.height / imageRect.height
    );
    cropTop = (clientRect.height - imageRect.height * cropScale) / 2;
    cropLeft = (clientRect.width - imageRect.width * cropScale) / 2;

    cropWrapperStyles = {
      top: cropTop,
      left: cropLeft,
      width: imageRect.width * cropScale,
      height: imageRect.height * cropScale,
      position: "absolute",
    };

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
    if (imageRect && cropScale) {
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
        if (onEssentialRectChange) onEssentialRectChange(newEssentialRect);
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
    <div className="EssentialRectEditor">
      <div className="EssentialRectEditorInner" ref={imageViewerRef}>
        {drawCrop && (
          <div style={cropWrapperStyles}>
            <ReactCrop
              src={imageUrl}
              onImageLoaded={imageLoaded}
              onImageError={onImageError}
              crop={crop}
              onChange={onCropChange}
              style={cropStyles}
              imageStyle={cropStyles}
              minWidth={32}
              minHeight={32}
              maxWidth={maxCropWidth}
              maxHeight={maxCropHeight}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EssentialRectEditor;
