/******************************************************************************
 * Objetivo: Manipular dados de uma lista de Pokémon utilizando API
 * Data: 28/10/2024
 * Autor: Gabriel Ramos
 * Versão: 1.0
 ******************************************************************************/

let allPokemonData = []; // Armazena os Pokémon carregados para exibir na página atual
let currentPage = 1;     // Página atual
const limit = 40;        // Quantidade de Pokémon por página


const clearPokemonCards = () => {
    document.getElementById('cardPokemon').innerHTML = '';
}

const tipoTraduzido = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Grama",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Veneno",
    ground: "Terra",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Noturno",
    steel: "Aço",
    fairy: "Fada"
};

function primeiraLetraMaiuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

const setCreatePokemonCard = (dadosPokemon) => {
    let divCardPokemon = document.getElementById('cardPokemon');

    let divCaixaProduto = document.createElement('div');
    let h2CaixaTitulo = document.createElement('h2');
    let figureCaixaImagem = document.createElement('figure');
    let img = document.createElement('img');
    let pCaixaTexto = document.createElement('p');
    let divTipoPokemon = document.createElement('div');
    let divComprar = document.createElement('div');
    let textoTitulo = document.createTextNode(primeiraLetraMaiuscula(dadosPokemon.name));
    let textoParagrafo = document.createTextNode(`ID: ${dadosPokemon.id}`);
    let textoComprar = document.createTextNode('Comprar');




    let tipos = dadosPokemon.types
    .map((tipo) => tipoTraduzido[tipo.type.name] || tipo.type.name).join(", ");
    let textoTipo = document.createTextNode(`Tipo: ${tipos}`);

    divCaixaProduto.setAttribute('class', 'caixa_produto');
    h2CaixaTitulo.setAttribute('class', 'caixa_titulo');
    figureCaixaImagem.setAttribute('class', 'caixa_imagem');
    divCaixaProduto.setAttribute('class', 'caixa_produto');
    divTipoPokemon.setAttribute('class', 'caixa_tipo');


    img.setAttribute('src', dadosPokemon.sprites.versions['generation-v']['black-white']['animated'].front_default || dadosPokemon.sprites.front_default);
    img.setAttribute('alt', dadosPokemon.name);
    img.setAttribute('title', dadosPokemon.name);
    pCaixaTexto.setAttribute('class', 'caixa_texto');
    divComprar.setAttribute('class', 'comprar');


    h2CaixaTitulo.appendChild(textoTitulo);
    pCaixaTexto.appendChild(textoParagrafo);
    divComprar.appendChild(textoComprar);
    figureCaixaImagem.appendChild(img);
    divCaixaProduto.appendChild(h2CaixaTitulo);
    divCaixaProduto.appendChild(figureCaixaImagem);
    divCaixaProduto.appendChild(pCaixaTexto);
    divCaixaProduto.appendChild(divComprar);
    divTipoPokemon.appendChild(textoTipo);
    divCaixaProduto.appendChild(divTipoPokemon);
    divCardPokemon.appendChild(divCaixaProduto);
    divCardPokemon.appendChild(divCaixaProduto);
}


const getDadosPokemonAPI = async (page) => {
    clearPokemonCards();
    allPokemonData = []; 
    const offset = (page - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        
        for (let item of data.results) {
            let pokemonResponse = await fetch(item.url);
            let pokemonData = await pokemonResponse.json();
            allPokemonData.push(pokemonData); 

        
            setCreatePokemonCard(pokemonData);
        }
    } catch (error) {
        console.error("Erro ao buscar lista de Pokémon:", error);
    }
};


const searchPokemon = async () => {
    let query = document.getElementById('inputPesquisa').value.toLowerCase();
    if (query) {
        clearPokemonCards();
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
            let response = await fetch(url);
            
           
            if (response.ok) {
                let pokemonData = await response.json();
                setCreatePokemonCard(pokemonData); 
            } else {
                alert("Pokémon não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao buscar Pokémon:", error);
            alert("Erro ao buscar Pokémon. Tente novamente.");
        }
    } else {
        alert("Digite o nome de um Pokémon para pesquisar.");
    }
}


const resetSearch = () => {
    document.getElementById('inputPesquisa').value = '';
    clearPokemonCards();
    getDadosPokemonAPI(currentPage); 
}

document.getElementById('btnPesquisa').addEventListener('click', searchPokemon);
document.getElementById('btnLimpar').addEventListener('click', resetSearch);


const nextPage = () => {
    currentPage++;
    getDadosPokemonAPI(currentPage);
};

const previousPage = () => {
    if (currentPage > 1) {
        currentPage--;
        getDadosPokemonAPI(currentPage);
    }
};


document.getElementById('btnPesquisa').addEventListener('click', searchPokemon);
document.getElementById('btnLimpar').addEventListener('click', resetSearch);
document.getElementById('btnNext').addEventListener('click', nextPage);
document.getElementById('btnPrev').addEventListener('click', previousPage);

window.addEventListener('load', () => getDadosPokemonAPI(currentPage));
