import { ICard, IColumnState } from '../types/types'

class LocalStrorageAgent {
  public saveTodo(todo: IColumnState): void {
    localStorage.setItem('todo', JSON.stringify(todo));
  }

  public loadTodo(): IColumnState | null {
    const data = localStorage.getItem('todo');
    if (data) {
      return JSON.parse(data) as IColumnState;
    } else {
      return null;
    }
  }

  public saveInProgress(inProgress: IColumnState): void {
    localStorage.setItem('inProgress', JSON.stringify(inProgress));
  }

  public loadInProgress(): IColumnState | null {
    const data = localStorage.getItem('inProgress');
    if (data) {
      return JSON.parse(data) as IColumnState;
    } else {
      return null;
    }
  }

  public saveTest(test: IColumnState): void {
    localStorage.setItem('test', JSON.stringify(test));
  }

  public loadTest(): IColumnState | null {
    const data = localStorage.getItem('test');
    if (data) {
      return JSON.parse(data) as IColumnState;
    } else {
      return null;
    }
  }

  public saveDone(done: IColumnState): void {
    localStorage.setItem('done', JSON.stringify(done));
  }

  public loadDone(): IColumnState | null {
    const data = localStorage.getItem('done');
    if (data) {
      return JSON.parse(data) as IColumnState;
    } else {
      return null;
    }
  }

  public saveUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  public loadUsername(): string | null {
    return localStorage.getItem('username');
  }

  public deleteUsername(): void {
    return localStorage.removeItem('username');
  }

  public updateCard(card: ICard): void {
    const data = localStorage.getItem(card.key);
    if (data) {
      const column = JSON.parse(data) as IColumnState;
      column.cards = column.cards.map(c => {
        if (c.id === card.id) {
          return { ...card }
        } else {
          return c;
        }
      });
      localStorage.setItem(card.key, JSON.stringify(column));
    }
  }

  public deleteCard(card: ICard): void {
    const data = localStorage.getItem(card.key);
    if (data) {
      const column = JSON.parse(data) as IColumnState;
      column.cards = column.cards.filter(c => c.id !== card.id);
      localStorage.setItem(card.key, JSON.stringify(column));
    }
  }
}

export const localStorageAgent = new LocalStrorageAgent();