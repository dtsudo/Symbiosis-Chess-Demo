import { black } from "../DTLibrary/DTColor.js";
import { STANDARD_BACKGROUND_COLOR } from "./GlobalConstants.js";
import { getTitleScreenFrame } from "./TitleScreenFrame.js";
import { getGameFrame } from "./GameFrame.js";
import { getInitialGameState } from "./GameState.js";
import { getOpponentElo } from "./Opponent.js";
import { getInstructionsScreenFrame } from "./InstructionsScreenFrame.js";
import { getTooltipFrame } from "./TooltipFrame.js";
import { getChooseOpponentButton } from "./ChooseOpponentButton.js";
import { getEloSlider } from "./EloSlider.js";
import { getTransitionAnimationFrame } from "./TransitionAnimationFrame.js";
let getInactiveMouse = function () {
    return {
        isLeftMouseButtonPressed: function () { return false; },
        isRightMouseButtonPressed: function () { return false; },
        getX: function () { return -5; },
        getY: function () { return -5; }
    };
};
let getChooseOpponentFrame = function ({ globalState, sessionState, soundOutput, musicOutput, displayProcessing }) {
    let opponent1Button = getChooseOpponentButton({
        x: 0,
        y: 0,
        opponentName: "Tux",
        elo: getOpponentElo(0 /* Opponent.Opponent1 */),
        renderGameImage: (displayOutput) => {
            displayOutput.drawImageRotatedClockwise(24 /* GameImage.Tux */, 0, 0, displayOutput.getWidth(24 /* GameImage.Tux */), displayOutput.getHeight(24 /* GameImage.Tux */), 15, 6, 0, 100, null);
        },
        isDesktop: globalState.isDesktop
    });
    let opponent2Button = getChooseOpponentButton({
        x: 0,
        y: 0,
        opponentName: "Kiki",
        elo: getOpponentElo(1 /* Opponent.Opponent2 */),
        renderGameImage: (displayOutput) => {
            displayOutput.drawImageRotatedClockwise(22 /* GameImage.Kiki */, 70, 0, 389, 389, 0, 0, 0, 23, null);
        },
        isDesktop: globalState.isDesktop
    });
    let opponent3Button = getChooseOpponentButton({
        x: 0,
        y: 0,
        opponentName: "Wilber",
        elo: getOpponentElo(2 /* Opponent.Opponent3 */),
        renderGameImage: (displayOutput) => {
            displayOutput.drawImageRotatedClockwise(23 /* GameImage.Wilber */, 0, 0, displayOutput.getWidth(23 /* GameImage.Wilber */), displayOutput.getHeight(23 /* GameImage.Wilber */), 3, 0, 0, 45, null);
        },
        isDesktop: globalState.isDesktop
    });
    let opponent4Button = getChooseOpponentButton({
        x: 0,
        y: 0,
        opponentName: "Konqi",
        elo: getOpponentElo(3 /* Opponent.Opponent4 */),
        renderGameImage: (displayOutput) => {
            displayOutput.drawImageRotatedClockwise(20 /* GameImage.Konqi */, 0, 0, displayOutput.getWidth(20 /* GameImage.Konqi */), displayOutput.getHeight(20 /* GameImage.Konqi */), 5, -3, 0, 3, null);
        },
        isDesktop: globalState.isDesktop
    });
    let opponent5Button = getChooseOpponentButton({
        x: 0,
        y: 0,
        opponentName: "Katie",
        elo: getOpponentElo(4 /* Opponent.Opponent5 */),
        renderGameImage: (displayOutput) => {
            displayOutput.drawImageRotatedClockwise(21 /* GameImage.Katie */, 0, 0, displayOutput.getWidth(21 /* GameImage.Katie */), displayOutput.getHeight(21 /* GameImage.Katie */), 5, -3, 0, 3, null);
        },
        isDesktop: globalState.isDesktop
    });
    let customOpponentButton = getChooseOpponentButton({
        x: 0,
        y: 0,
        opponentName: "Stockfish",
        elo: sessionState.customOpponentElo,
        renderGameImage: (displayOutput) => {
            displayOutput.drawImageRotatedClockwise(25 /* GameImage.Stockfish */, 0, 0, displayOutput.getWidth(25 /* GameImage.Stockfish */), displayOutput.getHeight(25 /* GameImage.Stockfish */), 5, 0, 0, 17, null);
        },
        isDesktop: globalState.isDesktop
    });
    let eloSlider = getEloSlider({
        x: 0,
        y: 0,
        elo: sessionState.customOpponentElo
    });
    let isOpponent2Available = sessionState.highestUnlockedOpponent !== 0 /* Opponent.Opponent1 */;
    let isOpponent3Available = sessionState.highestUnlockedOpponent !== 0 /* Opponent.Opponent1 */
        && sessionState.highestUnlockedOpponent !== 1 /* Opponent.Opponent2 */;
    let isOpponent4Available = sessionState.highestUnlockedOpponent !== 0 /* Opponent.Opponent1 */
        && sessionState.highestUnlockedOpponent !== 1 /* Opponent.Opponent2 */
        && sessionState.highestUnlockedOpponent !== 2 /* Opponent.Opponent3 */;
    let isOpponent5Available = sessionState.highestUnlockedOpponent !== 0 /* Opponent.Opponent1 */
        && sessionState.highestUnlockedOpponent !== 1 /* Opponent.Opponent2 */
        && sessionState.highestUnlockedOpponent !== 2 /* Opponent.Opponent3 */
        && sessionState.highestUnlockedOpponent !== 3 /* Opponent.Opponent4 */;
    let isCustomOpponentAvailable = sessionState.highestUnlockedOpponent !== 0 /* Opponent.Opponent1 */
        && sessionState.highestUnlockedOpponent !== 1 /* Opponent.Opponent2 */
        && sessionState.highestUnlockedOpponent !== 2 /* Opponent.Opponent3 */
        && sessionState.highestUnlockedOpponent !== 3 /* Opponent.Opponent4 */
        && sessionState.highestUnlockedOpponent !== 4 /* Opponent.Opponent5 */;
    let updateUI = function (displayProcessing) {
        opponent1Button.setX(Math.floor(displayProcessing.getCanvasWidth() / 2) - 300);
        opponent1Button.setY(displayProcessing.getCanvasHeight() - 290);
        opponent2Button.setX(Math.floor(displayProcessing.getCanvasWidth() / 2) - 300);
        opponent2Button.setY(displayProcessing.getCanvasHeight() - 370);
        opponent3Button.setX(Math.floor(displayProcessing.getCanvasWidth() / 2) - 300);
        opponent3Button.setY(displayProcessing.getCanvasHeight() - 450);
        opponent4Button.setX(Math.floor(displayProcessing.getCanvasWidth() / 2) - 300);
        opponent4Button.setY(displayProcessing.getCanvasHeight() - 530);
        opponent5Button.setX(Math.floor(displayProcessing.getCanvasWidth() / 2) - 300);
        opponent5Button.setY(displayProcessing.getCanvasHeight() - 610);
        customOpponentButton.setX(Math.floor(displayProcessing.getCanvasWidth() / 2) - 300);
        customOpponentButton.setY(displayProcessing.getCanvasHeight() - 690);
        eloSlider.setX(Math.floor(displayProcessing.getCanvasWidth() / 2) - 30);
        eloSlider.setY(displayProcessing.getCanvasHeight() - 680);
    };
    updateUI(displayProcessing);
    let getNextFrame = function ({ keyboardInput, mouseInput, previousKeyboardInput, previousMouseInput, displayProcessing, soundOutput, musicOutput, thisFrame, elapsedMicrosThisFrame }) {
        updateUI(displayProcessing);
        globalState.background.processFrame({ elapsedMicrosThisFrame });
        let selectedOpponent = null;
        let wasButtonClicked = opponent1Button.processFrame({ mouseInput }).wasClicked;
        if (wasButtonClicked)
            selectedOpponent = 0 /* Opponent.Opponent1 */;
        if (isOpponent2Available) {
            wasButtonClicked = opponent2Button.processFrame({ mouseInput }).wasClicked;
            if (wasButtonClicked)
                selectedOpponent = 1 /* Opponent.Opponent2 */;
        }
        if (isOpponent3Available) {
            wasButtonClicked = opponent3Button.processFrame({ mouseInput }).wasClicked;
            if (wasButtonClicked)
                selectedOpponent = 2 /* Opponent.Opponent3 */;
        }
        if (isOpponent4Available) {
            wasButtonClicked = opponent4Button.processFrame({ mouseInput }).wasClicked;
            if (wasButtonClicked)
                selectedOpponent = 3 /* Opponent.Opponent4 */;
        }
        if (isOpponent5Available) {
            wasButtonClicked = opponent5Button.processFrame({ mouseInput }).wasClicked;
            if (wasButtonClicked)
                selectedOpponent = 4 /* Opponent.Opponent5 */;
        }
        if (isCustomOpponentAvailable) {
            let isInteractingWithSlider = eloSlider.processFrame({ mouseInput }).isInteractingWithSlider;
            sessionState.customOpponentElo = eloSlider.getSelectedElo();
            customOpponentButton.setElo(eloSlider.getSelectedElo());
            wasButtonClicked = customOpponentButton.processFrame({ mouseInput: isInteractingWithSlider ? getInactiveMouse() : mouseInput }).wasClicked;
            if (wasButtonClicked)
                selectedOpponent = 5 /* Opponent.OpponentCustom */;
        }
        if (selectedOpponent !== null) {
            soundOutput.playSound(0 /* GameSound.Click */, 100);
            let isPlayerWhite;
            if (sessionState.wasPlayerWhiteLastGame === null)
                isPlayerWhite = true;
            else if (sessionState.wasPlayerWhiteLastGame)
                isPlayerWhite = false;
            else
                isPlayerWhite = true;
            sessionState.wasPlayerWhiteLastGame = isPlayerWhite;
            sessionState.hasStarted = true;
            let numAskStockfishPower;
            let numGetEvalPower;
            let numGetPieceToMovePower;
            let numGetOpponentResponsePower;
            if (selectedOpponent === 5 /* Opponent.OpponentCustom */ || sessionState.hasDisplayedDoublePowerTooltip) {
                numAskStockfishPower = 2;
                numGetEvalPower = 2;
                numGetPieceToMovePower = 2;
                numGetOpponentResponsePower = 2;
            }
            else {
                numAskStockfishPower = selectedOpponent === 1 /* Opponent.Opponent2 */ || sessionState.hasDisplayedAskStockfishTooltip ? 1 : 0;
                numGetEvalPower = selectedOpponent === 2 /* Opponent.Opponent3 */ || sessionState.hasDisplayedGetEvalTooltip ? 1 : 0;
                numGetPieceToMovePower = selectedOpponent === 3 /* Opponent.Opponent4 */ || sessionState.hasDisplayedGetPieceToMoveTooltip ? 1 : 0;
                numGetOpponentResponsePower = selectedOpponent === 4 /* Opponent.Opponent5 */ || sessionState.hasDisplayedGetOpponentResponseTooltip ? 1 : 0;
            }
            sessionState.gameState = getInitialGameState({
                isPlayerWhite: isPlayerWhite,
                numAskStockfishPower,
                numGetEvalPower,
                numGetPieceToMovePower,
                numGetOpponentResponsePower,
                opponent: selectedOpponent,
                customOpponentElo: selectedOpponent === 5 /* Opponent.OpponentCustom */ ? sessionState.customOpponentElo : null
            });
            globalState.saveAndLoadData.saveSessionState({ sessionState });
            let tooltipType = null;
            if (!sessionState.hasDisplayedAskStockfishTooltip && numAskStockfishPower > 0)
                tooltipType = 0 /* TooltipType.AskStockfish */;
            if (!sessionState.hasDisplayedGetEvalTooltip && numGetEvalPower > 0)
                tooltipType = 1 /* TooltipType.GetEval */;
            if (!sessionState.hasDisplayedGetPieceToMoveTooltip && numGetPieceToMovePower > 0)
                tooltipType = 2 /* TooltipType.GetPieceToMove */;
            if (!sessionState.hasDisplayedGetOpponentResponseTooltip && numGetOpponentResponsePower > 0)
                tooltipType = 3 /* TooltipType.GetOpponentResponse */;
            if (!sessionState.hasDisplayedDoublePowerTooltip && numAskStockfishPower > 1)
                tooltipType = 4 /* TooltipType.DoublePower */;
            let gameFrame = getGameFrame({ globalState, sessionState, soundOutput, musicOutput, displayProcessing });
            if (tooltipType !== null) {
                let tooltipFrame = getTooltipFrame({
                    tooltipType,
                    isStartOfGame: true,
                    gameFrame,
                    globalState,
                    sessionState,
                    soundOutput,
                    musicOutput,
                    displayProcessing
                });
                return getTransitionAnimationFrame({
                    oldFrame: thisFrame,
                    newFrame: tooltipFrame,
                    displayProcessing,
                    shouldKeepProcessingOldFrame: true,
                    handleOldFrameCanvasResizing: function (displayProcessing) { }
                });
            }
            return getTransitionAnimationFrame({
                oldFrame: thisFrame,
                newFrame: gameFrame,
                displayProcessing,
                shouldKeepProcessingOldFrame: true,
                handleOldFrameCanvasResizing: function (displayProcessing) { }
            });
        }
        if (keyboardInput.isPressed(45 /* Key.Esc */) && !previousKeyboardInput.isPressed(45 /* Key.Esc */)) {
            soundOutput.playSound(0 /* GameSound.Click */, 100);
            globalState.saveAndLoadData.saveSessionState({ sessionState });
            if (sessionState.hasStarted)
                return getTitleScreenFrame({ globalState, sessionState, soundOutput, musicOutput, displayProcessing });
            else
                return getInstructionsScreenFrame({ globalState, sessionState, soundOutput, musicOutput, displayProcessing });
        }
        return thisFrame;
    };
    let render = function (displayOutput) {
        displayOutput.drawRectangle(0, 0, displayOutput.getCanvasWidth(), displayOutput.getCanvasHeight(), STANDARD_BACKGROUND_COLOR, true);
        globalState.background.render(displayOutput);
        displayOutput.drawText(Math.floor(displayOutput.getCanvasWidth() / 2) - 254, displayOutput.getCanvasHeight() - 100, "Choose Opponent", 1 /* GameFont.Roboto */, 64, black);
        opponent1Button.render(displayOutput);
        if (isOpponent2Available)
            opponent2Button.render(displayOutput);
        if (isOpponent3Available)
            opponent3Button.render(displayOutput);
        if (isOpponent4Available)
            opponent4Button.render(displayOutput);
        if (isOpponent5Available)
            opponent5Button.render(displayOutput);
        if (isCustomOpponentAvailable) {
            customOpponentButton.render(displayOutput);
            eloSlider.render(displayOutput);
        }
    };
    return {
        getNextFrame,
        render,
        getClickUrl: null,
        getCompletedAchievements: null
    };
};
export { getChooseOpponentFrame };
