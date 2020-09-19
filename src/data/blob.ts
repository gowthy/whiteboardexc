import { getDefaultAppState, cleanAppStateForExport } from "../appState";
import { restore } from "./restore";
import { t } from "../i18n";
import { AppState } from "../types";
import { LibraryData } from "./types";
import { calculateScrollCenter } from "../scene";

const loadFileContents = async (blob: any) => {
  let contents: any;
  if ("text" in Blob) {
    contents = await blob.text();
  } else {
    contents = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsText(blob, "utf8");
      reader.onloadend = () => {
        //console.log("helloooo")
        if (reader.readyState === FileReader.DONE) {
          console.log("done")
          resolve(reader.result);
        }
      };
    });
  }
  return contents;
};

/**
 * @param blob
 * @param appState if provided, used for centering scroll to restored scene
 */
export const loadFromBlob = async (blob: any, appState?: AppState) => {
  if (blob.handle) {
    (window as any).handle = blob.handle;
  }

  const contents = await loadFileContents(blob);
  const defaultAppState = getDefaultAppState();
  let elements = [];
  let _appState = appState || defaultAppState;
  try {
    console.log(contents)
    //const data = JSON.parse(contents);
   /*  if (data.type !== "aimxcel") {
      throw new Error(t("alerts.couldNotLoadInvalidFile"));
    } */
    elements.push(contents);// || [];
    console.log("sdfsdhfhsdbjsdmfsdjfj")
    //_appState = {
      //...defaultAppState,
     // appearance: _appState.appearance,
      //...cleanAppStateForExport(data.appState as Partial<AppState>),
      //...(appState ? calculateScrollCenter(elements, appState, null) : {}),
   // };
  } catch {
    console.log("error")
    throw new Error(t("alerts.couldNotLoadInvalidFile"));
  }

  return restore(elements, _appState);
};

export const loadLibraryFromBlob = async (blob: any) => {
  const contents = await loadFileContents(blob);
  const data: LibraryData = JSON.parse(contents);
  if (data.type !== "aimxcellib") {
    throw new Error(t("alerts.couldNotLoadInvalidFile"));
  }
  return data;
};
