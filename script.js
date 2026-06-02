const btnMoedas = document.getElementById("Moedas");
const Menu = document.getElementById("Menu");
const url = `https://economia.awesomeapi.com.br/json/last/USD-BRL`;
const toggleBtn = document.getElementById("isDark");

let cotacao = null;

async function conversao() {
  const res = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL",
  );
  const data = await res.json();
  cotacao = parseFloat(data.USDBRL.bid);
}

document.getElementById("Moedas").addEventListener("click", async () => {
  const card = document.getElementById("card");

  if (!cotacao) await conversao();

  card.innerHTML = `
      <h2> Conversão de Moedas </h2>
      <p>Amém!</p>
        <p class="cotacao-info">1 USD = R$ ${cotacao.toFixed(2)}</p>

        <div class="conversor-form">
            <input type="number" id="valor" placeholder="Digite o valor" />
            <select id="direcao">
                <option value="usd-brl">USD → BRL</option>
                <option value="brl-usd">BRL → USD</option>
            </select>
            <button onclick="converter()">Converter</button>
            <p id="resultado"></p>
        </div>
    `;
});

function converter() {
  const valor = parseFloat(document.getElementById("valor").value);
  const dir = document.getElementById("direcao").value;
  const resultado = document.getElementById("resultado");

  if (isNaN(valor) || valor <= 0) {
    resultado.textContent = " Digite um valor válido!";
    return;
  }
  resultado.textContent =
    dir === "usd-brl"
      ? `R$ ${(valor * cotacao).toFixed(2)}`
      : `US$ ${(valor / cotacao).toFixed(2)}`;
}
