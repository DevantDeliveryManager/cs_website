import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin?: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  teamMembers: TeamMember[] = [];

  visibleCount = 4;
  currentIndex = 0;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.updateVisibleCount();
    this.loadTeam();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleCount();
  }

  private updateVisibleCount(): void {
    const width = window.innerWidth;

    if (width <= 640) {
      this.visibleCount = 1;
    } else if (width <= 960) {
      this.visibleCount = 2;
    } else {
      this.visibleCount = 4;
    }

    const maxStart = Math.max(this.teamMembers.length - this.visibleCount, 0);
    if (this.currentIndex > maxStart) {
      this.currentIndex = 0;
    }
  }

  get visibleMembers(): TeamMember[] {
    return this.teamMembers.slice(
      this.currentIndex,
      this.currentIndex + this.visibleCount
    );
  }

  nextTeam(): void {
    if (this.teamMembers.length <= this.visibleCount) {
      return;
    }

    const maxStart = this.teamMembers.length - this.visibleCount;
    this.currentIndex =
      this.currentIndex >= maxStart ? 0 : this.currentIndex + 1;
  }

  prevTeam(): void {
    if (this.teamMembers.length <= this.visibleCount) {
      return;
    }

    const maxStart = this.teamMembers.length - this.visibleCount;
    this.currentIndex =
      this.currentIndex <= 0 ? maxStart : this.currentIndex - 1;
  }

  private loadTeam(): void {
    this.http
      .get<{ data?: Array<{ name?: string; designation?: string; photoUrl?: string }> }>(
        `${environment.apiBaseUrl}/get-team`
      )
      .subscribe({
        next: (res) => {
          const mapped =
            res.data?.map((member) => ({
              name: member.name || 'Team member',
              role: member.designation || '',
              description: '',
              image: member.photoUrl || '',
              linkedin: '',
            })) || [];

          this.teamMembers = mapped.filter((m) => !!m.image);
          // reset index to avoid overflow if list shrinks
          this.currentIndex = 0;
        },
        error: () => {
          this.teamMembers = [];
        },
      });
  }
}
