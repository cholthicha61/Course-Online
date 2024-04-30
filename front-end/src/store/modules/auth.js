import axios from "axios";
import { ENDPOINT, configWithToken } from '@/constants/endpoint';
const state = {


};
const getters = {

};
const mutations = {

};
const actions = {
    async login({commit},payload){
        const url = `${ENDPOINT.LOGIN}`

    }
};
export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}