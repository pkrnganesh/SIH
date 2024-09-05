const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");
 const dotenv = require("dotenv");
const { extractText } = require("../crud/textExtractor");
const { processText ,reScheduling } = require("../crud/textProcessor");
const { ClassificationText } = require("../crud/textClassification");
const {calculateAttendanceRequirements,createCalendar} = require("../crud/AnalysisGeneration");
const { calculateValidDays, countDaysOfWeek,calculateDaysNeededToAttend, calculateDaysCanSkip } = require("../crud/filteringDays");
 



// Middleware
router.use(fileUpload());

dotenv.config();

let workflowStatus;


// Route to get the current status
router.get('/status', (req, res) => {
    res.json({ status: workflowStatus });
});

const memoryCache = new Map(); // In-memory cache
const cacheExpiration = 3600000; // 1 hour in milliseconds

// Route to check all functions

router.post('/basicanalysis', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const file = req.files.file;
    const { percentage, fromDate, toDate } = req.body;
    const filePath = path.resolve(__dirname, '../uploads', file.name);
  
    try {
      const cacheKey = `${filePath}-${fromDate}-${toDate}-${percentage}`;
      if (memoryCache.has(cacheKey)) {
        const cachedResult = memoryCache.get(cacheKey);
        console.log('Serving from cache');
        return res.json(cachedResult);
      }
  
      await file.mv(filePath);
      const extractedText = await extractText(filePath);
      const timetableResponse = await processText(extractedText);
      const DaywiseSubjectsdata = await reScheduling(timetableResponse);
  
      const validdates = calculateValidDays(fromDate, toDate);

      const countDaysOfWeekdata = countDaysOfWeek(validdates);

      const daysNeededToAttend =calculateDaysNeededToAttend(validdates,percentage);

      const daysCanSkip=calculateDaysCanSkip(validdates,percentage);

      const Totaldays=daysNeededToAttend+daysCanSkip;

      console.log("Total Days",Totaldays);
      console.log("Days Needed to Attend",daysNeededToAttend);
      console.log("Days Can Skip",daysCanSkip);
  
      const SubjectCountsdata = ClassificationText(JSON.stringify(countDaysOfWeekdata), DaywiseSubjectsdata);
  
      const AttendanceRequirements = calculateAttendanceRequirements({ SubjectCountsdata }, percentage);
  
      const basicdata = createCalendar({AttendanceRequirements, DaywiseSubjectsdata, validdates});
      console.log('Basic Data:', basicdata); // Log the basic data for debugging
  
      memoryCache.set(cacheKey, basicdata, cacheExpiration);
  
      workflowStatus = 'Thanks for waiting, Calendar is ready';
      res.json(basicdata);
    } catch (err) {
      res.status(500).send(`Error: ${err.message}`);
    }
  });

module.exports = router;
