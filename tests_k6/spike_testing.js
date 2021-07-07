import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 },
        { duration: '3m', target: 1400 },
        { duration: '10s', target: 100 },
        { duration: '3m', target: 100 },
        { duration: '10s', target: 0 },
    ],
};


const base_url = 'http://nginx';
const email = 'test@test.com';
const password = 'testtest';

let authHeaders = null;

export default () => {

    if (authHeaders == null) {
        const loginRes = http.post(`${base_url}/api/auth/login/`, {
            email,
            password
        });

        authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('access_token')}`,
            },
        };
    }

    http.batch([1,2,3,4].map(num =>
        ([
            'GET',
            `${base_url}/api/vaccins/`+num,
            null,
            authHeaders,
        ])
    ));

    sleep(1);
};