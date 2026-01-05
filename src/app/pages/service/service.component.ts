import { Component, OnInit } from '@angular/core';
import { ServiceService, Service } from '../../services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.isLoading = true;
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading services:', err);
        this.error = 'Failed to load services. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  getShortDescription(detail: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = detail;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  }
}
