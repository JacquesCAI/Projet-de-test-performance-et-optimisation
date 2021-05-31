class VaccinsService {
    static getVaccins(token) 
    {
        return fetch('/api/vaccins/?token='+token, {
            method: "GET",
        }).then(res => res.json());
    }
}

export default VaccinsService;