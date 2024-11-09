document.addEventListener("DOMContentLoaded", function() {
    const apiURL = "https://uzgfgx3m.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22comentario%22%5D%7B%0A++nome%2C%0A++%22fotoUrl%22%3A+foto.asset-%3Eurl%2C%0A++avaliacao%2C%0A++review%0A%7D%0A";

    async function carregarDepoimentos() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            const depoimentos = data.result;

            const container = document.getElementById("depoimentos-container");
            container.innerHTML = ""; 

            depoimentos.forEach(depoimento => {
                const estrelas = Array(depoimento.avaliacao).fill('<i class="fa fa-star"></i>').join('');

                const depoimentoHTML = `
                    <div class="col-3">
                        <i class="fa !text-[#ffb9b9] fa-quote-left"></i>
                        <p>${depoimento.review}</p>
                        <div class="ratingstar">
                            ${estrelas}
                        </div>
                        <img class="sc-380:!hidden" src="${depoimento.fotoUrl}" alt="${depoimento.nome}">
                        <h3>${depoimento.nome}</h3>
                    </div>
                `;

                container.innerHTML += depoimentoHTML;
            });
        } catch (error) {
        }
    }

    carregarDepoimentos();
});
