async function apiFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      const data = await response.json();
      console.log(data)
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getPokemon(url, offset) {
  const data = await apiFetch(url);
  const next = document.getElementById("next");
  next.onclick = () => {
    if (offset > data.count) {
      return;
    } else {
      renderPokemonList(data.next);
    }
  };
  const prev = document.getElementById("prev");
  prev.onclick = () => {
    if(offset == 0) {
      return;
    } else {
      renderPokemonList(data.previous);
    }
  };
  const pokemon = data.results.map((data, index) => ({
    name: data.name,
    id: index + parseInt(offset) + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
      index + parseInt(offset) + 1
    }.png`,
  }));
  return pokemon;
}

async function renderPokemonList(url) {
  const pokemonList = document.getElementById("pokemonlist");
  const offset = new URL(url).searchParams
      .toString()
      .split("&")
      .reduce((previous, current) => {
        const [key, value] = current.split("=");
        previous[key] = value;
        return previous;
      }, {});
  const pokeList = await getPokemon(url, offset.offset);
  pokemonList.innerHTML = "";
  pokeList.forEach(function (pokeman) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <div class="circle"></div>
        <div class="circletwo"></div>
        <div class="circlethree"></div>
        <div class="line"></div>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    </li>
    `;
    pokemonList.appendChild(listItem);
  });
}

async function renderOnePokemon(url) {
  
}

renderPokemonList("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=21");
