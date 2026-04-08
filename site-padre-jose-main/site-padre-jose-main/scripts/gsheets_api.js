// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    // ID da planilha do Google Sheets
    const spreadsheetId = '10byY_Rgn_StfUUsPZQ6CMdi4tAncvimqk9xT8YepEMw';
    // ID da planilha dentro do documento (geralmente 0 para a primeira planilha)
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'projetos' // Substitua pelo nome da aba que você deseja ler
    }).then(function(response) {
        const data = response.result.values;
        const cardsContainer = document.querySelector('#cards-container');

        // Limpa qualquer conteúdo existente
        cardsContainer.innerHTML = '';

        // Cria os cards com os dados da planilha
        data.slice(1).forEach(function(row) {
            const rowData = row.map(item => item || ''); // Lida com valores nulos ou indefinidos
            
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('col-lg-3');
            card.classList.add('col-10');
            card.classList.add('m-4');


            if (rowData.length > 0) {
                const title = document.createElement('h3');
                title.textContent = rowData[0];
                title.classList.add('destaque');
                title.classList.add('fw-bold');
                card.appendChild(title);
            }

            if (rowData.length > 1) {
                const description = document.createElement('p');
                description.textContent = rowData[1];
                card.appendChild(description);
            }

            if (rowData.length > 2) {
                const button = document.createElement('button');
                button.textContent = 'Contato do responsável';
                button.onclick = function() {
                    window.location.href = "tel:"+ rowData[2];
                };
                card.appendChild(button);
            }

            cardsContainer.appendChild(card);
        });
    });
}

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyDsr49LO0Ya1oBWhGiysPIjm-Pm9XUlV5g',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    });
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);