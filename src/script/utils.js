export const noop = () => {};

export const sendMessage = (msg, callback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, msg, callback);
    });
};

export const getSavedData = (key, callback) => {
    chrome.storage.local.get([key], result => callback(result[key]));
};

export const saveData = (key, data, callback = noop) => {
    chrome.storage.local.set({ [key]: data }, callback);
};

export const getNode = name =>
    document.getElementById(name) || document.getElementsByClassName(name)[0];

export const removeAllChilds = node => {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    return node;
};

export const createElement = (tag, attrs = {}, value) => {
    const el = document.createElement(tag);
    for (let i in attrs) {
        el.setAttribute(i, attrs[i]);
    }
    if (value) {
        el.innerHTML = value;
    }
    return el;
};

export const cloneObject = obj => JSON.parse(JSON.stringify(obj));
