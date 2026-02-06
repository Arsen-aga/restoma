function openFormSearchModal(searchModal) {
  searchModal.classList.add("active");
}
function closeFormSearchModal(searchModal) {
  searchModal.classList.remove("active");
}
function hendleClickOutModal(event, modal){
    const isClickInsideModal = modal.contains(event.target);
    const isClickOnOpenButton = event.target.classList.contains("search-btn") || event.target.closest(".search-btn");
    if (!isClickInsideModal && !isClickOnOpenButton) 
      closeFormSearchModal(modal);
}

document.addEventListener("DOMContentLoaded", function () {
  const openSearchBtns = document.querySelectorAll(".search-btn");
  const searchModal = document.querySelector(".search-form");

  openSearchBtns.forEach(btn => btn.addEventListener("click", () => openFormSearchModal(searchModal)))
  document.addEventListener("click", (e) => hendleClickOutModal(e, searchModal));
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeFormSearchModal(searchModal);
  });
});
