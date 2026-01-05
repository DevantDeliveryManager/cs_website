import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface GalleryItem {
  src: string;
  alt: string;
}

interface Testimonial {
  name: string;
  text: string;
  photo: string;
  role?: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  teamItems: GalleryItem[] = [];
  galleryItems: GalleryItem[] = [];
  currentIndex = 0;
  visibleGalleryItemsCount = 6;
  private readonly initialVisibleGalleryItems = 6;

  testimonials: Testimonial[] = [
    {
      name: 'Mr Singh',
      role: 'Managing Director',
      text: `We had the privilege of engaging the services of CS Anil Dubey for our IPO listing process, and we are extremely satisfied with the quality of professional support provided.

Their in-depth knowledge of regulatory frameworks, meticulous attention to compliance requirements, and strong coordination with intermediaries ensured a smooth and timely completion of the IPO process. They demonstrated exceptional competence in handling SEBI regulations, stock exchange filings, due diligence documentation, and corporate governance structuring.

We highly appreciate their professionalism, integrity, and commitment, and we confidently recommend their services for IPO-related matters and other corporate compliance assignments.`,
      photo: 'assets/images/testimonial_pic.webp',
    },
    {
      name: 'Mr Hurditya',
      role: 'CEO, M&A Associates',
      text: `We engaged M&A Associates to lead and manage our compliance and regulatory workstreams for our Initial Public Offering, and the experience exceeded our expectations.

Their strategic understanding of capital markets regulations, strong command over SEBI and stock exchange requirements, and structured approach to managing complex timelines were instrumental in the successful completion of the IPO process. They demonstrated exceptional diligence in due diligence reviews, drafting and vetting of offer documents, and seamless coordination with legal counsel, merchant bankers, auditors, and stock exchange authorities.

We value their professionalism, reliability, and advisory mindset, and we would highly recommend their services for IPO advisory, listing compliances, and corporate governance engagements.`,
      photo: 'assets/images/testimonial_pic2.webp',
    },
  ];

  activeTestimonialIndex = 0;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.loadTeam();
    this.loadGallery();
  }

  private loadTeam(): void {
    this.http
      .get<{ data?: Array<{ name?: string; photoUrl?: string }> }>(
        `${environment.apiBaseUrl}/get-team`
      )
      .subscribe({
        next: (res) => {
          const mapped =
            res.data?.map((member) => ({
              src: member.photoUrl || '',
              alt: member.name || 'Team photo',
            })) || [];

          this.teamItems = mapped.filter((m) => !!m.src);
          this.currentIndex = 0;
        },
        error: () => {
          this.teamItems = [];
        },
      });
  }

  private loadGallery(): void {
    this.http
      .get<{ data?: Array<{ name?: string; imageUrl?: string }> }>(
        `${environment.apiBaseUrl}/get-gallery`
      )
      .subscribe({
        next: (res) => {
          const items =
            res.data?.map((item) => ({
              src: item.imageUrl || '',
              alt: item.name || 'Gallery image',
            })) || [];

          this.galleryItems = items.filter((i) => !!i.src);
          this.currentIndex = 0;
          this.visibleGalleryItemsCount = Math.min(
            this.initialVisibleGalleryItems,
            this.galleryItems.length
          );
        },
        error: () => {
          // Keep empty to avoid breaking UI; could add logging/alert if needed.
          this.galleryItems = [];
          this.visibleGalleryItemsCount = this.initialVisibleGalleryItems;
        },
      });
  }

  nextImage(): void {
    if (!this.teamItems.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.teamItems.length;
  }

  prevImage(): void {
    if (!this.teamItems.length) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.teamItems.length) %
      this.teamItems.length;
  }

  /**
   * Items in the visual order: [prev-2, prev, center, next, next-2]
   * so the active slide always stays in the middle slot.
   */
  get displayItems(): GalleryItem[] {
    const items = this.teamItems;
    const length = items.length;

    if (!length) return [];

    const result: GalleryItem[] = [];
    const offsets = [-2, -1, 0, 1, 2];

    for (const offset of offsets) {
      const index = (this.currentIndex + offset + length) % length;
      result.push(items[index]);
    }

    return result;
  }

  /**
   * Map slot (0..4) to a position class.
   */
  getPositionClass(slotIndex: number): string {
    switch (slotIndex) {
      case 0:
        return 'is-prev-2';
      case 1:
        return 'is-prev';
      case 2:
        return 'is-center';
      case 3:
        return 'is-next';
      case 4:
        return 'is-next-2';
      default:
        return 'is-hidden';
    }
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

  showMoreGalleryItems(): void {
    this.visibleGalleryItemsCount = this.galleryItems.length;
  }

  get hasHiddenGalleryItems(): boolean {
    return this.galleryItems.length > this.visibleGalleryItemsCount;
  }
}
