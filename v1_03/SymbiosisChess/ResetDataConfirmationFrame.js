import { black } from "../DTLibrary/DTColor.js";
import { clearSessionState } from "./SessionState.js";
import { getButton, STANDARD_CLICK_COLOR, STANDARD_HOVER_COLOR, STANDARD_PRIMARY_BUTTON_BACKGROUND_COLOR } from "./Button.js";
import { getTitleScreenFrame } from "./TitleScreenFrame.js";
import { getEmptyKeyboard } from "../DTLibrary/EmptyKeyboard.js";
import { getEmptyMouse } from "../DTLibrary/EmptyMouse.js";
let getResetDataConfirmationFrame = function ({ underlyingFrame, globalState, sessionState, soundOutput, musicOutput, displayProcessing }) {
    let yesButton = getButton({
        x: 0,
        y: 0,
        width: 200,
        height: 100,
        roundedCornerRadius: 10,
        backgroundColor: STANDARD_PRIMARY_BUTTON_BACKGROUND_COLOR,
        hoverColor: STANDARD_HOVER_COLOR,
        clickColor: STANDARD_CLICK_COLOR,
        text: "Yes",
        textXOffset: 75,
        textYOffset: 38,
        font: 1 /* GameFont.Roboto */,
        fontSize: 32,
        isDesktop: globalState.isDesktop
    });
    let noButton = getButton({
        x: 0,
        y: 0,
        width: 200,
        height: 100,
        roundedCornerRadius: 10,
        backgroundColor: STANDARD_PRIMARY_BUTTON_BACKGROUND_COLOR,
        hoverColor: STANDARD_HOVER_COLOR,
        clickColor: STANDARD_CLICK_COLOR,
        text: "No",
        textXOffset: 79,
        textYOffset: 38,
        font: 1 /* GameFont.Roboto */,
        fontSize: 32,
        isDesktop: globalState.isDesktop
    });
    let updateUI = function (displayProcessing) {
        yesButton.setX(Math.floor(displayProcessing.getCanvasWidth() / 2) - 225);
        yesButton.setY(displayProcessing.getCanvasHeight() - 450);
        noButton.setX(Math.floor(displayProcessing.getCanvasWidth() / 2) + 25);
        noButton.setY(displayProcessing.getCanvasHeight() - 450);
    };
    updateUI(displayProcessing);
    let getNextFrame = function ({ elapsedMicrosThisFrame, keyboardInput, mouseInput, previousKeyboardInput, previousMouseInput, displayProcessing, soundOutput, musicOutput, thisFrame }) {
        updateUI(displayProcessing);
        underlyingFrame = underlyingFrame.getNextFrame({
            elapsedMicrosThisFrame,
            keyboardInput: getEmptyKeyboard(),
            mouseInput: getEmptyMouse(),
            previousKeyboardInput: getEmptyKeyboard(),
            previousMouseInput: getEmptyMouse(),
            displayProcessing,
            soundOutput,
            musicOutput,
            thisFrame: underlyingFrame
        });
        let clickedYesButton = yesButton.processFrame({ mouseInput }).wasClicked;
        let clickedNoButton = noButton.processFrame({ mouseInput }).wasClicked;
        if (clickedYesButton) {
            soundOutput.playSound(0 /* GameSound.Click */, 100);
            clearSessionState(sessionState);
            globalState.saveAndLoadData.saveSessionState({ sessionState });
            return getTitleScreenFrame({ globalState, sessionState, soundOutput, musicOutput, displayProcessing });
        }
        if (clickedNoButton || keyboardInput.isPressed(45 /* Key.Esc */) && !previousKeyboardInput.isPressed(45 /* Key.Esc */)) {
            soundOutput.playSound(0 /* GameSound.Click */, 100);
            return getTitleScreenFrame({ globalState, sessionState, soundOutput, musicOutput, displayProcessing });
        }
        return thisFrame;
    };
    let render = function (displayOutput) {
        underlyingFrame.render(displayOutput);
        displayOutput.drawRectangle(0, 0, displayOutput.getCanvasWidth(), displayOutput.getCanvasHeight(), { r: 0, g: 0, b: 0, alpha: 110 }, true);
        displayOutput.drawRoundedRectangle(Math.floor(displayOutput.getCanvasWidth() / 2) - 275, displayOutput.getCanvasHeight() - 500, 550, 300, 10, { r: 240, g: 240, b: 240, alpha: 255 }, true);
        displayOutput.drawRoundedRectangle(Math.floor(displayOutput.getCanvasWidth() / 2) - 275, displayOutput.getCanvasHeight() - 500, 550, 300, 10, black, false);
        displayOutput.drawText(Math.floor(displayOutput.getCanvasWidth() / 2) - 245, displayOutput.getCanvasHeight() - 238, "Are you sure you want to reset your \n" + "progress?", 1 /* GameFont.Roboto */, 32, black);
        yesButton.render(displayOutput);
        noButton.render(displayOutput);
    };
    return {
        getNextFrame,
        render,
        getClickUrl: function () { return null; },
        getCompletedAchievements: function () { return null; }
    };
};
export { getResetDataConfirmationFrame };
