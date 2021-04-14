var Student = /** @class */ (function () {
    function Student(name, address, age, grade, total) {
        this.id = Student.startID;
        this.name = name;
        this.address = address;
        this.age = age;
        this.grade = grade;
        this.total = total;
        Student.startID += 1;
    }
    Student.startID = 1000;
    return Student;
}());
var students = [];
function registerUser() {
    var studentName = document.querySelector("#name");
    var studentAddress = document.querySelector("#address");
    var studentAge = document.querySelector("#age");
    var studentGrade = document.querySelector("#grade");
    var studentTotal = document.querySelector("#total");
    students.push(new Student(studentName.value, studentAddress.value, parseInt(studentAge.value), studentGrade.value, parseInt(studentTotal.value)));
    studentName.value = '';
    studentAddress.value = '';
    studentAge.value = '';
    studentGrade.value = '';
    studentTotal.value = '';
}
function displayUser() {
    var studentList = document.querySelector("#studentList");
    clearNodeList(studentList);
    students.forEach(function (item) {
        studentList.insertAdjacentHTML('afterbegin', "<li>Student ID: " + item.id + " <br/>\n                                                     Student Name: " + item.name + " <br/>\n                                                     Studeent Address: " + item.address + " <br/>\n                                                     Studeent Age: " + item.age + " <br/>\n                                                     Studeent Grade: " + item.grade + " <br/>\n                                                     Studeent Total: " + item.total + "\n                                                 </li>");
    });
}
function clearNodeList(nodeList) {
    var itemsToRemove = [];
    nodeList.childNodes.forEach(function (node) {
        itemsToRemove.push(node);
    });
    itemsToRemove.forEach(function (element) {
        nodeList.removeChild(element);
    });
}
