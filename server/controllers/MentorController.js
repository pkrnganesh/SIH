const Mentor = require('../models/MentorModel');

const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentors', error: error.message });
  }
};


module.exports = {
  getMentors,
};
// exports.getMentors = async (req, res) => {
//   try {
//     const mentors = await Mentor.find().select('_id name specializations rating title image');
//     res.json(mentors);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching mentors', error: error.message });
//   }
// };
