/******************************************************************************
 * Objetivo: Manipular dados de uma lista de Pokémon utilizando API
 * Data: 28/10/2024
 * Autor: Gabriel Ramos
 * Versão: 1.0
 ******************************************************************************/

let allPokemonData = [];  // Armazena todos os Pokémon carregados para uso em pesquisa

// Função para limpar os cards de Pokémon
const clearPokemonCards = () => {
    document.getElementById('cardPokemon').innerHTML = '';
}

// Função para criar um card para um Pokémon específico
const setCreatePokemonCard = (dadosPokemon) => {
    let divCardPokemon = document.getElementById('cardPokemon');

    let divCaixaProduto = document.createElement('div');
    let h2CaixaTitulo = document.createElement('h2');
    let figureCaixaImagem = document.createElement('figure');
    let img = document.createElement('img');
    let pCaixaTexto = document.createElement('p');
    let divComprar = document.createElement('div');

    let textoTitulo = document.createTextNode(dadosPokemon.name);
    let textoParagrafo = document.createTextNode(`ID: ${dadosPokemon.id}`);
    let textoComprar = document.createTextNode('Comprar');

    divCaixaProduto.setAttribute('class', 'caixa_produto');
    h2CaixaTitulo.setAttribute('class', 'caixa_titulo');
    figureCaixaImagem.setAttribute('class', 'caixa_imagem');

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

    divCardPokemon.appendChild(divCaixaProduto);
}

// Função para carregar todos os Pokémon da API e exibir na página
const getDadosPokemonAPI = async () => {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=10000'; // Busca todos os Pokémon de uma vez porém com um limite de 10000
    try {
        let response = await fetch(url);
        let data = await response.json();

        // Para cada Pokémon, busca os dados detalhados e armazena em allPokemonData
        for (let item of data.results) {
            let pokemonResponse = await fetch(item.url);
            let pokemonData = await pokemonResponse.json();
            allPokemonData.push(pokemonData); // Armazena cada Pokémon

            // Exibe o Pokémon na página
            setCreatePokemonCard(pokemonData);
        }
    } catch (error) {
        console.error("Erro ao buscar lista de Pokémon:", error);
    }
};

// Função para buscar um Pokémon na lista carregada localmente
const searchPokemon = () => {
    let query = document.getElementById('inputPesquisa').value.toLowerCase();
    if (query) {
        clearPokemonCards();
        let filteredPokemon = allPokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(query));
        
        if (filteredPokemon.length) {
            filteredPokemon.forEach(pokemon => setCreatePokemonCard(pokemon));
        } else {
            alert("Pokémon não encontrado!");
        }
    } else {
        alert("Digite o nome de um Pokémon para pesquisar.");
    }
}

// Função para limpar a pesquisa e exibir todos os Pokémon novamente
const resetSearch = () => {
    document.getElementById('inputPesquisa').value = '';
    clearPokemonCards();
    allPokemonData.forEach(pokemon => setCreatePokemonCard(pokemon));
}

// Eventos para o botão de pesquisa e o botão de limpar
document.getElementById('btnPesquisa').addEventListener('click', searchPokemon);
document.getElementById('btnLimpar').addEventListener('click', resetSearch);

// Carrega todos os Pokémon ao abrir a página
window.addEventListener('load', getDadosPokemonAPI);
