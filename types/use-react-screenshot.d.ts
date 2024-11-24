declare module "use-react-screenshot" {
  import React from "react";

  export function useScreenshot<T extends HTMLElement>(): [
    (node: T | null) => Promise<string>,
    (node: T | null) => void
  ];

  export function createFileName(extension: string, mimeType: string): string;
}
