'use strict'

var gCurrLang = 'en'
var gTrans = {
    'home': {
        en: 'Home',
        he: 'דף הבית'
    },
    'gallery': {
        en: 'Gallery',
        he: 'גלריה',
    },
    'my-chart': {
        en: 'My-Chart',
        he: 'הדיאגרמות שלי',
    },
    'title': {
        en: 'Title',
        he: 'כותרת',
    },
    'label': {
        en: 'Label',
        he: 'שם',
    },
    'value': {
        en: 'Value',
        he: 'ערך',
    },
    'Title': {
        en: 'Title',
        he: 'כותרת',
    },
    'Search': {
        en: 'search',
        he: 'חיפוש',
    },
    'chart-generator': {
        en: 'Chart Generator',
        he: 'יוצר דיאגרמות'
    },
    'add-term': {
        en: '+ ADD TERM',
        he: 'הוסף מונח'
    },
    'theme': {
        en: 'THEME SELECTION',
        he: 'בחר תבנית'
    },
    'search-zone': {
        en: `Common search word \n sport ,politician, food , coins`,
        he: `מילות חיפוש נפוצות \n sport ,politician, food , coins`
    }
}

function setLang(lang) {
    gCurrLang = lang;
}

function getTrans(transKey) {

    var keyTrans = gTrans[transKey];
    if (!keyTrans) return "UNKNOWN";
    var txt = keyTrans[gCurrLang] // he
    if (!txt) txt = keyTrans.en


    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        // console.log(el)
        if (el.localName === "input") {
            el.setAttribute("placeholder", txt)
            // el.placeholder = txt
        } else el.innerText = txt
    })
}