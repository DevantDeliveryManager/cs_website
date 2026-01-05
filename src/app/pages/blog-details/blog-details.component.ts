import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService, Blog } from '../../services/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit {
  blog: Blog | null = null;
  relatedBlogs: Blog[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  blogSlug: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.blogSlug = params.get('slug');
      if (this.blogSlug) {
        this.loadBlogDetails(this.blogSlug);
      }
    });
  }

  loadBlogDetails(slug: string): void {
    this.isLoading = true;
    this.error = null;
    this.blogService.getBlogBySlug(slug).subscribe({
      next: (response) => {
        this.blog = response.data;
        this.relatedBlogs = response.related || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading blog details:', err);
        this.error = 'Failed to load blog details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  formatDate(dateString: string): { day: string; month: string } {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('en-US', { month: 'short' })
    };
  }
}
