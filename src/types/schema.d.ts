// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    getDesigns: Array<IDesign | null> | null;
    getPosts: Array<IPost | null> | null;
  }

  interface IDesign {
    __typename: 'Design';
    _id: string | null;
    author: string | null;
    gitRepo: string;
    imageUrl: string | null;
    stars: number | null;

    /**
     * comment: [Comment]
     */
    date: string | null;
    version: number | null;
    license: string | null;
    createdBy: IUser | null;
  }

  interface IUser {
    __typename: 'User';
    _id: string | null;
    username: string;
    email: string;
    password: string;
    avatar: string | null;
    joinDate: string;
    favorites: Array<IPost | null> | null;
  }

  interface IPost {
    __typename: 'Post';
    _id: string | null;
    title: string;
    imageUrl: string;
    categories: Array<string | null>;
    description: string;
    createdDate: string | null;
    likes: number | null;
    createdBy: IUser | null;
    messages: Array<IMessage | null> | null;
  }

  interface IMessage {
    __typename: 'Message';
    _id: string | null;
    messageBody: string;
    messageDate: string | null;
    messageUser: IUser;
  }

  interface IMutation {
    __typename: 'Mutation';
    addDesign: IDesign;
    addPost: IPost;
    signUp: IUser;
  }

  interface IAddDesignOnMutationArguments {
    author?: string | null;
    gitRepo: string;
    imageUrl?: string | null;
    stars?: number | null;
    date?: string | null;
    version?: number | null;
    license?: string | null;
    createdBy?: number | null;
  }

  interface IAddPostOnMutationArguments {
    title: string;
    imageUrl: string;
    categories: Array<string | null>;
    description: string;
    createdBy: number;
  }

  interface ISignUpOnMutationArguments {
    username: string;
    email: string;
    password: string;
  }
}

// tslint:enable
