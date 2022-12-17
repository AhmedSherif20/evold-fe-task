import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  constructor(private httpClient: HttpClient) {}

  getRepos(date: string, pageNum: Number, perPage: Number): Observable<any> {
    let url = `https://api.github.com/search/repositories?q=created:%3E${date}&sort=stars&order=desc&page=${pageNum}&per_page=${perPage}`;
    return this.httpClient.get(url);
  }
}
