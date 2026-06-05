import { useContext } from "react";
import { ImageViewerContext } from "./ImageViewerContext";

export const useImageViewer = () => {
  const ctx = useContext(ImageViewerContext);
  if (!ctx) throw new Error("useImageViewer debe usarse dentro de un ImageViewerProvider");
  return ctx;
};

export const useImageViewerSafe = () => {
  return useContext(ImageViewerContext);
};
