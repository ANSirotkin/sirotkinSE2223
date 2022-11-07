//Parse CSV data into arrays

async function getData(){
    const response = await fetch("../data/test.csv");
    const data = await response.text();

    const table = data.split("\n").slice(1);

    table.forEach(row => {
        const columns = row.split(",");
        const year = columns[0];
        const temp = columns[1];
        const nhTemp = columns[2];
        const shTemp = columns[3];
        console.log(year, temp, nhTemp, shTemp);
    })
}

getData();
