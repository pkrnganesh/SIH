const dotenv = require("dotenv");
const moment = require("moment");
const indianHolidays = require("../utils/indianHolidays");
const fs = require("fs");
dotenv.config();

function calculateSubjectCounts(dayCountsString, timetableResponse) {
    const dayCounts = JSON.parse(dayCountsString);
    const schedule = timetableResponse.schedule;
  
    const subjectCounts = {};
  
    Object.entries(schedule).forEach(([day, subjects]) => {
      const dayCount = dayCounts[day];
      subjects.forEach(subjectObj => {
        const subject = subjectObj.subject;
        if (!subjectCounts[subject]) {
          subjectCounts[subject] = 0;
        }
        subjectCounts[subject] += dayCount;
      });
    });
  console.log("calculateSubjectCounts",calculateSubjectCounts)
    return subjectCounts;
  }
  
  
  
  const calculateNumberofClassesperSubject = (timetableResponse, validdate) => {
    const subjectCounts = {};
  
    validdate.forEach(date => {
      const dayOfWeek = moment(date).format('dddd');
      const schedule = timetableResponse.schedule[dayOfWeek];
  
      if (schedule) {
        schedule.forEach(class_ => {
          const subject = class_.subject;
          subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
        });
      }
    });
  
    return subjectCounts;
  };
  
  const calculateNumberofClassesperSubjectforpercentage = (subjectCounts,attendancePercentage) => {
    const subjectCountsforpercentage = {};
    for (const [subject, count] of Object.entries(subjectCounts)) {
      subjectCountsforpercentage[subject] = Math.ceil(count * (attendancePercentage / 100));
    }
    return subjectCountsforpercentage;
  };
module.exports = { calculateSubjectCounts, calculateNumberofClassesperSubject, calculateNumberofClassesperSubjectforpercentage };