// Módosítsd a Storage nevű modul 3. feladatát úgy, hogy amennyiben a kérés során 
// bármilyen hiba van, szintén a localStorage-ból olvassa ki az adatokat a program!
// Ilyenkor jeleníts meg egy üzenetet, hogy az alkalmazás offline!
// Amennyiben a localStorage is üres, jelents meg egy szabadon választott hibaüzenetet, 
// és alapértelmezetten 5 másodpercenként ismételd meg a kérést összesen 10 alkalommal! 
// Ez a két érték paraméterként megadható legyen! Ha a 10-ből bármelyik alakalommal 
// sikeres a kérés, akkor aszerint járj el (kiíratás, tárolás stb.).

'use strict';

const sourceURL = 'http://localhost:3000/keyValuePairs';
const targetDiv = document.querySelector('#container');
const repeatNum = 10;
const timeInterval = 5; // in seconds

const fromArrayToDiv = function (div, arr) {
    div.innerHTML = `<div>\n${arr.map((item, idx) => `<p>${item.firstName} ${item.lastName}</p>\n`).join('')}</div>`;
}

const readFromStorage = () => {
    let users = null;
    let result = localStorage.getItem('users');
    if (result) {
        try {
            users = JSON.parse(result);
        }
        catch (err) {
            alert('Parse-olási hiba történt')
        }
    } else alert('A localStorage üres')
    return users;
}

const readFromDB = async function () {
    let users = null;
    console.log('start');
    try {
        let result = await fetch("http://localhost:3000/keyValuePairs");
        if (result.status > 399) {
            // console.log('result: ', result);
            throw new Error('Az alkalmazás offline!');
        }
        // console.log('result: ', result);
        users = await result.json();
        // console.log('users: ', users);
    } catch (err) {
        alert(err);
    }
    finally {
        // console.log('users: ', users);
        console.log('end');
        return users;
    }
};

const start = async (targetDiv, repeatNum = 10, timeInterval = 5) => {
    for (let i = 0; i < repeatNum; i++) {
        let users = await readFromDB();
        if (!users) {
            users = readFromStorage();
            console.log('users from storage: ', users)
        }
        if (users) {
            console.log('users: ', users);
            const storageItem = JSON.stringify(users);
            console.log('storageItem: ', storageItem);
            localStorage.setItem('users', storageItem);
            fromArrayToDiv(targetDiv, users);
            break;
        } else {
            const to = setTimeout(() => clearTimeout(to), timeInterval * 1000)
        };
    }
}
