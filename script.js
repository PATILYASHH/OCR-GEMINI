document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageUrl = 'text.png'; // Update with the correct path to your image file

    fetch(imageUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        return response.blob();
    })
    .then(blob => {
        console.log('Image fetched successfully:', blob);

        const formData = new FormData();
        formData.append('file', blob, 'text.png');

        const apiEndpoint = 'https://api.gemini.com/v1/ocr'; 
        const apiKey = '#'; // Replace with your actual API key

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            if (data && data.extractedText) {
                document.getElementById('extracted-text').textContent = data.extractedText;
            } else {
                document.getElementById('extracted-text').textContent = 'No text found.';
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            alert('An error occurred while processing the image.');
        });
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        alert('Failed to fetch image.');
    });
});
