document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token") || getCookie("token");

  if (!token) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/login";
    return;
  }

  fetch("/energy-clean", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}` // Inclui o token no formato correto
    }
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        // Se a resposta não for OK, lança um erro para ser tratado no bloco catch()
        throw new Error("Erro ao acessar a rota protegida.");
      }
    })
    .then(html => {
      // Renderiza o HTML retornado pela rota na página
      document.documentElement.innerHTML = html;

      const userName = document.getElementById("userName").value
        console.log(userName)
     
      const newPost = document.getElementById("new-post")
      const cancel = document.getElementById("cancel")
      const form = document.getElementById("post")
      const overlay = document.getElementById("overlay")
      const modal = document.getElementById("content-post")

      newPost.addEventListener("click", ()=>{
        modal.style.display = "block"
        overlay.style.display = "block"

      })

      cancel.addEventListener("click", ()=>{
        modal.style.display = "none"
        overlay.style.display = "none"
        return false
      })

      form.addEventListener("submit", function(ev){
        ev.preventDefault()

        
        const titulo = document.getElementById("tittle").value
        const conteudo = document.getElementById("content").value

        console.log("Título:", titulo);
        console.log("Conteúdo:", conteudo);

        
          if (!titulo || !conteudo) {
            alert("Todos os campos devem ser preenchidos");
            return;
          }

          console.log("Campos preenchidos corretamente");

          fetch("/energy-clean",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({userName, titulo, conteudo})
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao criar postagem.");
            }
        })
        .then(data => {
          alert("Postagem criada com sucesso.");
          titulo.value = ""
          conteudo.value = ""
          modal.style.display = "none";
          overlay.style.display = "none";
        })
          .catch(error =>{
            console.log("Erro: ",error)
            alert("Erro ao criar postagem")
          })
      })
    })
    .catch(error => {
      console.error("Erro ao acessar a rota protegida: ", error);
      console.log("Resposta do servidor:", error); 
      alert("Erro ao acessar a rota protegida, verifique o console para mais detalhes");
      window.location.href = "/login";
    });



});

