import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private markers: { lat: number; lng: number; title: string; description: string; iconUrl?: string }[] = [];

  ngOnInit() {
    this.initMap();
    this.loadMarkersFromLocalStorage();
  }

  ngAfterViewInit() {
    this.getCurrentLocation();
  }

  private initMap() {
    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.showMarkerPopup(event.latlng);
    });
  }

  private getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.map.setView([lat, lng], 15);
      });
    }
  }

  private loadMarkersFromLocalStorage() {
    const savedMarkers = localStorage.getItem('markers');
    if (savedMarkers) {
      this.markers = JSON.parse(savedMarkers);
      this.addMarkersToMap();
    }
  }

  private saveMarkersToLocalStorage() {
    localStorage.setItem('markers', JSON.stringify(this.markers));
  }

  private addMarkersToMap() {
    const markerIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/999/999105.png',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    });

    let bounds = L.latLngBounds([]);

    this.markers.forEach(marker => {
      const popupContent = `
        <div class="custom-popup">
          <style>
            .custom-popup {
              padding: 10px;
              background-color: #f0f0f0;
              border-radius: 10px;
            }
          </style>
          <img src="${marker.iconUrl}" alt="${marker.title}" style="width: 100%; max-width: 50px;"><br>
          <b>${marker.title}</b><br>
          ${marker.description}<br>
        </div>
      `;

      L.marker([marker.lat, marker.lng], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(this.map);

      bounds.extend(L.latLng(marker.lat, marker.lng));
    });

    this.map.fitBounds(bounds);
  }

  private showMarkerPopup(latlng: L.LatLng) {
    const title = prompt('Enter title for the marker:');
    if (title) {
      const description = prompt('Enter description for the marker:');
      if (description) {
        this.markers.push({ lat: latlng.lat, lng: latlng.lng, title, description, iconUrl: 'https://cdn-icons-png.flaticon.com/512/999/999105.png' });
        this.saveMarkersToLocalStorage();
        this.addMarkersToMap();
      }
    }
  }
}
