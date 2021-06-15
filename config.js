"use strict";

const brokenHardware = {
    keywords: [
        'rikki',
        'hajonnut',
        'ei toimi',
        'toimi',
        'kaput',
        'hajalla',
    ],
    message: 'Minkä laitteen kanssa olisi ongelmia?',
    responses: [
        {
            keywords: [
                'kone',
                'kannettava',
                'tietokone',
                'puhelin',
            ],
            message: 'Seuraa alla olevia vaiheita mahdollisimman tarkasti:\n(1): Koita käynnistää laite uudestaan\n(2): ...',
        },
        {
            keywords: [
                'wifi',
                'verkko',
            ],
            message: 'Seuraa alla olevia vaiheita järjestyksessä:\n(1): Koita käynnistää laite uudestaan\n(2): Yhdistä verkkoon päätelaitteelta uudestaan\n(3): Ota yhteyttä huoltoon',
        },
    ]
};

const brokenSoftware = {
    keywords: [
        'jäätynyt',
        'jäätyi',
        'ei aukea',
    ],
    message: '',
    responses: [
        {
            keywords: [
                'kone',
                'kannettava',
                'tietokone',
                'puhelin',
            ],
            message: 'Koita sammuttaa laite uudestaan. Jos laite on niin jumissa että tätä ei pysty tekemään, voit pahimmassa tapauksessa sammuttaa sen ottamalla siitä virtalähteen irti.',
        },
        {
            keywords: [
                'wifi',
                'verkko',
            ],
            message: 'Suorita alla olevat vaiheet järjestyksessä:\n(1): Koita käynnistää laite uudestaan\n(2): Yhdistä verkkoon päätelaitteelta uudestaan\n(3): Ota yhteyttä huoltoon',
        },
    ]
};

const loginProblems = {
    keywords: [
        'kirjautua',
        'kirjautuminen',
        'salasana',
    ],
    message: 'Mihin palveluun et pysty kirjautumaan?',
    responses: [
        {
            keywords: [
                'windows',
                'kone',
                'käyttäjätili',
            ],
            message: 'Voit ottaa yhteyttä tekniseen tukeen lähettämällä sähköpostia osoitteeseen help@example.com',
        },
        {
            keywords: [
                'wifi',
                'verkko',
                'verkkoon',
            ],
            message: 'Verkon salasana löytyy jokaisen reitittimen vierestä. Jos et silti kykene kirjautumaan verkkoon, voit ottaa yhteyttä tekniseen tukeen lähettämällä sähköpostia osoitteeseen help@example.com',
        },
    ]
};

export const configuration = {
    errorMessage: 'Sori, mutta en nyt ymmärtänyt mitä sanoit.',
    message: 'Hei, kuinka voin auttaa? Olen vielä työn alla, jotenka koita pitää viestit yksinkertaisina.',
    responses: [
        brokenHardware,
        brokenSoftware,
        loginProblems,
    ],
};
