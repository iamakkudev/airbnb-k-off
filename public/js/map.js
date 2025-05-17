function initMap() {
        const location = { lat: coordinates[1], lng: coordinates[0] }; // New Delhi
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 9,
          center: location,
        });
        const marker = new google.maps.Marker({
          position: location,
          map: map,
           icon: {
              url: 'https://res.cloudinary.com/dvtqoutov/image/upload/v1747455474/1000_F_247998169_hshSlxoDGjxzyhBZtF7Ii0nCsoFJqp6N_nwf5q3.png', // 🔁 Replace with your image path
              scaledSize: new google.maps.Size(70, 70), // Optional: Resize icon
          },
        });

         const circle = new google.maps.Circle({
          map: map,
          center: location,
          radius: 10000, // in meters — adjust as needed
          strokeColor: "#FF0000",
          strokeOpacity: .2,
          strokeWeight: 700,
          fillColor: "#FF0000",
          fillOpacity: 0.2,
        });
        const infoWindow = new google.maps.InfoWindow({
        content: `<div class="custom-info-window">Here you will be</div>`,
      });

      // Show popup on hover
      marker.addListener("mouseover", () => {
        infoWindow.open(map, marker);
      });

      // Close popup on mouseout
      marker.addListener("mouseout", () => {
        infoWindow.close();
      });
}


