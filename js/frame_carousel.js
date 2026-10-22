const namecarousel = {
  0: ' / ЗДАНИЯ',
  1: ' / ПАМЯТНЫЕ МЕСТА',
  2: ' / ПАМЯТНИКИ',
  3: ' / УЛИЦЫ'
};
const namecarousel2 = {
  0: ' / ЗДАНИЯ',
  1: ' / ПАМЯТНЫЕ МЕСТА',
  2: ' / ПАМЯТНИКИ',
  3: ' / УЛИЦЫ'
};

// ============ ПЕРВЫЙ СЛАЙДЕР (История мест) ============
function startPagePosition(position) {
    const nameEl = document.querySelector("#namecarousel");
    if (nameEl) nameEl.textContent = namecarousel[position];

    if (window.innerWidth > 767) {
        document.querySelectorAll(".carousel_article").forEach(el => el.style.translate = `${-100 * position}% 0`);
    } else {
        document.querySelectorAll(".carousel_article").forEach(el => el.style.translate = `0 ${-100 * position}%`);
    }

    const cats = document.querySelectorAll(".carousel_categories");
    cats.forEach(el => el.classList.remove("active"));
    if (cats[position]) cats[position].classList.add("active");

    const sms = document.querySelectorAll(".carousel_article_sm");
    sms.forEach(el => el.classList.remove("active"));
    if (sms[position]) sms[position].classList.add("active");

    checkPosition(position);
}

// ============ ВТОРОЙ СЛАЙДЕР (Места на карте) ============
function startPagePosition2(position2) {
    const nameEl = document.querySelector("#namecarousel2");
    if (nameEl) nameEl.textContent = namecarousel2[position2];

    // карты всегда листаются горизонтально — и на ПК, и на мобилке
    document.querySelectorAll(".carousel_article2").forEach(el => {
        el.style.translate = `${-100 * position2}% 0`;
    });

    const cats = document.querySelectorAll(".carousel_categories2");
    cats.forEach(el => el.classList.remove("active"));
    if (cats[position2]) cats[position2].classList.add("active");

    checkPosition2(position2);
}

// ============ СТРЕЛКИ СЛАЙДЕРА 1 ============
function checkPosition(position) {
    const left  = document.querySelector("#but_arrow_left");
    const right = document.querySelector("#but_arrow_right");
    const up    = document.querySelector("#but_arrow_up");
    const down  = document.querySelector("#but_arrow_down");

    if (window.innerWidth > 767) {
        if (!left || !right) return;
        if (position === 0)      { left.style.display = "none";  right.style.display = "block"; }
        else if (position === 3) { right.style.display = "none"; left.style.display = "block"; }
        else                     { left.style.display = "block"; right.style.display = "block"; }
    } else {
        if (!up || !down) return;
        if (position === 0)      { up.style.display = "block"; down.style.display = "none"; }
        else if (position === 3) { down.style.display = "block"; up.style.display = "none"; }
        else                     { up.style.display = "block"; down.style.display = "block"; }
    }
}

// ============ СТРЕЛКИ СЛАЙДЕРА 2 ============
function checkPosition2(position2) {
    const left  = document.querySelector("#but_arrow_left2");
    const right = document.querySelector("#but_arrow_right2");
    if (!left || !right) return;

    if (position2 === 0)      { left.style.display = "none";  right.style.display = "block"; }
    else if (position2 === 3) { right.style.display = "none"; left.style.display = "block"; }
    else                      { left.style.display = "block"; right.style.display = "block"; }
}

// ============ ИНИЦИАЛИЗАЦИЯ ============
let position  = 0;
let position2 = 0;
startPagePosition(position);
startPagePosition2(position2);

// ============ ДЕСКТОП/TABLET ============
// ---- обработчики вешаем на ВСЕ кнопки сразу ----
const btnRight  = document.querySelector("#but_arrow_right");
const btnLeft   = document.querySelector("#but_arrow_left");
const btnUp     = document.querySelector("#but_arrow_up");
const btnDown   = document.querySelector("#but_arrow_down");
const btnRight2 = document.querySelector("#but_arrow_right2");
const btnLeft2  = document.querySelector("#but_arrow_left2");

if (btnRight)  btnRight.onclick  = () => { if (position < 3) { position++; startPagePosition(position); } };
if (btnLeft)   btnLeft.onclick   = () => { if (position > 0) { position--; startPagePosition(position); } };
if (btnUp)     btnUp.onclick     = () => { if (position < 3) { position++; startPagePosition(position); } };
if (btnDown)   btnDown.onclick   = () => { if (position > 0) { position--; startPagePosition(position); } };

if (btnRight2) btnRight2.onclick = () => { if (position2 < 3) { position2++; startPagePosition2(position2); } };
if (btnLeft2)  btnLeft2.onclick  = () => { if (position2 > 0) { position2--; startPagePosition2(position2); } };

document.querySelectorAll(".carousel_categories").forEach(el => {
    el.onclick = () => { position = +el.getAttribute("data-category"); startPagePosition(position); };
});
document.querySelectorAll(".carousel_categories2").forEach(el => {
    el.onclick = () => { position2 = +el.getAttribute("data-category"); startPagePosition2(position2); };
});
// ============ МОБИЛЬНЫЙ ============
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const articles = document.querySelectorAll(".carousel_article, .carousel_article2");

        // 1. Отключаем transition, чтобы translate применился мгновенно
        articles.forEach(el => {
            el.style.transition = "none";
        });

        // 2. Пересчитываем translate под новую ориентацию
        requestAnimationFrame(() => {
            startPagePosition(position);
            startPagePosition2(position2);

            // 3. Возвращаем transition после того, как браузер применил новый translate
            requestAnimationFrame(() => {
                articles.forEach(el => {
                    el.style.transition = "";
                });
            });
        });
    }, 150);
});
window.addEventListener("load", () => {
    startPagePosition(position);
    startPagePosition2(position2);
});

// ===== круглая кнопка «На главную» на history.html / map.html =====
const pageFooter = document.querySelector('body footer');
if (pageFooter) {
    const togglePageFooter = () => {
        pageFooter.classList.toggle('visible', window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener('scroll', togglePageFooter, { passive: true });
    togglePageFooter();
}