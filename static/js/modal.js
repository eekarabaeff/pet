const modalDict = {
    "spbcis": `
      <ul>
        <li>Сбор данных о социально-экономическом развитии Санкт-Петербурга</li>
        <li>Анализ основных статистических показателей</li>
        <li>Составление аналитических справок и отчётов</li>
      </ul>
    `,
  
    "lenta": `
      <ul>
        <li>Выгрузка данных из систем Hadoop, QlikView</li>
        <li>Расчёт ценовых показателей в Python (мода цен в группе и т.д.)</li>
        <li>Анализ ассортимента конкурентов и бизнес-подразделений (Excel)</li>
      </ul>
    `,
  
    "samokat": `
      <ul>
        <li>Составление отчётов и презентаций MS PowerPoint</li>
        <li>Подсчёт и обработка данных о входящих обращениях (с пом. библиотеки pandas)</li>
        <li>Рассылка и автоматизация отчётов внутри компании (с пом. библиотек руwin32)</li>
      </ul>
    `,
  
    "raif": `
      <ul>
        <li>Подсчет и анализ движения наличности в системе банка (SQL)</li>
        <li>Поддержка регулярной отчетности, разработка новых дашбордов (Power BI)</li>
        <li>Подсчет себестоимости по типу, месту и времени операций (в основном, в Python)</li>
      </ul>
    `
  };

document.addEventListener('DOMContentLoaded', function() {
    const innerBlocks = document.querySelectorAll(".inner-block");
    const modalWindow = document.getElementById("modalWindow");
    const modalHeader = document.getElementById('modalHeader');
    const modalTasks = document.getElementById('modalTasks');
    const closeBtn = document.getElementById("closeBtn");

    innerBlocks.forEach(item => {
        item.addEventListener("click", function() {
            const workplaceText = this.querySelector('.workplace').textContent;

            const parentBlock = this.closest('[id]');
            const itemId = parentBlock.id;

            modalHeader.textContent = workplaceText;
            modalTasks.innerHTML = modalDict[itemId];

            modalWindow.style.display = "block";
            document.body.style.overflow = "hidden";

        });
    });

    function closeModal() {
        modalWindow.style.display = 'none';
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener('click', closeModal);

    closeBtn.addEventListener('mouseover', function() {
        closeBtn.style.cursor = "pointer";
    });
    

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow) {
            modalWindow.style.display = 'none';
            document.body.style.overflow = "";
        }
    });

});