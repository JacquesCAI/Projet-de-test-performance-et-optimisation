import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 },
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 },
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 },
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