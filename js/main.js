(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Modal Video

  // Testimonial carousel (somente ela mantém os navs)
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 3000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: false,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });
})(jQuery);

$(document).ready(function () {
  var owl = $(".project-carousel,.testimonial-carousel");

  owl.owlCarousel({
    autoplay: true,
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });

  // Botões personalizados
  $(".btn-prev-project").click(function () {
    owl.trigger("prev.owl.carousel");
  });

  $(".btn-next-project").click(function () {
    owl.trigger("next.owl.carousel");
  });
});

// Função para lidar com o envio do formulário

const mobileInput = document.getElementById("mobile");

mobileInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

  // Limita o comprimento para 11 dígitos (sem contar a formatação)
  if (value.length > 11) {
    value = value.slice(0, 11); // Impede que o usuário digite mais de 11 números
  }

  // Aplica a formatação conforme o número de caracteres digitados
  if (value.length <= 2) {
    value = value.replace(/(\d{2})/, "($1) "); // Formata o código de área
  } else if (value.length <= 6) {
    value = value.replace(/(\d{2})(\d{5})/, "($1) $2"); // Aplica o espaço depois de 6 dígitos
  } else {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"); // Formata o número completo
  }

  // Atualiza o valor no campo de entrada com a formatação em tempo real
  e.target.value = value;
});

mobileInput.addEventListener("keydown", function (e) {
  let value = mobileInput.value;

  // Permite apagar corretamente os caracteres
  if (e.key === "Backspace" || e.key === "Delete") {
    if (
      value.length === 3 ||
      value.length === 6 ||
      value.length === 9 ||
      value.length === 11
    ) {
      mobileInput.value = value.slice(0, -1); // Remove o último caractere
    }
  }
});
