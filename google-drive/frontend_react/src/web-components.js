import ExampleComponent from "./components/ExampleComponent";
import {render, unmountComponentAtNode} from "react-dom";
import React from "react";
import {HashRouter} from "react-router-dom";
import App from "./App";
import htmlToReact from "html-to-react";
import FileCards from "./components/listers/FileCards";
import FileLists from "./components/listers/FileList";
import FileTables from "./components/listers/FileTable";
import Settings from "./components/Setting";

class ReactElement extends HTMLElement {

    constructor() {
        super();
        this.observer = new MutationObserver(() => this.update());
        this.observer.observe(this, { attributes: true });
    }

    connectedCallback() {
        this._innerHTML = this.innerHTML;
        this.mount();
    }

    disconnectedCallback() {
        this.unmount();
        this.observer.disconnect();
    }

    update() {
        this.unmount();
        this.mount();
    }

    mount() {
        const propTypes = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const events = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const props = {
            ...this.getProps(this.attributes, propTypes),
            ...this.getEvents(events),
            children: this.parseHtmlToReact(this.innerHTML)
        };
        console.log("this.attributes  :  ",this.attributes);
        console.log("props  :  ",props);
        // render(<ExampleComponent {...props} />, this);
        render(<React.StrictMode>
            <HashRouter>
                <App />
            </HashRouter>
        </React.StrictMode>, this);
    }

    unmount() {
        unmountComponentAtNode(this);
    }

    parseHtmlToReact(html) {
        return html && new htmlToReact.Parser().parse(html);
    }

    getProps(attributes, propTypes) {
        propTypes = propTypes|| {};
        return [ ...attributes ]
            .filter(attr => attr.name !== 'style')
            .map(attr => this.convert(propTypes, attr.name, attr.value))
            .reduce((props, prop) =>
                ({ ...props, [prop.name]: prop.value }), {});
    }

    getEvents(propTypes) {
        return Object.keys(propTypes)
            .filter(key => /on([A-Z].*)/.exec(key))
            .reduce((events, ev) => ({
                ...events,
                [ev]: args =>
                    this.dispatchEvent(new CustomEvent(ev, { ...args }))
            }), {});
    }

    convert(propTypes, attrName, attrValue) {
        const propName = Object.keys(propTypes)
            .find(key => key.toLowerCase() == attrName);
        let value = attrValue;
        if (attrValue === 'true' || attrValue === 'false')
            value = attrValue == 'true';
        else if (!isNaN(attrValue) && attrValue !== '')
            value = +attrValue;
        else if (/^{.*}/.exec(attrValue))
            value = JSON.parse(attrValue);
        return {
            name: propName ? propName : attrName,
            value: value
        };
    }
}

class FileList extends HTMLElement {

    constructor() {
        super();
        this.observer = new MutationObserver(() => this.update());
        this.observer.observe(this, { attributes: true });
    }

    connectedCallback() {
        this._innerHTML = this.innerHTML;
        this.mount();
    }

    disconnectedCallback() {
        this.unmount();
        this.observer.disconnect();
    }

    update() {
        this.unmount();
        this.mount();
    }

    mount() {
        const propTypes = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const events = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const props = {
            ...this.getProps(this.attributes, propTypes),
            ...this.getEvents(events),
            children: this.parseHtmlToReact(this.innerHTML)
        };
        // render(<ExampleComponent {...props} />, this);
        render(<FileLists/>, this);
    }

    unmount() {
        unmountComponentAtNode(this);
    }

    parseHtmlToReact(html) {
        return html && new htmlToReact.Parser().parse(html);
    }

    getProps(attributes, propTypes) {
        propTypes = propTypes|| {};
        return [ ...attributes ]
            .filter(attr => attr.name !== 'style')
            .map(attr => this.convert(propTypes, attr.name, attr.value))
            .reduce((props, prop) =>
                ({ ...props, [prop.name]: prop.value }), {});
    }

    getEvents(propTypes) {
        return Object.keys(propTypes)
            .filter(key => /on([A-Z].*)/.exec(key))
            .reduce((events, ev) => ({
                ...events,
                [ev]: args =>
                    this.dispatchEvent(new CustomEvent(ev, { ...args }))
            }), {});
    }

    convert(propTypes, attrName, attrValue) {
        const propName = Object.keys(propTypes)
            .find(key => key.toLowerCase() == attrName);
        let value = attrValue;
        if (attrValue === 'true' || attrValue === 'false')
            value = attrValue == 'true';
        else if (!isNaN(attrValue) && attrValue !== '')
            value = +attrValue;
        else if (/^{.*}/.exec(attrValue))
            value = JSON.parse(attrValue);
        return {
            name: propName ? propName : attrName,
            value: value
        };
    }
}

class FileCard extends HTMLElement {

    constructor() {
        super();
        this.observer = new MutationObserver(() => this.update());
        this.observer.observe(this, { attributes: true });
    }

    connectedCallback() {
        this._innerHTML = this.innerHTML;
        this.mount();
    }

    disconnectedCallback() {
        this.unmount();
        this.observer.disconnect();
    }

    update() {
        this.unmount();
        this.mount();
    }

    mount() {
        const propTypes = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const events = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const props = {
            ...this.getProps(this.attributes, propTypes),
            ...this.getEvents(events),
            children: this.parseHtmlToReact(this.innerHTML)
        };
        console.log("this.attributes  :  ",this.attributes);
        console.log("props  :  ",props);
        // render(<ExampleComponent {...props} />, this);
        render(<FileCards/>, this);
    }

    unmount() {
        unmountComponentAtNode(this);
    }

    parseHtmlToReact(html) {
        return html && new htmlToReact.Parser().parse(html);
    }

    getProps(attributes, propTypes) {
        propTypes = propTypes|| {};
        return [ ...attributes ]
            .filter(attr => attr.name !== 'style')
            .map(attr => this.convert(propTypes, attr.name, attr.value))
            .reduce((props, prop) =>
                ({ ...props, [prop.name]: prop.value }), {});
    }

    getEvents(propTypes) {
        return Object.keys(propTypes)
            .filter(key => /on([A-Z].*)/.exec(key))
            .reduce((events, ev) => ({
                ...events,
                [ev]: args =>
                    this.dispatchEvent(new CustomEvent(ev, { ...args }))
            }), {});
    }

    convert(propTypes, attrName, attrValue) {
        const propName = Object.keys(propTypes)
            .find(key => key.toLowerCase() === attrName);
        let value = attrValue;
        if (attrValue === 'true' || attrValue === 'false')
            value = attrValue === 'true';
        else if (!isNaN(attrValue) && attrValue !== '')
            value = +attrValue;
        else if (/^{.*}/.exec(attrValue))
            value = JSON.parse(attrValue);
        return {
            name: propName ? propName : attrName,
            value: value
        };
    }
}

class FileTable extends HTMLElement {

    constructor() {
        super();
        this.observer = new MutationObserver(() => this.update());
        this.observer.observe(this, { attributes: true });
    }

    connectedCallback() {
        this._innerHTML = this.innerHTML;
        this.mount();
    }

    disconnectedCallback() {
        this.unmount();
        this.observer.disconnect();
    }

    update() {
        this.unmount();
        this.mount();
    }

    mount() {
        const propTypes = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const events = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const props = {
            ...this.getProps(this.attributes, propTypes),
            ...this.getEvents(events),
            children: this.parseHtmlToReact(this.innerHTML)
        };
        console.log("this.attributes  :  ",this.attributes);
        console.log("props  :  ",props);
        // render(<ExampleComponent {...props} />, this);
        render(<FileTables/>, this);
    }

    unmount() {
        unmountComponentAtNode(this);
    }

    parseHtmlToReact(html) {
        return html && new htmlToReact.Parser().parse(html);
    }

    getProps(attributes, propTypes) {
        propTypes = propTypes|| {};
        return [ ...attributes ]
            .filter(attr => attr.name !== 'style')
            .map(attr => this.convert(propTypes, attr.name, attr.value))
            .reduce((props, prop) =>
                ({ ...props, [prop.name]: prop.value }), {});
    }

    getEvents(propTypes) {
        return Object.keys(propTypes)
            .filter(key => /on([A-Z].*)/.exec(key))
            .reduce((events, ev) => ({
                ...events,
                [ev]: args =>
                    this.dispatchEvent(new CustomEvent(ev, { ...args }))
            }), {});
    }

    convert(propTypes, attrName, attrValue) {
        const propName = Object.keys(propTypes)
            .find(key => key.toLowerCase() === attrName);
        let value = attrValue;
        if (attrValue === 'true' || attrValue === 'false')
            value = attrValue === 'true';
        else if (!isNaN(attrValue) && attrValue !== '')
            value = +attrValue;
        else if (/^{.*}/.exec(attrValue))
            value = JSON.parse(attrValue);
        return {
            name: propName ? propName : attrName,
            value: value
        };
    }
}

class Setting extends HTMLElement {

    constructor() {
        super();
        this.observer = new MutationObserver(() => this.update());
        this.observer.observe(this, { attributes: true });
    }

    connectedCallback() {
        this._innerHTML = this.innerHTML;
        this.mount();
    }

    disconnectedCallback() {
        this.unmount();
        this.observer.disconnect();
    }

    update() {
        this.unmount();
        this.mount();
    }

    mount() {
        const propTypes = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const events = ExampleComponent.propTypes ? ExampleComponent.propTypes : {};
        const props = {
            ...this.getProps(this.attributes, propTypes),
            ...this.getEvents(events),
            children: this.parseHtmlToReact(this.innerHTML)
        };
        console.log("this.attributes  :  ",this.attributes);
        console.log("props  :  ",props);
        // render(<ExampleComponent {...props} />, this);
        render(<Setting/>, this);
    }

    unmount() {
        unmountComponentAtNode(this);
    }

    parseHtmlToReact(html) {
        return html && new htmlToReact.Parser().parse(html);
    }

    getProps(attributes, propTypes) {
        propTypes = propTypes|| {};
        return [ ...attributes ]
            .filter(attr => attr.name !== 'style')
            .map(attr => this.convert(propTypes, attr.name, attr.value))
            .reduce((props, prop) =>
                ({ ...props, [prop.name]: prop.value }), {});
    }

    getEvents(propTypes) {
        return Object.keys(propTypes)
            .filter(key => /on([A-Z].*)/.exec(key))
            .reduce((events, ev) => ({
                ...events,
                [ev]: args =>
                    this.dispatchEvent(new CustomEvent(ev, { ...args }))
            }), {});
    }

    convert(propTypes, attrName, attrValue) {
        const propName = Object.keys(propTypes)
            .find(key => key.toLowerCase() === attrName);
        let value = attrValue;
        if (attrValue === 'true' || attrValue === 'false')
            value = attrValue === 'true';
        else if (!isNaN(attrValue) && attrValue !== '')
            value = +attrValue;
        else if (/^{.*}/.exec(attrValue))
            value = JSON.parse(attrValue);
        return {
            name: propName ? propName : attrName,
            value: value
        };
    }
}

customElements.define('file-list', FileList);
customElements.define('file-table', FileTable);
customElements.define('file-card', FileCard);
customElements.define('shopping-product', ReactElement);
