const btnMoedas = document.getElementById('Moedas');
const Menu = document.getElementById('Menu')
const url = `https://economia.awesomeapi.com.br/json/last/USD-BRL`
const elemento = {
    main: document.querySelector("main"),
    button: document.querySelectorAll('button')
};

console.log(elemento.main);

elemento.main.addEventListener("click", (e)=> {
    e.preventDefault();
    console.log(e.target.id);
    displaycController(e.target.id)
});

function displaycController(id){
    elemento.main.forEach(button=>{
        // verifica se a classe "hidden" já existe no button, se não existir adiciona 
        if(!button.classList.contains("hidden")){
            button.classList.add("hidden");
        }
        //remove a classe "hidden" do item clicado
        if(button.classList.contains(id)){
            button.classList.remove("hidden");
        }
    })
}
