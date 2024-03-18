function procesarTexto(traduccion, encriptar) {
    const textarea = document.querySelector("#texto");
    const texto = textarea.value;
    const area_default = document.querySelector("#default");
    const area_result = document.querySelector("#result");
    const texto_out = document.querySelector("#texto_out");
    const warning = document.querySelector("#warning");

    warning.removeAttribute("style");

    if (texto !== "") {
        for (let i = 0; i < texto.length; i++) {
            if (((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] !== ' ')) {
                warning.style.color = "red";
                warning.style.fontSize = "16px";
                return;
            } else if ((texto.length === 1 && texto === " ") || texto.replace(/ /g, "") === "") {
                area_default.classList.remove("invisible");
                area_result.classList.add("invisible");
                return;
            }
        }

        let out = "";
        for (let i = 0; i < texto.length; i++) {
            const letra = texto[i];
            out += (traduccion[letra] && encriptar) ? traduccion[letra] : letra;
        }

        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");
        texto_out.textContent = out;
    }
}

function encriptar(traduccion) {
    procesarTexto(traduccion, true);
}

function desencriptar(traduccion) {
    procesarTexto(traduccion, false);
}

function clipboard() {
    const texto_out = document.querySelector("#texto_out");
    navigator.clipboard.writeText(texto_out.textContent);
}

const enc = document.querySelector('#enc');
const des = document.querySelector('#des');
const copy = document.querySelector('#copiar');

const traduccion = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat"};

enc.addEventListener('click', () => encriptar(traduccion));
des.addEventListener('click', () => desencriptar(traduccion));
copy.addEventListener('click', clipboard);
