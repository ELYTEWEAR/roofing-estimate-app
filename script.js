document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('estimateForm');
    const totalCostInput = document.getElementById('totalCost');
    const plywoodSheetsSelect = document.getElementById('plywoodSheets');
    const plywoodSheetsOtherInput = document.getElementById('plywoodSheetsOther');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer'); // Container for image preview

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        calculateTotal(); // Calculate the total cost based on inputs

        // Clear previous preview
        imagePreviewContainer.innerHTML = '';

        // Generate the PNG image from the form with a white background
        html2canvas(form, {
            scale: 2,
            backgroundColor: '#ffffff' // Ensures the background is white
        }).then(canvas => {
            const imageData = canvas.toDataURL('image/png');

            // Preview the generated image
            const imgElement = document.createElement('img');
            imgElement.src = imageData;
            imagePreviewContainer.appendChild(imgElement);

            // Provide an option to download the image
            downloadImage(imageData, 'roofing-estimate.png');
        }).catch(error => {
            console.error('Error generating the image:', error);
            alert('An error occurred while generating the image. Please try again.');
        });
    });

    // Show or hide the "Other" input for plywood sheets based on selection
    plywoodSheetsSelect.addEventListener('change', function() {
        plywoodSheetsOtherInput.style.display = this.value === 'other' ? 'block' : 'none';
    });

    // Function to calculate the total cost
    function calculateTotal() {
        const squares = parseFloat(document.getElementById('squares').value) || 0;
        const pricingOptions = document.querySelectorAll('input[name="costPerSquare"]:checked');
        let costPerSquare = pricingOptions.length > 0 ? parseFloat(pricingOptions[0].value) : 0;

        const totalCost = squares * costPerSquare;
        totalCostInput.value = totalCost.toFixed(2); // Format to 2 decimal places
    }

    // Function to download the image
    function downloadImage(dataUrl, filename) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
