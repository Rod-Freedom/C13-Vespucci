export class CtgObj {
    constructor (resBody, type, count) {
        this.message = type === 'added' ? 'Category added'
            : count === 0 ? `No category with that ID`
            : type === 'updated' ? `${count} category ${type}`
            : `${count} category ${type}`;

        if (type === 'added') this.newCtg = resBody
        else if (type === 'updated') this.uptCtg = resBody
    }
}

export class CtgErr {
    constructor (resBody, msg) {
        this.message = msg;
        this.category = resBody;
    }
}

export class PdcObj {
    constructor (resBody, type, count) {
        this.message = type === 'added' ? 'Product added'
            : count === 0 ? `No product with that ID`
            : type === 'updated' ? `${count} product ${type}`
            : `${count} product ${type}`;

        if (type === 'added') this.newPdc = resBody
        else if (type === 'updated') this.uptPdc = resBody
    }
}

export class TagObj {
    constructor (resBody, type, count) {
        this.message = type === 'added' ? 'Tag added'
            : count === 0 ? `No tag with that ID`
            : type === 'updated' ? `${count} tag ${type}`
            : `${count} tag ${type}`;

        if (type === 'added') this.newTag = resBody
        else if (type === 'updated') this.uptTag = resBody
    }
}