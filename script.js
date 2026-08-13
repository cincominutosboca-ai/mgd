const galleries = {
  "trabajo-1": [
    "public/Trabajo%201/1.jpeg",
    "public/Trabajo%201/WhatsApp%20Image%202026-08-13%20at%2012.39.58.jpeg",
    "public/Trabajo%201/WhatsApp%20Image%202026-08-13%20at%2012.39.59%20(1).jpeg"
  ],
  "trabajo-2": [
    "public/Trabajo%202/1.jpg",
    "public/Trabajo%202/20250626_163638.jpg",
    "public/Trabajo%202/20250626_163836.jpg"
  ],
  "trabajo-3": [
    "public/Trabajo%203/1.jpg",
    "public/Trabajo%203/mejorada_d53b6328-2cb1-4684-86bf-9a45fff06b3f.jpg",
    "public/Trabajo%203/mejorada_d7e1b73e-6126-4d3a-a3a2-9693b6d35239.jpg"
  ],
  "trabajo-4": [
    "public/Trabajo%204/mejorada_2428e17e-1f54-444b-988b-92d19c002c6c.jpg",
    "public/Trabajo%204/mejorada_8ff56c3a-e614-46f6-924a-c403b8dfe360.jpg",
    "public/Trabajo%204/mejorada_afb75182-783a-4832-b5d6-70eb800bc13f.jpg",
    "public/Trabajo%204/mejorada_fcd708ee-0180-4f9c-a1f6-4cb48a8fe83f.jpg"
  ],
  "trabajo-5": [
    "public/Trabajo%205/1.webp",
    "public/Trabajo%205/49e04f88-f93d-47ad-bc8c-8162a8b9d844.webp"
  ],
  "trabajo-6": [
    "public/Trabajo%206/1.jpg",
    "public/Trabajo%206/mejorada_4384ccb8-ccbb-4d5c-a711-6a871a59bb60.jpg",
    "public/Trabajo%206/mejorada_565dc2e4-82d3-42bc-9a29-008efb4b9890.jpg",
    "public/Trabajo%206/mejorada_6cdd8ef4-48c7-4005-a9e0-483c422cc1bd.jpg"
  ]
};

const galleryModalElement = document.getElementById("galleryModal");
const galleryContent = document.getElementById("galleryContent");
const galleryModal = galleryModalElement ? new bootstrap.Modal(galleryModalElement) : null;

function setActiveThumb(index) {
  document.querySelectorAll(".gallery-thumb").forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("active", thumbIndex === index);
  });
}

function renderCarousel(images) {
  if (!images.length) {
    galleryContent.innerHTML = '<p class="gallery-empty">No hay fotos cargadas para esta publicacion.</p>';
    return;
  }

  const slides = images
    .map((image, index) => {
      return `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <div class="gallery-slide">
            <img src="${image}" alt="Foto del proyecto ${index + 1}">
          </div>
        </div>
      `;
    })
    .join("");

  const thumbs = images
    .map((image, index) => {
      return `
        <button class="gallery-thumb ${index === 0 ? "active" : ""}" type="button" data-bs-target="#projectCarousel" data-bs-slide-to="${index}" aria-label="Ver foto ${index + 1}">
          <img src="${image}" alt="">
        </button>
      `;
    })
    .join("");

  galleryContent.innerHTML = `
    <div id="projectCarousel" class="carousel slide project-carousel" data-bs-ride="false" data-bs-touch="true">
      <div class="carousel-inner">
        ${slides}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#projectCarousel" data-bs-slide="prev" aria-label="Foto anterior">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#projectCarousel" data-bs-slide="next" aria-label="Foto siguiente">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
    <div class="gallery-thumbs" aria-label="Miniaturas de fotos">
      ${thumbs}
    </div>
  `;

  const carouselElement = document.getElementById("projectCarousel");
  carouselElement.addEventListener("slide.bs.carousel", (event) => {
    setActiveThumb(event.to);
  });
}

document.querySelectorAll(".more-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    openGallery(button.dataset.category);
  });
});

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("click", () => {
    openGallery(card.dataset.category);
  });
});

function openGallery(category) {
  const images = galleries[category];

  if (!images || !galleryModal) {
    return;
  }

  renderCarousel(images);
  galleryModal.show();
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("menuPrincipal");
    const collapse = bootstrap.Collapse.getInstance(menu);

    if (collapse) {
      collapse.hide();
    }
  });
});

const videoModalElement = document.getElementById("videoModal");

if (videoModalElement) {
  videoModalElement.addEventListener("hidden.bs.modal", () => {
    const presentationVideo = videoModalElement.querySelector("video");

    if (presentationVideo) {
      presentationVideo.pause();
      presentationVideo.currentTime = 0;
    }
  });
}
