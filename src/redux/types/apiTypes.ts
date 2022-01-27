export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type UserDataResponseType = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type UserDataType = {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type ProfileDataType = Pick<
  UserDataType,
  'firstName' | 'secondName' | 'displayName' | 'login' | 'email' | 'phone'
>;

export type LoginDataType = {
  login: string;
  password: string;
};

export type RegistrationDataType = Omit<ProfileDataType, 'displayName'> &
  Pick<LoginDataType, 'password'>;

export type CommentType = {
  id: number;
  author: string;
  text: string;
  postId: number;

  comments?: CommentType[];
};

export type TopicType = {
  id: number;
  author: {
    login: string;
  };
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;

  avatar?: string;
  comments?: CommentType[];
};

export type NewTopicType = {
  title: string;
  text: string;
};

export type NewCommentType = {
  text: string;
  postId: number;
};
