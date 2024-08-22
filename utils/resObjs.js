export class CtgObj {
    constructor (resBody, type, count) {
        this.message = type === 'added' ? 'Category added'
            : type === 'updated' ? `${count[0]} category ${type}`
            : `${count} category ${type}`;

        if (type === 'added') this.newCtg = resBody
        else if (type === 'added') this.uptCtg = resBody
    }
}