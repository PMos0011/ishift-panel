const form = (props) => {

    let links = [];

    props.isAdmin ?
        links.push(
            {
                id: "customers",
                elemconf: {
                    to: "/auth/customers",
                    className: "main-item"
                },
                label: "Klienci"
            }
        ) :
        links.push(
            {
                id: "myData",
                elemconf: {
                    to: "/auth/customer/" + props.dataAccess,
                    className: "main-item"
                },
                label: "Moje Dane"
            }
        );

    if (props.companyId !== "")
        links.push(
            {
                id: "documents",
                elemconf: {
                    to: "/auth/documents/" + props.companyId,
                    className: "main-item"
                },
                label: "Dokumenty"
            }
        );

        if (props.companyId !== "")
        links.push(
            {
                id: "bankAccounts",
                elemconf: {
                    to: "/auth/bankAccounts/" + props.companyId,
                    className: "main-item"
                },
                label: "Rachunki bankowe"
            }
        );

    links.push(
        {
            id: "settings",
            elemconf: {
                to: "/auth/settings/data",
                className: "main-item"
            },
            label: "Ustawienia"
        }
    );
    links.push(
        {
            id: "settingsData",
            elemconf: {
                to: "/auth/settings/data",
                className: "sub-item"
            },
            label: "Moje dane"
        }
    );
    links.push(
        {
            id: "settingsPass",
            elemconf: {
                to: "/auth/settings/pass",
                className: "sub-item"
            },
            label: "Login/hasło"
        }
    );


    return links
}

export default form;