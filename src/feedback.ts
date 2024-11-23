export function setupFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form') as HTMLFormElement | null;

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const feedbackInput = document.getElementById('feedback') as HTMLTextAreaElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;

        if (nameInput && feedbackInput && emailInput) {
          const feedbackData = {
            name: nameInput.value,
            email: emailInput.value,
            message: feedbackInput.value,
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

  // find all feedback

  interface Feedback {
    id: string;
    name: string;
    email: string;
    message: string;
  }

  async function fetchFeedback(): Promise<Feedback[]> {
    try {
      const response = await fetch('http://localhost:3000/api/feedback');
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      return await response.json(); // Palautetaan palautteet JSON-muodossa
    } catch (error) {
      console.error('Error fetching feedback:', error);
      throw error;
    }
  }

  function displayFeedback(feedbacks: Feedback[]): void{
    const feedbackContainer = document.getElementById('feedback-container') as HTMLElement | null;
    if (!feedbackContainer) {
      console.error('Feedback container not found');
      return;
    }
    feedbackContainer.innerHTML = ''; // Tyhjennetään mahdollinen aiempi sisältö
    if (feedbacks.length === 0) {
      feedbackContainer.innerHTML = '<p>No feedback found</p>';
      return;
    }


  feedbacks.forEach(feedback => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <p><strong>${feedback.name}</strong> </p>
      <p><strong>${feedback.email}</strong> </p>
      <p><strong>${feedback.message}</strong> </p>
      <hr>
    `;
    feedbackContainer.appendChild(listItem);
  });

}
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const feedback = await fetchFeedback();
    displayFeedback(feedback);
  } catch (error) {
    const feedbackContainer = document.getElementById('feedback-container') as HTMLElement | null;
    if (feedbackContainer) {
      feedbackContainer.innerHTML = '<p>Failed to load feedback</p>';
    }
  }
});
