var fs = require('fs');
var data = fs.readFileSync('student.json');

var students = JSON.parse(data);
console.log(students)

const express = require('express')
const app = express()

const getNewId = (students) => {
    if (students.length > 0) {
        return students[students.length - 1].id + 1
    } else {
        return 1
    }
}

app.get("/", (req, res) => {
    console.log('respond')
    res.send("Hello")
})

app.get("/students", (req, res) => {
    console.log('get api')
    let student = students.filter( x => x.is_deleted === false);
    res.send(student)
})

app.get("/students/:id", (req, res) => {
    let student = students.filter( x => x.id === req.params.id);
    res.send(student)
})

app.post("/students", (req, res) => {
    const id = () => this.getNewId(students) 
    console.log(req.body)
    const first_name = req.body.first_name
    const middle_name  = req.body.middle_name
    const last_name = req.body.last_name
    const dob = req.body.dob
    const address = req.body.address
    const education = req.body.education
    const is_deleted =  false
    const specialization = req.body.specialization

    new_student = {id, first_name, middle_name, last_name, dob, address, education, is_deleted, specialization }
    students.push(new_student)

    var data = JSON.stringify(students);
    fs.writeFile('student.json', data, ()=>{console.log('finished')});    
    res.send("Successfully added")
})

app.put("/students/:id", (req, res) => {
    let student = students.filter( x => x.id === req.params.id);
    if(req.body.first_name){
        student[first_name] = req.body.first_name
    }

    if(req.body.last_name){
        student[last_name] = req.body.last_name
    }

    if(req.body.dob){
        student[dob] = req.body.dob
    }

    if(req.body.education){
        student[education] = req.body.education
    }

    if(req.body.address){
        student[address] = req.body.address
    }

    var data = JSON.stringify(student);
    fs.writeFile('student.json', data, ()=>{console.log('finished')});    
    res.send("Successfully updated")
})

app.delete("/students/:id", (req, res) => {
    let student = students.filter( x => x.id === req.params.id);
    student[0].is_deleted = true
    var data = JSON.stringify(student[0]);
    fs.writeFile('student.json', data, ()=>{console.log('finished')});

    res.send("Successfully deleted")
})

app.listen(3001, () => {
    console.log('Check')
} )