import { black, white } from "../DTLibrary/DTColor.js";
let getAskStockfishPowerButtonIcon = function ({ displayProcessing }) {
    let offscreenCanvasImage = displayProcessing.getOffscreenCanvasImage({ width: 120, height: 80 });
    offscreenCanvasImage.drawImageRotatedClockwise(25 /* GameImage.Stockfish */, 0, 0, displayProcessing.getWidth(25 /* GameImage.Stockfish */), displayProcessing.getHeight(25 /* GameImage.Stockfish */), 20, 3, 0, 19, null);
    let questionMarkImage = displayProcessing.getOffscreenCanvasImage({ width: 65, height: 65 });
    questionMarkImage.drawText(0, 65, "?", 1 /* GameFont.Roboto */, 64, { r: 255, g: 0, b: 0, alpha: 255 });
    offscreenCanvasImage.drawOffscreenCanvasImageRotatedClockwise(questionMarkImage, 0, 0, questionMarkImage.getWidth(), questionMarkImage.getHeight(), 15, 10, 128 * -15, 128, null);
    return offscreenCanvasImage;
};
let getGetEvalButtonIcon = function ({ displayProcessing }) {
    let evalBar = displayProcessing.getOffscreenCanvasImage({ width: 200, height: 100 });
    evalBar.drawRectangle(0, 0, 67, 10, white, true);
    evalBar.drawRectangle(67, 0, 133, 10, black, true);
    evalBar.drawRectangle(98, 0, 5, 10, { r: 214, g: 79, b: 0, alpha: 128 }, true);
    evalBar.drawRectangle(124, 0, 2, 10, { r: 136, g: 136, b: 136, alpha: 255 }, true);
    evalBar.drawRectangle(149, 0, 2, 10, { r: 136, g: 136, b: 136, alpha: 255 }, true);
    evalBar.drawRectangle(174, 0, 2, 10, { r: 136, g: 136, b: 136, alpha: 255 }, true);
    evalBar.drawRectangle(24, 0, 2, 10, { r: 136, g: 136, b: 136, alpha: 255 }, true);
    evalBar.drawRectangle(49, 0, 2, 10, { r: 136, g: 136, b: 136, alpha: 255 }, true);
    evalBar.drawRectangle(74, 0, 2, 10, { r: 136, g: 136, b: 136, alpha: 255 }, true);
    evalBar.drawText(90, 20, "-1.7", 1 /* GameFont.Roboto */, 12, black);
    let offscreenCanvasImage = displayProcessing.getOffscreenCanvasImage({ width: 120, height: 80 });
    offscreenCanvasImage.drawOffscreenCanvasImageRotatedClockwise(evalBar, 0, 0, evalBar.getWidth(), evalBar.getHeight(), -20, 30, 128 * -10, 110, null);
    return offscreenCanvasImage;
};
let getGetPieceToMoveButtonIcon = function ({ displayProcessing }) {
    let offscreenCanvasImage = displayProcessing.getOffscreenCanvasImage({ width: 120, height: 80 });
    for (let i = 1; i <= 40; i++)
        offscreenCanvasImage.drawRectangle(60 - i, 40 - i, 2 * i, 2 * i, { r: 255, g: 255, b: 0, alpha: 5 }, true);
    offscreenCanvasImage.drawImageRotatedClockwise(11 /* GameImage.WhiteBishop */, 0, 0, displayProcessing.getWidth(11 /* GameImage.WhiteBishop */), displayProcessing.getHeight(11 /* GameImage.WhiteBishop */), 25, 5, 0, 18, null);
    return offscreenCanvasImage;
};
let getGetBestOpponentResponseButtonIcon = function ({ displayProcessing }) {
    let board = displayProcessing.getOffscreenCanvasImage({ width: 375, height: 250 });
    board.drawImageRotatedClockwise(16 /* GameImage.BlackKnight */, 0, 0, displayProcessing.getWidth(16 /* GameImage.BlackKnight */), displayProcessing.getHeight(16 /* GameImage.BlackKnight */), 250, 125, 0, 32, null);
    board.drawImageRotatedClockwise(14 /* GameImage.BlackPawn */, 0, 0, displayProcessing.getWidth(14 /* GameImage.BlackPawn */), displayProcessing.getHeight(14 /* GameImage.BlackPawn */), 0, 0, 0, 32, null);
    let arrow = displayProcessing.getOffscreenCanvasImage({ width: 400, height: 400 });
    arrow.drawRectangle(0, 0, 400, 400, { r: 255, g: 120, b: 0, alpha: 75 }, true);
    let arrow2 = displayProcessing.getOffscreenCanvasImage({ width: 500, height: 500 });
    arrow2.drawOffscreenCanvasImageRotatedClockwise(arrow, 0, 0, 400, 400, -250, 50, 45 * 128, 128, null);
    let arrow3 = displayProcessing.getOffscreenCanvasImage({ width: 1200, height: 500 });
    arrow3.drawOffscreenCanvasImageRotatedClockwise(arrow2, 0, 0, 500, 500, 700, 0, 0, 128, null);
    arrow3.drawRectangle(50, 150, 650, 200, { r: 255, g: 120, b: 0, alpha: 75 }, true);
    let offscreenCanvasImage = displayProcessing.getOffscreenCanvasImage({ width: 120, height: 80 });
    offscreenCanvasImage.drawOffscreenCanvasImageRotatedClockwise(board, 0, 0, board.getWidth(), board.getHeight(), 14, 7, 128 * 10, 32, null);
    offscreenCanvasImage.drawOffscreenCanvasImageRotatedClockwise(arrow3, 0, 0, arrow3.getWidth(), arrow3.getHeight(), 11, 16, 128 * -200, 9, null);
    return offscreenCanvasImage;
};
export { getAskStockfishPowerButtonIcon, getGetEvalButtonIcon, getGetPieceToMoveButtonIcon, getGetBestOpponentResponseButtonIcon };
