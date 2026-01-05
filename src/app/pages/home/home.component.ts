import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServiceService, Service } from '../../services/service.service';

interface Testimonial {
  name: string;
  role?: string;
  text: string;
  photo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  services: Service[] = [];
  isLoadingServices: boolean = false;

  testimonials: Testimonial[] = [
    {
      name: 'Mr Singh',
      role: 'Managing Director',
      text: `We had the privilege of engaging the services of CS Anil Dubey for our IPO listing process, and we are extremely satisfied with the quality of professional support provided.

Their in-depth knowledge of regulatory frameworks, meticulous attention to compliance requirements, and strong coordination with intermediaries ensured a smooth and timely completion of the IPO process. They demonstrated exceptional competence in handling SEBI regulations, stock exchange filings, due diligence documentation, and corporate governance structuring.

We highly appreciate their professionalism, integrity, and commitment, and we confidently recommend their services for IPO-related matters and other corporate compliance assignments.`,
      photo: 'assets/images/user.webp',
    },
    {
      name: 'Mr Hurditya',
      role: 'CEO, M&A Associates',
      text: `We engaged M&A Associates to lead and manage our compliance and regulatory workstreams for our Initial Public Offering, and the experience exceeded our expectations.

Their strategic understanding of capital markets regulations, strong command over SEBI and stock exchange requirements, and structured approach to managing complex timelines were instrumental in the successful completion of the IPO process. They demonstrated exceptional diligence in due diligence reviews, drafting and vetting of offer documents, and seamless coordination with legal counsel, merchant bankers, auditors, and stock exchange authorities.

We value their professionalism, reliability, and advisory mindset, and we would highly recommend their services for IPO advisory, listing compliances, and corporate governance engagements.`,
      photo: 'assets/images/user.webp',
    },
  ];

  activeTestimonialIndex = 0;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  // FAQ accordion script (for .faq-item elements in your template)
  ngAfterViewInit(): void {
    const faqItems = document.querySelectorAll<HTMLElement>('.faq-item');

    faqItems.forEach((item) => {
      item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Remove active class from all items
        faqItems.forEach((el) => el.classList.remove('active'));

        // Add active class back to clicked item if it was not active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  loadServices(): void {
    this.isLoadingServices = true;
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.services = data.slice(0, 3);
        this.isLoadingServices = false;
      },
      error: (err) => {
        console.error('Error loading services:', err);
        this.isLoadingServices = false;
      },
    });
  }

  getShortDescription(detail: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = detail;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  }

  print() {
    window.print();
  }

  nextTestimonial(): void {
    if (this.activeTestimonialIndex < this.testimonials.length - 1) {
      this.activeTestimonialIndex++;
    }
  }

  prevTestimonial(): void {
    if (this.activeTestimonialIndex > 0) {
      this.activeTestimonialIndex--;
    }
  }

  goToTestimonial(index: number): void {
    if (index >= 0 && index < this.testimonials.length) {
      this.activeTestimonialIndex = index;
    }
  }
}
