import { Component, OnInit } from '@angular/core';
import { Repo } from 'src/app/models/repo';
import { GithubApiService } from 'src/app/services/github-api.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 100;
  totalRepos: number = 1000;
  repos: Repo[] = [];
  loading: boolean = false;
  error: boolean = false;
  errorMsg: string = '';
  constructor(private githubApiService: GithubApiService) {}

  ngOnInit(): void {
    this.getRepos(1);
  }

  async getRepos(pageNum: number) {
    this.loading = true;

    let date: Date | string = new Date();
    date.setDate(date.getDate() - 30);
    date = this.formatDate(date);

    await firstValueFrom(
      this.githubApiService.getRepos(date, pageNum, this.pageSize)
    )
      .then((res) => {
        this.repos = res.items;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.error = true;
        this.errorMsg = err.error.message;
        setTimeout(() => {
          this.getRepos(1);
          this.error = false;
        }, 7000);
      });
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
