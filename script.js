document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('estimateForm');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer'); // Ensure this element exists in your HTML

    form.addEventListener('submit', function(event) {
        event.preventDefault();
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
        });
    });

    function displayImage(dataUrl) {
        imagePreviewContainer.innerHTML = ''; // Clear previous images
        const img = new Image();
        img.src = dataUrl;
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
