const URL_API = 'https://api.myquran.com/v1';
const headers = {'Content-Type': 'application/json'};

const URL_API_SHOLAT = `${URL_API}/sholat`;

export async function getAllLokasi() {
    const url = `${URL_API_SHOLAT}/kota/semua`;
    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    .then(_ => _.ok ? _.json() : null);

    return response;
}

export async function getLokasi(city) {
    const url = `${URL_API_SHOLAT}/kota/cari/${city}`;
    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    .then(_ => _.ok ? _.json() : null);

    return response;
}

export async function getJadwalSholat(city, date) {
    const lokasi = await getLokasi(city);
    const idLokasi = lokasi.data[0].id;
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const url = `${URL_API_SHOLAT}/jadwal/${idLokasi}/${year}/${month}/${day}`;
    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    .then(_ => _.ok ? _.json() : null);

    return response;
}

export async function getJadwalSholatById(cityId, date) {
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const url = `${URL_API_SHOLAT}/jadwal/${cityId}/${year}/${month}/${day}`;
    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    .then(_ => _.ok ? _.json() : null);

    return response;
}

export async function getJadwalSholatMonthlyById(cityId, date) {
    
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const url = `${URL_API_SHOLAT}/jadwal/${cityId}/${year}/${month}`;
    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    .then(_ => _.ok ? _.json() : null);

    return response;
}

export async function getJadwalSholatMonthly(city, date) {
    const lokasi = await getLokasi(city);
    const idLokasi = lokasi.data[0].id;
    
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const url = `${URL_API_SHOLAT}/jadwal/${idLokasi}/${year}/${month}`;
    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    .then(_ => _.ok ? _.json() : null);

    return response;
}