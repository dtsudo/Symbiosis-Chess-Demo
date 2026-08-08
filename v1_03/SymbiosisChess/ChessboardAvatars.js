import { getOpponentElo } from "./Opponent.js";
import { black } from "../DTLibrary/DTColor.js";
import { cosineScaled, sineScaled } from "../DTLibrary/DTMath.js";
let getChessboardAvatars = function ({ gameState, displayProcessing }) {
    let TRANSITION_PLAYER_AVATAR_ANIMATION_DURATION = 400 * 1000;
    let TRANSITION_DELAY_DURATION = 150 * 1000;
    let isDisplayingPlayerAvatar = gameState.boardState.isStockfishTurn === null || gameState.boardState.isStockfishTurn === false;
    let transitionPlayerAvatarElapsedMicros = TRANSITION_PLAYER_AVATAR_ANIMATION_DURATION;
    let playerAvatar = displayProcessing.getOffscreenCanvasImage({ width: 128, height: 128 });
    playerAvatar.drawImageRotatedClockwise(26 /* GameImage.SinglePlayer */, 0, 0, displayProcessing.getWidth(26 /* GameImage.SinglePlayer */), displayProcessing.getHeight(26 /* GameImage.SinglePlayer */), 0, 0, 0, 98, null);
    let stockfishAvatar = displayProcessing.getOffscreenCanvasImage({ width: 128, height: 128 });
    stockfishAvatar.drawImageRotatedClockwise(25 /* GameImage.Stockfish */, 0, 0, displayProcessing.getWidth(25 /* GameImage.Stockfish */), displayProcessing.getHeight(25 /* GameImage.Stockfish */), 0, 0, 0, 19, null);
    let processFrame = function ({ gameState, elapsedMicrosThisFrame }) {
        let newIsDisplayingPlayerAvatar = gameState.boardState.isStockfishTurn === null || gameState.boardState.isStockfishTurn === false;
        if (gameState.isGameCompleted)
            newIsDisplayingPlayerAvatar = isDisplayingPlayerAvatar;
        if (newIsDisplayingPlayerAvatar === isDisplayingPlayerAvatar) {
            transitionPlayerAvatarElapsedMicros += elapsedMicrosThisFrame;
            if (transitionPlayerAvatarElapsedMicros > TRANSITION_PLAYER_AVATAR_ANIMATION_DURATION)
                transitionPlayerAvatarElapsedMicros = TRANSITION_PLAYER_AVATAR_ANIMATION_DURATION;
        }
        else {
            isDisplayingPlayerAvatar = newIsDisplayingPlayerAvatar;
            transitionPlayerAvatarElapsedMicros = -TRANSITION_DELAY_DURATION;
        }
    };
    let render = function (display) {
        let opponentName;
        let opponentNameFontSize;
        let drawOpponentBorder;
        switch (gameState.opponent) {
            case 0 /* Opponent.Opponent1 */:
                opponentName = "Tux";
                opponentNameFontSize = 24;
                drawOpponentBorder = true;
                display.drawImageRotatedClockwise(24 /* GameImage.Tux */, 0, 0, display.getWidth(24 /* GameImage.Tux */), display.getHeight(24 /* GameImage.Tux */), 12, 488, 0, 128, null);
                break;
            case 1 /* Opponent.Opponent2 */:
                opponentName = "Kiki";
                opponentNameFontSize = 24;
                drawOpponentBorder = false;
                display.drawImageRotatedClockwise(22 /* GameImage.Kiki */, 30, 0, 482, display.getHeight(22 /* GameImage.Kiki */), 0, 479, 0, 23, null);
                break;
            case 2 /* Opponent.Opponent3 */:
                opponentName = "Wilber";
                opponentNameFontSize = 24;
                drawOpponentBorder = true;
                display.drawImageRotatedClockwise(23 /* GameImage.Wilber */, 0, 0, display.getWidth(23 /* GameImage.Wilber */), display.getHeight(23 /* GameImage.Wilber */), 5, 480, 0, 40, null);
                break;
            case 3 /* Opponent.Opponent4 */:
                opponentName = "Konqi";
                opponentNameFontSize = 24;
                drawOpponentBorder = true;
                display.drawImageRotatedClockwise(20 /* GameImage.Konqi */, 0, 0, display.getWidth(20 /* GameImage.Konqi */), display.getHeight(20 /* GameImage.Konqi */), 8, 475, 0, 3, null);
                break;
            case 4 /* Opponent.Opponent5 */:
                opponentName = "Katie";
                opponentNameFontSize = 24;
                drawOpponentBorder = true;
                display.drawImageRotatedClockwise(21 /* GameImage.Katie */, 0, 0, display.getWidth(21 /* GameImage.Katie */), display.getHeight(21 /* GameImage.Katie */), 8, 475, 0, 3, null);
                break;
            case 5 /* Opponent.OpponentCustom */:
                opponentName = "Stockfish";
                opponentNameFontSize = 22;
                drawOpponentBorder = false;
                display.drawImageRotatedClockwise(25 /* GameImage.Stockfish */, 0, 0, display.getWidth(25 /* GameImage.Stockfish */), display.getHeight(25 /* GameImage.Stockfish */), 0, 475, 0, 19, null);
                break;
        }
        if (drawOpponentBorder)
            display.drawRectangle(0, 475, 77, 77, black, false);
        display.drawText(0, 462, opponentName, 1 /* GameFont.Roboto */, opponentNameFontSize, black);
        let opponentElo = gameState.opponent !== 5 /* Opponent.OpponentCustom */
            ? getOpponentElo(gameState.opponent)
            : gameState.customOpponentElo;
        display.drawText(0, 432, "Elo: " + opponentElo, 1 /* GameFont.Roboto */, 16, black);
        let primaryPlayerAvatar;
        let secondaryPlayerAvatar;
        if (isDisplayingPlayerAvatar) {
            primaryPlayerAvatar = playerAvatar;
            secondaryPlayerAvatar = stockfishAvatar;
        }
        else {
            primaryPlayerAvatar = stockfishAvatar;
            secondaryPlayerAvatar = playerAvatar;
        }
        let modifiedElapsedMicros = transitionPlayerAvatarElapsedMicros;
        if (modifiedElapsedMicros < 0)
            modifiedElapsedMicros = 0;
        let alpha = 50 + Math.floor(modifiedElapsedMicros * 50 / TRANSITION_PLAYER_AVATAR_ANIMATION_DURATION);
        if (alpha < 0)
            alpha = 0;
        if (alpha > 100)
            alpha = 100;
        // Starts at -90 * 128 and goes clockwise to -270 * 128
        let primaryPlayerDegreesScaled = -90 * 128 - Math.floor(modifiedElapsedMicros * 180 / Math.floor(TRANSITION_PLAYER_AVATAR_ANIMATION_DURATION / 128));
        let secondaryPlayerDegreesScaled = primaryPlayerDegreesScaled + 180 * 128;
        let primaryPlayerXOffset = Math.round(cosineScaled(primaryPlayerDegreesScaled) / 50);
        let primaryPlayerYOffset = Math.round(sineScaled(primaryPlayerDegreesScaled) / 100);
        let secondaryPlayerXOffset = Math.round(cosineScaled(secondaryPlayerDegreesScaled) / 50);
        let secondaryPlayerYOffset = Math.round(sineScaled(secondaryPlayerDegreesScaled) / 100);
        let primaryPlayerAvatarX = primaryPlayerXOffset - Math.floor(primaryPlayerYOffset / 2);
        let primaryPlayerAvatarY = 10 + primaryPlayerYOffset;
        let secondaryPlayerAvatarX = secondaryPlayerXOffset - Math.floor(secondaryPlayerYOffset / 2);
        let secondaryPlayerAvatarY = 10 + secondaryPlayerYOffset;
        let secondaryPlayerAvatarAlpha = 50 + (100 - alpha);
        if (secondaryPlayerAvatarAlpha < 0)
            secondaryPlayerAvatarAlpha = 0;
        if (secondaryPlayerAvatarAlpha > 100)
            secondaryPlayerAvatarAlpha = 100;
        let drawSecondaryPlayerAvatar = () => {
            display.drawOffscreenCanvasImageRotatedClockwise(secondaryPlayerAvatar, 0, 0, secondaryPlayerAvatar.getWidth(), secondaryPlayerAvatar.getHeight(), secondaryPlayerAvatarX, secondaryPlayerAvatarY, 0, 128, { alphaTimes100: secondaryPlayerAvatarAlpha });
        };
        let drawPrimaryPlayerAvatar = () => {
            display.drawOffscreenCanvasImageRotatedClockwise(primaryPlayerAvatar, 0, 0, primaryPlayerAvatar.getWidth(), primaryPlayerAvatar.getHeight(), primaryPlayerAvatarX, primaryPlayerAvatarY, 0, 128, { alphaTimes100: alpha });
        };
        if (secondaryPlayerAvatarAlpha < alpha) {
            drawSecondaryPlayerAvatar();
            drawPrimaryPlayerAvatar();
        }
        else {
            drawPrimaryPlayerAvatar();
            drawSecondaryPlayerAvatar();
        }
    };
    return {
        processFrame,
        render
    };
};
export { getChessboardAvatars };
