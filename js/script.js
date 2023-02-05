document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelectorAll(".catalog__wrapper"),
    uls = document.querySelectorAll(".catalog__uls"),
    more = document.querySelectorAll(".catalog__link_more"),
    back = document.querySelectorAll(".catalog__link_back"),
    tabs = document.querySelectorAll(".catalog__tab"),
    catalogs = document.querySelectorAll(".catalog__items");

  more.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      wrapper[i].classList.toggle("hidden");
      uls[i].classList.toggle("hidden");
    });
  });
  back.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      wrapper[i].classList.toggle("hidden");
      uls[i].classList.toggle("hidden");
    });
  });

  tabs.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((it) => {
        it.classList.remove("catalog__tab_active");
      });
      catalogs.forEach((item) => {
        if (!item.classList.contains("hidden")) {
          item.classList.add("hidden");
        }
      });
      tabs[i].classList.add("catalog__tab_active");
      catalogs[i].classList.remove("hidden");
    });
  });

  //modals

  const modalConsult = document.querySelector(".modal_consult"),
    modalBye = document.querySelector(".modal_bye"),
    btnCons = document.querySelectorAll('[data-modal="1"]'),
    closeModal = document.querySelectorAll(".modal__close"),
    overlay = document.querySelector(".overlay"),
    btnCatalog = document.querySelectorAll(".button__catalog"),
    catalogName = document.querySelectorAll(".catalog__name"),
    mini = document.querySelector(".modal_mini"),
    up = document.querySelector(".up");

  btnCons.forEach((item) => {
    item.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      modalConsult.classList.remove("hidden");
    });
  });

  closeModal.forEach((item) => {
    item.addEventListener("click", () => {
      overlay.classList.add("hidden");
      modalConsult.classList.add("hidden");
      modalBye.classList.add("hidden");
      mini.classList.add("hidden");
    });
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.add("hidden");
      modalConsult.classList.add("hidden");
      modalBye.classList.add("hidden");
      mini.classList.add("hidden");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.code === "Escape" &&
      (!modalBye.classList.contains("hidden") ||
        !modalConsult.classList.contains("hidden"))
    ) {
      overlay.classList.add("hidden");
      modalConsult.classList.add("hidden");
      modalBye.classList.add("hidden");
      mini.classList.add("hidden");
    }
  });

  btnCatalog.forEach((item, i) => {
    item.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      modalBye.classList.remove("hidden");
      modalBye.querySelector(".modal__descr").textContent =
        catalogName[i].textContent;
    });
  });
  //появление стрелки вверх
  window.addEventListener("scroll", () => {
    if (pageYOffset >= 600) {
      up.classList.remove("hidden");
    } else {
      up.classList.add("hidden");
    }
  });

  new WOW().init();

  $(".slider__slik").slick({
    speed: 1000,
    adaptiveHeight: true,
    fade: true,
    cssEase: "linear",
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/prev-arrow.svg" /></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/next-arrow.svg" /></button>',
    responsive: [
      {
        breakpoint: 650,
        settings: {
          dots: true,
          arrows: false,
          fade: false,
          cssEase: "ease",
        },
      },
    ],
  });

  $("form").submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      modalConsult.classList.add("hidden");
      modalBye.classList.add("hidden");
      mini.classList.remove("hidden");
      $("form").trigger("reset");
    });
    return false;
  });
});
