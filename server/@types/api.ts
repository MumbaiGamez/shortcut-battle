export enum forum {
  index = '/forum',
}

export enum user {
  index = '/user',
  byId = '/:id',
  settings = '/settings',
}

export enum post {
  index = '/posts',
  byId = '/posts/:id',
  comments = '/posts/:id/comments',
}

export enum comment {
  index = '/comments',
  byId = '/comments/:id',
}

export enum www {
  locales = '/locales',
  sw = '/sw.js',
}
