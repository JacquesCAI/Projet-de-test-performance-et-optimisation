import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};


const base_url = 'http://nginx';
const email = 'test@test.com';
const password = 'testtest';

export default () => {
    const loginRes = http.post(`${base_url}/api/auth/login/`, {
        email,
        password
    });


    check(loginRes, {
        'logged in successfully': (resp) => resp.json('access_token') !== '',
    });


    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('access_token')}`,
        },
    };

    const vaccins = http.get(`${base_url}/api/allVaccins`, authHeaders).json();
    check(vaccins, { 'retrieved vaccins': (obj) => obj.length > 0 });

    const random = rand(1,1000)
    const resCreate = http.post(`${base_url}/api/vaccins`, {
        code_region: random.toString(),
        nom_reg: random.toString(),
        nb_doses: random,
        type_de_vaccin: "Puce 5g "+random,
        nb_ucd: random
    }, authHeaders).json();
    check(resCreate, {'vaccin created': (obj) =>
            typeof(obj.id) == "number" &&
            typeof(obj.code_region) == "string" &&
            typeof(obj.nom_reg) == "string" &&
            obj.type_de_vaccin === "Puce 5g "+random &&
            obj.nb_ucd === random &&
            typeof(obj.nb_doses) == "number"
    });

    const resDeleted = http.del(`${base_url}/api/vaccins/`+resCreate.id,{}, authHeaders).json();
    check(resDeleted, {'vaccin deteled': (obj) => obj === 1})

    sleep(1);
};

const rand = (a,b) => a+Math.floor(Math.random()*(b-a+1));