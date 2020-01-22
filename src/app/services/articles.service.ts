import { ArticlesModel } from 'src/app/models/article';
import { Injectable } from '@angular/core'

@Injectable()
export class ArticlesService {

  public articles: ArticlesModel[] = []
  constructor() { }

  getAllArticles(): ArticlesModel[] {
    if (localStorage.getItem('localData') !== null) {
      this.articles = JSON.parse(localStorage.getItem('localData'))
    }
    else {
      let articleArrayData = [
        {
          id: 1,
          title: 'Great Britain',
          content: 'London is the capital of Great Britain'
        },
        {
          id: 2,
          title: 'Ukraine',
          content: 'Kyiv is the capital of Ukraine'
        }
      ]
      localStorage.setItem('localData', JSON.stringify(articleArrayData))
      this.articles = JSON.parse(localStorage.getItem('localData'))
    }
    return this.articles
  }

  getArticleById(id: number): ArticlesModel {
    let articleArray = JSON.parse(localStorage.getItem('localData'))
    return articleArray
      .filter(todo => todo.id === id)
      .pop()
  }

  updateArticleById(article): ArticlesModel {
    if (article.id === 0) {
      let articleArray = JSON.parse(localStorage.getItem('localData'))
      let articleId = articleArray.length
      article.id = ++articleId
      articleArray.push(article)
      localStorage.setItem('localData', JSON.stringify(articleArray))
    }
    else {
      let articleSaveArray = JSON.parse(localStorage.getItem('localData'))
      for (let i in articleSaveArray) {
        if (articleSaveArray[i].id === article.id) {
          articleSaveArray[i] = article
          localStorage.setItem('localData', JSON.stringify(articleSaveArray))
        }
      }
    }
    return article
  }

  deleteArticleDetail(id) {
    let articleArray = JSON.parse(localStorage.getItem('localData'))
    for (let i in articleArray) {
      if (articleArray[i].id === id) {
        articleArray.splice(i, 1)
        localStorage.setItem('localData', JSON.stringify(articleArray))
      }
    }
  }

}
