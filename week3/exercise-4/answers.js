function mapToSquare (input) {
    // TODO ใช้ .map สร้าง array ที่เป็นเลขยกกำลังสองของ input
    return input.map(x => x**2)
}

function convertTemperature (input) {
    // TODO: ให้แปลงอุณหภูมิจาก °F เป็น °C โดยใช้ฟังก์ชัน .map()
    function fah_to_celsius (fah) {
        let cel = (fah - 32) * 5 / 9
        return Number(cel.toFixed(1))
    }
    input.map(item => item.temperature = fah_to_celsius(item.temperature))
    return input
}

function filterEvenNumber (input) {
    // TODO: filter input เอาเลขคู่เท่านั้น
    return input.filter(even => even%2 == 0)
}

function filterAgeRange (input) {
    // TODO: กรอง input.people ตามช่วงอายุ
    return input.people.filter(info => info.age <= input.max && info.age >= input.min)
}

function removeByFilter (input) {
    // TODO: ลบ Object ใน Array ด้วยการ filter
    return input.people.filter(info => info.id != input.removeId)
}