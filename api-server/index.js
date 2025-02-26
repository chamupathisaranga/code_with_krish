// const express = require("express");
// const { getMinValue, getMaxValue, getAverage, getSort } = require("./utill");

// const app = express();

// const port = 3000;


// app.get('/number/count', (req, res) => { }); ///number/count?numbers=1,A,saman,Kamal,676,......n&search=saman //need to return how many occurances

// var num1;
// var num2;

// app.get('/number/min', (req, res) => {
//     num1 = parseFloat(req.query.num1);
//     num2 = parseFloat(req.query.num2);

//     const getResult = getMinValue(num1, num2)

//     res.status(getResult.status).json(getResult.data);
// })

// app.get('/number/max', (req, res) => {
//     num1 = parseFloat(req.query.num1);
//     num2 = parseFloat(req.query.num2);

//     const getResult = getMaxValue(num1, num2);

//     res.status(getResult.status).json(getResult.data);
// });

// app.get('/number/avg', (req, res) => { 
//     numbers = req.query.numbers;
//     const getResult= getAverage(numbers);
//     res.send(getResult);
//     // res.status(getResult.status).json(getResult.data);
// }); ///number/avg?numbers=1,4,7,44,676,......n



// app.get('/number/sort', (req, res) => {
//     numbers = req.query.numbers;
//     let type=req.query.type;
//     const getResult= getSort(numbers,type);
//     res.send(getResult);
// }); ///number/sort?numbers=1,4,7,44,676,......n&type (asc |dec)

// app.listen(port, () => {
//     console.log(`Server is ruiing on port ${port}`)
// })



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