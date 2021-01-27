function getDayName (input) {
    // input เป็นเลข 0-6
    // TODO: แปลงเลข 0-6 เป็น วันอาทิตย์ - วันเสาร์

    // hint
    // const daysInWeek = ['วันอาทิตย์', 'วันจันทร์', /*...*/]
    let day = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"]
    return day[input]
}

function formatDate (input) {
    // input เป็น Object ในรูปแบบ
    // {
    //     day: 6, // 0=วันอาทิตย์, 1=วันจันทร์, 2=วันอังคาร, ...
    //     date: 15, // วันที่ 1-31
    //     month: 0, // 0=มกราคม, 1=กุมภาพันธ์, ...
    //     year: 2021 // ปี
    // }
    // TODO: แปลง input เป็น String ในรูปแบบ "วันศุกร์ที่ 15 มกราคม พ.ศ. 2564"
    let days = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"]
    let month = ["มกราคม", "กุมพาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
                "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
    let year = input.year + 543
    return days[input.day] + "ที่ " + input.date + " " + month[input.month] + " พ.ศ. " + year
}

function findTotal (input) {
    // input เป็น array ของตัวเลข
    // TODO: ให้หาผลบวกของเลขทั้งหมดใน input
    let result = 0
    for (let i = 0 ; i < input.length ; i ++){
        result += input[i]
    }
    return result
}

function findMinMax (input) {
    // input เป็น array ของตัวเลข
    // TODO: ให้หาตัวเลขที่มากที่สุดและน้อยที่สุดใน input
    let numMax = input[0]
    let numMin = input[0]
    for (let i = 0 ; i < input.length ; i++){
        if(input[i] >= numMax){
            numMax = input[i]
        }
    }
    for (let i = 0 ; i < input.length ; i++){
        if(input[i] < numMin){
            numMin = input[i]
        }
    }
    return {min:numMin, max:numMax}
}

function findBMI (input) {
    // กำหนดให้ input เป็น Array ของ Object ในรูปแบบ
    // [
    //     {
    //         name: "ABC DEF", // ชื่อ นามสกุล
    //         height: 167, // ความสูง มีหน่วยเป็น cm
    //         weight: 72 // น้ำหนัก มีหน่วยเป็น kg
    //     },
    //     {
    //         name: "XYZ DEF", // ชื่อ นามสกุล
    //         height: 194, // ความสูง มีหน่วยเป็น cm
    //         weight: 60 // น้ำหนัก มีหน่วยเป็น kg
    //     },
    //     ...
    // ]
    // TODO: ให้คำนวณดัชนีมวลการ (Body Mass Index, bmi) ของแต่ละคน
    let result = []
    for (let i = 0 ; i < input.length ; i ++){
        let numBmi = input[i].weight / (input[i].height/100)**2
        result[i] = {name:input[i].name, height:input[i].height, weight:input[i].weight, bmi:numBmi.toFixed(2)}
    }
    return result
}