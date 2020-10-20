import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

import { pl } from "date-fns/locale";

const invoiceHeader = (props) => {
    return (
            <div className="doc-grid-3-container-auto">
                <div className=".margin-all-1">
                    <div>
                        <div>dokument</div>
                        <Select
                            className="margin-top-1"
                            placeholder="Wybierz"
                            defaultValue={props.selectOptions[0]}
                            options={props.selectOptions}
                            onChange={props.setSelectorOptions} />
                    </div>
                </div>
                <div className="margin-all-1">
                    <div>
                        <div>numer</div>
                        <input className="text-x-large-input"
                            type="text"
                            name="invoiceNumber"
                            value={props.invoiceNumber}
                            onChange={(event)=>props.onChangeHandler(event)} />
                    </div>
                </div>
                <div>
                </div>
                <div className="margin-all-1">
                    <div>miejsce sprzedaży</div>
                    <input className="text-x-large-input"
                    type="text"
                    name="placeOfIssue"
                    value={props.placeOfIssue}
                    onChange={event=>props.onChangeHandler(event)} />
                </div>
                <div className="margin-all-1">
                    <div>
                        <div>data wystawienia</div>
                        <DatePicker
                            className="text-x-large-input"
                            closeOnScroll={true}
                            selected={props.issueDate}
                            onChange={date => props.setIssueDate(date)}
                            dateFormat="dd.MM.yyyy"
                            locale={pl}
                        />
                    </div>
                </div>
                <div className="margin-all-1">
                    <div>
                        <div>data sprzedaży</div>
                        <DatePicker
                            className="text-x-large-input"
                            closeOnScroll={true}
                            selected={props.sellDate}
                            onChange={date => props.setSellDate(date)}
                            dateFormat="dd.MM.yyyy"
                            locale={pl}
                        />
                    </div>
                </div>
            </div>
    )
}

export default invoiceHeader;
