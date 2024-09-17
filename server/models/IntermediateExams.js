const mongoose = require("mongoose");

const IntermediateExamSchema = new mongoose.Schema({
    examType: {
        type: String,
        required: true,
    },
    resources: [{
        text: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    }],
    cutoffs: [{
        year: {
            type: Number,
            required: true,
        },
        general: {
            boys: {
                type: Number,
                required: true,
            },
            girls: {
                type: Number,
                required: true,
            },
        },
        obc: {
            boys: {
                type: Number,
                required: true,
            },
            girls: {
                type: Number,
                required: true,
            },
        },
        sc: {
            boys: {
                type: Number,
                required: true,
            },
            girls: {
                type: Number,
                required: true,
            },
        },
        st: {
            boys: {
                type: Number,
                required: true,
            },
            girls: {
                type: Number,
                required: true,
            },
        },
    }],
    importantDates: [{
        text: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    }],
    videoLecturers: [{
        text: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    }],
    topPerformers: [{
        rank: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    }],
});

module.exports = mongoose.model("IntermediateExam", IntermediateExamSchema);
