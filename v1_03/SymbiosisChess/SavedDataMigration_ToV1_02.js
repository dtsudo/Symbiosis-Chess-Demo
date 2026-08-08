import { fetchData, persistData } from "../DTLibrary/FileIO.js";
import { getVersionHistory } from "../DTLibrary/VersionInfo.js";
import { FILE_ID_FOR_SOUND_AND_MUSIC_VOLUME } from "./GlobalConstants.js";
import { migrateSoundAndMusicVolumeDataFromOlderVersionsToV1_01IfNeeded } from "./SavedDataMigration_ToV1_01.js";
let migrateSessionStateDataFromOlderVersionsToV1_02IfNeeded = function ({ browserLocalStorage }) {
    // v1.01 wasn't publically released so migrating saved data is not needed
};
let migrateSoundAndMusicVolumeDataFromOlderVersionsToV1_02IfNeeded = function ({ browserLocalStorage }) {
    let versionInfo = getVersionHistory();
    let version1_01 = versionInfo.find(x => x.version === "1.01");
    let version1_02 = versionInfo.find(x => x.version === "1.02");
    let fileId = FILE_ID_FOR_SOUND_AND_MUSIC_VOLUME;
    let v1_02Data = fetchData({ fileId, version: version1_02, browserLocalStorage });
    if (v1_02Data !== null)
        return;
    migrateSoundAndMusicVolumeDataFromOlderVersionsToV1_01IfNeeded({ browserLocalStorage });
    let v1_01Data = fetchData({ fileId, version: version1_01, browserLocalStorage });
    if (v1_01Data === null)
        return;
    persistData({ fileId, version: version1_02, byteList: v1_01Data, browserLocalStorage });
};
let migrateAllDataFromOlderVersionsToV1_02IfNeeded = function ({ browserLocalStorage }) {
    migrateSessionStateDataFromOlderVersionsToV1_02IfNeeded({ browserLocalStorage });
    migrateSoundAndMusicVolumeDataFromOlderVersionsToV1_02IfNeeded({ browserLocalStorage });
};
export { migrateAllDataFromOlderVersionsToV1_02IfNeeded, migrateSessionStateDataFromOlderVersionsToV1_02IfNeeded, migrateSoundAndMusicVolumeDataFromOlderVersionsToV1_02IfNeeded };
