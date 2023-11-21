// Global functions
import axios from "axios";
import { api } from "./apiConstant";
import AsyncStorage from "@react-native-async-storage/async-storage";

// API request base function
export const makeAPIRequest = ({
    url,
    data,
    method,
    params,
    headers,
}) =>
    new Promise(async (resolve, reject) => {
        const options = {
            url: url,
            data: data,
            method: method,
            params: params,
            headers: headers,
            baseURL: api.baseURL,
        };

        axios(options)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });

// Async storage set data
export const setAsyncStorage = async (key, value) => {
    const tokenRes = await AsyncStorage.setItem(key, JSON.stringify(value));
    return tokenRes;
};

// Async storage get data
export const getAsyncStorage = async (key) => {
    const tokenRes = await AsyncStorage.getItem(key);
    return JSON.parse(tokenRes);
};
