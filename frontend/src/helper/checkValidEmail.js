import axios from "axios";
const checkValidEmail = async (email)=>{
  const apiKey = 'fe6cb1be1a48a5d7c3ba329443413683592ee50c';
  const apiUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data.data;
    if (data.result === 'deliverable') {
      return true
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error verifying email with Hunter.io:', error.message);
    return false;
  }
};
export default checkValidEmail