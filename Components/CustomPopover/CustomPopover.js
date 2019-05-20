'use strict'

/** Class for Custom Popover component */
class CustomPopover extends HTMLElement {
    /** Constructor of the class */
    constructor() {
        super()

        // Create shadow DOM and attach template content
        const shadowRoot = this.attachShadow({mode: 'open'})
        CustomPopover.template = document.createElement('template')
        const templateContent = CustomPopover.template.content

        // all styling performed by updateStyle() below
        CustomPopover.template.innerHTML = `
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
            <style></style>
            <a style='text-decoration: none'>
            <button type='button'><slot></slot></button>
            </a>
        `
        shadowRoot.appendChild(templateContent.cloneNode(true))
    }

    /* List of attributes supported by the component.
     * Component listens for changes to these attributes
     * and handles it using attributeChangedCallback(). */
    static get observedAttributes() {
        return [
            'style',
            'text-color',
            'background-color',
            'border-color',
            'font',
            'width',
            'height',
            'hover-text-color',
            'hover-background-color',
            'hover-border-color',
            'active-text-color',
            'active-background-color',
            'active-border-color',
            'rounded',
            'circle',
            'disabled',
            'href'
        ]
    }

    /* Called when element rendered in DOM */
    connectedCallback() {
        console.log('Rendered custom-popover')
        this.updateStyle()
    }

    /* Called when element destroyed */
    disconnectedCallback() {
        console.log('custom-popover removed')
    }

    /* Handles attribute changes on the fly. */
    attributeChangedCallback(attr, oldValue, newValue) {
        console.log('custom-popover attribute ' + attr + ' was changed')
        if(attr === 'href')
            this.shadowRoot.querySelector('a').setAttribute('href', newValue)
        else
            this.updateStyle()
    }

    /* Getters and setters for observed attributes because WHY NOT */
    get style()                    { return this.getAttribute('style') }
    set style(val)                 { this.setAttribute('style', val) }
    get textColor()                { return this.getAttribute('text-color') }
    set textColor(val)             { this.setAttribute('text-color', val) }
    get backgroundColor()          { return this.getAttribute('background-color') }
    set backgroundColor(val)       { this.setAttribute('background-color', val) }
    get borderColor()              { return this.getAttribute('border-color') }
    set borderColor(val)           { this.setAttribute('border-color', val) }
    get font()                     { return this.getAttribute('font') }
    set font(val)                  { this.setAttribute('font', val) }
    get width()                    { return this.getAttribute('width') }
    set width(val)                 { this.setAttribute('width', val) }
    get height()                   { return this.getAttribute('height') }
    set height(val)                { this.setAttribute('height', val) }
    get hoverTextColor()           { return this.getAttribute('hover-text-color') }
    set hoverTextColor(val)        { this.setAttribute('hover-text-color', val) }
    get hoverBackgroundColor()     { return this.getAttribute('hover-background-color') }
    set hoverBackgroundColor(val)  { this.setAttribute('hover-background-color', val) }
    get hoverBorderColor()         { return this.getAttribute('hover-border-color') }
    set hoverBorderColor(val)      { this.setAttribute('hover-border-color', val) }
    get activeTextColor()          { return this.getAttribute('active-text-color') }
    set activeTextColor(val)       { this.setAttribute('active-text-color', val) }
    get activeBackgroundColor()    { return this.getAttribute('active-background-color') }
    set activeBackgroundColor(val) { this.setAttribute('active-background-color', val) }
    get activeBorderColor()        { return this.getAttribute('active-border-color') }
    set activeBorderColor(val)     { this.setAttribute('active-border-color', val) }
    get rounded()                  { return this.getAttribute('rounded') }
    get isRounded()                { return this.hasAttribute('rounded') }
    set rounded(val)               { this.setAttribute('rounded', val) }
    get circle()                   { return this.getAttribute('circle') }
    set circle(val)                { this.setAttribute('circle', val) }
    get disabled()                 { return this.getAttribute('disabled') }
    set disabled(val)              { this.setAttribute('disabled', val) }

    // Updates the style by taking user attributes, including 'style' and our own
    // API of special attributes, and passing them to the CSS for the popover.
    // If the user styles an attribute (e.g. font color) using both direct CSS
    // and our custom attribute (text-color), it will prioritize the custom attribute.
    updateStyle() {
        console.log('Updating custom-popover styles')    

        const shadow = this.shadowRoot

        // pass class attribute into the component
        const btn = shadow.querySelector('button')
        btn.setAttribute('class', this.getAttribute('class'))

        // provides default styles in case the user doesn't provide one
        shadow.querySelector('style').textContent = `
            :host {
                --hover-text-color: ${this.hoverTextColor ? this.hoverTextColor : '#000000'};
                --hover-background-color: ${this.hoverBackgroundColor ? this.hoverBackgroundColor : '#cccccc'};
                --hover-border-color: ${this.hoverBorderColor  ? this.hoverBorderColor : '#000000'};
                --active-text-color: ${this.activeTextColor ? this.activeTextColor : '#000000'};
                --active-background-color: ${this.activeBackgroundColor ? this.activeBackgroundColor : '#dddddd'};
                --active-border-color: ${this.activeBorderColor ? this.activeBorderColor : '#000000'};
            }
            button {
                ${this.style};
                color: ${this.textColor ? this.textColor : '#cccccc'};
                background-color: ${this.backgroundColor ? this.backgroundColor : '#000000'};
                border: solid ${this.borderColor ? this.borderColor : '#cccccc'};
                font-family: ${this.font ? this.font : 'Lucida Console'};
                display: block;
                width: ${this.width ? this.width : '96px'};
                height: ${this.height ? this.height : '54px'};
            }
            button:hover {
                color: var(--hover-text-color);
                background-color: var(--hover-background-color);
                border-color: var(--hover-border-color);
            }
            button:active {
                color: var(--active-text-color);
                background-color: var(--active-background-color);
                border-color: var(--active-border-color);
            }
            :host([rounded]) > button {
                border-radius: 100px;
            }
            :host([circle]) > button {
                width: 70px;
                height: 70px;
                border-radius: 100%;
            }
            :host([disabled]) > button {
                cursor: not-allowed;
            }
            :host > button:focus {
                outline: none;
            }
        `
    }
}
     
CustomPopover.template = document.createElement('template')
customElements.define('custom-popover', CustomPopover)