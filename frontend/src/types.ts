export interface INote {
  noteId?: string;
  createdAt?: string;
  content: string;
  attachment: string;
  attachmentURL?: string;
}

export interface IUser {
  username: string;
  password: string;
}

export interface IUserBillDetails {
  storage: number;
  source: string;
}
