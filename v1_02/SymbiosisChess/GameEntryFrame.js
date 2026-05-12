import { getCurrentVersion } from "../DTLibrary/VersionInfo.js";
import { getBackground } from "./Background.js";
import { getInitialLoadingScreenFrame } from "./InitialLoadingScreenFrame.js";
import { getSaveAndLoadData } from "./SaveAndLoadData.js";
import { migrateAllDataFromOlderVersionsToV1_02IfNeeded } from "./SavedDataMigration_ToV1_02.js";
import { getStockfishWrapper } from "./StockfishWrapper.js";
let getFirstFrame = function ({ buildType, isDesktop, debugMode, browserLocalStorage, stockfishLocation }) {
    let versionInfo = getCurrentVersion();
    if (versionInfo.version === "1.02") {
        migrateAllDataFromOlderVersionsToV1_02IfNeeded({ browserLocalStorage });
    }
    else {
        throw new Error("Unrecognized version");
    }
    let globalState = {
        buildType: buildType,
        isDesktop: isDesktop,
        debugMode: debugMode,
        saveAndLoadData: getSaveAndLoadData({ browserLocalStorage: browserLocalStorage }),
        stockfishWrapper: getStockfishWrapper({ stockfishLocation: stockfishLocation }),
        background: getBackground()
    };
    return getInitialLoadingScreenFrame({ globalState: globalState });
};
export { getFirstFrame };
