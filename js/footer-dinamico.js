async function loadFooterData() {
    try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'https://uzgfgx3m.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22rodape%22%5D%7B%0A++%22id%22%3A+_id%2C%0A++titulo%2C%0A++linkscontatos%5B%5D%7B%0A++++name%2C%0A++++url%2C%0A++++%22icon%22%3A+icon.asset-%3Eurl%0A++%7D%2C%0A++subtitulo+%7B%0A++++subtitulo%2C%0A++++%22logo%22%3A+logo.asset-%3Eurl%0A++%7D%2C%0A++subtitulolinks%2C%0A++usefulLinks%5B%5D%7B%0A++++name%2C%0A++++url%0A++%7D%2C%0A++subtitulosociallinks%2C%0A++sociallinks%5B%5D%7B%0A++++name%2C%0A++++url%0A++%7D%0A%7D%0A';
        const response = await fetch(proxyUrl + apiUrl);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        const footerData = data.result[0];

        let contentHtml = `<div class="footer-col-1"><h3 class="text-[#F1F1D6] mb-2">Siga-nos</h3>`;

        // Coluna 1: Links de contato com ícones
        if (footerData.linkscontatos && Array.isArray(footerData.linkscontatos)) {
            contentHtml += '<div class="flex flex-col gap-0">';
            footerData.linkscontatos.forEach(contact => {
                if (contact.url && contact.name && contact.icon) { // Verificação adicionada
                    contentHtml += `
                        <div onclick="window.open('${contact.url}', '_blank')" class="cursor-pointer flex items-center text-[#F1F1D6]">
                            <p>${contact.name}</p>
                            <img src="${contact.icon}" alt="${contact.name}" class="w-4 h-4 ml-1">
                        </div>
                    `;
                }
            });
            contentHtml += '</div></div>';
        }

        // Coluna 2: Logo e Subtítulo
        if (footerData.subtitulo) {
            contentHtml += `<div class="footer-col-2 flex items-center gap-1">`;
            if (footerData.subtitulo.logo) { // Verificação adicionada
                contentHtml += `<img src="${footerData.subtitulo.logo}" alt="Logo" class="footer-logo w-20 h-20 object-contain">`;
            }
            if (footerData.subtitulo.subtitulo) {
                contentHtml += `<p>${footerData.subtitulo.subtitulo}</p>`;
            }
            contentHtml += `</div>`;
        }

        // Coluna 3: Links Úteis
        if (footerData.usefulLinks && Array.isArray(footerData.usefulLinks)) {
            contentHtml += `<div class="footer-col-3"><h3 class="text-[#F1F1D6] mb-2">${footerData.subtitulolinks || 'Links Úteis'}</h3><ul class="space-y-1">`;
            footerData.usefulLinks.forEach(link => {
                if (link.url && link.name) { // Verificação adicionada
                    contentHtml += `<li class="cursor-pointer text-[#F1F1D6]" onclick="window.open('${link.url}', '_blank')">${link.name}</li>`;
                }
            });
            contentHtml += `</ul></div>`;
        }

        // Coluna 4: Links Sociais
        if (footerData.sociallinks && Array.isArray(footerData.sociallinks)) {
            contentHtml += `<div class="footer-col-4"><h3 class="text-[#F1F1D6] mb-2">${footerData.subtitulosociallinks || 'Redes Sociais'}</h3><ul class="space-y-1">`;
            footerData.sociallinks.forEach(social => {
                if (social.url && social.name) { // Verificação adicionada
                    contentHtml += `<li class="cursor-pointer text-[#F1F1D6]" onclick="window.open('${social.url}', '_blank')">${social.name}</li>`;
                }
            });
            contentHtml += `</ul></div>`;
        }

        document.getElementById("footer-content").innerHTML = contentHtml;
    } catch (error) {
        console.error("Erro ao carregar o footer:", error);
        document.getElementById("footer-content").innerHTML = '<p>Erro ao carregar os dados do footer. Tente novamente mais tarde.</p>';
    }
}

loadFooterData();
