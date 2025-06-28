const Mentor = require('../models/MentorModel');

const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    
    // Map the mentor data to match frontend expectations
    const mappedMentors = mentors.map(mentor => ({
      _id: mentor._id,
      name: mentor.mentor_name,
      email: mentor.mentor_email,
      specializations: mentor.mentor_specializations || [],
      experience: mentor.mentor_experience,
      company: mentor.mentor_company,
      title: mentor.mentor_title,
      bio: mentor.mentor_bio,
      phoneNumber: mentor.mentor_phonenumber,
      rating: mentor.mentor_rating || 0,
      image: mentor.mentor_image,
      verified: mentor.mentor_verified,
      availability: mentor.mentor_availability,
      createdAt: mentor.createdAt,
      updatedAt: mentor.updatedAt
    }));
    
    res.status(200).json(mappedMentors);
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
