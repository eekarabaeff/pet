document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('population-chart');
    const chartData = JSON.parse(ctx.dataset.chart);
    
    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right' }
            },
            scales: {
                x: { 
                    grid: { display: false }, 
                    stacked: true 
                },
                y: { 
                    grid: { display: false },
                    stacked: true
                }
            }
        }
    });
});