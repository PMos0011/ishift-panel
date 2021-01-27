import axios from 'axios';

import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';

export const getExchangeRate = (code, date, action) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get("https://api.nbp.pl/api/exchangerates/rates/A/" + code + "/" + date)
            .then((response) => {
                action(response.data);
                dispatch(setLoadingSpinner(false));
            })
            .catch((err) => {
                if (err.response.status === 404)
                    dispatch(setMessage(messages.EXCHANGE_ERROR, true))
                else
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
            })
    }
}