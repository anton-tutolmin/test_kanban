import { IComment } from '../types/types'

class LocalStrorageAgent {
  public setTodoTitle(title: string) {
    localStorage.setItem('todoTitle', title);
  }

  public getTodoTitle(): string | null {
    return localStorage.getItem('todoTitle');
  }

  public setInProgressTitle(title: string) {
    localStorage.setItem('inprogressTitle', title);
  }

  public getInProgressTitle(): string | null {
    return localStorage.getItem('inprogressTitle');
  }

  public setTestTitle(title: string) {
    localStorage.setItem('testTitle', title);
  }

  public getTestTitle(): string | null {
    return localStorage.getItem('testTitle');
  }

  public setDoneTitle(title: string) {
    localStorage.setItem('doneTitle', title);
  }

  public getDoneTitle(): string | null {
    return localStorage.getItem('doneTitle');
  }

  public saveComment(comment: IComment) {
    const data = localStorage.getItem('comments');
    const comments = data ? JSON.parse(data) as IComment[] : [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
  }
}

export const localStorageAgent = new LocalStrorageAgent();