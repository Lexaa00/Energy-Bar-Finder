'use strict';

import axios from 'axios';

/*
  Junior style: jednostavno i čitko, sa puno any tipova i klasičnim for petljama.
  Vrati "brand:type" za čokoladu sa najviše energije po gramu iz zadate zemlje.
*/
async function energyBar(country: string): Promise<string> {
    if (!country) return 'NONE';
    const q = encodeURIComponent(country.trim());
    const baseUrl = 'https://jsonmock.hackerrank.com/api/chocolates?countryOfOrigin=' + q;

    try {
        // prvo prvo: uzmi prvu stranicu da znaš koliko ukupno ima stranica
        const firstResp: any = await axios.get(baseUrl);
        const totalPages: number = (firstResp && firstResp.data && typeof firstResp.data.total_pages === 'number')
            ? firstResp.data.total_pages
            : 1;

        // skupimo sve stavke
        const all: any[] = [];
        if (firstResp && firstResp.data && Array.isArray(firstResp.data.data)) {
            for (let i = 0; i < firstResp.data.data.length; i++) {
                all.push(firstResp.data.data[i]);
            }
        }

        // dohvaćamo ostale stranice sekvencijalno
        for (let p = 2; p <= totalPages; p++) {
            const url = baseUrl + '&page=' + p;
            const resp: any = await axios.get(url);
            if (resp && resp.data && Array.isArray(resp.data.data)) {
                for (let j = 0; j < resp.data.data.length; j++) {
                    all.push(resp.data.data[j]);
                }
            }
        }

        if (all.length === 0) return 'NONE';

        // najbolji kandidat
        let best: string | null = null;
        let bestEnergy: number = -Infinity;
        let bestAvgPrice: number = Infinity;

        // iteriraj kroz sve čokolade
        for (let k = 0; k < all.length; k++) {
            const it: any = all[k];

            let kcal: number | null = null;
            if (it && it.nutritionalInformation && typeof it.nutritionalInformation.kcal === 'number') {
                kcal = it.nutritionalInformation.kcal;
            }

            let weights: number[] = [];
            if (Array.isArray(it.weights)) {
                for (let w = 0; w < it.weights.length; w++) {
                    if (typeof it.weights[w] === 'number') {
                        weights.push(it.weights[w]);
                    }
                }
            }

            let prices: number[] = [];
            if (Array.isArray(it.prices)) {
                for (let pp = 0; pp < it.prices.length; pp++) {
                    if (typeof it.prices[pp] === 'number') {
                        prices.push(it.prices[pp]);
                    }
                }
            }

            if (kcal === null || weights.length === 0) continue;

            // prosječna težina
            const avgW = Math.floor(weights.reduce((a, b) => a + b, 0) / weights.length);
            const energy = Math.floor(kcal * 0.01 * avgW);

            // prosječna cijena
            let avgPrice = prices.length > 0 ? Math.floor(prices.reduce((a, b) => a + b, 0) / prices.length) : Infinity;

            const brand = it.brand ? it.brand : '';
            const type = it.type ? it.type : '';
            const candidate = brand + ':' + type;

            if (energy > bestEnergy || (energy === bestEnergy && avgPrice < bestAvgPrice)) {
                bestEnergy = energy;
                bestAvgPrice = avgPrice;
                best = candidate;
            }
        }

        return best ? best : 'NONE';

    } catch (e) {
        return 'NONE';
    }
}

async function main() {
    // Uzima argument iz terminala ili default 'USA'
    const country = process.argv[2] || 'USA';

    // Pokreće funkciju za izračunavanje
    const ans: string = await energyBar(country);

    // Ispis u konzolu
    console.log(ans);
}

// Pozivanje main funkcije
main();
