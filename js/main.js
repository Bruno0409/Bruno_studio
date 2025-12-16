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
      let value = e.target.value

      let numbersOnly = value.replace(/\D/g, '')

      if (numbersOnly.length === 0) {
        e.target.value = ''
        return
      }

      if (numbersOnly.length > 11) {
        numbersOnly = numbersOnly.slice(0, 11)
      }

      if (numbersOnly.length > 6) {
        value = numbersOnly.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
      } else if (numbersOnly.length > 2) {
        value = numbersOnly.replace(/(\d{2})(\d{0,5})/, '($1) $2')
      } else if (numbersOnly.length > 0) {
        value = numbersOnly.replace(/(\d{0,2})/, '($1')
      }

      e.target.value = value
    })

    mobileInput.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        let value = mobileInput.value

        if (value.length > 0) {
          value = value.slice(0, -1)
          mobileInput.value = value
        }
      }
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

// -------------------------
// COOKIE / LGPD - Ajustado para compatibilidade iOS
// -------------------------

const consentKey = 'cookieConsent'
let gaCarregado = false

// Função para verificar se o localStorage está disponível e seguro
function storageDisponivel() {
  try {
    const teste = '__teste__'
    localStorage.setItem(teste, teste)
    localStorage.removeItem(teste)
    return true
  } catch (e) {
    return false
  }
}

// Carrega o Google Analytics
function carregarGoogleAnalytics() {
  if (gaCarregado) return
  gaCarregado = true

  const script = document.createElement('script')
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-B5LVNNFY85'
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'G-B5LVNNFY85', { anonymize_ip: true })
}

document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookie-consent-card')
  const btnAccept = document.getElementById('accept-cookies')
  const btnReject = document.getElementById('reject-cookies')

  if (!banner || !btnAccept || !btnReject) return

  // Verifica a disponibilidade do localStorage
  const storageOk = storageDisponivel()
  let consent = null

  if (storageOk) {
    consent = localStorage.getItem(consentKey)
  }

  // Se o consentimento já foi dado, carrega o Google Analytics
  if (consent === 'accepted') {
    carregarGoogleAnalytics()
  } else if (!consent) {
    banner.style.display = 'flex'
  }

  // Aceitar cookies
  btnAccept.addEventListener('click', function () {
    if (storageOk) {
      localStorage.setItem(consentKey, 'accepted')
    }
    carregarGoogleAnalytics()
    banner.style.display = 'none'
  })

  // Recusar cookies
  btnReject.addEventListener('click', function () {
    if (storageOk) {
      localStorage.setItem(consentKey, 'rejected')
    }
    banner.style.display = 'none'
  })
})
