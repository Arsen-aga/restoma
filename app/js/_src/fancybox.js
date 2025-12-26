Fancybox.bind("[data-fancybox]", {});

if (document.querySelector("#to-exit")) {
  if (!localStorage.getItem("modalShown")) {
    document.addEventListener("mouseleave", function handleMouseLeave(event) {
      if (event.clientY < 0) {
        Fancybox.show([{ src: "#to-exit", type: "inline" }]);
        localStorage.setItem("modalShown", "true");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    });
  }
}