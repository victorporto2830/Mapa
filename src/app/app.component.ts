import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private map!: L.Map;//

  ngOnInit() {
    this.initMap();
    this.addSampleMarkers();
  }

  private initMap() {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  private addSampleMarkers() {
    const sampleMarkers = [
      { lat: 51.505, lng: -0.09, title: 'Marker 1' },
      { lat: 51.51, lng: -0.1, title: 'Marker 2' },
      { lat: 51.49, lng: -0.1, title: 'Marker 3' },
    ];

    sampleMarkers.forEach(marker => {
      const markerIcon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });

      const popupContent = `<b>${marker.title}</b>`;

      L.marker([marker.lat, marker.lng], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(this.map);
    });
  }
}
