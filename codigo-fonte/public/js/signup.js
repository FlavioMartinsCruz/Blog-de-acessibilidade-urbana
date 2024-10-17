document.addEventListener("DOMContentLoaded", function(){
// Fazendo as validações dos campos
    function validateEmail(email) {
        if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) {
          const err = new Error("Email Invalido");
          err.input = "email";
          throw err;
        }
      }

      function validatePassword(password) {
        if (
          password.length < 8 || password.length > 12 ||
          !password.match(/[A-Z]/) ||
          !password.match(/[a-z]/) ||
          !password.match(/[0-9]/) ||
          !password.match(/[^a-zA-Z0-9\s]/)
        ) {
          const err = new Error("Senha Invalida");
          err.input = password;
          throw err;
        }
      }
// Indicando erro se uma das validações falhar
      function wrong(errorMessage) {
        const errorElement = document.getElementById("error");
        errorElement.textContent = errorMessage;
      }

    const form = document.getElementById("signup-form")
// Evento ao clicar em enviar do formulario
    form.addEventListener("submit", function(ev){
        ev.preventDefault()

        const userName = document.getElementById("userName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value

        if(!userName || !email || !password || !confirmPassword){
            alert("Por favor, preencha todos os campos")
            return
        }

        if(password !== confirmPassword){
            alert("As senhas não coincidem. Por favor, tente novamente")
            return
        }

        try {
            validateEmail(email);
            validatePassword(password);

            wrong("");
          } catch (err) {
            wrong(err.message);
          }
    // Enviando dodos para o servidor
        fetch("/sign-up", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({userName , email , password})
        })
        .then(response =>  {
            if (response.ok){
                alert("Usuario criado com sucesso.")
                window.location.href = "/login"
            } else{
              return response.json().then(error =>{
                throw new Error(error.error)
              })
            }
        })
        .catch(error => {
            console.error("Erro: ", error)
            alert("Erro ao criar usuario. Por favor, tente novamente.")
        })
    })
})