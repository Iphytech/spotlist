import {CustomError} from './custom-error'

export class PageNotFoundError extends CustomError{

    reason = "This route does not exist"
    statusCode = 404;

    constructor(){
        super('This route does not exist');
        Object.setPrototypeOf(this, PageNotFoundError.prototype)
    }

    serializeErrors(){
        return [
            {message : this.reason}
        ]
    }
}