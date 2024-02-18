document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('estimateForm');
    const totalCostInput = document.getElementById('totalCost');
    const plywoodSheetsSelect = document.getElementById('plywoodSheets');
    const plywoodSheetsOtherInput = document.getElementById('plywoodSheetsOther');

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        calculateTotal(); // Calculate the total cost based on inputs

        // Generate the PNG image from the form
        html2canvas(form, { scale: 2 }).then(canvas => {
            const imageData = canvas.toDataURL('image/png');
            downloadImage(imageData, 'roofing-estimate.png');
        });
    });

    // Show or hide the "Other" input for plywood sheets based on selection
    plywoodSheetsSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            plywoodSheetsOtherInput.style.display = 'block';
        } else {
            plywoodSheetsOtherInput.style.display = 'none';
        }
    });

    // Function to calculate the total cost
    function calculateTotal() {
        // Implement the logic to calculate the total cost based on form inputs
        // Example:
        // const squares = parseInt(document.getElementById('squares').value, 10);
        // const costPerSquare = document.getElementById('costPerSquare').checked ? 500 : 0;
        // const total = squares * costPerSquare;
        // totalCostInput.value = total;

        // Placeholder for calculation logic - replace with your actual calculation
        totalCostInput.value = 'Calculated Total'; // Set the calculated total
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

