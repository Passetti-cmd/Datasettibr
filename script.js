/************************************************
  SCRIPT PRINCIPAL - script.js
************************************************/

// Se você usar EmailJS, pode inicializar assim (já visto no <head>):
// emailjs.init("service_dzchx7m"); 
// Substitua pelo seu PUBLIC KEY do EmailJS, ou remova se não usar.

/* -----------------------------
   Carrossel de Projetos
------------------------------ */
const carouselProj = document.getElementById('carouselProj');
const prevProj = document.getElementById('prevProj');
const nextProj = document.getElementById('nextProj');
let currentProjIndex = 0; // índice do slide atual

prevProj.addEventListener('click', () => {
  moveCarousel(carouselProj, -1, 'projeto');
});
nextProj.addEventListener('click', () => {
  moveCarousel(carouselProj, 1, 'projeto');
});

/* -----------------------------
   Carrossel de Depoimentos
------------------------------ */
const carouselDepo = document.getElementById('carouselDepo');
const prevDepo = document.getElementById('prevDepo');
const nextDepo = document.getElementById('nextDepo');
let currentDepoIndex = 0;

prevDepo.addEventListener('click', () => {
  moveCarousel(carouselDepo, -1, 'depoimento');
});
nextDepo.addEventListener('click', () => {
  moveCarousel(carouselDepo, 1, 'depoimento');
});

/* -----------------------------
   Função genérica para mover carrossel
------------------------------ */
function moveCarousel(carousel, direction, tipo) {
  const items = carousel.querySelectorAll('.carousel-item');
  let currentIndex = (tipo === 'projeto') ? currentProjIndex : currentDepoIndex;

  currentIndex += direction;

  // se passar do último, volta pro primeiro, e vice-versa
  if (currentIndex < 0) {
    currentIndex = items.length - 1;
  } else if (currentIndex >= items.length) {
    currentIndex = 0;
  }

  const newTransform = `translateX(-${currentIndex * 100}%)`;
  carousel.style.transform = newTransform;

  // salva o índice
  if (tipo === 'projeto') {
    currentProjIndex = currentIndex;
  } else {
    currentDepoIndex = currentIndex;
  }
}

/* -----------------------------
   Exemplo de Envio de Formulário via EmailJS
------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  const btnEnviar = document.querySelector(".btn-enviar");
  if(btnEnviar) {
    btnEnviar.addEventListener("click", function (event) {
      event.preventDefault(); 
      let params = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        empresa: document.getElementById("empresa").value,
        mensagem: document.getElementById("mensagem").value
      };
      // Exemplo: emailjs.send("service_xxx", "template_xxx", params)
      //   .then(...).catch(...);
      alert("E-mail enviado (exemplo). Implemente seu EmailJS aqui!");
    });
  }
});

/* -----------------------------
   Troca automática do texto (bannerText) se quiser
------------------------------ */
document.addEventListener("DOMContentLoaded", function() {
    const frases = [
        "Maximize Suas Oportunidades",
        "Seja Inovador no Mercado",
        "Aumente Seus Lucros com a Data Setti",
        "Passe a Concorrencia com Tecnoliga de Ponta"
    ];

    let index = 0;
    const bannerText = document.getElementById("banner-text");

    function mudarTexto() {
        index = (index + 1) % frases.length;
        bannerText.style.opacity = 0; // Efeito fade-out
        setTimeout(() => {
            bannerText.textContent = frases[index];
            bannerText.style.opacity = 1; // Efeito fade-in
        }, 500);
    }

    setInterval(mudarTexto, 3000); // Troca a cada 3 segundos
});

/* -----------------------------
   Lógica do menu hamburguer e side-menu (MOBILE)
------------------------------ */
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

// Abre o side menu
hamburger?.addEventListener("click", () => {
  sideMenu?.classList.add("active");
  overlay?.classList.add("active");
});

// Fecha ao clicar no X
closeBtn?.addEventListener("click", () => {
  sideMenu?.classList.remove("active");
  overlay?.classList.remove("active");
});

document.getElementById("form-contato").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita o redirecionamento

  // Captura os dados do formulário e os envia via fetch para o FormSubmit
  let formData = new FormData(this);

  fetch(this.action, {
    method: "POST",
    body: formData,
  }).then(response => {
    if (response.ok) {
      // Esconde o formulário e exibe a mensagem de sucesso
      document.getElementById("form-contato").style.display = "none";
      document.getElementById("mensagem-sucesso").style.display = "block";
    } else {
      alert("Erro ao enviar o formulário. Tente novamente.");
    }
  }).catch(error => {
    alert("Erro ao enviar o formulário. Verifique sua conexão.");
  });
});
