class Logger {
    constructor(el) {
        this.el = el;
    }

    _defaultColor = "black";
    SUCCESS = "#61d21b";
    ERROR = "#f53c3c";
    WARNING = "#f59a3c";
    INFO = "black";

    setElement = el => {
        this.el = el;
    };

    timeout = null;

    clear = () => {
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
        return this.el;
    };

    log = (text, mode = this._defaultColor) => {
        clearTimeout(this.timeout);
        this.clear();
        this.el.style.color = mode;
        this.el.innerHTML = text;
        this.timeout = setTimeout(this.clear, 10000);
    };
}

export default new Logger();
