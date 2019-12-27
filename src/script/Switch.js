import { createElement } from "./utils.js";

class Switch {
    constructor(checked, onChange, label, wrapper) {
        this.checked = !!checked;
        this.onChange = onChange;
        this.label = label;
        this.wrapper = wrapper;
        this.content = this.render();
    }

    onChecked = checked => {
        this.checked = checked;
        this.onChange(checked);
    };

    isChecked = () => this.checked;

    getContent = () => this.content;

    check = checked => (this.checkbox.checked = checked);

    render = () => {
        const swWrapper = createElement("label", { class: "switch" });
        const checkbox = createElement("input", { type: "checkbox" });
        const slider = createElement("span", { class: "slider round" });

        checkbox.checked = this.checked;
        checkbox.addEventListener("click", () => {
            this.onChecked(checkbox.checked);
        });

        swWrapper.appendChild(checkbox);
        swWrapper.appendChild(slider);
        this.checkbox = checkbox;
        console.log(this.label);
        if(this.label){
            const wrapper = createElement("div", { id: this.wrapper || Math.random().toString() });
            const label = createElement("label", { class: "toggle-label" }, this.label);
            wrapper.appendChild(label);
            wrapper.appendChild(swWrapper);
            return wrapper;
        }
        return swWrapper;
    };
}

export default Switch;
