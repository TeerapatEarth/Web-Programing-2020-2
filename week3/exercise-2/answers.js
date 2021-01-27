function convertADtoBE(input) {
    // AD คือคริสดศักราย
    // BE คือพุทธศักราช
    //
    // TODO: แปลงปีใน คริสตศักราช เป็น พุทธศักราช เช่น 2000 เป็น "พ.ศ. 2543"
    // โดยให้เติมตัวอักษร พ.ศ. เข้าไปด้านหน้าด้วย
    if (typeof input === "string" || parseInt(input) < 0){
        return "ไม่ถูกต้อง"
    }
    else {
        let numberInt = parseInt(input) + 543
        return "พ.ศ. " + numberInt
    }
}

function evenOrOdd(input) {
    // TODO: ให้ตรวจสอบว่าตัวเลข input เป็นเลขคู่หรือเลขคี่
    if (input % 2 == 0){
        return "even"
    }
    else{
        return "odd"
    }
}

function getFullName(input) {
    // TODO: ให้นำคำนำหน้าชื่อ ชื่อต้น นามสกุล มาต่อกัน
    if(input.sex === "male"){
        return "Mr. " + input.firstName + " " + input.lastName
    }
    else{
        return "Ms. " + input.firstName + " " + input.lastName
    }

}

function getFirstName(input) {
    // TODO: ให้ทำการตัดนามสกุลออกโดยใช้ indexOf() และ substring()
    for (let i = 0 ; i < input.length ; i++){
        if(input[i] === " "){
            let space = input.indexOf(" ")
            let firstname = input.substring(0, space)
            return firstname
        }
    }
}

function splitName(input) {
    // TODO: ให้ทำการแยก ชื่อต้นกับนามสกุล
    for (let i = 0 ; i < input.length ; i++){
        if(input[i] === " "){
            let space = input.indexOf(" ")
            let valuefname = input.substring(0, space)
            let valuelname = input.substring(space + 1, input.length)
            return {firstName:valuefname, lastName:valuelname}
        }
    }
}