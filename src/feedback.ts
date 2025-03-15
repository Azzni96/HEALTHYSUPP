export function setupFeedbackForm() {
  const feedbackForm = document.getElementById('feedback-form') as HTMLFormElement | null;

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameInput = document.getElementById('name') as HTMLInputElement;
      const messageInput = document.getElementById('message') as HTMLTextAreaElement;
      const emailInput = document.getElementById('email') as HTMLInputElement;

      if (nameInput && messageInput && emailInput) {
        const feedbackData = {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value,
        };

        try {
          const response = await fetch('http://localhost:3000/api/feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
          });

          if (response.ok) {
            alert('Feedback submitted successfully!');
            feedbackForm.reset();
          } else {
            alert('Failed to submit feedback');
          }
        } catch (error) {
          console.error('Error submitting feedback:', error);
          alert('An error occurred while submitting feedback');
        }
      }
    });
  }
}
