let getVersionHistory = function () {
    return [
        { version: "1.00", alphanumericVersionGuid: "a94454d4a37c4cbf83e23325fc1e1d3b" },
        { version: "1.01", alphanumericVersionGuid: "c18523616b194b7cbbb2a0c71a2c296f" },
        { version: "1.02", alphanumericVersionGuid: "a04662025c6b31bbd1d4315bb66fe3d4" },
        { version: "1.03", alphanumericVersionGuid: "b8147c6bff644155a4e6fdb2cb06ff23" }
    ];
};
let getCurrentVersion = function () {
    let versionHistory = getVersionHistory();
    return versionHistory[versionHistory.length - 1];
};
export { getVersionHistory, getCurrentVersion };
