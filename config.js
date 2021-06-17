"use strict";

// Separated into different objects for easier translation
const strings = {
    // Root
    rootMsg: 'Hei, olen RNA™ liittymäavustaja. Voit kysellä minulta sekä puhelinliittymistä että talojen liittymistä, mutta koita pitää kysymyksesi yksinkertaisina, sillä olen vielä työn alla :)',
    rootErr: 'Sori, mutta en ymmärtänyt mitä tarkoitit. Voit Voit kysellä minulta sekä puhelinliittymistä että talojen liittymistä, mutta koita pitää kysymyksesi yksinkertaisina, sillä olen vielä työn alla :)',

    // 1st children
    phoneMsg: 'RNA™:llä on tarjolla useita eri liittymiä, joista voitte valita teille parhaiten sopivan. Kiinnostaako teitä LTE- tai prepaidliittymä, vai haluatteko ennemmin miniliittymän vain puheluita varten?',
    phoneErr: 'Sori, mutta en nyt oikein ymmärtänyt mitä tarkoitit. Voit kysellä LTE, prepaid ja miniliittymistä.',
    houseMsg: 'RNA™:llä on tarjolla useita eri vaihtoehtoja talojen verkoille. Voitte tarkistaa talollenne sopivimman verkon osoitteesta example.com/taloliittymät. Haetteko liittymää omalle kodille vai mökille?',
    houseErr: 'Sori, mutta en nyt oikein ymmärtänyt mitä tarkoitit.',
    greetingsMsg: 'Hei! Kuinka voin auttaa?',

    // Second children
    phonePrepaidMsg: 'RNA™ prepaid liittymän avulla voit selailla verkkoa, jutella sekä viestitellä lähes rajattomasti hintaan 1€/pv. Siirry example.com/prepaid saadaksesi lisätietoa.',
    phoneLTEMsg: 'RNA™:n 4G verkko kattaa jopa 98% Suomen kansalaisista kun taas huippunopea 5G verkko kattaa jopa 45%. Verkkojen kattavuudet näet paremmin RNA™:n kattavuuskartasta osoitteessa example.com/kattavuus ja saat niistä lisätietoa osoitteessa example.com/LTE',
    phoneMiniMsg: 'RNA™:n miniliittymällä voit jutella ja viestitellä rauhassa pieneen kuukausihintaan. Liittymään kuuluu myös 3G verkko, mutta sen nopeus on huomattavasti pienempi kuin vastaavien LTE-liittymien. Lisätietoa löydät osoitteesta example.com/mini',
    houseCottageMsg: 'Suosittelemme mökeille RNA™:n 4G-verkkoa. Saatte jaettua tämän mobiiliverkon muihin päätelaittesiinne käyttämällä esimerkiksi RNA™:n 4G-reititintä.',
    houseNormalMsg: 'Suosittelemme joko RNA™:n 4G, 5G tai valokuituverkkoa kotinne. Saatte lisätietoa osoitteesta example.com/taloon',
};


const keywords = {
    greetings: [
        ['hei', 0.5],
        ['heips', 0.5],
        ['moi', 0.5],
    ],

    phone: [
        ['liittymä', 0.5],
        ['liittymät', 0.5],
        ['liittymän', 0.5],
        ['puhelinliittymä', 1],
        ['puhelinliittymän', 1],
        ['prepaid', 1],
        ['prepaidliittymä', 1],
        ['prepaidliittymät', 1],
        ['lte', 1],
        ['mini', 0.5],
        ['miniliittymä', 1],
        ['miniliittymän', 1],
    ],

    house: [
        ['koti', 1],
        ['kotiin', 1],
        ['kodille', 1],
        ['mökki', 1],
        ['mökkiin', 1],
        ['mökille', 1],
        ['talo', 1],
        ['taloon', 1],
        ['talolle', 1],
        ['asunto', 1],
        ['asuntoon', 1],
        ['asunnolle', 1],
    ],

    phonePrepaid: [
        ['prepaid', 1],
        ['prepaidliittymä', 1],
        ['prepaidliittymät', 1],
    ],

    phoneLTE: [
        ['lte', 1],
        ['3g', 1],
        ['4g', 1],
        ['5g', 1],
        ['verkko', 0.5],
        ['netti', 0.5],
    ],

    phoneMini: [
        ['puhelu', 0.5],
        ['tekstiviesti', 0.5],
        ['mini', 1],
        ['miniliittymä', 1],
    ],

    houseCottage: [
        ['mökki', 1],
        ['mökille', 1],
        ['ei', 0.5],
        ['nope', 0.5],
        ['en', 0.5],
    ],

    houseNormal: [
        ['joo', 0.5],
        ['kyllä', 0.5],
        ['juu', 0.5],
        ['koti', 1],
        ['kotiin', 1],
        ['kodille', 1],
    ],
};


const houseNormalState = {
    message: strings.houseNormalMsg,
    keywords: keywords.houseNormal,
};


const houseCottageState = {
    message: strings.houseCottageMsg,
    keywords: keywords.houseCottage,
};


const phoneMiniState = {
    message: strings.phoneMiniMsg,
    keywords: keywords.phoneMini,
};


const phonePrepaidState = {
    message: strings.phonePrepaidMsg,
    keywords: keywords.phonePrepaid,
};


const phoneLteState = {
    message: strings.phoneLTEMsg,
    keywords: keywords.phoneLTE,
};


const houseState = {
    message: strings.houseMsg,
    error: strings.houseErr,
    keywords: keywords.house,
    responses: [
        houseCottageState,
        houseNormalState,
    ],
};


const phoneState = {
    message: strings.phoneMsg,
    error: strings.phoneErr,
    keywords: keywords.phone,
    responses: [
        phoneLteState,
        phoneMiniState,
        phonePrepaidState,
    ],
};


const greetingsState = {
    message: strings.greetingsMsg,
    keywords: keywords.greetings,
};


export const configuration = {
    message: strings.rootMsg,
    error: strings.rootErr,
    responses: [
        phoneState,
        houseState,
        greetingsState,
    ],
};

//const brokenHardware = {
//    keywords: [
//        'rikki',
//        'hajonnut',
//        'ei toimi',
//        'toimi',
//        'kaput',
//        'hajalla',
//    ],
//    message: 'Minkä laitteen kanssa olisi ongelmia?',
//    responses: [
//        {
//            keywords: [
//                'kone',
//                'kannettava',
//                'tietokone',
//                'puhelin',
//            ],
//            message: 'Seuraa alla olevia vaiheita mahdollisimman tarkasti:\n(1): Koita käynnistää laite uudestaan\n(2): ...',
//        },
//        {
//            keywords: [
//                'wifi',
//                'verkko',
//            ],
//            message: 'Seuraa alla olevia vaiheita järjestyksessä:\n(1): Koita käynnistää laite uudestaan\n(2): Yhdistä verkkoon päätelaitteelta uudestaan\n(3): Ota yhteyttä huoltoon',
//        },
//    ]
//};
//
//const brokenSoftware = {
//    keywords: [
//        'jäätynyt',
//        'jäätyi',
//        'ei aukea',
//    ],
//    message: '',
//    responses: [
//        {
//            keywords: [
//                'kone',
//                'kannettava',
//                'tietokone',
//                'puhelin',
//            ],
//            message: 'Koita sammuttaa laite uudestaan. Jos laite on niin jumissa että tätä ei pysty tekemään, voit pahimmassa tapauksessa sammuttaa sen ottamalla siitä virtalähteen irti.',
//        },
//        {
//            keywords: [
//                'wifi',
//                'verkko',
//            ],
//            message: 'Suorita alla olevat vaiheet järjestyksessä:\n(1): Koita käynnistää laite uudestaan\n(2): Yhdistä verkkoon päätelaitteelta uudestaan\n(3): Ota yhteyttä huoltoon',
//        },
//    ]
//};
//
//const loginProblems = {
//    keywords: [
//        'kirjautua',
//        'kirjautuminen',
//        'salasana',
//    ],
//    message: 'Mihin palveluun et pysty kirjautumaan?',
//    responses: [
//        {
//            keywords: [
//                'windows',
//                'kone',
//                'käyttäjätili',
//            ],
//            message: 'Voit ottaa yhteyttä tekniseen tukeen lähettämällä sähköpostia osoitteeseen help@example.com',
//        },
//        {
//            keywords: [
//                'wifi',
//                'verkko',
//                'verkkoon',
//            ],
//            message: 'Verkon salasana löytyy jokaisen reitittimen vierestä. Jos et silti kykene kirjautumaan verkkoon, voit ottaa yhteyttä tekniseen tukeen lähettämällä sähköpostia osoitteeseen help@example.com',
//        },
//    ]
//};
