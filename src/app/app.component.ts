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
        description: 'Um belo parque na cidade.',
        openingTime: '8h00',
        paymentMethod: 'Cartão de crédito'
      },
      {
        lat: -10.917454,
        lng: -37.047615,
        title: 'Museu da Gente Sergipana',
        description: 'Museu dedicado à cultura sergipana.',
        openingTime: '9h30',
        paymentMethod: 'Dinheiro'
      }
      // Adicione outros marcadores com suas informações aqui
    ];

    const markerIcon = L.icon({
      iconUrl: 'https://e7.pngegg.com/pngimages/189/333/png-clipart-skip-rubbish-bins-waste-paper-baskets-waste-management-material-waste-management-angle-rectangle.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

    let bounds = L.latLngBounds([]);

    sampleMarkers.forEach(marker => {
      const popupContent = `
        <div class="custom-popup">
          <style>
            .custom-popup {
              padding: 10px;
              background-color: #f0f0f0; /* Cor de fundo cinza */
              border-radius: 10px; /* Borda arredondada */
            }
            .payment-method {
              background-color: gray; /* Cor de fundo cinza para o paymentMethod */
              padding: 5px 10px;
              border-radius: 5px; /* Borda arredondada */
              color: white; /* Cor do texto branco */
            }
          </style>
          <b>${marker.title}</b><br>
          ${marker.description}<br>
          <div style="display: flex; justify-content: space-between;">
            <span>Abre às ${marker.openingTime}</span>
            <span class="payment-method">${marker.paymentMethod}</span>
          </div>
        </div>
      `;

      L.marker([marker.lat, marker.lng], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(this.map);

      bounds.extend(L.latLng(marker.lat, marker.lng));
    });

    this.map.fitBounds(bounds);
  }
}
