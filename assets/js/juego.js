/**
 * 2C = two of clubs
 * 2D = two of diamons
 * 2H = two of hears
 * 2S = two of spades
 */

//The Module Pattern
(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnNuevo');


    const puntosHtml = document.querySelectorAll('small');

    const divCartasJugador = document.querySelector("#jugador-cartas");
    const divCartasComputadoras = document.querySelector("#computadora-cartas");

    let puntosJugardor = 0,
        puntosComputadora = 0;


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
        return deck;
    }

    crearDeck();

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay Cartas';
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

    const turnoComputadora = (puntosMinimos) => {
        do {

            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadoras.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora == puntosMinimos) {
                alert('Nadie gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosJugardor > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 100);
    }


    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        puntosJugardor = puntosJugardor + valorCarta(carta);
        puntosHtml[0].innerText = puntosJugardor;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if (puntosJugardor > 21) {
            console.warn('Lo siento mucho,perdiste');
            btnDetener.disabled = true;
            btnPedir.disabled = true;

            turnoComputadora(puntosJugardor);
        } else if (puntosJugardor === 21) {
            console.warn('21,winner');
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora(puntosJugardor);
        }

    });


    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;

        turnoComputadora(puntosJugardor);

    });


    btnNuevoJuego.addEventListener('click', () => {
        btnDetener.disabled = false;
        btnPedir.disabled = false;

        deck = [];
        deck = crearDeck();
        puntosJugardor = 0;
        puntosComputadora = 0;
        puntosMinimos = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        divCartasComputadoras.innerHTML = '';
        divCartasJugador.innerHTML = '';
    });
})();