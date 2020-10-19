/**
 * 2C = two of clubs
 * 2D = two of diamons
 * 2H = two of hears
 * 2S = two of spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

const crearDeck = () => {
    for (let index = 2; index <= 10; index++) {
        for (let tipo of tipos) {
            deck.push(index + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay Cartas';
        console.log("No hay cartar en el deck");
    }
    let carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1;
}



const valor = valorCarta(pedirCarta());
console.log({ valor });