

//part 1:
const name= "3m nawnaw";
let age= 3;
const ID= 2023;
let isEnrolled= true;
let grade= null;

console.log("part 1:")
console.log("student info")
console.log(`Name: ${name} - Type: ${typeof(name)}`);
console.log(`Age: ${age} - Type: ${typeof(age)}`);
console.log(`ID: ${ID} - Type: ${typeof(ID)}`);
console.log(`Is Enrolled: ${isEnrolled} - Type: ${typeof(isEnrolled)}`);
console.log(`Grade: ${grade} - Type: ${typeof(grade)}`);



//part 2:
let grade1="85";
let grade2="90";
let grade3="78";
grade1=Number(grade1);
grade2=Number(grade2);
grade3=Number(grade3);
let total = grade1;
total+=grade2;
total+=grade3;
let average = total/3;
let newAvg=average+=5;
console.log("part 2: ");
console.log(`Total score: ${total}\nAverage before Bonus: ${average}\nAverage after Bonus: ${newAvg}`);


//part 3:
if (average>=90)
    grade="A";
else if (average>=80)
    grade="B";
else if (average>=70)
    grade="C";
else if (average>=60)
    grade="D";
else 
    grade="F";

console.log(`Final Grade: ${grade}`);
if (grade!=="F" && isEnrolled)
    console.log(`Status: ✅ Student ${name} has passed and is enrolled!`)
else
    console.log(`Status: ❎ Student ${name} has not passed or is not enrolled!`);



//part 4:
const lowerName=name.toLowerCase();
const upperName=name.toUpperCase();
const firstChar=name.charAt(0);
let containsAhmed=name.includes("Ahmed");
let length=name.length;
let names=name.split(" ");

console.log(`uppercase: ${upperName}`);
console.log(`lowercase: ${lowerName}`);
console.log(`firts letter: ${firstChar}`);
console.log(`contains 'Ahmed': ${containsAhmed}`);
console.log(`Name length: ${length}`);
console.log(`Name Parts: ${names}`);

//part 5:
function calculateGrade(score1, score2, score3){
    return (score1+score2+score3)/3;
}
const getGradeLevel = (average) => {
    let g=null;
    if (average>=90)
        g="A";
    else if (average>=80)
        g="B";
    else if (average>=70)
        g="C";
    else if (average>=60)
        g="D";
    else 
        g="F";
    return g;
};

const formatStudentInfo = (name,age,grade)=> `Name: ${name}, age: ${age}, grade: ${age}`;
let calcg=calculateGrade(grade1,grade2,grade3);
let getglevel=getGradeLevel(grade);
let formattedsi=formatStudentInfo(name,age,getglevel);
console.log(`calculateGrade: ${calcg}`);
console.log(`getGradeLevel: ${getglevel}`);
console.log(`formatStudentInfo: ${formattedsi}`);


//part 6:

let scores=[85,90,78,92,88];
let Student={
    name: "3m nawnaw",
    age: 3,
    ID: "STD001",
    scores: [85,90,78,92,88],
    grade: "B"
};

console.log(scores[0]);
console.log(scores[-1]);
console.log(Student.name);
console.log(Student.ID);


//part 7:
for (let i=0;i<scores.length;i++){
    console.log(`score ${i}: ${scores[i]}`);
}
let whileidx=0;
let whilesum=0;
while (whileidx<scores.length){
    whilesum+=scores[whileidx];
    whileidx++;
}
console.log("---");
console.log(`total sum: ${whilesum}`);
console.log(`Average: ${whilesum/scores.length}`);

//part 8:
function generateStudentReport(student){
    console.log("╔════════════════════════════════════════╗\n║       STUDENT GRADE REPORT             ║\n╚════════════════════════════════════════╝");
    console.log(`Student: ${student.name} (ID: ${student.ID})`);
    console.log(`Age: ${student.age} years old`);
    if (student.isEnrolled)
        console.log("Enrollment Status: ✅ Enrolled");
    else
        console.log("Enrollment Status: ❎ not Enrolled");
    console.log("📊 Academic Performance:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    for (let i=0;i<scores.length;i++){
        console.log(`Exam ${i}: ${scores[i]}`);
    }
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Total score: ${total}`)
    console.log(`Average: ${newAvg}`);
    console.log(`Final Grade: ${grade}`);
    // if (grade!=="F" && isEnrolled)
    //     console.log("✅ Status: PASSED")
    // else
    //     console.log("❎ Status: FAILED");
    (grade!=="F" && isEnrolled)? console.log("✅ Status: PASSED") : console.log("❎ Status: FAILED"); 
}

generateStudentReport(Student);


