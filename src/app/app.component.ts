import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private map!: L.Map;

  ngOnInit() {
    this.initMap();
    this.addSampleMarkers();
  }

  private initMap() {
    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  private addSampleMarkers() {
    const sampleMarkers = [
      { 
        lat: -10.946934,
        lng: -37.054598,
        title: 'Parque da Sementeira',
        description: 'Um belo parque na cidade.'
      },
      {
        lat: -10.917454,
        lng: -37.047615,
        title: 'Museu da Gente Sergipana',
        description: 'Museu dedicado à cultura sergipana.'
      }
    ];

    const markerIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/5846/5846044.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

    let bounds = L.latLngBounds([]);

    sampleMarkers.forEach(marker => {
      const popupContent = `<b>Titulo: ${marker.title}</b><br>Descrição: ${marker.description}`;

      L.marker([marker.lat, marker.lng], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(this.map);

      bounds.extend(L.latLng(marker.lat, marker.lng));
    });

    this.map.fitBounds(bounds);
  }
}
