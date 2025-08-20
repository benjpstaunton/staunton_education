// Handle enquiry form submission
/*
 * Client-side logic for the Staunton Education portal.
 *
 * Instead of saving data into localStorage, this script communicates
 * with a simple Python backend (see server.py) using the Fetch API.
 * Each form submission sends a POST request to the appropriate
 * endpoint and displays the server's response in a friendly way.
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Handle enquiry form submission.
   * Sends a JSON payload to /api/enquiry and shows a thank-you message
   * returned from the server.
   */
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        parentName: enquiryForm.parentName.value,
        email: enquiryForm.email.value,
        phone: enquiryForm.phone.value,
        childAge: enquiryForm.childAge.value,
        message: enquiryForm.message.value,
        introCall: enquiryForm.introCall.value
      };
      const msgDiv = document.getElementById('enquiryMessage');
      try {
        const response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        msgDiv.textContent = result.message || 'Thank you for your enquiry.';
      } catch (err) {
        console.error(err);
        msgDiv.textContent = 'There was an error submitting your enquiry. Please try again later.';
      }
      msgDiv.style.display = 'block';
      enquiryForm.reset();
    });
  }

  /**
   * Handle enrolment form submission.
   * Sends a JSON payload to /api/enrolment and shows a confirmation message.
   */
  const enrolmentForm = document.getElementById('enrolmentForm');
  if (enrolmentForm) {
    enrolmentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Ensure the user has accepted the terms.
      if (!enrolmentForm.agreeTerms.checked) {
        alert('You must agree to the terms and conditions.');
        return;
      }
      const data = {
        parentName: enrolmentForm.parentName.value,
        parentEmail: enrolmentForm.parentEmail.value,
        parentPhone: enrolmentForm.parentPhone.value,
        childName: enrolmentForm.childName.value,
        dob: enrolmentForm.dob.value,
        address: enrolmentForm.address.value,
        emergencyContact: enrolmentForm.emergencyContact.value,
        allergies: enrolmentForm.allergies.value
      };
      const msgDiv = document.getElementById('enrolmentMessage');
      try {
        const response = await fetch('/api/enrolment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        msgDiv.textContent = result.message || 'Enrolment submitted successfully.';
      } catch (err) {
        console.error(err);
        msgDiv.textContent = 'There was an error submitting your enrolment. Please try again later.';
      }
      msgDiv.style.display = 'block';
      enrolmentForm.reset();
    });
  }
});