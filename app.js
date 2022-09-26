const name = document.getElementById('name');
const studentList = document.getElementById('list-name');
const randomList = document.getElementById('list-random');
const addButton = document.getElementById('add');
const generateButton = document.getElementById('generate');
let names = [];
let random = [];
let now = new Date();
// let tomorrow = now.setDate(now.getDate() + 1);
// let nextDay = new Date(tomorrow).toLocaleDateString();
let next = 0;


// event to add new student
addButton.addEventListener("click", () => {
    const studentName = {
        name: name.value,
    };

    names.push(studentName);

    // window.localStorage.setItem("studentName", JSON.stringify(names));
    // console.table(names);
    // console.log(JSON.stringify(names));

    addToStudentList();

    name.value = "";
});

// event to do random
generateButton.addEventListener("click", () => {
    let randNames = Math.floor(Math.random() * names.length);
    let rand = names[randNames].name;

    const randomTable = {
        name: rand,
        date: "",
    }

    if (now.getDay() === 0) {
        now.setDate(now.getDate() + next + 1);
    } else if (now.getDay() === 6) {
        now.setDate(now.getDate() + next + 2);
    }else{
        now.setDate(now.getDate() + next + 1);
    }

    // next++;

    let date = now.toLocaleDateString("en-US");

    randomTable.date = date;

    random.push(randomTable);

    console.table(random);

    addToRandomList();

    // code for remove the student from first student list and add them to second list (list after random) in html code
    let student = names.find(randomTable => randomTable.name === rand);
    let studentIndex = names.indexOf(student)
    names.splice(studentIndex, 1);
    let nameTh = document.getElementById(rand);

    nameTh.parentNode.removeChild(nameTh);
});

// function for add list of students to html code
function addToStudentList() {
    let listName = "";

    names.forEach(student => {
        listName +=
            `<tr>
            <td id="${student.name}">${student.name}</td>
        </tr>`;
        // console.log(listName);
    })

    studentList.innerHTML = `
        <tr>
            <th>Name</th>
        </tr>
    ` + listName;
}

// function for add list of students after doing random to html code
function addToRandomList() {
    let listRandom = "";

    random.forEach(student => {

        listRandom +=
        `<tr>
            <td>${student.name}</td>
            <td>${student.date}</td>
        </tr>`;
    })



    randomList.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Date</th>
        </tr>
    ` + listRandom;
}

