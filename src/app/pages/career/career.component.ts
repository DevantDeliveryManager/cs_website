import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface CareerJob {
  id: number;
  title: string;
  description: string;
  postedOn: string; // ISO date string
}

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss',
})
export class CareerComponent implements OnInit {
  // Filter fields
  fromDate = '';
  toDate = '';
  searchTitle = '';

  // All jobs
  private jobs: CareerJob[] = [];

  loading = false;
  loadError = '';

  // Pagination (Load more)
  private readonly pageSize = 6;
  visibleCount = this.pageSize;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  private fetchJobs(): void {
    this.loading = true;
    this.loadError = '';

    this.http.get<any>(`${environment.apiBaseUrl}/get-careers`).subscribe({
      next: (res) => {
        const rawList: any[] = Array.isArray(res?.data) ? res.data : [];

        const mapped =
          rawList.map((item, idx) => ({
            id: item?.id ?? idx,
            title: item?.title || item?.name || 'Career Opportunity',
            description: item?.description || item?.details || item?.summary || 'Details not provided.',
            postedOn:
              item?.postedOn ||
              item?.postedDate ||
              item?.createdAt ||
              item?.date ||
              new Date().toISOString(),
          })) || [];

        this.jobs = mapped;
        this.visibleCount = this.pageSize;
        this.loadError = '';
      },
      error: () => {
        this.loadError = 'Unable to load careers right now.';
        this.jobs = [];
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  // Filtered and visible jobs
  get filteredJobs(): CareerJob[] {
    return this.jobs.filter((job) => {
      const titleQuery = this.searchTitle.trim().toLowerCase();
      const titleMatch = titleQuery
        ? job.title.toLowerCase().includes(titleQuery)
        : true;

      const jobDate = new Date(job.postedOn);

      let inRange = true;

      if (this.fromDate) {
        inRange = inRange && jobDate >= new Date(this.fromDate);
      }

      if (this.toDate) {
        inRange = inRange && jobDate <= new Date(this.toDate);
      }

      return titleMatch && inRange;
    });
  }

  get visibleJobs(): CareerJob[] {
    return this.filteredJobs.slice(0, this.visibleCount);
  }

  get canLoadMore(): boolean {
    return this.visibleCount < this.filteredJobs.length;
  }

  onSearch(): void {
    // Reset pagination when filters change via the button
    this.visibleCount = this.pageSize;
  }

  onLoadMore(): void {
    if (!this.canLoadMore) {
      return;
    }

    const nextCount = this.visibleCount + this.pageSize;
    this.visibleCount = Math.min(nextCount, this.filteredJobs.length);
  }
}
