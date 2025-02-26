
module.exports.getMinValue = (number1, number2) => {
    if (isNaN(number1) || isNaN(number2)) {
        return { status: 400, data: { error: "both parameters should be numbers" } }
    } else {
        const min = number1 < number2 ? number1 : number2;

        return { status: 200, data: { min: min } }
    }
}


module.exports.getMaxValue = (numbers) => {
    let splitNumbers = numbers.split(",");

    const numberArray = splitNumbers.map(number => {
        return parseFloat(number);
    })

    if (numberArray.some(isNaN)) {
        return { status: 400, data: { error: "Please check your values again" } }
    }
    let maxvalue = numberArray[0];

    for (let i = 0; i < numberArray.length; i++) {
        if (numberArray[i] > maxvalue) {
            maxvalue = numberArray[i];
        }

    }
    return { status: 200, data: { max: maxvalue } }
}

module.exports.getAverage = (numbers) => {

    let splitNumbers = numbers.split(",");

    const numberArray = splitNumbers.map(number => {
        return parseFloat(number);
    })

    if (numberArray.some(isNaN)) {
        return { status: 400, data: { error: "Please check your values again" } }
    }

    var total = 0;
    numberArray.forEach(num => {
        console.log(num);
        total += parseInt(num);
    });

    let avg = total / numberArray.length;

    return { status: 200, data: { avg: avg } }

}

module.exports.getSort = (numbers, type) => {
    let splitNumbers = numbers.split(",");
    const numberArray = splitNumbers.map(number => {
        return parseFloat(number);
    })
    if (numberArray.some(isNaN)) {
        return { status: 400, data: { error: "Please check your values again" } }
    }

    for (let i = 0; i < numberArray.length; i++) {
        for (let j = i + 1; j < numberArray.length; j++) {
            let temp = numberArray[i];
            if ((type === "asc" && numberArray[i] > numberArray[j])) {

                numberArray[i] = numberArray[j];
                numberArray[j] = temp;

            } else if ((type === "dec" && numberArray[i] < numberArray[j])) {

                numberArray[i] = numberArray[j];
                numberArray[j] = temp;
            }
        }
    }

    return { status: 200, data: { sortedValues: numberArray } }
}


module.exports.getCounts = (numbers, search) => {
    let splitsValues = numbers.split(",");

    const array = splitsValues.map(val => {
        return val;
    })

    let count = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] === search) {
            count += 1;
        }

    }
    return { status: 200, data: { Count: count } }
}