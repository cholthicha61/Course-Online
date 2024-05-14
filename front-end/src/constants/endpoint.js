import { base, baseURL } from "@/axios/baseURL";
export const ENDPOINT = {
    //------------- auth -----------
    LOGIN: `${baseURL}/auth/login`,
    USER: `${baseURL}/user`,
    COURSE: `${baseURL}/course`,     
    INBOX: `${baseURL}/question`,
    CATEGORY: `${baseURL}/category`,
    IMG: `${base}/public/images/`
        
     
}

console.log('ll',baseURL);
