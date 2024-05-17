import { base, baseURL } from "@/axios/baseURL"; // base => for img
export const ENDPOINT = {
    //------------- auth -----------
    LOGIN: `${baseURL}/auth/login`,
    USER: `${baseURL}/user`,
    COURSE: `${baseURL}/course`,     
    INBOX: `${baseURL}/question`,
    CATEGORY: `${baseURL}/category`,
    IMG: `${base}/public/images/`,
    ORDER: `${baseURL}/order`,
    FAVORITE: `${baseURL}/user/favorite`


        
     
}

console.log('ll',baseURL);
