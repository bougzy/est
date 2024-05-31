// document.addEventListener('DOMContentLoaded', async () => {
//     if (window.location.pathname === '/') {
//         const propertyList = document.getElementById('property-list');
//         const response = await fetch('/properties');
//         const properties = await response.json();

//         properties.forEach(property => {
//             const propertyCard = document.createElement('div');
//             propertyCard.className = 'col-lg-4 col-md-6 mb-4';
//             propertyCard.innerHTML = `
//                 <div class="card">
//                     <img class="card-img-top" src="/images/${property.image}" alt="Property image">
//                     <div class="card-body">
//                         <h5 class="card-title">${property.title}</h5>
//                         <p class="card-text">${property.description.substring(0, 100)}...</p>
//                         <a href="/property.html?id=${property._id}" class="btn btn-primary">More Info</a>
//                     </div>
//                 </div>
//             `;
//             propertyList.appendChild(propertyCard);
//         });
//     }

//     if (window.location.pathname === '/property.html') {
//         const urlParams = new URLSearchParams(window.location.search);
//         const propertyId = urlParams.get('id');

//         const response = await fetch(`/property/${propertyId}`);
//         const property = await response.json();

//         document.getElementById('property-title').textContent = property.title;
//         document.getElementById('property-image').src = `/images/${property.image}`;
//         document.getElementById('property-description').textContent = property.description;
//         document.getElementById('property-location').textContent = `Location: ${property.location}`;
//         document.getElementById('property-email').textContent = `Email: ${property.email}`;
//         document.getElementById('property-phone').textContent = `Phone: ${property.phone}`;

//         // Open modal when "More Info" button is clicked
//         $('#moreInfoModal').modal('show');
//     }
// });




document.addEventListener('DOMContentLoaded', async () => {
    const propertyList = document.getElementById('property-list');

    if (window.location.pathname === '/') {
        const response = await fetch('/properties');
        const properties = await response.json();

        properties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'col-lg-4 col-md-6 mb-4';
            propertyCard.innerHTML = `
                <div class="card">
                    <img class="card-img-top" src="/images/${property.image}" alt="Property image">
                    <div class="card-body">
                        <h5 class="card-title">${property.title}</h5>
                        <p class="card-text">${property.description.substring(0, 100)}...</p>
                        <button class="btn btn-primary btn-more-info" data-property-id="${property._id}">More Info</button>
                    </div>
                </div>
            `;
            propertyList.appendChild(propertyCard);
        });

        // Event listener for More Info buttons
        document.querySelectorAll('.btn-more-info').forEach(btn => {
            btn.addEventListener('click', async () => {
                const propertyId = btn.getAttribute('data-property-id');
                const propertyResponse = await fetch(`/property/${propertyId}`);
                const propertyData = await propertyResponse.json();
                populateModal(propertyData);
            });
        });
    }
});

// Function to populate modal with property details
function populateModal(property) {
    const modalBody = document.getElementById('propertyModalBody');
    modalBody.innerHTML = `
        <img class="img-fluid" src="/images/${property.image}" alt="Property image">
        <h3>${property.title}</h3>
        <p>${property.description}</p>
        <ul>
            <li>Location: ${property.location}</li>
            <li>Email: ${property.email}</li>
            <li>Phone: ${property.phone}</li>
        </ul>
    `;

    $('#propertyModal').modal('show'); // Show the modal
}
