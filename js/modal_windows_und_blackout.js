// ============ ОБЩАЯ ЧАСТЬ: оверлей с фото/видео ============

const blackout        = document.querySelector("#blackout");
const crossBlackout   = document.querySelector("#cross_blackout");
const bodyEl          = document.querySelector("#body");
const h5Content       = document.querySelector("#H5_content");

const newPhotoDiv     = document.getElementById('NEW_photo');
const oldPhotoDiv     = document.getElementById('OLD_photo');
const photoSwitch     = document.getElementById('photo_switch');

const newPhoto        = document.getElementById('NEW_photography');
const oldPhoto        = document.getElementById('OLD_photography');
const videoNEW        = document.getElementById('NEW_photography_video');
const videoOLD        = document.getElementById('OLD_photography_video');

// -------- клики по карточкам (.clickable) --------
document.querySelectorAll(".clickable").forEach(el => {
    el.onclick = () => {
        if (!blackout || !h5Content) return;

        blackout.classList.toggle("active");
        if (crossBlackout) crossBlackout.classList.toggle("active");

        h5Content.innerHTML = el.getAttribute("data-place");

        const place = el.getAttribute("data-place");
        const id = place.split(" ").join("");
        const textBlock = document.getElementById(id);
        if (textBlock) textBlock.classList.add("active");

        // видео источники
        const newSrc = document.querySelector("#NEW_photography_video source");
        const oldSrc = document.querySelector("#OLD_photography_video source");
        if (newSrc) newSrc.setAttribute("src", `../media/img/NEW/${place}_new.mp4`);
        if (oldSrc) oldSrc.setAttribute("src", `../media/img/OLD/${place}_old.mp4`);

        if (bodyEl) bodyEl.style.overflow = "hidden";

        // фоновые картинки
        if (newPhoto) {
            newPhoto.style.backgroundImage = `url("../media/img/NEW/${place}_new.jpg")`;
            newPhoto.style.backgroundSize = "cover";
            newPhoto.style.backgroundPosition = "center top";
        }
        if (oldPhoto) {
            oldPhoto.style.backgroundImage = `url("../media/img/OLD/${place}_old.jpg")`;
            oldPhoto.style.backgroundSize = "cover";
            oldPhoto.style.backgroundPosition = "center top";
        }
    };
});

// -------- клик по старому фото → запуск видео --------
if (oldPhoto && videoOLD) {
    oldPhoto.addEventListener('click', () => {
        oldPhoto.style.display = 'none';
        videoOLD.load();
        videoOLD.play().catch(e => console.error('OLD video:', e));
    });
    videoOLD.addEventListener('ended', () => {
        oldPhoto.style.display = 'block';
    });
}

// -------- клик по новому фото → запуск видео --------
if (newPhoto && videoNEW) {
    newPhoto.addEventListener('click', () => {
        newPhoto.style.display = 'none';
        videoNEW.load();
        videoNEW.play().catch(e => console.error('NEW video:', e));
    });
    videoNEW.addEventListener('ended', () => {
        newPhoto.style.display = 'block';
    });
}

// -------- крестик закрытия --------
if (crossBlackout) {
    crossBlackout.onclick = () => {
        if (blackout) blackout.classList.toggle("active");
        crossBlackout.classList.toggle("active");
        document.querySelectorAll(".text_content").forEach(el => el.classList.remove("active"));
        if (bodyEl) bodyEl.style.overflow = "visible";
    };
}

// -------- переключатель old/new --------
if (photoSwitch && newPhotoDiv && oldPhotoDiv) {
    document.addEventListener('DOMContentLoaded', () => {
        oldPhotoDiv.style.zIndex = '1000';
    });

    photoSwitch.onclick = () => {
        if (window.getComputedStyle(newPhotoDiv).zIndex === '1000') {
            newPhotoDiv.style.zIndex = '0';
            oldPhotoDiv.style.zIndex = '1000';
            photoSwitch.classList.remove('photo_switch_down');
            photoSwitch.classList.add('photo_switch_upp');
        } else {
            newPhotoDiv.style.zIndex = '1000';
            oldPhotoDiv.style.zIndex = '0';
            photoSwitch.classList.remove('photo_switch_upp');
            photoSwitch.classList.add('photo_switch_down');
        }
    };

    newPhotoDiv.addEventListener('mouseenter', () => {
        if (newPhotoDiv.style.zIndex == '1000') newPhotoDiv.classList.add('hovered');
    });
    oldPhotoDiv.addEventListener('mouseenter', () => {
        if (oldPhotoDiv.style.zIndex == '1000') oldPhotoDiv.classList.add('hovered');
    });
    newPhotoDiv.addEventListener('mouseleave', () => newPhotoDiv.classList.remove('hovered'));
    oldPhotoDiv.addEventListener('mouseleave', () => oldPhotoDiv.classList.remove('hovered'));
}

// -------- клики по .clickable2 (если есть) --------
const blackout2 = document.querySelector("#blackout2");
const crossBlackout2 = document.querySelector("#cross_blackout2");
document.querySelectorAll(".clickable2").forEach(el => {
    el.onclick = () => {
        if (blackout2) blackout2.classList.toggle("active");
        if (crossBlackout2) crossBlackout2.classList.toggle("active");
        if (h5Content) h5Content.innerHTML = el.getAttribute("data-place");

        const place = el.getAttribute("data-place");
        const id = place.split(" ").join("");
        const textBlock = document.getElementById(id);
        if (textBlock) textBlock.classList.add("active");

        if (bodyEl) bodyEl.style.overflow = "hidden";
    };
});

// ============ ЧАСТЬ ТОЛЬКО ДЛЯ history.html: «раньше/сейчас» ============

const checkOld = document.getElementById('check_old');
const checkNew = document.getElementById('check_new');

// фоновые картинки для карточек
document.querySelectorAll('.image-wrapper').forEach(div => {
    const place = div.getAttribute('data-place');
    if (!place) return;
    div.style.backgroundImage = `url("../media/img/OLD/${place}_old.jpg")`;
    div.style.backgroundSize = "cover";
    div.style.backgroundPosition = "center top";
});

if (checkOld && checkNew) {
    checkOld.onclick = () => {
        checkOld.classList.toggle('active');
        checkNew.classList.toggle('active');
        document.querySelectorAll('.image-wrapper').forEach(div => {
            const place = div.getAttribute('data-place');
            if (!place) return;
            div.style.backgroundImage = `url("../media/img/OLD/${place}_old.jpg")`;
            div.style.backgroundSize = "cover";
            div.style.backgroundPosition = "center top";
        });
    };

    checkNew.onclick = () => {
        checkNew.classList.toggle('active');
        checkOld.classList.toggle('active');
        document.querySelectorAll('.image-wrapper').forEach(div => {
            const place = div.getAttribute('data-place');
            if (!place) return;
            div.style.backgroundImage = `url("../media/img/NEW/${place}_new.jpg")`;
            div.style.backgroundSize = "cover";
            div.style.backgroundPosition = "center top";
        });
    };
}