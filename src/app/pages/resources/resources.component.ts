import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Lecture {
  title: string;
  thumbnailUrl: string;
  videoUrl?: string;
}

interface Podcast {
  title: string;
  description?: string;
  audioUrl?: string;
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent implements OnInit {
  lectures: Lecture[] = [];
  podcasts: Podcast[] = [];
  featuredLecture?: Lecture;
  selectedLecture?: Lecture;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.loadLectures();
    this.loadPodcasts();
  }

  private loadLectures(): void {
    this.http
      .get<{ data?: Array<{ title?: string; thumbnailUrl?: string }> }>(
        `${environment.apiBaseUrl}/get-lectures`
      )
      .subscribe({
        next: (res) => {
          const mapped =
            res.data?.map((v) => ({
              title: v.title || 'Lecture',
              thumbnailUrl: v.thumbnailUrl || '',
              // Fallback video URL if API does not provide one
              videoUrl:
                (v as any).videoUrl ||
                (v as any).url ||
                'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            })) || [];
          this.lectures = mapped.filter((m) => !!m.thumbnailUrl);
          this.featuredLecture = this.lectures[0];
          this.selectedLecture = this.featuredLecture;
        },
        error: () => {
          this.lectures = [];
          this.featuredLecture = undefined;
          this.selectedLecture = undefined;
        },
      });
  }

  private loadPodcasts(): void {
    this.http
      .get<{ data?: Array<{ title?: string; description?: string; audioUrl?: string }> }>(
        `${environment.apiBaseUrl}/get-podcasts`
      )
      .subscribe({
        next: (res) => {
          this.podcasts =
            res.data?.map((p) => ({
              title: p.title || 'Podcast',
              description: p.description || '',
              audioUrl: p.audioUrl,
            })) || [];
        },
        error: () => {
          this.podcasts = [];
        },
      });
  }

  selectLecture(lecture: Lecture): void {
    this.selectedLecture = lecture;
  }

  openVideo(url?: string | null): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
