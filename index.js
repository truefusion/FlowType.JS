/*
 * FlowType.JS v2
 *
 * FlowType.JS by Simple Focus (http://simplefocus.com/)
 * is licensed under the MIT License. Read a copy of the
 * license in the LICENSE.txt file or at
 * http://choosealicense.com/licenses/mit
 */

export default class flowtype {
    constructor(selector, options) {
        this.listener = null;
        this.settings = Object.assign({
            selector,
            parent: null,
            fontRatio: 35,
            maxFont: 9999,
            maximum: 9999,
            minFont: 1,
            minimum: 1,
        }, options);

        this.init();
    }

    destroy() {
        window.removeEventListener('resize', this.listener);
        this.listener = null;
    }

    init() {
        this.listener = () => {
            var {parent, selector} = this.settings;
            if (parent) {
                parent = document.querySelector(parent);
            }
            console.log(parent);
            var elms = document.querySelectorAll(selector);
            elms = Array.from(elms);
            elms.forEach((el) => {
                this.resize(el, parent);
            });
        };
        window.addEventListener('resize', this.listener);
    }

    resize(el, parent) {
        var {
            fontRatio,
            maxFont,
            maximum,
            minFont,
            minimum,
        } = this.settings;
        var {offsetWidth} = parent || el;
        console.log(offsetWidth);
        var width = offsetWidth > maximum ? maximum : offsetWidth < minimum ? minimum : offsetWidth;
        var fontBase = width / fontRatio;
        var fontSize = fontBase > maxFont ? maxFont : fontBase < minFont ? minFont : fontBase;
        var {style} = el;
        style.fontSize = fontSize + 'pt';
    }
}
