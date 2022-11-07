//Graph CSV data using chart.js

const xYears = [];
const yTemps = [];

//Parse CSV data into arrays

async function getData(){
    const response = await fetch("../data/test.csv");
    const data = await response.text();

    const table = data.split("\n").slice(1);

    table.forEach(row => {
        const columns = row.split(",");
        const year = columns[0];
        xYears.push(year);

        const temp = columns[1];
        yTemps.push(temp);

        const nhTemp = columns[2];

        const shTemp = columns[3];  
    })
}

async function createChart(){
    await getData();

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,                   // Re-size based on screen size
        scales: {                           // x & y axes display options
            x: {
                title: {
                    display: true,
                    text: 'x-Axis Title',
                    font: {
                        size: 20
                    },
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'y-Axis Title',
                    font: {
                        size: 20
                    },
                }
            }
        },
        plugins: {                          // title and legend display options
            title: {
                display: true,
                text: 'Custom Chart Title',
                font: {
                    size: 24
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                position: 'bottom'
            }
        }
    }
});
}

createChart();