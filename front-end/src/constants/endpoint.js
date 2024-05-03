import baseURL from "@/axios/baseURL";

export const ENDPOINT = {
    //------------- auth -----------
    LOGIN: `${baseURL}/auth/login`,
    USER: `${baseURL}/user`,
    COURSE: `${baseURL}/course`,     
     
}

console.log('ll',baseURL);