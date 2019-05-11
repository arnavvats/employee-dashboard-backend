const faker = require('faker');
const Counter = require('../models/counter');
const Employee = require('../models/employee');
const Skill = require('../models/skill');
const config = require('../config/database');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
async function setup() {
    await mongoose.connect(config.database, { promiseLibrary: require('bluebird') });
    await mongoose.connection.db.dropDatabase();
    await new Counter({_id: 'employee_id'}).save();
    console.log('Seeding database');
    let skills = [];
    for (let i = 0; i <20;i++) {
        skills.push(await new Skill({name: faker.random.word()}).save());
    }
    for(let i =0 ; i< 50;i++) {
        let noOfSkills = Math.floor(Math.random() * 10);
        let employeeSkills = [];
        for(let j = 0; j < noOfSkills; j++) {
            const randomSkillIndex = Math.floor(Math.random() * (skills.length - 1));
            if (employeeSkills.findIndex((el) => el === skills[randomSkillIndex]._id) === -1) {
                employeeSkills.push(skills[randomSkillIndex]._id);
            }
        }
        await new Employee({
            name: faker.fake("{{name.prefix}} {{name.lastName}} {{name.firstName}}"),
            dob: faker.date.past().toISOString(),
            salary: 10000 + Math.floor(Math.random() * 100000),
            skills: employeeSkills
        }).save();
    }

}
setup().then(res => {
    console.log('Open localhost:4200');
    process.exit();
});
