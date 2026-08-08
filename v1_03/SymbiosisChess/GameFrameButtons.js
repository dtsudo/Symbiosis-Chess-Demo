import { getButton, STANDARD_CLICK_COLOR, STANDARD_HOVER_COLOR, STANDARD_PRIMARY_BUTTON_BACKGROUND_COLOR } from "./Button.js";
import { processAskStockfishPower, processGetEvalPower, processGetOpponentResponsePower, processGetPieceToMovePower } from "./GameState.js";
import { getUsePowerButton } from "./UsePowerButton.js";
import { getAskStockfishPowerButtonIcon, getGetBestOpponentResponseButtonIcon, getGetEvalButtonIcon, getGetPieceToMoveButtonIcon } from "./GameFrameButtonIcons.js";
let getGameFrameButtons = function ({ globalState, gameState, isLandscapeOrientation, displayProcessing }) {
    let askStockfishPowerButton = getUsePowerButton({
        x: 0,
        y: 0,
        text: "",
        textXOffset: 0,
        textYOffset: 0,
        buttonIcon: getAskStockfishPowerButtonIcon({ displayProcessing }),
        isDesktop: globalState.isDesktop
    });
    let getEvalButton = getUsePowerButton({
        x: 0,
        y: 0,
        text: "",
        textXOffset: 0,
        textYOffset: 0,
        buttonIcon: getGetEvalButtonIcon({ displayProcessing }),
        isDesktop: globalState.isDesktop
    });
    let getPieceToMoveButton = getUsePowerButton({
        x: 0,
        y: 0,
        text: "",
        textXOffset: 0,
        textYOffset: 0,
        buttonIcon: getGetPieceToMoveButtonIcon({ displayProcessing }),
        isDesktop: globalState.isDesktop
    });
    let getBestOpponentResponseButton = getUsePowerButton({
        x: 0,
        y: 0,
        text: "",
        textXOffset: 0,
        textYOffset: 0,
        buttonIcon: getGetBestOpponentResponseButtonIcon({ displayProcessing }),
        isDesktop: globalState.isDesktop
    });
    let resignButton = getButton({
        x: 0,
        y: 0,
        width: 200,
        height: 80,
        roundedCornerRadius: 10,
        backgroundColor: STANDARD_PRIMARY_BUTTON_BACKGROUND_COLOR,
        hoverColor: STANDARD_HOVER_COLOR,
        clickColor: STANDARD_CLICK_COLOR,
        text: "Resign",
        textXOffset: 59,
        textYOffset: 30,
        font: 1 /* GameFont.Roboto */,
        fontSize: 27,
        isDesktop: globalState.isDesktop
    });
    let updateUI = function () {
        if (isLandscapeOrientation) {
            askStockfishPowerButton.setX(0);
            askStockfishPowerButton.setY(472);
            getEvalButton.setX(0);
            getEvalButton.setY(354);
            getPieceToMoveButton.setX(0);
            getPieceToMoveButton.setY(236);
            getBestOpponentResponseButton.setX(0);
            getBestOpponentResponseButton.setY(118);
            resignButton.setX(0);
            resignButton.setY(0);
        }
        else {
            askStockfishPowerButton.setX(0);
            askStockfishPowerButton.setY(118);
            getEvalButton.setX(0);
            getEvalButton.setY(0);
            getPieceToMoveButton.setX(236);
            getPieceToMoveButton.setY(118);
            getBestOpponentResponseButton.setX(236);
            getBestOpponentResponseButton.setY(0);
            resignButton.setX(472);
            resignButton.setY(118);
        }
    };
    updateUI();
    let processFrame = function (input) {
        gameState = input.gameState;
        isLandscapeOrientation = input.isLandscapeOrientation;
        updateUI();
        let mouseInput = input.mouseInput;
        let soundOutput = input.soundOutput;
        let isPlayerTurn = gameState.boardState.isPlayerWhite === gameState.boardState.isWhiteTurn
            && (gameState.boardState.isStockfishTurn === false || gameState.boardState.isStockfishTurn === null)
            && !gameState.isGameCompleted;
        let clickedTooltipType = null;
        if (gameState.boardState.numAskStockfishPower > 0) {
            let result = askStockfishPowerButton.processFrame({ mouseInput });
            let wasClicked = result.wasMainButtonClicked;
            if (wasClicked && isPlayerTurn) {
                soundOutput.playSound(0 /* GameSound.Click */, 100);
                gameState = processAskStockfishPower({ gameState });
            }
            if (result.wasTooltipButtonClicked && !gameState.isGameCompleted)
                clickedTooltipType = 0 /* TooltipType.AskStockfish */;
        }
        if (gameState.boardState.numGetEvalPower > 0) {
            let result = getEvalButton.processFrame({ mouseInput });
            let wasClicked = result.wasMainButtonClicked;
            if (wasClicked && !gameState.boardState.usedGetEvalPowerThisTurn && isPlayerTurn) {
                soundOutput.playSound(0 /* GameSound.Click */, 100);
                gameState = processGetEvalPower({ gameState });
            }
            if (result.wasTooltipButtonClicked && !gameState.isGameCompleted)
                clickedTooltipType = 1 /* TooltipType.GetEval */;
        }
        if (gameState.boardState.numGetPieceToMovePower > 0) {
            let result = getPieceToMoveButton.processFrame({ mouseInput });
            let wasClicked = result.wasMainButtonClicked;
            if (wasClicked && !gameState.boardState.usedGetPieceToMovePowerThisTurn && isPlayerTurn) {
                soundOutput.playSound(0 /* GameSound.Click */, 100);
                gameState = processGetPieceToMovePower({ gameState });
            }
            if (result.wasTooltipButtonClicked && !gameState.isGameCompleted)
                clickedTooltipType = 2 /* TooltipType.GetPieceToMove */;
        }
        if (gameState.boardState.numGetOpponentResponsePower > 0) {
            let result = getBestOpponentResponseButton.processFrame({ mouseInput });
            let wasClicked = result.wasMainButtonClicked;
            if (wasClicked && !gameState.boardState.usedGetOpponentResponsePowerThisTurn && isPlayerTurn) {
                soundOutput.playSound(0 /* GameSound.Click */, 100);
                gameState = processGetOpponentResponsePower({ gameState });
            }
            if (result.wasTooltipButtonClicked && !gameState.isGameCompleted)
                clickedTooltipType = 3 /* TooltipType.GetOpponentResponse */;
        }
        let clickedResignButton;
        if (gameState.isGameCompleted)
            clickedResignButton = false;
        else
            clickedResignButton = resignButton.processFrame({ mouseInput }).wasClicked;
        if (clickedResignButton || clickedTooltipType !== null)
            soundOutput.playSound(0 /* GameSound.Click */, 100);
        return {
            newGameState: gameState,
            clickedResignButton: clickedResignButton,
            clickedTooltipType: clickedTooltipType
        };
    };
    let render = function (displayOutput) {
        if (gameState.boardState.numAskStockfishPower > 0)
            askStockfishPowerButton.render(displayOutput, gameState.boardState.numAskStockfishPower);
        if (gameState.boardState.numGetEvalPower > 0)
            getEvalButton.render(displayOutput, gameState.boardState.numGetEvalPower);
        if (gameState.boardState.numGetPieceToMovePower > 0)
            getPieceToMoveButton.render(displayOutput, gameState.boardState.numGetPieceToMovePower);
        if (gameState.boardState.numGetOpponentResponsePower > 0)
            getBestOpponentResponseButton.render(displayOutput, gameState.boardState.numGetOpponentResponsePower);
        if (!gameState.isGameCompleted)
            resignButton.render(displayOutput);
    };
    return {
        processFrame,
        render
    };
};
export { getGameFrameButtons };
