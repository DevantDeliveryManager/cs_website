import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  featureImage: string;
  featureImageUrl: string;
  shortDescription: string;
  description: string;
  createdAt: string;
}

export interface BlogResponse {
  data: Blog[];
}

export interface BlogDetailResponse {
  data: Blog;
  related: Blog[];
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly blogsEndpoint = `${environment.apiBaseUrl}/get-blog`;
  private readonly blogBySlugEndpoint = `${environment.apiBaseUrl}/get-blog-by-slug`;

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<BlogResponse>(this.blogsEndpoint).pipe(
      map(response => response.data)
    );
  }

  getBlogBySlug(slug: string): Observable<BlogDetailResponse> {
    return this.http.get<BlogDetailResponse>(`${this.blogBySlugEndpoint}/${slug}`);
  }
}
