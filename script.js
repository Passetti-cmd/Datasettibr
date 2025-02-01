// Script para carrosséis de projetos e depoimentos
emailjs.init("service_dzchx7m"); // Substitua pelo seu Public Key no EmailJS

// Carrossel de Projetos
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

// Carrossel de Depoimentos
const carouselDepo = document.getElementById('carouselDepo');
const prevDepo = document.getElementById('prevDepo');
const nextDepo = document.getElementById('nextDepo');

let currentDepoIndex = 0; // índice do slide atual

prevDepo.addEventListener('click', () => {
  moveCarousel(carouselDepo, -1, 'depoimento');
});

nextDepo.addEventListener('click', () => {
  moveCarousel(carouselDepo, 1, 'depoimento');
});

// Função genérica para mover o carrossel
function moveCarousel(carousel, direction, tipo) {
  const items = carousel.querySelectorAll('.carousel-item');
  let currentIndex = (tipo === 'projeto') ? currentProjIndex : currentDepoIndex;

  currentIndex += direction;

  // se passar do último, volta pro primeiro e vice-versa
  if (currentIndex < 0) {
    currentIndex = items.length - 1;
  } else if (currentIndex >= items.length) {
    currentIndex = 0;
  }

  // atualiza a posição
  const newTransform = `translateX(-${currentIndex * 100}%)`;
  carousel.style.transform = newTransform;

  // salva o índice
  if (tipo === 'projeto') {
    currentProjIndex = currentIndex;
  } else {
    currentDepoIndex = currentIndex;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-enviar").addEventListener("click", function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Coletando os dados do formulário
    let params = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      empresa: document.getElementById("empresa").value,
      mensagem: document.getElementById("mensagem").value
    };

    // Enviando e-mail via EmailJS
    emailjs.send("service_dzchx7m", "SEU_TEMPLATE_ID", params)
      .then(function (response) {
        alert("E-mail enviado com sucesso!");
        console.log("SUCCESS!", response.status, response.text);
      }, function (error) {
        alert("Ocorreu um erro ao enviar o e-mail.");
        console.log("FAILED...", error);
      });
  });
});
