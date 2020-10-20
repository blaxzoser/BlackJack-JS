/**
 * 2C = two of clubs
 * 2D = two of diamons
 * 2H = two of hears
 * 2S = two of spades
 */

//The Module Pattern
const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugardores = [];

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevoJuego = document.querySelector('#btnNuevo');


    const divCartasJugadores = document.querySelectorAll(".divCartas"),
        puntosHtml = document.querySelectorAll('small');



    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugardores = [];


        for (let index = 0; index < numJugadores; index++) {
            puntosJugardores.push(0);
        }

        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }

    const crearDeck = () => {
        deck = [];
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

        return _.shuffle(deck);
    }


    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay Cartas';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;
    }

    const acumularPuntos = (carta, turno) => {
        puntosJugardores[turno] = puntosJugardores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugardores[turno];
        return puntosJugardores[turno];

    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugardores;

        setTimeout(() => {
            if (puntosComputadora == puntosMinimos) {
                alert('Nadie gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 100);

    }


    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugardores.length - 1);
            crearCarta(carta, puntosJugardores.length - 1);
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }


    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugardor = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

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

        turnoComputadora(puntosJugardores[0]);

    });


    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };
})();