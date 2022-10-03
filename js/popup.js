const popupLinks = document.querySelectorAll('.popup-link'); //получаем все обьекты с классом popup-link
const body = document.body; // получаем в переменную тег body. Нам он нужен для блокировки скролла
const lockPadding = document.querySelectorAll(".lock-padding"); //получаем все обьекты с классом lock-padding

let unlock = true; //эта переменная нужна, чтобы избавится от двойных нажатий

const timeout = 800; //эта переменная должна быть такой же, как и transition: all 0.8s ease-in-out;

if (popupLinks.length > 0) { //делаем проверку существуют ли такие ссылки на странице
	for (let index = 0; index < popupLinks.length; index++) { //бегаем циклом по всем таким линкам
		const popupLink = popupLinks[index]; // и получаем каждую в переменную popupLink
		popupLink.addEventListener("click", function (e) { //вешаем событие клик на popupLink
			const popupName = popupLink.getAttribute('href').replace('#', ''); //берем значение атрибута href и убираем из него знак #
			const curentPopup = document.getElementById(popupName); //получаем елемент id которого равен popupName
			popupOpen(curentPopup); // отправляем это обьект curentPopup в функцию popupOpen
			e.preventDefault(); //блокируем дальнейшую работу ссылки (запрещаем ей перезагружать страницу)
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup'); //получаем все обьекты с классом close-popup

if (popupCloseIcon.length > 0) { //делаем проверку существуют ли такие обьекты на странице
	for (let index = 0; index < popupCloseIcon.length; index++) { //бегаем циклом по всем таким обьектам
		const el = popupCloseIcon[index]; // и получаем каждый в переменную el
		el.addEventListener('click', function (e) { //вешаем событие клик на el
			popupClose(el.closest('.popup')); //отправляем в функцию popupClose обьект, который является ближайшим родителем нажавшего обьекта с классом popup
			e.preventDefault(); //блокируем дальнейшую работу ссылки (запрещаем ей перезагружать страницу)
		});
	}
}

function popupOpen(curentPopup) { //передаем уже готовый обьект по индетефикатору
	if (curentPopup && unlock) { //проверяем есть ли у нас такой обьект и открытая (unlock = true) ли у нас переменная unlock
		const popupActive = document.querySelector('.popup.open'); //получаем все обьекты с классом popup open (открытый попап)
		if (popupActive) { //если открытый попап существует
			popupClose(popupActive, false); //то мы закрываем его
		} else { //иначе
			bodyLock(); //блокируем скролл
		}
		curentPopup.classList.add('open'); //нашему обьекту(curentPopup) добавляем класс open
		curentPopup.addEventListener("click", function (e) { //вешаем событие клик на curentPopup
			if (!e.target.closest('.popup__content')) { //если у нажатого обьекта нету родителя с классом popup__content (отсекаем все, кроме темной области)
				popupClose(e.target.closest('.popup')); //тогда мы попап закрываем (передаем в функцию popupClose наш ближайший обьект с классом popup)
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) { //передаем в функцию открытый попап (popupActive) и значение стоит ли нам блокировать скролл или не нужно
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'; //высчитываем разницу между шириной экрана и враппера в пикселях (таким образом разница это ширина скролла)

	if (lockPadding.length > 0) { //делаем проверку существуют ли такие обьекты на странице
		for (let index = 0; index < lockPadding.length; index++) { //бегаем циклом по всем таким обьектам
			const el = lockPadding[index];  //и получаем каждый в переменную el
			el.style.paddingRight = lockPaddingValue; //присваеваем это значение в виде паддинга справа для el (елемента с классом lock-padding)
		}
	}
	body.style.paddingRight = lockPaddingValue; //присваеваем это значение в виде паддинга справа для body (style = "padding-right: 17px")
	body.classList.add('lock'); //добавляем body класс lock

	unlock = false; //на время блочим переменную unlock
	setTimeout(function () {
		unlock = true; //и через какое-то время (то, что указано в timeout) мы возвращаем true
	}, timeout); //это для того, чтобы не было повторных нажатий. чтобы в момент пока попап закрывается, пользователь не смог его повторно открыть, пока он полностью не закроется.
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) { //делаем проверку существуют ли такие обьекты на странице
			for (let index = 0; index < lockPadding.length; index++) { //бегаем циклом по всем таким обьектам
				const el = lockPadding[index]; //и получаем каждый в переменную el
				el.style.paddingRight = '0px'; //присваеваем el (елементу с классом lock-padding) значение style = "padding-right: 0px" 
			}
		}
		body.style.paddingRight = '0px'; //присваеваем body значение style = "padding-right: 0px" 
		body.classList.remove('lock'); //удаляем у body класс lock
	}, timeout); //за время указанное в переменной timeout

	unlock = false; //на время блочим переменную unlock
	setTimeout(function () {
		unlock = true;  //и через какое-то время (то, что указано в timeout) мы возвращаем true
	}, timeout);  //это для того, чтобы не было повторных нажатий. чтобы в момент пока попап открывается, пользователь не смог его закрыть, пока он полностью не откроется.
}

document.addEventListener('keydown', function (e) {
	if (e.key === "Escape") {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});


//полифилы
// (function () {
// 	// проверяем поддержку
// 	if (!Element.prototype.closest) {
// 		// реализуем
// 		Element.prototype.closest = function (css) {
// 			var node = this;
// 			while (node) {
// 				if (node.matches(css)) return node;
// 				else node = node.parentElement;
// 			}
// 			return null;
// 		};
// 	}
// })();
// (function () {
// 	// проверяем поддержку
// 	if (!Element.prototype.matches) {
// 		// определяем свойство
// 		Element.prototype.matches = Element.prototype.matchesSelector ||
// 			Element.prototype.webkitMatchesSelector ||
// 			Element.prototype.mozMatchesSelector ||
// 			Element.prototype.msMatchesSelector;
// 	}
// })();
