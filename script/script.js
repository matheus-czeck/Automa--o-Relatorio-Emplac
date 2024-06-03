const btn_gerar = document.querySelector("#gerar");
const firstNumber = document.querySelector("#first_number");
const lastNumber = document.querySelector("#last_number");
const div2 = document.querySelector(".result");

const caixaFirst = document.querySelector("#caixa_first");
const caixaLast = document.querySelector("#caixa_last");

const divP = document.querySelector("#div_P");
const botao2 = document.querySelector("#btn");

btn_gerar.addEventListener("click", () => {
    if (firstNumber.value || lastNumber.value != 0) {
        const table = document.createElement("table");
        table.setAttribute("id", "original-table");
        div2.appendChild(table);

        const cabecalho = document.createElement("tr");
        table.appendChild(cabecalho);

        const Dia = document.createElement("td");
        const n_decalques = document.createElement("td");
        const Placa = document.createElement("td");

        cabecalho.appendChild(Dia);
        cabecalho.appendChild(n_decalques);
        cabecalho.appendChild(Placa);

        Dia.innerHTML = "Dia";
        n_decalques.innerHTML = "Número de decalques";
        Placa.innerHTML = "Placa";

        for (let i = firstNumber.value; i <= lastNumber.value; i++) {
            const row = document.createElement("tr");
            table.appendChild(row);

            const Dia = document.createElement("td");
            const n_decalques = document.createElement("td");
            const Placa = document.createElement("td");

            n_decalques.innerHTML = i;

            row.appendChild(Dia);
            row.appendChild(n_decalques);
            row.appendChild(Placa);
        }

        if (table) {
            caixaFirst.remove();
            caixaLast.remove();

            const divInput = document.createElement("div");
            divInput.setAttribute("id", "d_input");
            divP.insertBefore(divInput, divP.children[0]);

            const c_dia = document.createElement("input");
            const p_dia = document.createElement("p");
            p_dia.innerHTML = "Escolha a data";
            divInput.appendChild(p_dia);

            c_dia.setAttribute("type", "date");
            c_dia.setAttribute("class", "input");
            divInput.appendChild(c_dia);

            const c_placa = document.createElement("input");
            const p_placa = document.createElement("p");
            p_placa.innerHTML = "Digite a placa";
            divInput.appendChild(p_placa);
            c_placa.setAttribute("type", "text");
            c_placa.setAttribute("class", "input");
            c_placa.setAttribute("placeholder", "AAA0A00");
            c_placa.setAttribute("maxlength", "7");
            divInput.appendChild(c_placa);

            btn_gerar.disabled = true;

            const btn_2 = document.createElement("button");
            btn_2.setAttribute("class", "botao");
            btn_2.innerHTML = "Add a tabela";
            botao2.appendChild(btn_2);

            const btn_remove = document.createElement("button");
            btn_remove.setAttribute("class", "botao");
            btn_remove.innerHTML = "Remover anterior";
            botao2.appendChild(btn_remove);

            let currentRowIndex = 1;

            btn_2.addEventListener("click", () => {
                if (c_dia.value && c_placa.value) {
                    const row = table.rows[currentRowIndex];
                    if (row) {
                        const [year, month, day] = c_dia.value.split("-");
                        const formattedDate = `${day}/${month}/${year}`;

                        // Formatação da placa
                        let placa = c_placa.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

                        // Validação e formatação
                        if (placa.length === 7 && /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(placa)) {
                            placa = `${placa.slice(0, 3)}-${placa.slice(3, 4)}${placa.slice(4, 5)}${placa.slice(5)}`;

                            // Atualiza a linha da tabela
                            row.cells[0].innerHTML = formattedDate;
                            row.cells[2].innerHTML = placa;
                            currentRowIndex++;
                        } else {
                            alert("Formato de placa inválido. Use o formato XXX-0X00.");
                        }

                    } else {
                        alert("Nenhuma linha disponível para atualizar");
                    }
                } else {
                    alert("Preencha os campos");
                }
            });

            btn_remove.addEventListener("click", () => {
                if (currentRowIndex > 1) {
                    currentRowIndex--; // Move para a linha anterior
                    const row = table.rows[currentRowIndex];
                    row.cells[0].innerHTML = ""; // Limpa o conteúdo da célula de data
                    row.cells[2].innerHTML = ""; // Limpa o conteúdo da célula de placa
                } else {
                    alert("Não há linhas anteriores para remover.");
                }
            });
        }
    } else {
        alert("Preencha os campos abaixo");
    }
});
