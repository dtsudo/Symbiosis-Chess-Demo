import { fetchData, persistData } from "../DTLibrary/FileIO.js";
import { getVersionHistory } from "../DTLibrary/VersionInfo.js";
import { FILE_ID_FOR_SESSION_STATE, FILE_ID_FOR_SOUND_AND_MUSIC_VOLUME } from "./GlobalConstants.js";
import { migrateSessionStateDataFromOlderVersionsToV1_02IfNeeded, migrateSoundAndMusicVolumeDataFromOlderVersionsToV1_02IfNeeded } from "./SavedDataMigration_ToV1_02.js";
let migrateSessionStateDataFromOlderVersionsToV1_03IfNeeded = function ({ browserLocalStorage }) {
    let versionInfo = getVersionHistory();
    let version1_02 = versionInfo.find(x => x.version === "1.02");
    let version1_03 = versionInfo.find(x => x.version === "1.03");
    let fileId = FILE_ID_FOR_SESSION_STATE;
    let v1_03Data = fetchData({ fileId, version: version1_03, browserLocalStorage });
    if (v1_03Data !== null)
        return;
    migrateSessionStateDataFromOlderVersionsToV1_02IfNeeded({ browserLocalStorage });
    let v1_02Data = fetchData({ fileId, version: version1_02, browserLocalStorage });
    if (v1_02Data === null)
        return;
    persistData({ fileId, version: version1_03, byteList: v1_02Data, browserLocalStorage });
};
let migrateSoundAndMusicVolumeDataFromOlderVersionsToV1_03IfNeeded = function ({ browserLocalStorage }) {
    let versionInfo = getVersionHistory();
    let version1_02 = versionInfo.find(x => x.version === "1.02");
    let version1_03 = versionInfo.find(x => x.version === "1.03");
    let fileId = FILE_ID_FOR_SOUND_AND_MUSIC_VOLUME;
    let v1_03Data = fetchData({ fileId, version: version1_03, browserLocalStorage });
    if (v1_03Data !== null)
        return;
    migrateSoundAndMusicVolumeDataFromOlderVersionsToV1_02IfNeeded({ browserLocalStorage });
    let v1_02Data = fetchData({ fileId, version: version1_02, browserLocalStorage });
    if (v1_02Data === null)
        return;
    persistData({ fileId, version: version1_03, byteList: v1_02Data, browserLocalStorage });
};
let migrateAllDataFromOlderVersionsToV1_03IfNeeded = function ({ browserLocalStorage }) {
    migrateSessionStateDataFromOlderVersionsToV1_03IfNeeded({ browserLocalStorage });
    migrateSoundAndMusicVolumeDataFromOlderVersionsToV1_03IfNeeded({ browserLocalStorage });
};
export { migrateAllDataFromOlderVersionsToV1_03IfNeeded };
