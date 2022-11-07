new (class {
	constructor() {
		this.parseCSV()
			.then(this.getData)
			.then(this.createChart);
	}

	async parseCSV() {
		const response = await fetch("../data/test.csv");
		const data = await response.text();
		const lines = data.split("\n");

		return lines.slice(1, lines.length - 1);
	}

	async getData(lines) {
		const xYears = [],
			yTemps = [],
			yTempsNH = [],
			yTempsSH = [];

		const pushTemp = (array, temp) => array.push(parseFloat(temp) + 14);

		lines.forEach((line) => {
			const [year, globalTempDeviation, nhTemp, shTemp] = line.split(",");
			xYears.push(year);

			pushTemp(yTemps, globalTempDeviation);
			pushTemp(yTempsNH, nhTemp);
			pushTemp(yTempsSH, shTemp);
		});

		return { xYears, yTemps, yTempsNH, yTempsSH };
	}

	createChart({ xYears, yTemps, yTempsNH, yTempsSH }) {
		new Chart(document.getElementById('myChart'), {
			type: 'line',
			data: {
				labels: xYears,
				datasets: [
					{
						label: 'Global Temp. Deviations',
						data: yTemps,
						// 'rgba(54, 162, 235, 0.2)',
						// 'rgba(255, 206, 86, 0.2)',
						// 'rgba(75, 192, 192, 0.2)',
						// 'rgba(153, 102, 255, 0.2)',
						// 'rgba(255, 159, 64, 0.2)'
						backgroundColor: ['rgba(255, 99, 132, 0.2)'],
						// 'rgba(54, 162, 235, 1)',
						// 'rgba(255, 206, 86, 1)',
						// 'rgba(75, 192, 192, 1)',
						// 'rgba(153, 102, 255, 1)',
						// 'rgba(255, 159, 64, 1)'
						borderColor: ['rgba(255, 99, 132, 1)'],
						borderWidth: 1
					},
					{
						label: 'Northern Hemisphere Temps.',
						data: yTempsNH,
						backgroundColor: ['rgba(54, 162, 235, 0.2)'],
						borderColor: ['rgba(54, 162, 235, 1)'],
						borderWidth: 1
					},
					{
						label: 'Southern Hemisphere Temps.',
						data: yTempsSH,
						backgroundColor: ['rgba(255, 206, 86, 0.2)'],
						borderColor: ['rgba(255, 206, 86, 1)'],
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,                   // Re-size based on screen size
				scales: {                           // x & y axes display options
					x: {
						title: {
							display: true,
							text: 'Year',
							font: {
								size: 20
							},
						},
						ticks: {
							callback(val, index) {
								return index % 5 == 0 ? this.getLabelForValue(val) : '';
							},
						},
					},
					y: {
						title: {
							display: true,
							text: 'Global Mean Temperatures (C°)',
							font: {
								size: 20
							},
						},
						ticks: {
							maxTicksLimit: yTemps.length / 20,
						}
					}
				},
				plugins: {                          // title and legend display options
					title: {
						display: true,
						text: 'Combined Land-Surface Air and Sea-Surface Water Temperature',
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
})();