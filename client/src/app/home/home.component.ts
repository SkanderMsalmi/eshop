import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'll-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  particlesOptions = {
    particles: {
      color: {
        value: ['#ffffff', '#ffffff']
      },
      size: {
        value: 1
      },
      lineLinked: {
        enable: true,
        color: 'random'
      },
      move: {
        enable: true,
        speed: 1.5
      }
    }
  };
  constructor(private http:HttpClient) {
    fetch('/api/product/all')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  }

  ngOnInit(): void {}
}
