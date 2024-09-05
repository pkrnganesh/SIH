const dotenv = require("dotenv");
dotenv.config();



function calculateAttendanceRequirements(input, percentage) {
  const subjectCounts = input.SubjectCountsdata;
  const requirements = {};
  let totalClasses = 0;
  let totalAsPerPercentage = 0;

  console.log(subjectCounts, percentage);

  Object.entries(subjectCounts).forEach(([subject, count]) => {
    totalClasses += count;
    const asPerPercentage = Math.ceil(count * (percentage / 100));
    totalAsPerPercentage += asPerPercentage;
    requirements[subject] = {
      total: count,
      asperpercentage: asPerPercentage,
      minimum40: Math.ceil(count * 0.4),
    };
  });

  const result = {
    subjectRequirements: requirements,
    totalClasses: totalClasses,
    totalAsPerPercentage: totalAsPerPercentage
  };

  console.log("calculateAttendanceRequirements", result);
  return result;
}

function distributeAttendance(requirements) {
  const data = JSON.parse(requirements.percentages);
  const { subjectRequirements, overallRequirement } = data;
  
  let remainingClasses = overallRequirement.required75Percent;
  const subjects = Object.keys(subjectRequirements);

  for (const subject of subjects) {
    const subjectData = subjectRequirements[subject];
    subjectData.allocated = subjectData.minimum40;
    remainingClasses -= subjectData.minimum40;
  }

  let totalSpace = 0;
  for (const subject of subjects) {
    totalSpace += subjectRequirements[subject].total - subjectRequirements[subject].allocated;
  }
  if (remainingClasses > 0 && totalSpace > 0) {
    for (const subject of subjects) {
      const subjectData = subjectRequirements[subject];
      const spaceLeft = subjectData.total - subjectData.allocated;
      const share = Math.round((spaceLeft / totalSpace) * remainingClasses);
      const toAllocate = Math.min(share, spaceLeft);
      subjectData.allocated += toAllocate;
      remainingClasses -= toAllocate;
    }
  }

  while (remainingClasses > 0) {
    let distributed = false;
    for (const subject of subjects) {
      const subjectData = subjectRequirements[subject];
      if (subjectData.allocated < subjectData.total) {
        subjectData.allocated++;
        remainingClasses--;
        distributed = true;
        if (remainingClasses === 0) break;
      }
    }
    if (!distributed) break;
  }

  const result = {
    subjectRequirements: {},
    overallRequirement: overallRequirement
  };

  for (const subject of subjects) {
    result.subjectRequirements[subject] = {
      recommended: subjectRequirements[subject].allocated
    };
  }

  return result;
  console.log("distributeAttendance",result);
};


function createCalendar(input) {
  const { subjectRequirements, totalAsPerPercentage } = input.AttendanceRequirements;
  const weeklySchedule = input.DaywiseSubjectsdata;
  const validDates = JSON.parse(input.validdates.validdates);

  // Step 1: Initialize distribution
  const distribution = {};
  for (const [subject, req] of Object.entries(subjectRequirements)) {
    distribution[subject] = {
      remaining: req.asperpercentage,
      minimum: Math.max(req.minimum40, Math.min(req.asperpercentage, req.minimum40))
    };
  }

  // Step 2: Create a calendar
  const calendar = {};
  let totalAssignedClasses = 0;

  for (const date of validDates) {
    const dayOfWeek = new Date(date).getDay();
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    const dayClasses = weeklySchedule[dayName] || [];

    calendar[date] = [];

    for (const classInfo of dayClasses) {
      const subject = classInfo.subject.replace(' ', '_');
      if (distribution[subject].remaining > 0 && totalAssignedClasses < totalAsPerPercentage) {
        calendar[date].push(subject);
        distribution[subject].remaining--;
        distribution[subject].minimum = Math.max(0, distribution[subject].minimum - 1);
        totalAssignedClasses++;
      }
    }

    if (totalAssignedClasses >= totalAsPerPercentage) {
      break;
    }
  }

  // Step 3: Ensure minimum requirements are met
  const subjects = Object.keys(distribution);
  for (const date of validDates) {
    for (const subject of subjects) {
      if (distribution[subject].minimum > 0 && totalAssignedClasses < totalAsPerPercentage) {
        if (!calendar[date].includes(subject)) {
          calendar[date].push(subject);
          distribution[subject].minimum--;
          totalAssignedClasses++;
        }
      }
    }
    if (totalAssignedClasses >= totalAsPerPercentage) {
      break;
    }
  }

  // Step 4: If there are remaining classes, distribute them evenly without exceeding asperpercentage
  while (totalAssignedClasses < totalAsPerPercentage) {
    let assigned = false;
    for (const date of validDates) {
      for (const subject of subjects) {
        if (distribution[subject].remaining > 0 && !calendar[date].includes(subject)) {
          calendar[date].push(subject);
          distribution[subject].remaining--;
          totalAssignedClasses++;
          assigned = true;
          break;
        }
      }
      if (assigned || totalAssignedClasses >= totalAsPerPercentage) {
        break;
      }
    }
    if (!assigned) {
      break; // Unable to assign more classes without exceeding limits
    }
  }

  return calendar;
}

module.exports = {calculateAttendanceRequirements,distributeAttendance,createCalendar };
