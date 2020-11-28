import {IComment} from './IComment'

export interface ICard {
  title: string;
  description: string;
  author: string;
  column: string;
  comments: IComment[];
}