

class AuthService {
    static async login(email,password) {
        let formData = new FormData();
        formData.append("email",email);
        formData.append("password",password);

        const res = await fetch('/api/auth/login', {
            method: "POST",
            body: formData
        }).then(res => res.json());

        if (res.access_token) {
            localStorage.setItem("user", JSON.stringify({
                token: res.access_token,
                id: res.user.id,
                name: res.user.name,
                email: res.user.email
            }));
            location.href = "/";
        } else {
            return res;
        }
    }

    static async register(name,email,password,password_confirmation) {
        let formData = new FormData();
        formData.append("name",name);
        formData.append("email",email);
        formData.append("password", password);
        formData.append("password_confirmation", password_confirmation);

        let res = await fetch('/api/auth/register', {
            method: "POST",
            body: formData
        }).then(res => res.json());
        if (typeof(res) == "string") {
            res = JSON.parse(res);
        }
        if (res.user) {
            this.login(email,password);
        } else {
            return res;
        }
    }

    static async logout() {
        if (localStorage.getItem("user") == null) {
            alert("Vous êtes déjà déconnecté!");
            return;
        }
        const {token} = JSON.parse(localStorage.getItem("user"));
        let formData = new FormData();
        formData.append("token",token);
        try {
            await fetch('/api/auth/logout', {
                method: "POST",
                body: formData
            }).then(res => res.json());
            this.deleteSession();
        } catch (e) {
            alert("Echec de dé connexion");
        }
    }

    static deleteSession() {
        localStorage.removeItem("user");
        location.href = "/";
    }
}

export default AuthService
