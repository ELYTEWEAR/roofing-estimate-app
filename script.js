document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('estimateForm');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer'); // Ensure this element exists in your HTML

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        html2canvas(form, {
            scale: window.devicePixelRatio, // Capture at device resolution
            backgroundColor: null, // Transparent background to capture form as is
            width: 850, // Set width to 8.5 inches (8.5 * 100 for millimeters)
            height: 1100, // Set height to 11 inches (11 * 100 for millimeters)
            onclone: (document) => {
                // Modify cloned document if necessary before capturing
            }
        }).then(canvas => {
            const imageData = canvas.toDataURL('image/jpeg'); // Changed format to JPEG
            displayImage(imageData);
            downloadImage(imageData, 'roofing-estimate.jpg'); // Changed file extension to .jpg
        });
    });

    function displayImage(dataUrl) {
        imagePreviewContainer.innerHTML = ''; // Clear previous images
        const img = new Image();
        img.src = dataUrl;
        img.style.width = '100%'; // Ensure the image fits within the container
        img.style.height = '100%';
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
});
