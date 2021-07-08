import AuthService from "./AuthService";

class VaccinsService {
    static async getVaccins(token)
    {
        const res = await fetch('/api/vaccins/?token='+token, {
            method: "GET",
        }).then(res => res.json());

        return this.checkSession(res);
    }

    static async getOneVaccin(token,vaccinId)
    {
        const res = await fetch('/api/vaccins/'+vaccinId+'?token='+token, {
            method: "GET",
        }).then(res => res.json());

        return this.checkSession(res);
    }

    static async editVaccin(vaccin,token) {
        let formBody = [];
        for (const attr in vaccin) {
            if (attr !== "id") {
                formBody.push(encodeURIComponent(attr)+"="+encodeURIComponent(vaccin[attr]));
            }
        }
        formBody.push(encodeURIComponent("token")+"="+encodeURIComponent(token));
        formBody = formBody.join("&");
        const res = await fetch('/api/vaccins/'+vaccin.id+"", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(res => res.json());
        return this.checkSession(res);
    }

    static checkSession(res) {
        if (res.status == "Token is Expired" || res.status == "Authorization Token not found") {
            AuthService.deleteSession();
            return false;
        }
        return res;
    }

    static async postVaccin(vaccin, token){
        let formBody = [];
        for (const attr in vaccin) {
            if (attr !== "id") {
                formBody.push(encodeURIComponent(attr)+"="+encodeURIComponent(vaccin[attr]));
            }
        }
        formBody.push(encodeURIComponent("token")+"="+encodeURIComponent(token));
        formBody = formBody.join("&");
        const res = await fetch('/api/vaccins/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(res => res.json());
        return this.checkSession(res);
    }

    static async deleteVaccin(vaccin,token){
        const res = await fetch('/api/vaccins/'+vaccin.id+"?token="+token+"", {
            method: "DELETE",
        }).then(res => res.json());
        return this.checkSession(res);
    }
}

export default VaccinsService;
