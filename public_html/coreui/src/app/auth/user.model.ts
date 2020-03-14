export class UserModel{

    constructor(
        private email           : string,
        private userId          : number,
        private userName        : string,
        private _token          : string,
        private angency         : string
    ){}

    get token()
    {
        return this._token;
    }
}