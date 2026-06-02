const btnMoedas = document.getElementById("Moedas");
const Menu = document.getElementById("Menu");
const url = `https://economia.awesomeapi.com.br/json/last/USD-BRL`;
const toggleBtn = document.getElementById("isDark");

let cotacao = null;

//Conversor de Moedas

async function conversao() {
  const res = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL",
  );
  const data = await res.json();
  cotacao = parseFloat(data.USDBRL.bid);
}

function converter() {
  const valor = parseFloat(
    document.getElementById("valor").value.replace(",", "."),
  );
  const dir = document.getElementById("direcao").value;
  const resultado = document.getElementById("resultado");

  if (isNaN(valor) || valor <= 0) {
    resultado.textContent = "Digite um valor válido!";
    return;
  }

  if (dir === "usd-brl") {
    resultado.textContent = (valor * cotacao).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    resultado.textContent = (valor / cotacao).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
}

document.getElementById("Moedas").addEventListener("click", async () => {
  const card = document.getElementById("card");

  if (!cotacao) await conversao();

  card.innerHTML = `
    <h2>Conversão de Moedas</h2>
    <p>Amém!</p>
    <p class="cotacao-info">1 USD = ${cotacao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
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

// --- IMC ---

function classificarIMC(imc, genero) {
  const tabelas = {
    feminino: [
      { limite: 19.1, categoria: "Abaixo do peso", faixa: "abaixo de 19.1" },
      { limite: 25.8, categoria: "Peso normal", faixa: "19.1 – 25.8" },
      {
        limite: 27.3,
        categoria: "Marginalmente acima do peso",
        faixa: "25.8 – 27.3",
      },
      { limite: 32.3, categoria: "Acima do peso", faixa: "27.3 – 32.3" },
      { limite: Infinity, categoria: "Obeso", faixa: "acima de 32.3" },
    ],
    masculino: [
      { limite: 20.7, categoria: "Abaixo do peso", faixa: "abaixo de 20.7" },
      { limite: 26.4, categoria: "Peso normal", faixa: "20.7 – 26.4" },
      {
        limite: 27.8,
        categoria: "Marginalmente acima do peso",
        faixa: "26.4 – 27.8",
      },
      { limite: 31.1, categoria: "Acima do peso", faixa: "27.8 – 31.1" },
      { limite: Infinity, categoria: "Obeso", faixa: "acima de 31.1" },
    ],
  };

  const tabela = tabelas[genero] ?? [
    { limite: 18.5, categoria: "Abaixo do peso", faixa: "abaixo de 18.5" },
    { limite: 25.0, categoria: "Peso normal", faixa: "18.5 – 24.9" },
    { limite: 30.0, categoria: "Sobrepeso", faixa: "25.0 – 29.9" },
    { limite: Infinity, categoria: "Obeso", faixa: "acima de 30.0" },
  ];

  return tabela.find((faixa) => imc < faixa.limite);
}

function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const alturaCm = parseFloat(document.getElementById("altura").value);
  const genero = document.getElementById("genero").value;
  const resultado = document.getElementById("resultado");

  if (isNaN(peso) || isNaN(alturaCm) || peso <= 0 || alturaCm <= 0) {
    resultado.textContent = "Preencha todos os campos corretamente.";
    return;
  }

  const altura = alturaCm / 100;
  const imc = peso / (altura * altura);
  const classificacao = classificarIMC(imc, genero);

  resultado.innerHTML = `
    <strong>IMC:</strong> ${imc.toFixed(2)}<br>
    <strong>Classificação:</strong> ${classificacao.categoria}<br>
    <strong>Faixa ideal:</strong> ${classificacao.faixa}
  `;
}

document.getElementById("IMC").addEventListener("click", () => {
  document.getElementById("card").innerHTML = `
    <h2>Cálculo de IMC</h2>
    <p class="cotacao-info">Índice de Massa Corporal por Gênero</p>
    <div class="conversor-form">
      <select id="genero">
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
      </select>
      <input type="number" id="peso" placeholder="Peso (kg)" min="1" />
      <input type="number" id="altura" placeholder="Altura (cm)" min="1" />
      <button onclick="calcularIMC()">Calcular</button>
      <p id="resultado"></p>
    </div>
  `;
});

document.querySelectorAll(".Menu button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id !== "Moedas" && btn.id !== "IMC") {
      document.getElementById("card").innerHTML = `
        <h2>Em breve</h2>
        <p>Esperem as próximas atualizações</p>
      `;
    }
  });
});
