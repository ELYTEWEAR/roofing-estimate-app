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
        const squares = parseFloat(document.getElementById('squares').value) || 0;
        const pricingOptions = document.getElementsByName('costPerSquare');
        let costPerSquare = 0;
    
        for (const option of pricingOptions) {
            if (option.checked) {
                costPerSquare = parseFloat(option.value);
                break;
            }
        }
    
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

