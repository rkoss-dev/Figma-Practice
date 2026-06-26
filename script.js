document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("cardTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const cards = Array.from(track.children);
  let currentIndex = 0;

  function getCardsVisible() {
    return window.innerWidth <= 768 ? 1 : 2;
  }

  function getMaxIndex() {
    return Math.ceil(cards.length / getCardsVisible()) - 1;
  }

  function updateGallery() {
    const maxIndex = getMaxIndex();

    if (currentIndex > maxIndex) {
      currentIndex = Math.max(0, maxIndex);
    }

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 20;
    const moveAmount = getCardsVisible() * cardWidth + getCardsVisible() * gap;

    // Apply the translation
    track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;

    // Enable or disable buttons based on position
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  // Event Listeners for arrows
  nextBtn.addEventListener("click", () => {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateGallery();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateGallery();
    }
  });

  window.addEventListener("resize", updateGallery);
  updateGallery();
});
