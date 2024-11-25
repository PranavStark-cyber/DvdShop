export interface User{
    firstName:string;
    lastName:string;
    email:string;
    nic:string;
    password:string;
}

export interface Login{
    nic:string;
    password:string;
}


export interface Verifyemail{
    email:string;
    otp:number;   
}



