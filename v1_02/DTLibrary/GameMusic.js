let getMusic = function () {
    return [
        0 /* GameMusic.Scifi */
    ];
};
let getMusicInfo = function (music) {
    switch (music) {
        case 0 /* GameMusic.Scifi */:
            return {
                filename: "Maou/sci-fi_theme.mp3",
                flacFilename: null,
                volume: 0.25
            };
    }
};
export { getMusic, getMusicInfo };
