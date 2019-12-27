import { createElement, removeAllChilds, cloneObject } from "./utils.js";
import Switch from "./Switch.js";
import Logger from "./Logger.js";

class ItemDetail {
    constructor(item, idx) {
        this.idx = idx;
        this.originalItem = item;
        this.item = cloneObject(item);
        this.content = this.render();
    }

    hasSaved = false;

    hasChanged = false;

    //reponse detail wrapper
    responseEl = null;
    //status selector wrapper
    statusesEl = null;
    //selected status element
    selectedStatusEl = null;

    getContent = () => this.content;

    getIndex = () => this.idx;

    getItem = () => this.item;

    onClickStatus = (value, name) => {
        this.renderResponseDetail(value, name);
    };

    onCreateStatus = status => {
        const { num_cases, cases } = this.item;
        const caseName = `case${num_cases}`;
        cases[caseName] = {
            value: "{}",
            status
        };
        const statusEl = this.renderStatusItem(
            caseName,
            cases[caseName].value,
            status,
            this.statusesEl
        );
        const length = this.statusesEl.childNodes.length;
        const lastNode = this.statusesEl.childNodes[length - 1];
        lastNode.children[0].value = "";
        this.statusesEl.insertBefore(statusEl, lastNode);

        //auto select the created item
        statusEl.click();

        //update changed flag
        this.hasChanged = true;

        this.item.num_cases += 1;
    };

    renderWrapper = () =>
        createElement("div", { class: "item-detail-wrapper" });

    renderHeader = () => {
        const { method, name } = this.item;
        const header = createElement("div", { class: "item-detail-header" });
        const methodEl = createElement("span", { class: "method" });
        const nameEl = createElement("span", { class: "name" });

        methodEl.innerHTML = method;
        nameEl.innerHTML = name;

        header.appendChild(methodEl);
        header.appendChild(nameEl);

        return header;
    };

    renderCustomStatus = () => {
        const wrapper = createElement("div", { class: "item-detail-input" });
        const inputEl = createElement("input", { class: "input" });
        const btnEl = createElement("button", { class: "btn" });

        btnEl.innerHTML = "+";

        btnEl.addEventListener("click", () => {
            const value = inputEl.value;
            if (value && !isNaN(value)) {
                this.onCreateStatus(parseInt(value));
            }
        });

        wrapper.appendChild(inputEl);
        wrapper.appendChild(btnEl);

        return wrapper;
    };

    renderStatusItem = (name, value, status, wrapper, isActive = false) => {
        const statusEl = createElement("div", {
            class: `each-item-status${isActive ? " active" : ""}`
        });
        statusEl.style.color =
            ItemDetail.COLORS_MAP[status] || ItemDetail.COLORS_MAP.default;
        statusEl.innerHTML = status;

        statusEl.addEventListener("click", () => {
            const childs = wrapper.children;
            for (let child of childs) {
                child.classList.remove("selected");
            }
            statusEl.classList.add("selected");
            this.selectedStatusEl = statusEl;
            this.onClickStatus(value, name);
        });
        return statusEl;
    };

    renderStatusSelector = () => {
        const { cases, activated } = this.item;

        const wrapper = createElement("div", {
            class: "item-detail-status-picker scroll-bar-custom"
        });
        for (let i in cases) {
            const { value, status } = cases[i];

            const statusEl = this.renderStatusItem(
                i,
                value,
                status,
                wrapper,
                activated === i
            );

            wrapper.appendChild(statusEl);
        }

        wrapper.appendChild(this.renderCustomStatus());
        this.statusesEl = wrapper;
        return wrapper;
    };

    renderResponseDetail = (value, name) => {
        removeAllChilds(this.responseEl);

        const enableLabel = createElement(
            "label",
            { class: "enable" },
            "Active"
        );
        const response = createElement(
            "div",
            { class: "response" },
            "Response:"
        );
        const textarea = createElement("textarea", {
            class: "textarea scroll-bar-custom"
        });

        const pretty = value
            ? JSON.stringify(JSON.parse(value), undefined, 2)
            : "";
        textarea.value = pretty;
        textarea.addEventListener("input", () => {
            this.hasChanged = true;
            this.item.cases[name].value = textarea.value;
        });

        const sw = new Switch(this.item.activated === name, checked => {
            if (!checked && this.item.activated === name) {
                Logger.log(
                    "Error: Must have at least one response is activated",
                    Logger.ERROR
                );
                sw.check(true);
            } else {
                this.hasChanged = true;
                this.item.activated = name;
                //reset status picker
                for (let child of this.statusesEl.childNodes) {
                    child.classList.remove("active");
                }
                this.selectedStatusEl.classList.add("active");
            }
        });

        this.responseEl.appendChild(enableLabel);
        this.responseEl.appendChild(sw.getContent());
        this.responseEl.appendChild(response);
        this.responseEl.appendChild(textarea);
    };

    renderBody = () => {
        const bodyWrapper = createElement("div", { class: "item-detail-body" });
        const statusSelector = this.renderStatusSelector();
        if (!this.responseEl) {
            this.responseEl = createElement("div", {
                class: "item-detail-response"
            });
        }
        removeAllChilds(this.responseEl);

        bodyWrapper.appendChild(statusSelector);
        bodyWrapper.appendChild(this.responseEl);

        return bodyWrapper;
    };

    render = () => {
        const wrapper = this.renderWrapper();
        const header = this.renderHeader();
        const body = this.renderBody();
        wrapper.appendChild(header);
        wrapper.appendChild(body);
        this.hasChanged = false;
        this.hasSaved = false;
        return wrapper;
    };

    reRender = (item, idx) => {
        this.idx = idx;
        this.originalItem = item;
        this.item = cloneObject(item);
        this.content = this.render();
        return this.content;
    };
}

ItemDetail.COLORS_MAP = {
    201: "rgb(88, 191, 88)",
    202: "rgb(88, 191, 88)",
    203: "rgb(88, 191, 88)",
    200: "rgb(88, 191, 88)",
    204: "rgb(88, 191, 88)",
    400: "#f17431",
    401: "#f17431",
    402: "#f17431",
    403: "#f17431",
    404: "#f17431",
    500: "#f17431",
    501: "#f17431",
    502: "#f17431",
    503: "#f17431",
    504: "#f17431",
    default: "rgb(88, 191, 88)"
};

export default ItemDetail;
