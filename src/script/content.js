import Logger from "./Logger.js";
import Picker from "./Picker.js";
import ItemDetail from "./ItemDetail.js";
import Switch from "./Switch.js";
import {
    noop,
    // sendMessage,
    getSavedData,
    saveData,
    getNode,
    removeAllChilds,
    createElement
} from "./utils.js";
let mockData;
let setting;
let pickerWrapper;
let PICKER;
let DETAIL;
let backBtn;
let saveBtn;
let mainToggle;
let optionalToggle;
const MOCK_DATA_KEY = "mockData";
const SETTING_KEY = "mockSetting";
const STATES = {
    HOME: 0,
    DETAIL: 1
};

const SW = {
    ON: true,
    OFF: false
};

let STATE = STATES.HOME;

const sendMessage = (msg, callback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, msg, callback);
    });
};

const resetData = () => {
    sendMessage({ type: "reset" }, response => {
        if (response) {
            const { mockData: mock, setting: st } = response;
            mockData = mock;
            setting = st;
            mainToggle.check(setting.enable);
            optionalToggle.check(setting.individual);
            PICKER.reset(mockData, setting);
            Logger.log("Reset successful!", Logger.SUCCESS);
        }
    });
};

const onItemClick = (item, idx) => {
    setupApiDetailPage(item, idx);
    STATE = STATES.DETAIL;
};

const onCheckboxClick = (item, idx) => {
    mockData[idx] = item;
    saveData(MOCK_DATA_KEY, mockData);
    sendMessage({ type: "update", mockData, setting }, response => {
        if (response) {
            Logger.log(`Saved changes: ${item.name}`, Logger.SUCCESS);
        } else {
            Logger.log(
                "Unexpected error: Can't connect to content script.",
                Logger.ERROR
            );
        }
    });
};

const isValidResponse = cases => {
    try {
        for (let i in cases) {
            const value = cases[i].value;
            cases[i].value = value ? JSON.stringify(JSON.parse(value)) : "";
        }
        return true;
    } catch (e) {
        return false;
    }
};

const setupApiDetailPage = (item, idx) => {
    const bodyPanel = removeAllChilds(getNode("body-panel"));
    if (!DETAIL) {
        DETAIL = new ItemDetail(item, idx);
    } else {
        DETAIL.reRender(item, idx);
    }
    bodyPanel.appendChild(DETAIL.getContent());
};

const setupBtnExecution = () => {
    backBtn = getNode("back-btn");
    backBtn.addEventListener("click", () => {
        if (STATE === STATES.DETAIL) {
            if (DETAIL.hasSaved) {
                PICKER.reset(mockData, setting);
            }
            appendBody(pickerWrapper);
            STATE = STATES.HOME;
        }
    });

    saveBtn = getNode("save-btn");
    saveBtn.addEventListener("click", () => {
        if (DETAIL && DETAIL.hasChanged && STATE === STATES.DETAIL) {
            DETAIL.hasChanged = false;
            DETAIL.hasSaved = true;
            const idx = DETAIL.getIndex();
            const item = DETAIL.getItem();
            if (!isValidResponse(item.cases)) {
                Logger.log("Response error: Wrong JSON format.", Logger.ERROR);
                return;
            }
            mockData[idx] = item;
            saveData(MOCK_DATA_KEY, mockData);
            sendMessage({ type: "update", mockData, setting }, response => {
                if (response) {
                    Logger.log(`Saved: ${item.name}`, Logger.SUCCESS);
                } else {
                    Logger.log(
                        "Unexpected error: Can't connect to content script.",
                        Logger.ERROR
                    );
                }
            });
        } else {
            Logger.log("Save error: Nothing changed", Logger.WARNING);
        }
    });
};

const setupEnv = () => {
    Logger.setElement(getNode("log-s"));
    setupBtnExecution();
};

const setupDom = () => {
    gennerateHeader();
    generateBody();
    // generateItemDetails();
    // const saveBtn = getNode("save-btn");
    // console.log(saveBtn);
    // saveBtn.addEventListener("click", () => {
    //     displayAPIsPicker();
    // });

    // var pretty = JSON.stringify(obj, undefined, 2);
    // console.log(pretty)
    // document.getElementsByClassName("textarea")[0].value = pretty;
};

const onToggleChanged = isMainToggle => checked => {
    if (isMainToggle) {
        setting.enable = checked;
        setting.individual = false;
        optionalToggle.check(false);
    } else {
        if (mainToggle.isChecked()) {
            optionalToggle.check(!checked);
            Logger.log("Turn off all services and try again!", Logger.WARNING);
            return;
        } else {
            setting.individual = checked;
        }
    }
    PICKER.reset(mockData, setting);
    saveData(SETTING_KEY, setting);
    sendMessage({ type: "update", mockData, setting }, response => {
        if (response) {
            Logger.log("Change settings successful.", Logger.SUCCESS);
        } else {
            Logger.log(
                "Unexpected error: Can't apply current settings.",
                Logger.ERROR
            );
        }
    });
};

const gennerateHeader = () => {
    const headerControl = removeAllChilds(getNode("header-control"));

    mainToggle = new Switch(
        setting.enable,
        onToggleChanged(true),
        "Enable-all-services",
        "main-toggle"
    );
    optionalToggle = new Switch(
        setting.individual,
        onToggleChanged(false),
        "Individual-API-controls",
        "each-toggle"
    );
    headerControl.appendChild(mainToggle.getContent());
    headerControl.appendChild(optionalToggle.getContent());
    return headerControl;
};

const generateAPIsPicker = () => {
    PICKER = new Picker(mockData, onItemClick, onCheckboxClick, setting);
    return PICKER.getContent();
};

const generateResetElement = () => {
    const resetWrapper = createElement("div", { id: "api-picker-reset" });
    const resetBtn = createElement("button", { class: "reset-btn" }, "Reset");

    resetBtn.addEventListener("click", resetData);
    resetWrapper.appendChild(resetBtn);

    return resetWrapper;
};

const generateBody = () => {
    pickerWrapper = createElement("div", { id: "api-picker-wrapper" });

    pickerWrapper.appendChild(generateAPIsPicker());
    pickerWrapper.appendChild(generateResetElement());

    appendBody(pickerWrapper);
};

const appendBody = element => {
    const bodyPanel = removeAllChilds(getNode("body-panel"));
    bodyPanel.appendChild(element);
};

const onDOMLoaded = () => {
    getSavedData(MOCK_DATA_KEY, result => {
        mockData = result;
        getSavedData(SETTING_KEY, st => {
            setting = st;
            setupEnv();
            setupDom();
            Logger.log("Initializing success", Logger.SUCCESS);
        });
        // setupBtnExecution();
    });
};

document.addEventListener("DOMContentLoaded", onDOMLoaded);
