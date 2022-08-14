'use strict'

function saveToStorage(key, value) {
    const str = JSON.stringify(value)
    localStorage.setItem(key, str)
}

function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    // return str
    return JSON.parse(str)
}

