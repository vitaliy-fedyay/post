import { Component, OnInit } from '@angular/core';
import { ArticlesModel } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {

  public articles: ArticlesModel[] = []

  constructor(private articlesService: ArticlesService, private router: Router) { }

  ngOnInit() {
    this.loadAllArticleList()
  }

  loadAllArticleList() {
    this.articles = this.articlesService.getAllArticles()
  }

  onClickEditArticleDetail(id) {
    this.router.navigate(['/change-post'], { queryParams: { id: id } })
  }

  onClickArticleDelete(id) {
    this.articlesService.deleteArticleDetail(id);
    this.loadAllArticleList();
  }

  onClickAddArticle() {
    this.router.navigate(['/change-post'])
  }

}
