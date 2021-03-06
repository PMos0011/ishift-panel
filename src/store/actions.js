//server address
//export const SERVER_ADDRESS = "https://ishift.pl:8080"
export const SERVER_ADDRESS = "http://localhost:8080"

//authorization reducer actions
export const AUTHORIZE_USER = "AUTHORIZE_USER";
export const LOGOUT_USER = "LOGOUT_USER";

//alert actions
export const SET_ERROR_ALERT = "SET_ERROR_MESSAGE";
export const SET_SUCCESS_ALERT = "SET_SUCCESS_ALERT";
export const SET_LOADING_SPINNER = "SET_LOADING_SPINNER";
export const SET_DELETE_ALERT = "SET_DELETE_ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";

//AccountingOffice actions
export const GET_ACCOUNTING_OFFICE_DATA = "GET_ACCOUNTING_OFFICE_DATA";

//customers actions
export const GET_ALL_CUSTOMERS = "GET_ALL_CUSTOMERS";
export const GET_CUSTOMER_DATA = "GET_CUSTOMER_DATA";

//documents actions
export const GET_ALL_DOCUMENTS = "GET_ALL_DOCUMENTS";
export const GET_DOCUMENT_FULL_DETAILS = "GET_DOCUMENT_FULL_DETAILS";

//settings actions
export const GET_LOGIN_LIST = "GET_LOGIN_LIST";

//bank accounts actions
export const GET_BANK_ACCOUNTS = " GET_BANK_ACCOUNTS";
export const SET_BANK_ACCOUNTS_SELECT_OPTIONS = "SET_BANK_ACCOUNTS_SELECT_OPTIONS";

//contractors actions
export const GET_CONTRACTORS = "GET_CONTRACTORS";

//commodity actions
export const GET_COMMODITY = "GET_COMMODITY";
export const GET_MEASURES = "GET_MEASURES";
export const SET_COMMODITY_SELECT_OPTIONS = "SET_COMMODITY_SELECT_OPTIONS";

//invoices actions
export const GET_INVOICES = "GET_INVOICES";
export const GET_INVOICE_TYPES = "GET_INVOICE_TYPES";
export const GET_VAT_TYPES = "GET_VAT_TYPES";
export const GET_IMPORTED_INVOICES = "GET_IMPORTED_INVOICES";
export const GET_LAST_INVOICE = "GET_LAST_INVOICE";
export const GET_ADVANCED_INVOICES = "GET_ADVANCED_INVOICES";
