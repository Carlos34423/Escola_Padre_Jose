function loadContent(elementId, fileName) {
    return fetch(fileName)
        .then((response) => response.text())
        .then((data) => {
            const element = document.getElementById(elementId);

            if (element) {
                element.innerHTML = data;
            }
        })
        .catch((error) => console.error("Erro ao carregar o arquivo:", error));
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach((link) => {
        const targetPage = link.getAttribute("href");

        if (targetPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}

function syncHeaderState() {
    const header = document.getElementById("main-header");

    if (!header) {
        return;
    }

    header.classList.toggle("scrolled", window.scrollY > 24);
}

document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        loadContent("main-header", "navbar.html"),
        loadContent("main-footer", "footer.html"),
    ]);

    setActiveNavLink();
    syncHeaderState();
    window.addEventListener("scroll", syncHeaderState);
});
