import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { ArticlesModel } from 'src/app/models/article';

@Component({
  selector: 'app-change-post',
  templateUrl: './change-post.component.html',
  styleUrls: ['./change-post.component.scss']
})
export class ChangePostComponent implements OnInit {

  public articleId: string;
  public articleDetail = <ArticlesModel>{}
  public mode: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private articlesServise: ArticlesService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.articleId = params['id']
      if (this.articleId !== undefined) {
        this.getArticleDetailById(this.articleId)
        this.mode = 'Edit'
      }
      else {
        this.articleDetail['id'] = 0;
        this.mode = 'Add'
      }
    })
  }

  getArticleDetailById(id) {
    this.articleDetail = this.articlesServise.getArticleById(parseInt(id))
  }

  onArticleSubmitForm(form) {
    if (form.valid) {
      this.articlesServise.updateArticleById(this.articleDetail)
      this.router.navigate(['/show-post'])
    }
  }

  onClickCancel() {
    this.router.navigate(['/show-post'])
  }
}
