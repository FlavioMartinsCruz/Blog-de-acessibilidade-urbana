document.addEventListener("DOMContentLoaded", function () {
    const myheader = document.getElementById("my-header")

    window.addEventListener("scroll", function () {
        if (this.window.scrollY > 500) {
            myheader.classList.add("bg-especial")
        } else {
            myheader.classList.remove("bg-especial")
        }
    })


    document.getElementById("into-login").addEventListener("click", function () {
        //Redireciona para a rota /sign-up
        window.location.href = "/login"
    })
    document.getElementById("into-signup").addEventListener("click", function () {
        //Redireciona para a rota /sign-up
        window.location.href = "/sign-up"
    })


    const buttons = document.querySelectorAll(".btn")
    const modals = document.querySelectorAll(".modal")
    const spans = document.querySelectorAll(".close")
    const overlay = document.getElementById("overlay")

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const modalId = button.dataset.modal;
            document.getElementById(modalId).style.display = "block"
            overlay.style.display = "block"

            console.log(`Você clicou no botão com ID: ${modalId}`);
        })
    })

    spans.forEach(function (span) {
        span.addEventListener("click", function () {
            modals.forEach(function (modal) {
                modal.style.display = "none"
                overlay.style.display = "none"
            })
        })
    })


})