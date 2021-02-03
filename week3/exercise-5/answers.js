function insertBySplice (input) {
    // TODO: ให้ใช้ฟังก์ชัน .splice() ในการ **แทรก (insert)** สมาชิกเข้าไปใน Array  
    // เรียงลำดับตัวเลขให้ถูกต้อง
    input.splice(3,0,3)
    return input
}

function removeBySplice (input) {
    // TODO: ให้ใช้ฟังก์ชัน .splice() ในการ **ลบ (remove)** สมาชิกออกจาก Array  
    // เรียงลำดับตัวเลขให้ถูกต้อง
    input.splice(4,2)
    return input
}

function replaceBySplice (input) {
    // TODO: ให้ใช้ฟังก์ชัน .splice() ในการ **เปลี่ยน (replace)** สมาชิกใน Array  
    // เรียงลำดับตัวเลขให้ถูกต้อง
    input.splice(4, 1, 4)
    return input
}

function findAverage(input) {
    // TODO: ให้ใช้ฟังก์ชัน .map() และ/หรือ .filter() และ/หรือ .reduce() ในการหาค่าเฉลี่ยของตัวเลขทั้งหมดใน input  
    // (ให้ถือว่า null, undefined, '' เป็น 0)
    let array = input.filter(zero => zero != null && zero != "" && zero != undefined)
    let result = array.reduce((num1, num2) => {return num1 + num2}, 0)/input.length
    return result
}