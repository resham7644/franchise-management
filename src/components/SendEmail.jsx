import emailjs from '@emailjs/browser'

const sendEmail = async (userData) => {
  if (!userData.email) {
    console.error("Email address is missing!");
    return { success: false, message: "Email address is required." };
  }

  const templateParams = {
    to_email: userData.email,  // Make sure this is correctly populated
    to_name: userData.name || "User",
    subject: userData.subject || "No Subject",
    message: userData.subject || "No message provided",
    company_name: 'GrowPulse',
    company_url: 'https://growpulse.com',
    support_email: 'support@franchiseflow.com',
    current_year: new Date().getFullYear(),
  };

  console.log("Sending email with params:", templateParams);  // Debugging log

  try {
    const result = await emailjs.send(
      'service_resham',      // Your EmailJS Service ID
      'template_csoiq6l',    // Your EmailJS Template ID
      templateParams,
      'EPRRWVTb-kK39-BrD'   // Your EmailJS Public Key
    );

    console.log('Email sent successfully:', result.text);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: 'Failed to send email. Please try again.' };
  }
};

export default sendEmail;
