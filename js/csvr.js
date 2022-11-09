//Parse CSV data into arrays

async function getData(){
    const response = await fetch("../data/researchdata.csv");
    const data = await response.text();

    const table = data.split("\n").slice(0);

    table.forEach(row => {
        const columns = row.split(",");
        const group = columns[0];
        const t1 = columns[1];
        const t2 = columns[2];
        const t3 = columns[3];
        const t4 = columns[4];
        const t5 = columns[5];

        console.log(group, t1, t2, t3, t4, t5);
    })
}

getData();
