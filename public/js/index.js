function scrollFLeft() {
  document.getElementById('filters').scrollBy({ left: -200, behavior: 'smooth' });
}

function scrollFRight() {
  document.getElementById('filters').scrollBy({ left: 200, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", () => {
    const taxSwitch = document.getElementById("switchCheckDefault");
    const taxInfos = document.querySelectorAll(".taxInfo");

    taxSwitch.addEventListener("change", () => {
        taxInfos.forEach(info => {
            info.style.display = taxSwitch.checked ? "inline" : "none";
        });
    });
});
