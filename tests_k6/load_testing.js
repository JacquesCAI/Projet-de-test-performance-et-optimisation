import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
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

    const vaccins = http.get(`${base_url}/api/vaccins`, authHeaders).json();
    check(vaccins, { 'retrieved vaccins': (obj) => obj.length > 0 });

    sleep(1);
};