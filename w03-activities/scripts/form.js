document.addEventListener('DOMContentLoaded', () => {
    const formElem = document.getElementById('formElem');

    formElem.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(formElem);

      const currentDate = new Date().toISOString();
      formData.set('submissionDate', currentDate);

      console.log('Form submission data:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    });
  });