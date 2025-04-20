document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('population-chart');
    const chartData = JSON.parse(ctx.dataset.chart);
    
    // Убираем точки у всех линий
    chartData.datasets.forEach(dataset => {
        dataset.pointRadius = 0;          // Обычные точки не видны
        dataset.pointHoverRadius = 5;     // Точки появляются при наведении
        dataset.pointHitRadius = 10;
        dataset.tension = 0;       // Увеличиваем область наведения
    });
    
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { display: false } }
            }
        }
    });
});