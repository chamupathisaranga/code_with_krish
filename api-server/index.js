const express = require("express");
const { getMinValue, getMaxValue, getAverage, getSort, getCounts } = require("./utill");

const app = express();

const port = 3000;

app.get('/number/min', (req, res) => {
    var num1 = parseFloat(req.query.num1);
    var num2 = parseFloat(req.query.num2);
    const getResult = getMinValue(num1, num2)
    res.status(getResult.status).json(getResult.data);
})


app.get('/number/max', (req, res) => {
    const numbers = req.query.numbers;
    const getResult = getMaxValue(numbers);
    res.status(getResult.status).json(getResult.data);
});

app.get('/number/avg', (req, res) => {
    const numbers = req.query.numbers;
    const getResult = getAverage(numbers);
    res.send(getResult);
});

app.get('/number/sort', (req, res) => {
    const numbers = req.query.numbers;
    let type = req.query.type;
    const getResult = getSort(numbers, type);
    res.send(getResult);
});


app.get('/number/count', (req, res) => {
    const search = req.query.search;
    const numbers = req.query.numbers;

    const getResult=getCounts(numbers,search);
    res.send(getResult);

});

app.listen(port, () => {
    console.log(`Server is ruiing on port ${port}`)
})