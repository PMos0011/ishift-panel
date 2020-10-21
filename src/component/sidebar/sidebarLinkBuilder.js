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

    if (props.companyId !== ""){
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

    links.push({
        id: "invoices",
        elemconf: {
            to: "/auth/invoice/" + props.companyId + "/0",
            className: "main-item"
        },
        label: "Faktury"
    });
    links.push({
        id: "newInvoices",
        elemconf: {
            to: "/auth/invoice/edit/" + props.companyId + "/0",
            className: "sub-item"
        },
        label: "Nowa faktura"
    })

 
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
        links.push({
            id: "newBankAccount",
            elemconf: {
                to: "/auth/bankAccounts/edit/" + props.companyId + "/0",
                className: "sub-item"
            },
            label: "Dodaj konto bankowe"
        });
    

    
        links.push(
            {
                id: "contractors",
                elemconf: {
                    to: "/auth/contractors/" + props.companyId,
                    className: "main-item"
                },
                label: "Kontrahenci"
            }
        );
        links.push({
            id: "newContractor",
            elemconf: {
                to: "/auth/contractors/edit/" + props.companyId + "/0",
                className: "sub-item"
            },
            label: "Dodaj kontrahenta"
        });
   

  
        links.push(
            {
                id: "commodity",
                elemconf: {
                    to: "/auth/commodity/" + props.companyId,
                    className: "main-item"
                },
                label: "Towary i usługi"
            }
        );
        links.push({
            id: "newCommodity",
            elemconf: {
                to: "/auth/commodity/edit/" + props.companyId + "/0",
                className: "sub-item"
            },
            label: "Dodaj towar/usługę"
        });
        ;
    }


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