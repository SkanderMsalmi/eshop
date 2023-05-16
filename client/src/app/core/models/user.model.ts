export interface User{
    _id?: string;
    name:string;
    image:string;
    password?:string;
    email:string;
    createdAt:Date;
    gender:String;
    number:Number;
    occupation:String;
    dateOfBirth:Date
    role:string
}
