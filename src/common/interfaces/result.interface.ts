
export class Result<T> {
    public success: boolean;
    public message: string;
    public data?: T;

    constructor(success: boolean, message: string, data?: T) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static suc<T>(data?: T, message: string = 'ok'): Result<T> {
        return new Result<T>(true, message, data);
    }

    static fail<T>(message: string = 'failed', data?: T): Result<T> {
        return new Result<T>(false, message, data);
    }
}