import { ExcalidrawElement } from "../element/types";
import { AppState } from "../types";
import { cleanAppStateForExport } from "../appState";

import { fileOpen, fileSave } from "browser-nativefs";
import { loadFromBlob } from "./blob";
import { loadLibrary } from "./localStorage";
import { Library } from "./library";

export const serializeAsJSON = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
): string =>
  JSON.stringify(
    {
      type: "aimxcel",
      version: 2,
      source: window.location.origin,
      elements: elements.filter((element) => !element.isDeleted),
      appState: cleanAppStateForExport(appState),
    },
    null,
    2,
  );

export const saveAsJSON = async (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  fileHandle: any,
) => {
  const serialized = serializeAsJSON(elements, appState);
  const blob = new Blob([serialized], {
    type: "application/json",
  });
  const name = `${appState.name}.aimxcel`;
  (window as any).handle = await fileSave(
    blob,
    {
      fileName: name,
      description: "Aimxcel file",
      extensions: ["aimxcel"],
    },
    fileHandle || null,
  );
};

export const loadFromJSON = async (appState: AppState) => {
  const blob = await fileOpen({
    description: "Aimxcel files",
    extensions: ["json", "aimxcel"],
    mimeTypes: ["application/json"],
  });
  return loadFromBlob(blob, appState);
};

export const saveLibraryAsJSON = async () => {
  const library = await loadLibrary();
  const serialized = JSON.stringify(
    {
      type: "aimxcellib",
      version: 1,
      library,
    },
    null,
    2,
  );
  const fileName = `library.aimxcellib`;
  const blob = new Blob([serialized], {
    type: "application/vnd.aimxcellib+json",
  });
  await fileSave(blob, {
    fileName,
    description: "Aimxcel library file",
    extensions: ["aimxcellib"],
  });
};

export const importLibraryFromJSON = async () => {
  const blob = await fileOpen({
    description: "Aimxcel library files",
    extensions: ["json", "aimxcellib"],
    mimeTypes: ["application/json"],
  });
  Library.importLibrary(blob);
};
