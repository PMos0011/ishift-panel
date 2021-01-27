import { setMessage } from './alerts/alertsActions';
import * as messages from "./alertsMessages";
import { logoutUser } from "./authorization/authAction";

const httpErrorHandling = (err, dispatch) => {
    if (err.response !== undefined) {
        switch (err.response.status) {
            case 400:
                dispatch(setMessage(messages.WRONG_PASSWORD, true));
                break;
            case 403:
                if (err.response.headers.tokenerror) {
                    dispatch(logoutUser());
                    switch (err.response.headers.tokenerror) {
                        case "missing":
                            dispatch(setMessage(messages.TOKEN_MISSING, true));
                            break;
                        case "invalid":
                            dispatch(setMessage(messages.TOKEN_INVALID, true));
                            break;
                        case "expired":
                            dispatch(setMessage(messages.TOKEN_EXPIRED, true));
                            break;
                        default:
                            dispatch(setMessage(messages.GENERAL_ERROR, true));
                            break;
                    }
                } else
                    dispatch(setMessage(messages.WRONG_USERNAME_OR_PASSWORD, true));
                break;
            case 404:
                dispatch(setMessage(messages.WRONG_USERNAME, true));
                break;
            case 409:
                dispatch(setMessage(messages.USERNAME_TAKEN, true));
                break;
            default:
                dispatch(setMessage(messages.GENERAL_ERROR, true));
                break;
        }
    } else
        dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
}

export default httpErrorHandling;