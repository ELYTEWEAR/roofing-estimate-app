document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('estimateForm');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer'); // Ensure this element exists in your HTML
    const generateButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            html2canvas(form, {
                scale: window.devicePixelRatio, // Capture at device resolution
                backgroundColor: null, // Transparent background to capture form as is
                onclone: (document) => {
                    // Modify cloned document if necessary before capturing
                }
            }).then(canvas => {
                const imageData = canvas.toDataURL('image/png');
                displayImage(imageData);
                downloadImage(imageData, 'roofing-estimate.png');
                showFeedback('Estimate generated successfully.', 'success');
            }).catch(error => {
                console.error('Error generating estimate:', error);
                showFeedback('An error occurred while generating the estimate. Please try again.', 'error');
            });
        }
    });

    function validateForm() {
        // Perform form validation here
        // Return true if validation passes, false otherwise
        return true; // Placeholder, replace with actual validation logic
    }

    function displayImage(dataUrl) {
        imagePreviewContainer.innerHTML = ''; // Clear previous images
        const img = new Image();
        img.src = dataUrl;
        img.alt = 'Roofing Estimate Preview'; // Add alt text for accessibility
        imagePreviewContainer.appendChild(img); // Display new image
    }

    function downloadImage(dataUrl, filename) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function showFeedback(message, type) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.textContent = message;
        feedbackDiv.classList.add('feedback', `feedback-${type}`);
        document.body.appendChild(feedbackDiv);
        setTimeout(() => {
            document.body.removeChild(feedbackDiv);
        }, 5000);
    }
});
