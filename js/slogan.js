document.addEventListener("DOMContentLoaded", function() {
    const apiURL = "https://uzgfgx3m.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22slogan%22%5D%7B%0A++titulo1%2C%0A++titulo2%2C%0A++subtitulo1%2C%0A++subtitulo2%2C%0A++texto1%2C%0A++texto2%2C%0A++botao%0A%7D";

    async function carregarSlogan() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            const slogans = data.result;

            if (slogans.length > 0) {
                const slogan = slogans[0];

                document.getElementById("slogan-title1").innerText = slogan.titulo1 || "";
                document.getElementById("slogan-title2").innerText = slogan.titulo2 || "";
                document.getElementById("slogan-subtitle1").innerText = slogan.subtitulo1 || "";
                document.getElementById("slogan-subtitle2").innerText = slogan.subtitulo2 || "";
                document.getElementById("slogan-text1").innerHTML = slogan.texto1 || "";
                document.getElementById("slogan-text2").innerHTML = slogan.texto2 || "";

                const buttonText = slogan.botao?.texto || "";
                const buttonLink = slogan.botao?.link || '#';

                const contactButton = document.getElementById("contact-button");
                contactButton.innerHTML = buttonText;
                contactButton.onclick = function() {
                    window.open(buttonLink, '_blank');
                };
            }
        } catch (error) {
            console.error("Erro ao carregar os slogans:", error);
        }
    }

    carregarSlogan();
});
