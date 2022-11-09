Chart.defaults.color = "#240c30";

new (class {
	constructor() {
		this.parseCSV()
			.then(this.getData)
			.then(this.createChart);
	}

	async parseCSV() {
		const response = await fetch("data/researchdata.csv");
		const data = await response.text();
		const lines = data.split("\n");

		return lines.slice(1, lines.length - 1);
	}

	async getData(lines) {
		const xGroups = [],
			yt1 = [],
			yt2 = [],
			yt3 = [],
			yt4 = [],
			yt5 = [];

		const pushMass = (array, mass) => array.push(parseFloat(mass));

		lines.forEach((line) => {
			const [group, t1, t2, t3, t4, t5] = line.split(",");
			xGroups.push(group);

			pushMass(yt1, t1);
			pushMass(yt2, t2);
			pushMass(yt3, t3);
			pushMass(yt4, t4);
			pushMass(yt5, t5);
		});

		return { xGroups, yt1, yt2, yt3, yt4, yt5 };
	}

	createChart({ xGroups, yt1, yt2, yt3, yt4, yt5 }) {
		new Chart(document.getElementById('lineChart'), {
			type: 'bar',
			data: {
				labels: xGroups,
				datasets: [
					{
						label: 'Trial 1',
						data: yt1,
						backgroundColor: ['rgba(154, 66, 199, 0.5)'],
						borderColor: ['rgba(154, 66, 199, 1)'],
						borderWidth: 1
					},
					{
						label: 'Trial 2',
						data: yt2,
						backgroundColor: ['rgba(129, 80, 212, 0.5)'],
						borderColor: ['rgba(129, 80, 212, 1)'],
						borderWidth: 1
					},
					{
						label: 'Trial 3',
						data: yt3,
						backgroundColor: ['rgba(97, 53, 171, 0.5)'],
						borderColor: ['rgba(97, 53, 171, 1)'],
						borderWidth: 1
					},
					{
						label: 'Trial 4',
						data: yt4,
						backgroundColor: ['rgba(69, 32, 133, .5)'],
						borderColor: ['rgba(69, 32, 133, 1)'],
						borderWidth: 1
					},
					{
						label: 'Trial 5',
						data: yt5,
						backgroundColor: ['rgba(21, 3, 54, 0.5)'],
						borderColor: ['rgba(21, 3, 54, 1)'],
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
							text: 'Group',
							font: {
								size: 20
							},
						},
						ticks: {
						},
					},
					y: {
						title: {
							display: true,
							text: 'Diff. in Mass',
							font: {
								size: 20
							},
						},
						ticks: {
						}
					}
				},
				plugins: {                          // title and legend display options
					title: {
						display: true,
						text: 'Differences in Masses (g) of Chlorophytum Comosum plants with 2g, 4g, and 6g of Trichoderma',
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