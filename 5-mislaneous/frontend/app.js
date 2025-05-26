class person{

    constructor(name , age)
    {
        this.name = name;
        this.age = age;
        console.log("This is a person class");
    }
    talk(){

        console.log(`hi i am ${this.name}`);
    }
}

class student extends person{

    constructo
    r(name, age , marks)
    {
        console.log("This is a student class");
        super(name ,age);
        this.marks = marks;
    }
}

class teacher extends person{

    constructor(name , age , subject)
    {
        console.log("This is a teacher class");
        super(name , age);
        this.subject = subject;
    }
}

let st1 = new student("nishant ", 20 , 95);
console.log(st1.talk());
