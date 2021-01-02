// Módosítsd a Storage nevű modul 3. feladatát úgy, hogy amennyiben a kérés során 
// bármilyen hiba van, szintén a localStorage-ból olvassa ki az adatokat a program!
// Ilyenkor jeleníts meg egy üzenetet, hogy az alkalmazás offline!
// Amennyiben a localStorage is üres, jelents meg egy szabadon választott hibaüzenetet, 
// és alapértelmezetten 5 másodpercenként ismételd meg a kérést összesen 10 alkalommal! 
// Ez a két érték paraméterként megadható legyen! Ha a 10-ből bármelyik alakalommal 
// sikeres a kérés, akkor aszerint járj el (kiíratás, tárolás stb.).

'use strict';

const targetDiv = document.querySelector('#container');

let fetchInit = {
    method: "GET",
    headers: new Headers,
    mode: "cors",
    cache: "default"
};

const fromArrayToDiv = function (div, arr) {
    div.innerHTML = `<div>\n${arr.map((item, idx) => `<p>${item.firstName} ${item.lastName}</p>\n`).join('')}</div>`;
}

const readFromStorage = () => {
    try {
        let html = localStorage.getItem('users');
        if (html) {
            fromArrayToDiv(targetDiv, JSON.parse(html));
        }
    }
    catch (err) {
        console.log('a localStorage is üres vagy parsolási hiba történt');
        // console.error(err);
    }
}

const fillInDiv = function (div) {
    try {
        const result = fetch("http://localhost:3000/keyValuePairsa", fetchInit);
        result.then(data => data.json(),
            err => {
                console.log('fetch .then err ág');
                readFromStorage()
            }
        )
            .then(users => {
                const storageItem = JSON.stringify(users);
                localStorage.setItem('users', storageItem);
                fromArrayToDiv(targetDiv, users);
            })
            .catch((err) => {
                // console.log('fetch .catch ág');
                console.log('Az alkalmazás offline vagy hibás a host elérési útvonala');
                readFromStorage();
            })

    } catch (err) {
        console.log('try catch ág');
        console.error(err);
        // readFromStorage();
    }

}

const start = (targetDiv) => {
    try {
        fillInDiv(targetDiv);
    }
    catch (err) {
        console.log('try catch error ág');
        console.error(err);
    }
}

// const fillInDiv = function (div) {
//     fetch("http://localhost:3000/keyValuePairs", fetchInit).then(
//         data => data.json(),
//         err => console.error(err)
//     ).then(users => {
//         const storageItem = JSON.stringify(users);
//         localStorage.setItem('users', storageItem);
//         fromArrayToDiv(div, users);
//     }).catch(err => {
//         console.error(err);
//     });
// };

// const fillInDiv2 = function (div) {
//     let html = localStorage.getItem('users');
//     if (html) {
//         fromArrayToDiv(div, JSON.parse(html));
//     } else fillInDiv(div);
// }
