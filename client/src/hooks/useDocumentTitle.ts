import { useRef, useEffect } from "react";

export default function useDocumentTitle(title: string) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect((): (() => void) => {
    return () => (document.title = defaultTitle.current);
  }, []);
}
