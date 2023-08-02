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
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  private addSampleMarkers() {
    const sampleMarkers = [
      {
        lat: -10.946934,
        lng: -37.054598,
        title: 'Parque da Sementeira',
        description: 'Um belo parque na cidade.',
        openingTime: '8h00',
        paymentMethod: 'Cartão de crédito'
      },
      {
        lat: -10.936821,
        lng: -37.061285,
        title: 'Museu da Gente Sergipana',
        description: 'Museu dedicado à cultura sergipana.',
        openingTime: '9h30',
        paymentMethod: 'Dinheiro'
      }
      // Adicione outros marcadores com suas informações aqui
    ];

    const markerIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/5846/5846044.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

    sampleMarkers.forEach(marker => {
      const popupContent = `
        <b>${marker.title}</b><br>
        ${marker.description}<br>
        <div style="display: flex; justify-content: space-between;">
          <span>Abre às ${marker.openingTime}</span>
          <span>${marker.paymentMethod}</span>
        </div>
      `;

      L.marker([marker.lat, marker.lng], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(this.map);
    });
  }
}
