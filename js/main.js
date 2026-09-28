// Модальное окно быстрого заказа есть только на главной странице,
// поэтому сначала проверяем, что оно найдено.
const orderDialog = document.getElementById('order-dialog');

if (orderDialog) {
    // Получаем все кнопки заказа в карточках товаров.
    const orderButtons = document.querySelectorAll('.product-card__button');

    // Получаем кнопку закрытия модального окна.
    const closeDialogButton = document.getElementById('close-order-dialog');

    // Получаем скрытое поле, в которое будет записан выбранный товар.
    const selectedProductInput = document.getElementById('selected-product');

    // Получаем место в окне, где показывается название товара.
    const dialogProductName = document.getElementById('order-dialog-product');

    // Перебираем все кнопки "Заказать".
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Получаем название товара из data-атрибута.
            const productName = button.dataset.product;

            // Записываем название товара в скрытое поле формы.
            selectedProductInput.value = productName;

            // Показываем название товара в модальном окне.
            dialogProductName.textContent = productName;

            // Открываем модальное окно.
            orderDialog.showModal();
        });
    });

    // Закрываем модальное окно по кнопке "Закрыть".
    closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
    });
}

// Если на страницу заявки перешли по кнопке "Заказать" из каталога,
// в адресе есть ?product=... и этот товар сразу выбирается в списке.
const productSelect = document.getElementById('order-product');

if (productSelect) {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');

    if (product) {
        productSelect.value = product;
    }
}

// Получаем форму заявки (в модальном окне или на странице order.html).
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

if (orderForm) {
    // Обрабатываем отправку формы.
    orderForm.addEventListener('submit', (event) => {
        // Отменяем стандартную отправку формы,
        // потому что backend пока не подключён.
        event.preventDefault();

        // Сбрасываем предыдущие признаки ошибок.
        const formElements = Array.from(orderForm.elements);

        formElements.forEach((element) => {
            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }
        });

        // Проверяем встроенные HTML-ограничения формы.
        if (!orderForm.checkValidity()) {
            formElements.forEach((element) => {
                if (element.willValidate && !element.checkValidity()) {
                    element.setAttribute('aria-invalid', 'true');
                }
            });

            // Показываем стандартные сообщения браузера.
            orderForm.reportValidity();
            return;
        }

        // Показываем сообщение об успешной отправке.
        successMessage.hidden = false;

        // Очищаем форму.
        orderForm.reset();

        // Закрываем модальное окно, если форма была в нём.
        if (orderDialog) {
            orderDialog.close();
        }
    });
}
