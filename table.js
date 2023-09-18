fetch('http://localhost:3000/api/data')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML="";
        data?.forEach(item => {
            const row = document.createElement('tr');
            const timestampCell = document.createElement('td');
            const numbersCellOne = document.createElement('td');
            const numbersCellTwo = document.createElement('td');
            const numbersCellThree = document.createElement('td');
            const numbersCellFour = document.createElement('td');

            timestampCell.textContent = item.formattedTime;
            numbersCellOne.textContent = item.numbers[0];
            numbersCellTwo.textContent = item.numbers[1];
            numbersCellThree.textContent = item.numbers[2];
            numbersCellFour.textContent = item.numbers[3];

            row.append(timestampCell);
            row.append(numbersCellOne,numbersCellTwo,numbersCellThree,numbersCellFour);
            tableBody.append(row);
        });
    })