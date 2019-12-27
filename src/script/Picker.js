import { createElement, removeAllChilds } from "./utils.js";
import Checkbox from "./Checkbox.js";

export default class Picker {
    constructor(mockData, onclick, onCheckboxClick, setting) {
        this.onclick = onclick;
        this.onCheckboxClick = onCheckboxClick;
        this.mockData = mockData;
        this.setting = setting;
        const { apiPickerUl, apiPicker } = this.render();
        this.content = apiPicker;
        this.apiPickerUl = apiPickerUl;
    }

    itemsDisabled = {}

    reset = (mockData, setting) => {
        this.mockData = mockData;
        this.setting = setting;
        removeAllChilds(this.apiPickerUl);
        for (let i in mockData) {
            this.apiPickerUl.appendChild(this.renderItem(this.mockData[i], i));
        }
    };

    renderItem = (item, i) => {
        const { name, method, activated, cases, enabled } = item;
        const { value, status } = cases[activated];
        const { enable, individual } = this.setting;
        const isShowCheckbox = !enable && individual;
        this.itemsDisabled[i] = (!enable && !individual) || (isShowCheckbox && !enabled)
        const apiPickerLi = createElement("li", { class: "api-picker-li" });
        const apiPickerItem = createElement("div", {
            class: `api-picker-item ${this.itemsDisabled[i] ? 'disabled' : ''}`
        });

        const checkbox = new Checkbox(
            !!enabled,
            (checked) => {
                if(checked){
                    this.itemsDisabled[i] = false;
                    item.enabled = true;
                    apiPickerItem.classList.remove('disabled');
                }
                else{
                    this.itemsDisabled[i] = true;
                    item.enabled = false;
                    apiPickerItem.classList.add('disabled');
                }
                this.onCheckboxClick(item, i);
            },
            `enable-checkbox ${
                !isShowCheckbox ? "invisible" : ""
            }`
        );

        const itemMethod = createElement("span", {
            class: `item-method ${Picker.CLASSES_MAP[method]}`
        });
        const itemName = createElement("span", { class: "item-name" });
        const itemStatus = createElement("span", { class: "item-status" });
        itemStatus.style.color = Picker.COLORS_MAP[status] || "gray";

        itemMethod.innerHTML = method;
        itemName.innerHTML = name;
        itemStatus.innerHTML = status;

        apiPickerItem.appendChild(itemMethod);
        apiPickerItem.appendChild(itemName);
        apiPickerItem.appendChild(itemStatus);
        apiPickerLi.appendChild(checkbox.getContent());
        apiPickerLi.appendChild(apiPickerItem);

        apiPickerItem.addEventListener("click", () => {
            if(!this.itemsDisabled[i]){
                this.onclick(item, i);
            }
        });
        return apiPickerLi;
    };

    render = () => {
        const apiPicker = createElement("div", { id: "api-picker" });
        const apiPickerUl = createElement("ul", {
            id: "api-picker-ul",
            class: "scroll-bar-custom"
        });
        for (let i in this.mockData) {
            apiPickerUl.appendChild(this.renderItem(this.mockData[i], i));
        }
        apiPicker.appendChild(apiPickerUl);

        return { apiPickerUl, apiPicker };
    };

    getContent = () => this.content;
}

Picker.CLASSES_MAP = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete"
};

Picker.COLORS_MAP = {
    201: "green",
    200: "green",
    204: "green",
    400: "red",
    401: "red",
    402: "red",
    403: "red",
    404: "red"
};
