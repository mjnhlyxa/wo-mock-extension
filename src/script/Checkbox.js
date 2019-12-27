import { createElement } from "./utils.js";

class Checkbox {
    constructor(checked, onChange, className) {
        this.checked = checked;
        this.onChange = onChange;
        this.content = this.render(className);
    }

    onChecked = checked => {
        this.checked = checked;
        this.onChange(checked);
    };

    isChecked = () => this.checked;

    getContent = () => this.content;

    check = checked => (this.input.checked = checked);

    render = className => {
        const input = createElement("input", {
            type: "checkbox",
            class: className
        });
        input.checked = this.checked;
        input.addEventListener("click", () => {
            this.onChecked(input.checked);
        });
        return input;
    };
}

export default Checkbox;
