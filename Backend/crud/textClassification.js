function ClassificationText(countDaysOfWeekdata, DaywiseSubjectsdata) {
  // If countDaysOfWeekdata is a JSON string, parse it
  let dayCounts;
  if (typeof countDaysOfWeekdata === 'string') {
    try {
      dayCounts = JSON.parse(countDaysOfWeekdata);
    } catch (e) {
      console.error('Error parsing countDaysOfWeekdata JSON:', e);
      return {};
    }
  } else {
    dayCounts = countDaysOfWeekdata;
  }

  // If DaywiseSubjectsdata is a JSON string, parse it
  let rescheduled;
  if (typeof DaywiseSubjectsdata === 'string') {
    try {
      rescheduled = JSON.parse(DaywiseSubjectsdata.replace(/'/g, '"'));
    } catch (e) {
      console.error('Error parsing DaywiseSubjectsdata JSON:', e);
      return {};
    }
  } else {
    rescheduled = DaywiseSubjectsdata;
  }

  const classCounts = {};

  for (const [day, classes] of Object.entries(rescheduled)) {
    const dayCount = dayCounts[day];
    if (dayCount === undefined) {
      continue;
    }

    if (!Array.isArray(classes)) {
      continue;
    }

    for (const classObj of classes) {
      if (typeof classObj !== 'object' || classObj === null) {
        console.warn(`Warning: Invalid class object for ${day}:`, classObj);
        continue;
      }

      let subject = classObj.subject;
      if (typeof subject !== 'string') {
        console.warn(`Warning: Invalid subject for ${day}:`, subject);
        continue;
      }

      // Replace spaces with underscores for LAB subjects
      if (subject.includes('LAB')) {
        subject = subject.replace(' ', '_');
      }
      classCounts[subject] = (classCounts[subject] || 0) + dayCount;
    }
  }

  // Ensure all keys are strings and values are numbers
  const result = Object.fromEntries(
    Object.entries(classCounts).map(([key, value]) => [String(key), Number(value)])
  );

  return result;
}

module.exports = { ClassificationText };
