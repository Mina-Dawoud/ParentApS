export class User {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public imagePath: string;
    constructor(firstName: string = '', lastName: string = '', imagePath: string = '', id?: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imagePath = imagePath;
    }
}