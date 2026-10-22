 if (window.innerWidth >= 1200) {
console.log("1");
window.addEventListener('load', () => {
  mask.style.display = 'none';
  // при необходимости сбросить активность кнопок
  
});

function showContentFromHash() {
  const hash = window.location.hash; // например, #formap1
  const match = hash.match(/^#formap(\d+)$/);
  const headerH3 = document.querySelector('.wrapp header h3');
  const image1 = document.getElementById('image1');
  const image2 = document.getElementById('image2');

  if (match) {
    const num = match[1];
    if (nameStreet[num]) {
      headerH3.textContent = nameStreet[num]; // обновляем содержимое заголовка
      image1.src = '../media/img/OLD/' + nameStreet[num] + '_old.jpg';
      image2.src = '../media/img/NEW/' + nameStreet[num] + '_new.jpg';
      const urlMap = document.getElementById('urlMap');
       urlMap.setAttribute('href', urlStreet[num]);
    } else {
      headerH3.textContent = 'Контент не найден'; // при отсутствии данных
    }
  } else {
    headerH3.textContent = ''; // очищаем, если хэш не совпадает
  }
}

// Обновляем при загрузке страницы
window.addEventListener('load', showContentFromHash);
window.addEventListener('hashchange', showContentFromHash);

/// =====================

// Ищим раздел с маской
const container = document.getElementById('container');
const mask = document.getElementById('mask');
const maskImg = mask.querySelector('img');

const btnImage1 = document.getElementById('showImage1');
const btnImage2 = document.getElementById('showImage2');

const toggleBtn = document.getElementById('toggleMask');

let maskActive = false;

// Переменная для хранения текущего выбранного изображения 
let currentImageNumber = 1;



// Функции переключения изображений
function showImage(imageNumber) {
  currentImageNumber = imageNumber; // сохраняем текущий выбор
  let activeImageSrc = imageNumber === 1 ? document.getElementById('image2').src : document.getElementById('image1').src;

  if (imageNumber === 1) {
    document.getElementById('image1').classList.add('active');
    document.getElementById('image2').classList.remove('active');
	
  } else {
    document.getElementById('image1').classList.remove('active');
    document.getElementById('image2').classList.add('active');
	
  }

  // Обновляем src маски
  maskImg.src = activeImageSrc;
  // Показываем маску (если она скрыта)
  mask.style.display = 'block';
  
}
function hideMask() {
  mask.style.display = 'none';
}
// Изначально показываем первое изображение
showImage(1);

// Обработчики кликов по кнопкам
btnImage1.addEventListener('click', () => {showImage(1); hideMask(); maskActive = !maskActive; });
btnImage2.addEventListener('click', () => {showImage(2); hideMask(); maskActive = !maskActive; });

// Переключение отображения маски
toggleBtn.addEventListener('click', () => {
  maskActive = !maskActive;
  mask.style.display = maskActive ? 'block' : 'none';
  // При открытии маски показываем выбранное изображение
  if (maskActive) {
    showImage(currentImageNumber);
  }
});

// Обработка изменения размера маски
const sizeSlider = document.getElementById('sizeRange');
let maskSize = parseInt(sizeSlider.value);
sizeSlider.addEventListener('input', () => {
  maskSize = parseInt(sizeSlider.value);
  mask.style.width = mask.style.height = maskSize * 3 + 'px';
  mask.style.borderRadius = '50%';
});

// Перемещение маски за мышью
container.addEventListener('mousemove', (e) => {
  if (mask.style.display === 'none') return;

  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const radius = maskSize * 2;

  let left = x - radius;
  let top = y - radius;

  mask.style.left = left + 'px';
  mask.style.top = top + 'px';

  // Смещение картинки внутри маски, чтобы показывать правильную часть
  const img = mask.querySelector('img');

  const offsetX = -left;
  const offsetY = -top;

  img.style.left = offsetX + 'px';
  img.style.top = offsetY + 'px';
});

// Кнопки активации и деактивации
const buttons = document.querySelectorAll('#toggleMask, #showImage1, #showImage2');


function activateButton(activeId) {
  buttons.forEach(btn => {
    if (btn.id === activeId) {
      btn.classList.add('active'); // добавляем класс выделения выбранной кнопке
    } else {
      btn.classList.remove('active'); // убираем у остальных
    }
  });
}
function updateRangeStyle() {
  const percent = (sizeSlider.value - sizeSlider.min) / (sizeSlider.max - sizeSlider.min) * 100;
  sizeSlider.style.setProperty('--value-percent', percent + '%');
}

sizeSlider.addEventListener('input', updateRangeStyle);

// и начально
updateRangeStyle();

document.getElementById('toggleMask').addEventListener('click', () => {
  activateButton('toggleMask');
});
document.getElementById('showImage1').addEventListener('click', () => {
  activateButton('showImage1');
});
document.getElementById('showImage2').addEventListener('click', () => {
  activateButton('showImage2');
});
 }
    
	
	
	
if (window.innerWidth < 1100) {
	 window.addEventListener('load', () => {
  mask.style.display = 'none';
  // при необходимости сбросить активность кнопок
  
});

function showContentFromHash() {
  const hash = window.location.hash; // например, #formap1
  const match = hash.match(/^#formap(\d+)$/);
  const headerH3 = document.querySelector('.wrapp header h3');
  const image1 = document.getElementById('image1');
  const image2 = document.getElementById('image2');
  const videos1 = document.getElementById('video1');
  const videos2 = document.getElementById('video2');
  const videoPlayer1 = document.getElementById('videoPlayer1');
  const videoPlayer2 = document.getElementById('videoPlayer2');
  const videoContainer = document.getElementById('videoContainer');
  const imageWrapper1 = document.getElementById('image-wrapper1');
  const imageWrapper2 = document.getElementById('image-wrapper2');
 
  if (match) {
    const num = match[1];
    if (nameStreet[num]) {
      headerH3.textContent = nameStreet[num]; // обновляем содержимое заголовка
      image1.src = '../media/img/OLD/' + nameStreet[num] + '_old.jpg';
      image2.src = '../media/img/NEW/' + nameStreet[num] + '_new.jpg';
      const urlMap = document.getElementById('urlMap');
       urlMap.setAttribute('href', urlStreet[num]);
	   // Пути к видеофайлам для каждой картинки (замените на ваши реальные пути)

    } else {
      headerH3.textContent = 'Контент не найден'; // при отсутствии данных
    }
  } else {
    headerH3.textContent = ''; // очищаем, если хэш не совпадает
  }
}

// Обновляем при загрузке страницы
window.addEventListener('load', showContentFromHash);
window.addEventListener('hashchange', showContentFromHash);

const container = document.getElementById('container');
const btnImage1 = document.getElementById('showImage1');
const btnImage2 = document.getElementById('showImage2');

// Переменная для хранения текущего выбранного изображения 
let currentImageNumber = 1;

// Функции переключения изображений
function showImage(imageNumber) {
  currentImageNumber = imageNumber; // сохраняем текущий выбор
  let activeImageSrc = imageNumber === 1 ? document.getElementById('image2').src : document.getElementById('image1').src;

  if (imageNumber === 1) {
    image1.classList.add('active');
	image2.classList.remove('active');
    btnImage1.classList.add('active');
    btnImage2.classList.remove('active');
	imageWrapper1.classList.add('active');
	imageWrapper2.classList.remove('active');
	
  } else {
  
    btnImage1.classList.remove('active');
    btnImage2.classList.add('active');
	image1.classList.remove('active');
	image2.classList.add('active');
	imageWrapper2.classList.add('active');
	imageWrapper1.classList.remove('active');
	
  }
 }
  
  // Обработчики кликов по кнопкам
btnImage1.addEventListener('click', () => {showImage(1);console.log(imageNumber);video2.classList.remove('active');});
btnImage2.addEventListener('click', () => {showImage(2);console.log(imageNumber);video1.classList.remove('active');});





// Функция для воспроизведения видео
function playVideo1() {
  
  console.log(videoContainer);
    videoContainer.style.display = 'block'; // делаем видимым контейнер видео
	  if (videoPlayer11){
    videoPlayer1.play();
  }
}
function playVideo2() {
  
  console.log(videoContainer);
    videoContainer.style.display = 'block'; // делаем видимым контейнер видео
    if (videoPlayer2){
	videoPlayer2.play();
  }
}

// Обработка кликов по изображениям
document.getElementById('image1').addEventListener('click', () => {
  console.log('v1');
  image1.classList.remove('active');
  video1.classList.add('active');
  playVideo1();
});





// Объявление переменных для видео
const videoElem1 = document.getElementById('video1');
const videoElem2 = document.getElementById('video2');

const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');

function playVideo1() {
  // Показываем видео
  videoElem1.style.display = 'block';
  image1.classList.remove('active');
  // Запускаем воспроизведение
  videoElem1.play();
  // Обработчик окончания
  videoElem1.onended = () => {
    videoElem1.style.display = 'none'; // скрываем видео
    image1.classList.add('active');   // показываем изображение
  };
}

function playVideo2() {
  videoElem2.style.display = 'block';
  image2.classList.remove('active');
  videoElem2.play();
  videoElem2.onended = () => {
    videoElem2.style.display = 'none';
    image2.classList.add('active');
  };
}
document.getElementById('image2').addEventListener('click', () => {
  console.log('v2');
image2.classList.remove('active');
video2.classList.add('active');
  playVideo2();
});

 }