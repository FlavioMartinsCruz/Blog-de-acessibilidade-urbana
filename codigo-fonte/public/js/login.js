document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login");

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Resposta do servidor: ", data);
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    console.log("Token armazenado: ", data.token);
                    alert("Login bem sucedido!");
                    window.location.href = "/energy-clean"
                } else {
                    console.error("Erro ao fazer login", data.message);
                }
            })
            .catch(error => {
                console.error("Erro ao fazer login: ", error);
                alert("Erro ao fazer o login, tente novamente");
            });
    });
});
