const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
    try {
        // Call Java Spring Boot API
        const response = await axios.get('http://localhost:8081/invoices');
        const invoices = response.data;

        // Build an HTML table
        let html = `<h1>AutoCount Invoices</h1>
                    <table border="1" cellpadding="5" style="border-collapse:collapse;">
                        <tr>
                            <th>Doc No</th>
                            <th>Debtor Code</th>
                            <th>Date</th>
                            <th>Total</th>
                        </tr>`;

        invoices.forEach(inv => {
            html += `<tr>
                        <td>${inv.docNo}</td>
                        <td>${inv.debtorCode}</td>
                        <td>${inv.docDate}</td>
                        <td>${inv.total}</td>
                    </tr>`;
        });

        html += `</table>`;
        res.send(html);

    } catch (error) {
        console.error(error);
        res.send('Error fetching data from Java service. Make sure your Java API is running on port 8081.');
    }
});

app.listen(3000, () => {
    console.log('Node.js web app running on http://localhost:3000');
});