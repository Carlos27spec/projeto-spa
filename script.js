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

    <select id="genero" onchange="limparCamposIMC()">
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

function limparCamposIMC() {
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("resultadoIMC").innerHTML = "";
}

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

// Conversor de Temperatura OK!
document.getElementById("Temp").addEventListener("click", () => {
  const card = document.getElementById("card");

  card.innerHTML = `
    <h2>Conversor de Temperatura</h2>

    <select id="temperatura" onchange="limparTemp()">
      <option value="">Defina a temperatura</option>
      <option value="C">Celsius → Fahrenheit</option>
      <option value="F">Fahrenheit → Celsius</option>
    </select>

    <div>
      <input type="number" id="C" placeholder="Digite a temperatura" />
      <button onclick="Converter()">Calcular</button>
      <p id="Temperaturaf"></p>
    </div>
  `;
});

function limparTemp() {
  document.getElementById("C").value = "";
  document.getElementById("Temperaturaf").innerHTML = "";
}

function Converter() {
  const valorInput = parseFloat(document.getElementById("C").value);
  const tipo = document.getElementById("temperatura").value;
  const resultado = document.getElementById("Temperaturaf");

  if (!tipo) {
    resultado.innerHTML = "Selecione o tipo de temperatura!";
    return;
  }

  if (isNaN(valorInput)) {
    resultado.innerHTML = "Digite um valor válido!";
    return;
  }

  let convertido, label;

  if (tipo === "C") {
    convertido = valorInput * 1.8 + 32;
    label = `${valorInput}°C = <strong>${convertido.toFixed(1)}°F</strong>`;
  } else {
    convertido = (valorInput - 32) / 1.8;
    label = `${valorInput}°F = <strong>${convertido.toFixed(1)}°C</strong>`;
  }

  resultado.innerHTML = label;
}

//Velocidade OK!
document.getElementById("Velo").addEventListener("click", () => {
  const card = document.getElementById("card");

  card.innerHTML = `
    <h2>Velocímetro</h2>
    <p>Conversão entre <strong>Km/h</strong> ↔ <strong>Milhas/h</strong></p>
    <p>Fator: 1 km/h = 0.621371 mph</p>

    <select id="direcaoVelo" onchange="limparVelo()">
      <option value="km-mph">Km/h → Milhas/h</option>
      <option value="mph-km">Milhas/h → Km/h</option>
    </select>

    <div>
      <input type="number" id="valorVelo" placeholder="Digite o valor" />
      <button onclick="converterVelo()">Converter</button>
      <p id="resultadoVelo"></p>
    </div>
  `;
  50;
});

function limparVelo() {
  document.getElementById("valorVelo").value = "";
  document.getElementById("resultadoVelo").innerHTML = "";
}

function converterVelo() {
  const valor = parseFloat(document.getElementById("valorVelo").value);
  const dir = document.getElementById("direcaoVelo").value;
  const resultado = document.getElementById("resultadoVelo");

  if (isNaN(valor) || valor < 0) {
    resultado.innerHTML = "Digite um valor válido!";
    return;
  }

  let convertido, label;

  if (dir === "km-mph") {
    convertido = valor * 0.621371;
    label = `${valor} km/h = <strong>${convertido.toFixed(2)} mph</strong>`;
  } else {
    convertido = valor / 0.621371;
    label = `${valor} mph = <strong>${convertido.toFixed(2)} km/h</strong>`;
  }

  resultado.innerHTML = label;
}

//Massa OK!
document.getElementById("MS").addEventListener("click", () => {
  const card = document.getElementById("card");

  card.innerHTML = `
    <h2>Balança</h2>
    <p>Conversão entre <strong>Quilogramas</strong> ↔ <strong50>Libras</strong></p>
    <p>Fator: 1 kg = 2.20462 lbs</p>

    <select id="direcaoQM" onchange="limparQM()">
      <option value="Quilogramas">Quilogramas → Libras</option>
      <option value="Libras">Libras → Quilogramas</option>
    </select>

    <div>
      <input type="number" id="valorQM" placeholder="Digite o valor" />
      <button onclick="converterQM()">Converter</button>
      <p id="resultadoQM"></p>
    </div>
  `;
});

function limparQM() {
  document.getElementById("valorQM").value = "";
  document.getElementById("resultadoQM").innerHTML = "";
}

function converterQM() {
  const valor = parseFloat(document.getElementById("valorQM").value);
  const dir = document.getElementById("direcaoQM").value;
  const resultado = document.getElementById("resultadoQM");

  if (isNaN(valor) || valor < 0) {
    resultado.innerHTML = "Digite um valor válido!";
    return;
  }

  let label;

  if (dir === "Quilogramas") {
    const convertido = valor * 2.20462;
    label = `${valor} kg = <strong>${convertido.toFixed(2)} lbs</strong>`;
  } else {
    const convertido = valor / 2.20462;
    label = `${valor} lbs = <strong>${convertido.toFixed(2)} kg</strong>`;
  }

  resultado.innerHTML = label;
}

// Regra de Três OK!
document.getElementById("Tres").addEventListener("click", () => {
  const card = document.getElementById("card");

  card.innerHTML = `
    <h2>Regra de Três</h2>
    <p>Se <strong>A</strong> está para <strong>B</strong>, quanto <strong>C</strong> está para <strong>X</strong>?</p>

    <div class="regra-grid">
      <input type="number" id="valorA" placeholder="A" />
      <input type="number" id="valorB" placeholder="B" />
      <input type="number" id="valorC" placeholder="C" />
      <input type="text"   id="valorX" placeholder="X" disabled />
      <button onclick="calcularRegraDeTres()">Calcular</button>
    </div>

    <p id="resultadoTres"></p>
  `;
});

function calcularRegraDeTres() {
  const a = parseFloat(document.getElementById("valorA").value);
  const b = parseFloat(document.getElementById("valorB").value);
  const c = parseFloat(document.getElementById("valorC").value);
  const campoX = document.getElementById("valorX");
  const resultado = document.getElementById("resultadoTres");

  if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
    resultado.innerHTML = "⚠️ Preencha todos os campos corretamente!";
    campoX.value = "";
    return;
  }

  const x = (b * c) / a;

  const xFormatado = Number.isInteger(x) ? x : x.toFixed(2);

  campoX.value = xFormatado;

  resultado.innerHTML = `
    <strong>${a}</strong> → <strong>${b}</strong><br>
    <strong>${c}</strong> → <strong>${xFormatado}</strong>
  `;
}
document.querySelectorAll(".Menu button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (
      btn.id !== "Moedas" &&
      btn.id !== "IMC" &&
      btn.id !== "Temp" &&
      btn.id !== "Velo" &&
      btn.id !== "MS" &&
      btn.id !== "Tres"
    ) {
      document.getElementById("card").innerHTML = `
        <h2>Em breve</h2>
        <p>Esperem as próximas atualizações</p>
      `;
    }
  });
});
//O kaue passou aqui!
