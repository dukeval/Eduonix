class Student {
    private static startID:number = 1000;
    readonly id;
    name:string;
    grade:string;
    total: number;
    address:string;
    age:number;

    constructor(name:string,address:string,age:number,grade:string,total:number){
        this.id = Student.startID;
        this.name=name;
        this.address= address;
        this.age = age;
        this.grade=grade;
        this.total=total;

        Student.startID+=1;
    }
}

let students:Student[] =[];

function registerUser():void {
    let studentName = (document.querySelector("#name") as HTMLInputElement);
    let studentAddress = (document.querySelector("#address") as HTMLInputElement);
    let studentAge = (document.querySelector("#age") as HTMLInputElement);
    let studentGrade = (document.querySelector("#grade") as HTMLInputElement);
    let studentTotal = (document.querySelector("#total") as HTMLInputElement);

    students.push(new Student(studentName.value,studentAddress.value,parseInt(studentAge.value), studentGrade.value,parseInt(studentTotal.value))); 
    
    studentName.value= '';
    studentAddress.value= '';
    studentAge.value= '';
    studentGrade.value= '';
    studentTotal.value= '';
}

function displayUser(){   
    const studentList =  (document.querySelector("#studentList")as HTMLInputElement);
    
    clearNodeList(studentList);

    students.forEach((item)=>{
        studentList.insertAdjacentHTML('afterbegin',`<li>Student ID: ${item.id} <br/>
                                                     Student Name: ${item.name} <br/>
                                                     Studeent Address: ${item.address} <br/>
                                                     Studeent Age: ${item.age} <br/>
                                                     Studeent Grade: ${item.grade} <br/>
                                                     Studeent Total: ${item.total}
                                                 </li>`)
    });
}

function clearNodeList(nodeList):void{
    let itemsToRemove:ChildNode[] =[];

    nodeList.childNodes.forEach(node=>{
        itemsToRemove.push(node);
    });

    itemsToRemove.forEach(element => {
        nodeList.removeChild(element);
    });


}