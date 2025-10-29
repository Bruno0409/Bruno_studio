;(function ($) {
  'use strict'

  // =========================
  // SPINNER
  // =========================
  const spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show')
      }
    }, 1)
  }
  spinner()

  // =========================
  // STICKY NAVBAR
  // =========================
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.sticky-top').addClass('shadow-sm').css('top', '0px')
    } else {
      $('.sticky-top').removeClass('shadow-sm').css('top', '-100px')
    }
  })

  // =========================
  // BOTÃO "BACK TO TOP"
  // =========================
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow')
    } else {
      $('.back-to-top').fadeOut('slow')
    }
  })

  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo')
    return false
  })

  // =========================
  // TESTIMONIAL CAROUSEL
  // =========================
  $('.testimonial-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 3000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: false,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>'
    ],
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  })
})(jQuery)

// =========================
// DOCUMENT READY
// =========================
$(document).ready(function () {
  // -------------------------
  // PROJECT & TESTIMONIAL CAROUSEL
  // -------------------------
  var owl = $('.project-carousel, .testimonial-carousel')

  owl.owlCarousel({
    autoplay: true,
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  })

  // Botões personalizados
  $('.btn-prev-project').click(function () {
    owl.trigger('prev.owl.carousel')
  })

  $('.btn-next-project').click(function () {
    owl.trigger('next.owl.carousel')
  })

  // -------------------------
  // MÁSCARA DO CAMPO TELEFONE
  // -------------------------
  const mobileInput = document.getElementById('mobile')
  if (mobileInput) {
    mobileInput.addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '') // Remove tudo que não for número
      if (value.length > 11) value = value.slice(0, 11) // Limita a 11 dígitos

      // Aplica a formatação
      if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
      } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2')
      } else if (value.length > 0) {
        value = value.replace(/(\d{0,2})/, '($1')
      }

      e.target.value = value
    })
  }

  // -------------------------
  // REINICIALIZA WOW APÓS O CARREGAMENTO COMPLETO
  // -------------------------
  $(window).on('load', function () {
    if (typeof WOW !== 'undefined') {
      new WOW().init()
    }
  })

  // -------------------------
  // ATUALIZA O ANO NO RODAPÉ
  // -------------------------
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()
})
