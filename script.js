const btnMoedas = document.getElementById("Moedas");
const Menu = document.getElementById("Menu");
const url = `https://economia.awesomeapi.com.br/json/last/USD-BRL`;
const toggleBtn = document.getElementById("isDark");

//Moedas OK!
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
    const convertido = (valor * cotacao).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    resultado.textContent = convertido;
  } else {
    const convertido = (valor / cotacao).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    resultado.textContent = convertido;
  }
}

//Calcular IMC OK!

document.getElementById("IMC").addEventListener("click", () => {
  const card = document.getElementById("card");

  card.innerHTML = `
    <h2>Calculo de IMC</h2>

      <select id="genero">
        <option value="">Selecione o gênero</option>
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </select>

    <div>
      <input type="number" id="peso" placeholder="Peso (kg)" />
      <input type="number" id="altura" placeholder="Altura (cm) — ex: 175" />

      <button onclick="calcularIMC()">Calcular</button>
      <p id="resultadoIMC"></p>
    </div>
  `;
});

function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const alturaInput = parseFloat(document.getElementById("altura").value);
  const genero = document.getElementById("genero").value;

  // Detecta automaticamente se foi digitado em cm (ex: 175) ou metros (ex: 1.75)
  const altura = alturaInput > 3 ? alturaInput / 100 : alturaInput;

  if (!peso || !alturaInput || alturaInput === 0 || !genero) {
    document.getElementById("resultadoIMC").innerHTML =
      "Preencha todos os campos corretamente!";
    return;
  }

  const imc = peso / (altura * altura);

  let classificacao;

  if (genero === "M") {
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 25.0) classificacao = "Normal";
    else if (imc < 30.0) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";
  } else {
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 24.0) classificacao = "Normal";
    else if (imc < 29.0) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";
  }

  document.getElementById("resultadoIMC").innerHTML = `
    IMC: <strong>${imc.toFixed(2)}</strong> — ${classificacao}
  `;
}

document.getElementById("Temp").addEventListener("click", () => {
  const card = document.getElementById("card");

  card.innerHTML = `
    <h2>Converso de Temperatura</h2>

      <select id="temperatura">
        <option value="">Defina a temperatura</option>
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
      </select>

    <div>
      <input type="number" id="C" placeholder="Temperatura" />

      <button onclick="Converter()">Calcular</button>
      <p id="Temperaturaf"></p>
    </div>
  `;
});

document.querySelectorAll(".Menu button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id !== "Moedas" && btn.id !== "IMC" && btn.id !== "Temp") {
      document.getElementById("card").innerHTML = `
        <h2>Em breve</h2>
        <p>Esperem as próximas atualizações</p>
      `;
    }
  });
});
