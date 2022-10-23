class pokemon {
    contructor(name) {
        this.name = name;
        this.moves = [];
    }


    addMove(name, pp) {
        this.moves.push(new Move(name, pp));
    }
    
}

class move {
    contructor(name, pp) {
    this.name = name;
    this.pp = pp;
    }
}

class PokeService {
    static url = 'https://635028c778563c1d82bafe17.mockapi.io/pokemon';

    static getAllPokemons() {
        return $.get(this.url);
    }


static getPokemon(id) {
    return $.get(this.url + `/${id}`);
}

static createPokemon(pokemon) {
    return $.post(this.url, pokemon);
}


static updatePokemon(pokemon) {
    return $.ajax({
        url: this.url + `/${pokemon._id}`,
        dataType: 'json',
        data: JSON.stringify(pokemon),
        contentType: 'application/json',
        type: 'PUT'
    });
}

    static deletePokemon(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }

}

class DOMManager {
    static pokemon;

    static getAllPokemons() {
        PokeService.getAllPokemons().then(pokemon => this.render(pokemon));
    }

    static deletePokemon(id) {
        PokeService.deletePokemon(id)
        .then(() => {
            return PokeService.getAllPokemons();
               })
               .then((pokemons) => this.render(pokemons));
    }

    static render(pokemons) {
        this.pokemons = pokemons;
        $('#app').empty();
        for (let pokemon of pokemons) {
            $('#app').prepend(
               `<div id="${pokemon._id}" class="card">
                  <div class="card-header">
                    <h2>${pokemon.name}</h2>
                    <button class="btn btn-danger" onclick="DOMManager.deletePokemon('${pokemon._id}')">Delete</button>
                </div>
                <div class="card-body">
                    <div class="card">
                    <div class="row">
                    <div class="col-sm">
                        <input type="text" id="${pokemon._id}-add-move" class ="form-control" Placeholder ="Move Name">
                </div>
                <div class="col-sm">
                <input type="text" id="${pokemon._id}-move-pp" class ="form-control" Placeholder ="Move pp">
                </div>
                </div>
                <button id="${pokemon._id}-new-move" onclick="DOMManger.addMove('${pokemon._id}')" class="btn btn-primary form=control">Add</button>
                </div>
                </div> 
               </div><br> `
            );
            for (let move of pokemon.move) {
                $(`#${pokemon._id}`).find('.card-body').append(
                    `<p>
                    <span id="name-${move._id}"><strong>Name: </strong> ${move.name}</span>
                    <span id="pp-${move._id}"><strong>pp: </strong> ${move.pp}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deleteMove('${pokemon._id}', '${move._id}')">Delete Move</button>
                    `
                    );
                }
            }
        }
    }

DOMManager.getAllPokemons();
//                     
