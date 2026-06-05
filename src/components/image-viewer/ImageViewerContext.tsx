import { createContext, useState, useCallback, type ReactNode } from "react";
import { ImageViewer } from "./ImageViewer";
import type { ImageViewerImage } from "./ImageViewer";

interface ImageViewerContextValue {
  openViewer: (opts: {
    src?: string;
    alt?: string;
    images?: ImageViewerImage[];
    index?: number;
  }) => void;
}

const ImageViewerContext = createContext<ImageViewerContextValue | null>(null);

export { ImageViewerContext };

interface ImageViewerProviderProps {
  children: ReactNode;
}

export const ImageViewerProvider = ({ children }: ImageViewerProviderProps) => {
  const [state, setState] = useState<{
    isOpen: boolean;
    src?: string;
    alt?: string;
    images?: ImageViewerImage[];
    index?: number;
    key: number;
  }>({ isOpen: false, key: 0 });

  const openViewer = useCallback((opts: { src?: string; alt?: string; images?: ImageViewerImage[]; index?: number }) => {
    setState({ isOpen: true, key: Date.now(), ...opts });
  }, []);

  const onClose = useCallback(() => {
    setState({ isOpen: false, key: 0 });
  }, []);

  return (
    <ImageViewerContext.Provider value={{ openViewer }}>
      {children}
      <ImageViewer
        key={state.key}
        isOpen={state.isOpen}
        onClose={onClose}
        src={state.src}
        alt={state.alt}
        images={state.images}
        initialIndex={state.index}
      />
    </ImageViewerContext.Provider>
  );
};
