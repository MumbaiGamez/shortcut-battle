export enum ForumAPI {
  root = '/forum',
}

export enum UserAPI {
  root = '/user',
  byId = '/:id',
  settings = '/settings',
}

export enum PostAPI {
  root = '/posts',
  byId = '/posts/:id',
  comments = '/posts/:id/comments',
}

export enum CommentAPI {
  root = '/comments',
  byId = '/comments/:id',
}

export enum WwwAPI {
  locales = '/locales',
  sw = '/sw.js',
}
