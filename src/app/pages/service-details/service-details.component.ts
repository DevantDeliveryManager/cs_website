import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService, Service } from '../../services/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent implements OnInit {
  service: Service | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  serviceId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.serviceId = params.get('id');
      if (this.serviceId) {
        this.loadServiceDetails(this.serviceId);
      }
    });
  }

  loadServiceDetails(id: string): void {
    this.isLoading = true;
    this.error = null;
    this.serviceService.getServiceById(id).subscribe({
      next: (data) => {
        this.service = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading service details:', err);
        this.error = 'Failed to load service details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  getShortDescription(detail: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = detail;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  }
}
