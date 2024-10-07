const apiKey = 'c406d50e984a4a56bf8a345ab56efa90';
const searchUrl = 'https://api.bing.microsoft.com/v7.0/search?q=';
let currentBackground = 1;

$(document).ready(function () {
    // Handle search button click
    $('#searchButton').on('click', function () {
        console.log('Search button clicked');
        const query = $('#query').val(); // Get the search input
        if (query) {
            apiSearch(query); // Call the apiSearch function
        }
    });

    // Handle I'm feeling lucky button click
    $('#luckyButton').on('click', function () {
        console.log('Lucky button clicked');
        const query = $('#query').val();
        if (query) {
            apiSearch(query, true); // Call the apiSearch function with lucky = true
        }
    });

    // Handle time button click
    $('#timeButton').on('click', function () {
        console.log('time button clicked');
        showCurrentTime();
    });
});

function apiSearch(query, lucky = false) {
    console.log('Calling API with query: ', query); // Debugging API call
    $.ajax({
        url: searchUrl + encodeURIComponent(query),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Ocp-Apim-Subscription-Key', apiKey);
        },
        success: function (data) {
            console.log('API response: ', data); // Log API response
            if (lucky && data.webPages && data.webPages.value.length > 0) {
                window.location.href = data.webPages.value[0].url;
            } else {
                let resultsHtml = '';
                if (data.webPages && data.webPages.value) {
                    data.webPages.value.forEach(page => {
                        resultsHtml += `<p><a href="${page.url}">${page.name}</a></p>`;
                    });
                }
                $('#searchResults').html(resultsHtml).css('visibility', 'visible');
            }
        },
        error: function (xhr, status, error) {
            console.error('API error: ', status, error); // Debug API error
            $('#searchResults').html('An error occurred').css('visibility', 'visible');
        }
    });
}
function toggleBackground() {
    if (currentBackground === 1) {
        $('body').css('background-image', 'url("/images/backgroundimg2.jpg")');
        currentBackground = 2;
    } else {
        $('body').css('background-image', 'url("/images/backgroundimg1.jpg")');
        currentBackground = 1;
    }
}

function showCurrentTime() {
    // Get the current time in HH:MM format
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Insert the time into the #time div
    $('#time').html(currentTime);

    // Display the #time div as a jQuery UI dialog
    $('#time').dialog({
        title: 'Current Time',
        modal: true,
        buttons: {
            OK: function () {
                $(this).dialog('close');
            }
        }
    });
}

