function loadGoogleSheetData() {
    const spreadsheetId = "10byY_Rgn_StfUUsPZQ6CMdi4tAncvimqk9xT8YepEMw";

    gapi.client.sheets.spreadsheets.values
        .get({
            spreadsheetId,
            range: "projetos",
        })
        .then((response) => {
            const data = response.result.values || [];
            const cardsContainer = document.querySelector("#cards-container");

            if (!cardsContainer) {
                return;
            }

            cardsContainer.innerHTML = "";

            data.slice(1).forEach((row) => {
                const rowData = row.map((item) => item || "");
                const card = document.createElement("article");

                card.classList.add("project-card", "col-lg-3", "col-md-5", "col-12", "m-3");

                if (rowData[0]) {
                    const title = document.createElement("h3");
                    title.textContent = rowData[0];
                    card.appendChild(title);
                }

                if (rowData[1]) {
                    const description = document.createElement("p");
                    description.textContent = rowData[1];
                    card.appendChild(description);
                }

                if (rowData[2]) {
                    const button = document.createElement("a");
                    button.classList.add("project-button");
                    button.textContent = "Contato do responsável";
                    button.href = `tel:${rowData[2]}`;
                    card.appendChild(button);
                }

                cardsContainer.appendChild(card);
            });
        });
}

function initGoogleSheetsApi() {
    gapi.client
        .init({
            apiKey: "AIzaSyDsr49LO0Ya1oBWhGiysPIjm-Pm9XUlV5g",
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        })
        .then(loadGoogleSheetData);
}

gapi.load("client", initGoogleSheetsApi);
