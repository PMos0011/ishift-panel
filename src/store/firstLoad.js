import { getCustomerData } from "./customers/customersActions";

import {newAuthData, setToken} from "./authorization/authAction";

export const firstLoad = () => {

    const token = localStorage.getItem("token");
    const expiratinDate = localStorage.getItem("expireDate");

    if (token !== null
        && expiratinDate !== null) {
        const authData = newAuthData(token, expiratinDate);

        const getData = () => {
            if (!authData.isAdmin)
                return getCustomerData(authData.dataAccess);
            else
                return { type: null }

        }

        return (dispatch) => {
            dispatch(setToken(token, expiratinDate),
            dispatch(getData())
            );
        }
    }

    return { type: null }
}