const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./counter');
const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    employee_id: {
        type: Number,
        required: true,
        default: 0
    },
    dob: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    photo_url: {
        type: String,
    }
});

EmployeeSchema.pre('save', function(next) {
    const self = this;
    Counter.findByIdAndUpdate({_id: 'employee_id'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        self.employee_id = counter.seq;
        next();
    });
});

module.exports = mongoose.model('Employee', EmployeeSchema);
