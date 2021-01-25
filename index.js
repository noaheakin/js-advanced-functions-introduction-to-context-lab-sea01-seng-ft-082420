function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(records) {
    return records.map (record => createEmployeeRecord(record))
}

function createTimeInEvent(employee, time) {
    let dateTime = time.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(dateTime[1]), 
        date: dateTime[0]
    })
    return employee
}

function createTimeOutEvent(employee, time) {
    let dateTime = time.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    })
    return employee
}

function hoursWorkedOnDate(employee, target) {
    let outTime = employee.timeOutEvents.find(shift => shift.date === target).hour
    let inTime = employee.timeInEvents.find(shift => shift.date === target).hour
    return (outTime - inTime) / 100
}

function wagesEarnedOnDate(employee, target) {
    return hoursWorkedOnDate(employee, target) * employee.payPerHour
}

function allWagesFor(employee) {
    let total = 0
    let datesWorked = employee.timeInEvents.map(shift => shift.date)
    for (let i = 0; i < datesWorked.length; i ++) {
        total += wagesEarnedOnDate(employee, datesWorked[i])
    }
    return total
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name)
}

function calculatePayroll(employees) {
    let grandTotal = 0
    for (let i = 0; i < employees.length; i ++) {
        grandTotal += allWagesFor(employees[i])
    }
    return grandTotal
}