export interface respBody {
    code:number,
    message:string,
    data:any
}

export interface loginInfo{
    userId:string,
    password:string
}

export interface registerInfo{
    userId:string,
    userPwd:string,
    repeatPwd:string,
    nickName:string,
    phoneNumber:String,
    email:string,
}