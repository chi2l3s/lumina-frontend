import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type ActorModel = {
  __typename?: 'ActorModel';
  bio: Scalars['String']['output'];
  content: ContentModel;
  contentId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photoUrl: Scalars['String']['output'];
};

export type AuthModel = {
  __typename?: 'AuthModel';
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserModel>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ContentModel = {
  __typename?: 'ContentModel';
  actors: Array<ActorModel>;
  backdropUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  genres: Array<GenreModel>;
  id: Scalars['String']['output'];
  movie?: Maybe<MovieModel>;
  posterUrl?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  releaseYear?: Maybe<Scalars['Float']['output']>;
  series?: Maybe<SeriesModel>;
  title: Scalars['String']['output'];
  trailerUrl?: Maybe<Scalars['String']['output']>;
  type: ContentType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ContentType {
  Movie = 'MOVIE',
  Series = 'SERIES'
}

export type CreateContentInput = {
  actorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  genresIds?: InputMaybe<Array<Scalars['String']['input']>>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  releaseYear?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  trailerUrl?: InputMaybe<Scalars['String']['input']>;
  type: ContentType;
};

export type CreateEpisodeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  episodeNumber: Scalars['Float']['input'];
  seasonId: Scalars['String']['input'];
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateSeriesSeasonInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  releaseYear?: InputMaybe<Scalars['Float']['input']>;
  seasonNumber: Scalars['Float']['input'];
  seriesId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type DeviceModel = {
  __typename?: 'DeviceModel';
  browser: Scalars['String']['output'];
  os: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type EditMovieInput = {
  actorIds: Array<Scalars['String']['input']>;
  contentId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  genresIds: Array<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  releaseYear: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type EnableTotpInput = {
  pin: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type EpisodeModel = {
  __typename?: 'EpisodeModel';
  airDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  episodeNumber: Scalars['Float']['output'];
  hlsMasterUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  originalVideoKey?: Maybe<Scalars['String']['output']>;
  processingError?: Maybe<Scalars['String']['output']>;
  processingJobId?: Maybe<Scalars['String']['output']>;
  processingStatus: ProcessingStatus;
  seasonId: Scalars['String']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GenreModel = {
  __typename?: 'GenreModel';
  content: ContentModel;
  contentId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type LocationModel = {
  __typename?: 'LocationModel';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type MovieModel = {
  __typename?: 'MovieModel';
  content: ContentModel;
  contentId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Float']['output'];
  hlsMasterUrl: Scalars['String']['output'];
  id: Scalars['String']['output'];
  originalVideoKey: Scalars['String']['output'];
  processingError: Scalars['String']['output'];
  processingJobId: Scalars['String']['output'];
  processingStatus: ProcessingStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveTvAuth: Scalars['Boolean']['output'];
  cancelProcessingJob: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  clearSessionCookie: Scalars['Boolean']['output'];
  createContent: Scalars['String']['output'];
  createEpisode: Scalars['Boolean']['output'];
  createMovie: Scalars['Boolean']['output'];
  createSeriesSeason: Scalars['Boolean']['output'];
  createUser: Scalars['String']['output'];
  disableTotp: Scalars['Boolean']['output'];
  editMovie: Scalars['Boolean']['output'];
  enableTotp: Scalars['Boolean']['output'];
  generateTvCode: TvAuthCodeType;
  loginUser: AuthModel;
  logoutTv: Scalars['Boolean']['output'];
  logoutUser: Scalars['Boolean']['output'];
  newPassword: Scalars['Boolean']['output'];
  processVideo: ProcessVideoResponse;
  removeSession: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  setContentFavorite: Scalars['Boolean']['output'];
  syncProcessingJob: Scalars['Boolean']['output'];
  verifyAccount: AuthModel;
};


export type MutationApproveTvAuthArgs = {
  code: Scalars['String']['input'];
};


export type MutationCancelProcessingJobArgs = {
  jobId: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreateContentArgs = {
  data: CreateContentInput;
  poster: Scalars['Upload']['input'];
};


export type MutationCreateEpisodeArgs = {
  data: CreateEpisodeInput;
};


export type MutationCreateMovieArgs = {
  contentId: Scalars['String']['input'];
};


export type MutationCreateSeriesSeasonArgs = {
  data: CreateSeriesSeasonInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationEditMovieArgs = {
  backdrop?: InputMaybe<Scalars['Upload']['input']>;
  data: EditMovieInput;
  poster?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationEnableTotpArgs = {
  data: EnableTotpInput;
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationNewPasswordArgs = {
  data: NewPasswordInput;
};


export type MutationProcessVideoArgs = {
  data: ProcessVideoInput;
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSetContentFavoriteArgs = {
  data: SetFavoriteInput;
};


export type MutationSyncProcessingJobArgs = {
  jobId: Scalars['String']['input'];
};


export type MutationVerifyAccountArgs = {
  data: VerificationInput;
};

export type NewPasswordInput = {
  password: Scalars['String']['input'];
  passwordRepeat: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ProcessVideoInput = {
  movieId: Scalars['String']['input'];
  qualities: Array<Scalars['String']['input']>;
  s3Key?: InputMaybe<Scalars['String']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type ProcessVideoResponse = {
  __typename?: 'ProcessVideoResponse';
  jobId: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type ProcessingJobModel = {
  __typename?: 'ProcessingJobModel';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  completedQualities: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  episode?: Maybe<EpisodeModel>;
  episodeId?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  jobId: Scalars['String']['output'];
  movie?: Maybe<MovieModel>;
  movieId?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<Scalars['JSON']['output']>;
  requestedQualities: Array<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: ProcessingStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ProcessingStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export type Query = {
  __typename?: 'Query';
  findAllActors: Array<ActorModel>;
  findAllContent: Array<ContentModel>;
  findAllGenres: Array<GenreModel>;
  findAllProcessingJobs: Array<ProcessingJobModel>;
  findContentById: ContentModel;
  findCurrentSession: SessionModel;
  findProfile: UserModel;
  findSessionsByUser: Array<SessionModel>;
  generateTotpSecret: TotpModel;
  isContentFavorite: Scalars['Boolean']['output'];
  myTvSessions: Array<TvSessionType>;
  searchContent: Array<ContentModel>;
};


export type QueryFindContentByIdArgs = {
  contentId: Scalars['String']['input'];
};


export type QueryIsContentFavoriteArgs = {
  contentId: Scalars['String']['input'];
};


export type QuerySearchContentArgs = {
  query: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
};

export type SeriesModel = {
  __typename?: 'SeriesModel';
  content: ContentModel;
  contentId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  status: SeriesStatus;
  totalEpisodes: Scalars['Float']['output'];
  totalSeasons: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum SeriesStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Ongoing = 'ONGOING'
}

export type SessionMetadataModel = {
  __typename?: 'SessionMetadataModel';
  device: DeviceModel;
  ip: Scalars['String']['output'];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: SessionMetadataModel;
  userId: Scalars['String']['output'];
};

export type SetFavoriteInput = {
  contentId: Scalars['String']['input'];
  value: Scalars['Boolean']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  authStatus: TvAuthStatus;
  videoJobProgress: VideoJobProgressModel;
};


export type SubscriptionAuthStatusArgs = {
  token: Scalars['String']['input'];
};


export type SubscriptionVideoJobProgressArgs = {
  jobId: Scalars['String']['input'];
};

export type TotpModel = {
  __typename?: 'TotpModel';
  qrcodeUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type TvAuthCodeType = {
  __typename?: 'TvAuthCodeType';
  code: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type TvAuthStatus = {
  __typename?: 'TvAuthStatus';
  sessionToken?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<UserModel>;
};

export type TvSessionType = {
  __typename?: 'TvSessionType';
  createdAt: Scalars['Float']['output'];
  deviceInfo?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type UserModel = {
  __typename?: 'UserModel';
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isTotpEnabled: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: UserRole;
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type VerificationInput = {
  token: Scalars['String']['input'];
};

export type VideoJobProgressModel = {
  __typename?: 'VideoJobProgressModel';
  jobId: Scalars['String']['output'];
  percent: Scalars['Float']['output'];
  quality?: Maybe<Scalars['String']['output']>;
  speed?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type CreateContentMutationVariables = Exact<{
  data: CreateContentInput;
  poster: Scalars['Upload']['input'];
}>;


export type CreateContentMutation = { __typename?: 'Mutation', createContent: string };

export type CreateMovieMutationVariables = Exact<{
  contentId: Scalars['String']['input'];
}>;


export type CreateMovieMutation = { __typename?: 'Mutation', createMovie: boolean };

export type EditMovieMutationVariables = Exact<{
  data: EditMovieInput;
  poster?: InputMaybe<Scalars['Upload']['input']>;
  backdrop?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type EditMovieMutation = { __typename?: 'Mutation', editMovie: boolean };

export type AuthorizeTvMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type AuthorizeTvMutation = { __typename?: 'Mutation', approveTvAuth: boolean };

export type CreateAccountMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createUser: string };

export type LogOutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthModel', message?: string | null } };

export type NewPasswordMutationVariables = Exact<{
  data: NewPasswordInput;
}>;


export type NewPasswordMutation = { __typename?: 'Mutation', newPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type VerifyAccountMutationVariables = Exact<{
  data: VerificationInput;
}>;


export type VerifyAccountMutation = { __typename?: 'Mutation', verifyAccount: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', isEmailVerified: boolean } | null } };

export type SetContentFavoriteMutationVariables = Exact<{
  data: SetFavoriteInput;
}>;


export type SetContentFavoriteMutation = { __typename?: 'Mutation', setContentFavorite: boolean };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ClearSessionCookieMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSessionCookieMutation = { __typename?: 'Mutation', clearSessionCookie: boolean };

export type DisableTotpMutationVariables = Exact<{ [key: string]: never; }>;


export type DisableTotpMutation = { __typename?: 'Mutation', disableTotp: boolean };

export type EnableTotpMutationVariables = Exact<{
  data: EnableTotpInput;
}>;


export type EnableTotpMutation = { __typename?: 'Mutation', enableTotp: boolean };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', removeSession: boolean };

export type FindAllActorsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllActorsQuery = { __typename?: 'Query', findAllActors: Array<{ __typename?: 'ActorModel', id: string, name: string }> };

export type FindAllProcessingJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllProcessingJobsQuery = { __typename?: 'Query', findAllProcessingJobs: Array<{ __typename?: 'ProcessingJobModel', id: string, jobId: string, status: ProcessingStatus, progress?: any | null, error?: string | null }> };

export type StreamVideoProcessSubscriptionVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type StreamVideoProcessSubscription = { __typename?: 'Subscription', videoJobProgress: { __typename?: 'VideoJobProgressModel', jobId: string, percent: number, quality?: string | null, speed?: string | null } };

export type FindAllContentQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllContentQuery = { __typename?: 'Query', findAllContent: Array<{ __typename?: 'ContentModel', id: string, title: string, description?: string | null, releaseYear?: number | null, posterUrl?: string | null, backdropUrl?: string | null, trailerUrl?: string | null, updatedAt: any }> };

export type FindContentByIdQueryVariables = Exact<{
  contentId: Scalars['String']['input'];
}>;


export type FindContentByIdQuery = { __typename?: 'Query', findContentById: { __typename?: 'ContentModel', id: string, title: string, releaseYear?: number | null, type: ContentType, backdropUrl?: string | null, posterUrl?: string | null, trailerUrl?: string | null, description?: string | null, rating?: number | null, genres: Array<{ __typename?: 'GenreModel', id: string, name: string }>, actors: Array<{ __typename?: 'ActorModel', id: string, name: string }>, movie?: { __typename?: 'MovieModel', id: string } | null, series?: { __typename?: 'SeriesModel', id: string } | null } };

export type IsContentFavoriteQueryVariables = Exact<{
  contentId: Scalars['String']['input'];
}>;


export type IsContentFavoriteQuery = { __typename?: 'Query', isContentFavorite: boolean };

export type SearchContentQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchContentQuery = { __typename?: 'Query', searchContent: Array<{ __typename?: 'ContentModel', id: string, title: string, posterUrl?: string | null }> };

export type FindAllGenresQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllGenresQuery = { __typename?: 'Query', findAllGenres: Array<{ __typename?: 'GenreModel', id: string, name: string, slug: string }> };

export type FindCurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type FindCurrentSessionQuery = { __typename?: 'Query', findCurrentSession: { __typename?: 'SessionModel', id: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, location: { __typename?: 'LocationModel', country: string, city: string, latitude: number, longitude: number }, device: { __typename?: 'DeviceModel', browser: string, os: string } } } };

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { __typename?: 'Query', findProfile: { __typename?: 'UserModel', id: string, firstName: string, lastName: string, email: string, dateOfBirth?: any | null, isTotpEnabled: boolean } };

export type FindSessionByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSessionByUserQuery = { __typename?: 'Query', findSessionsByUser: Array<{ __typename?: 'SessionModel', id: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, location: { __typename?: 'LocationModel', country: string, city: string, latitude: number, longitude: number }, device: { __typename?: 'DeviceModel', browser: string, os: string } } }> };

export type GenerateTotpSecretQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTotpSecretQuery = { __typename?: 'Query', generateTotpSecret: { __typename?: 'TotpModel', qrcodeUrl: string, secret: string } };


export const CreateContentDocument = gql`
    mutation CreateContent($data: CreateContentInput!, $poster: Upload!) {
  createContent(data: $data, poster: $poster)
}
    `;
export type CreateContentMutationFn = Apollo.MutationFunction<CreateContentMutation, CreateContentMutationVariables>;

/**
 * __useCreateContentMutation__
 *
 * To run a mutation, you first call `useCreateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentMutation, { data, loading, error }] = useCreateContentMutation({
 *   variables: {
 *      data: // value for 'data'
 *      poster: // value for 'poster'
 *   },
 * });
 */
export function useCreateContentMutation(baseOptions?: Apollo.MutationHookOptions<CreateContentMutation, CreateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContentMutation, CreateContentMutationVariables>(CreateContentDocument, options);
      }
export type CreateContentMutationHookResult = ReturnType<typeof useCreateContentMutation>;
export type CreateContentMutationResult = Apollo.MutationResult<CreateContentMutation>;
export type CreateContentMutationOptions = Apollo.BaseMutationOptions<CreateContentMutation, CreateContentMutationVariables>;
export const CreateMovieDocument = gql`
    mutation CreateMovie($contentId: String!) {
  createMovie(contentId: $contentId)
}
    `;
export type CreateMovieMutationFn = Apollo.MutationFunction<CreateMovieMutation, CreateMovieMutationVariables>;

/**
 * __useCreateMovieMutation__
 *
 * To run a mutation, you first call `useCreateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMovieMutation, { data, loading, error }] = useCreateMovieMutation({
 *   variables: {
 *      contentId: // value for 'contentId'
 *   },
 * });
 */
export function useCreateMovieMutation(baseOptions?: Apollo.MutationHookOptions<CreateMovieMutation, CreateMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMovieMutation, CreateMovieMutationVariables>(CreateMovieDocument, options);
      }
export type CreateMovieMutationHookResult = ReturnType<typeof useCreateMovieMutation>;
export type CreateMovieMutationResult = Apollo.MutationResult<CreateMovieMutation>;
export type CreateMovieMutationOptions = Apollo.BaseMutationOptions<CreateMovieMutation, CreateMovieMutationVariables>;
export const EditMovieDocument = gql`
    mutation EditMovie($data: EditMovieInput!, $poster: Upload, $backdrop: Upload) {
  editMovie(data: $data, poster: $poster, backdrop: $backdrop)
}
    `;
export type EditMovieMutationFn = Apollo.MutationFunction<EditMovieMutation, EditMovieMutationVariables>;

/**
 * __useEditMovieMutation__
 *
 * To run a mutation, you first call `useEditMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMovieMutation, { data, loading, error }] = useEditMovieMutation({
 *   variables: {
 *      data: // value for 'data'
 *      poster: // value for 'poster'
 *      backdrop: // value for 'backdrop'
 *   },
 * });
 */
export function useEditMovieMutation(baseOptions?: Apollo.MutationHookOptions<EditMovieMutation, EditMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMovieMutation, EditMovieMutationVariables>(EditMovieDocument, options);
      }
export type EditMovieMutationHookResult = ReturnType<typeof useEditMovieMutation>;
export type EditMovieMutationResult = Apollo.MutationResult<EditMovieMutation>;
export type EditMovieMutationOptions = Apollo.BaseMutationOptions<EditMovieMutation, EditMovieMutationVariables>;
export const AuthorizeTvDocument = gql`
    mutation AuthorizeTV($code: String!) {
  approveTvAuth(code: $code)
}
    `;
export type AuthorizeTvMutationFn = Apollo.MutationFunction<AuthorizeTvMutation, AuthorizeTvMutationVariables>;

/**
 * __useAuthorizeTvMutation__
 *
 * To run a mutation, you first call `useAuthorizeTvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthorizeTvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authorizeTvMutation, { data, loading, error }] = useAuthorizeTvMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAuthorizeTvMutation(baseOptions?: Apollo.MutationHookOptions<AuthorizeTvMutation, AuthorizeTvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthorizeTvMutation, AuthorizeTvMutationVariables>(AuthorizeTvDocument, options);
      }
export type AuthorizeTvMutationHookResult = ReturnType<typeof useAuthorizeTvMutation>;
export type AuthorizeTvMutationResult = Apollo.MutationResult<AuthorizeTvMutation>;
export type AuthorizeTvMutationOptions = Apollo.BaseMutationOptions<AuthorizeTvMutation, AuthorizeTvMutationVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount($data: CreateUserInput!) {
  createUser(data: $data)
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const LogOutUserDocument = gql`
    mutation LogOutUser {
  logoutUser
}
    `;
export type LogOutUserMutationFn = Apollo.MutationFunction<LogOutUserMutation, LogOutUserMutationVariables>;

/**
 * __useLogOutUserMutation__
 *
 * To run a mutation, you first call `useLogOutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutUserMutation, { data, loading, error }] = useLogOutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogOutUserMutation, LogOutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutUserMutation, LogOutUserMutationVariables>(LogOutUserDocument, options);
      }
export type LogOutUserMutationHookResult = ReturnType<typeof useLogOutUserMutation>;
export type LogOutUserMutationResult = Apollo.MutationResult<LogOutUserMutation>;
export type LogOutUserMutationOptions = Apollo.BaseMutationOptions<LogOutUserMutation, LogOutUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginInput!) {
  loginUser(data: $data) {
    message
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const NewPasswordDocument = gql`
    mutation NewPassword($data: NewPasswordInput!) {
  newPassword(data: $data)
}
    `;
export type NewPasswordMutationFn = Apollo.MutationFunction<NewPasswordMutation, NewPasswordMutationVariables>;

/**
 * __useNewPasswordMutation__
 *
 * To run a mutation, you first call `useNewPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPasswordMutation, { data, loading, error }] = useNewPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewPasswordMutation(baseOptions?: Apollo.MutationHookOptions<NewPasswordMutation, NewPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPasswordMutation, NewPasswordMutationVariables>(NewPasswordDocument, options);
      }
export type NewPasswordMutationHookResult = ReturnType<typeof useNewPasswordMutation>;
export type NewPasswordMutationResult = Apollo.MutationResult<NewPasswordMutation>;
export type NewPasswordMutationOptions = Apollo.BaseMutationOptions<NewPasswordMutation, NewPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyAccountDocument = gql`
    mutation VerifyAccount($data: VerificationInput!) {
  verifyAccount(data: $data) {
    user {
      isEmailVerified
    }
    message
  }
}
    `;
export type VerifyAccountMutationFn = Apollo.MutationFunction<VerifyAccountMutation, VerifyAccountMutationVariables>;

/**
 * __useVerifyAccountMutation__
 *
 * To run a mutation, you first call `useVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountMutation, { data, loading, error }] = useVerifyAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyAccountMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAccountMutation, VerifyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAccountMutation, VerifyAccountMutationVariables>(VerifyAccountDocument, options);
      }
export type VerifyAccountMutationHookResult = ReturnType<typeof useVerifyAccountMutation>;
export type VerifyAccountMutationResult = Apollo.MutationResult<VerifyAccountMutation>;
export type VerifyAccountMutationOptions = Apollo.BaseMutationOptions<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const SetContentFavoriteDocument = gql`
    mutation SetContentFavorite($data: SetFavoriteInput!) {
  setContentFavorite(data: $data)
}
    `;
export type SetContentFavoriteMutationFn = Apollo.MutationFunction<SetContentFavoriteMutation, SetContentFavoriteMutationVariables>;

/**
 * __useSetContentFavoriteMutation__
 *
 * To run a mutation, you first call `useSetContentFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetContentFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setContentFavoriteMutation, { data, loading, error }] = useSetContentFavoriteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSetContentFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<SetContentFavoriteMutation, SetContentFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetContentFavoriteMutation, SetContentFavoriteMutationVariables>(SetContentFavoriteDocument, options);
      }
export type SetContentFavoriteMutationHookResult = ReturnType<typeof useSetContentFavoriteMutation>;
export type SetContentFavoriteMutationResult = Apollo.MutationResult<SetContentFavoriteMutation>;
export type SetContentFavoriteMutationOptions = Apollo.BaseMutationOptions<SetContentFavoriteMutation, SetContentFavoriteMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ClearSessionCookieDocument = gql`
    mutation ClearSessionCookie {
  clearSessionCookie
}
    `;
export type ClearSessionCookieMutationFn = Apollo.MutationFunction<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;

/**
 * __useClearSessionCookieMutation__
 *
 * To run a mutation, you first call `useClearSessionCookieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearSessionCookieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearSessionCookieMutation, { data, loading, error }] = useClearSessionCookieMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearSessionCookieMutation(baseOptions?: Apollo.MutationHookOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>(ClearSessionCookieDocument, options);
      }
export type ClearSessionCookieMutationHookResult = ReturnType<typeof useClearSessionCookieMutation>;
export type ClearSessionCookieMutationResult = Apollo.MutationResult<ClearSessionCookieMutation>;
export type ClearSessionCookieMutationOptions = Apollo.BaseMutationOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;
export const DisableTotpDocument = gql`
    mutation DisableTotp {
  disableTotp
}
    `;
export type DisableTotpMutationFn = Apollo.MutationFunction<DisableTotpMutation, DisableTotpMutationVariables>;

/**
 * __useDisableTotpMutation__
 *
 * To run a mutation, you first call `useDisableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableTotpMutation, { data, loading, error }] = useDisableTotpMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisableTotpMutation(baseOptions?: Apollo.MutationHookOptions<DisableTotpMutation, DisableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableTotpMutation, DisableTotpMutationVariables>(DisableTotpDocument, options);
      }
export type DisableTotpMutationHookResult = ReturnType<typeof useDisableTotpMutation>;
export type DisableTotpMutationResult = Apollo.MutationResult<DisableTotpMutation>;
export type DisableTotpMutationOptions = Apollo.BaseMutationOptions<DisableTotpMutation, DisableTotpMutationVariables>;
export const EnableTotpDocument = gql`
    mutation EnableTotp($data: EnableTotpInput!) {
  enableTotp(data: $data)
}
    `;
export type EnableTotpMutationFn = Apollo.MutationFunction<EnableTotpMutation, EnableTotpMutationVariables>;

/**
 * __useEnableTotpMutation__
 *
 * To run a mutation, you first call `useEnableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTotpMutation, { data, loading, error }] = useEnableTotpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEnableTotpMutation(baseOptions?: Apollo.MutationHookOptions<EnableTotpMutation, EnableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableTotpMutation, EnableTotpMutationVariables>(EnableTotpDocument, options);
      }
export type EnableTotpMutationHookResult = ReturnType<typeof useEnableTotpMutation>;
export type EnableTotpMutationResult = Apollo.MutationResult<EnableTotpMutation>;
export type EnableTotpMutationOptions = Apollo.BaseMutationOptions<EnableTotpMutation, EnableTotpMutationVariables>;
export const RemoveSessionDocument = gql`
    mutation RemoveSession($id: String!) {
  removeSession(id: $id)
}
    `;
export type RemoveSessionMutationFn = Apollo.MutationFunction<RemoveSessionMutation, RemoveSessionMutationVariables>;

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSessionMutation, RemoveSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSessionMutation, RemoveSessionMutationVariables>(RemoveSessionDocument, options);
      }
export type RemoveSessionMutationHookResult = ReturnType<typeof useRemoveSessionMutation>;
export type RemoveSessionMutationResult = Apollo.MutationResult<RemoveSessionMutation>;
export type RemoveSessionMutationOptions = Apollo.BaseMutationOptions<RemoveSessionMutation, RemoveSessionMutationVariables>;
export const FindAllActorsDocument = gql`
    query FindAllActors {
  findAllActors {
    id
    name
  }
}
    `;

/**
 * __useFindAllActorsQuery__
 *
 * To run a query within a React component, call `useFindAllActorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllActorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllActorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllActorsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllActorsQuery, FindAllActorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllActorsQuery, FindAllActorsQueryVariables>(FindAllActorsDocument, options);
      }
export function useFindAllActorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllActorsQuery, FindAllActorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllActorsQuery, FindAllActorsQueryVariables>(FindAllActorsDocument, options);
        }
export function useFindAllActorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllActorsQuery, FindAllActorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllActorsQuery, FindAllActorsQueryVariables>(FindAllActorsDocument, options);
        }
export type FindAllActorsQueryHookResult = ReturnType<typeof useFindAllActorsQuery>;
export type FindAllActorsLazyQueryHookResult = ReturnType<typeof useFindAllActorsLazyQuery>;
export type FindAllActorsSuspenseQueryHookResult = ReturnType<typeof useFindAllActorsSuspenseQuery>;
export type FindAllActorsQueryResult = Apollo.QueryResult<FindAllActorsQuery, FindAllActorsQueryVariables>;
export const FindAllProcessingJobsDocument = gql`
    query FindAllProcessingJobs {
  findAllProcessingJobs {
    id
    jobId
    status
    progress
    error
  }
}
    `;

/**
 * __useFindAllProcessingJobsQuery__
 *
 * To run a query within a React component, call `useFindAllProcessingJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllProcessingJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllProcessingJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllProcessingJobsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllProcessingJobsQuery, FindAllProcessingJobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllProcessingJobsQuery, FindAllProcessingJobsQueryVariables>(FindAllProcessingJobsDocument, options);
      }
export function useFindAllProcessingJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllProcessingJobsQuery, FindAllProcessingJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllProcessingJobsQuery, FindAllProcessingJobsQueryVariables>(FindAllProcessingJobsDocument, options);
        }
export function useFindAllProcessingJobsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllProcessingJobsQuery, FindAllProcessingJobsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllProcessingJobsQuery, FindAllProcessingJobsQueryVariables>(FindAllProcessingJobsDocument, options);
        }
export type FindAllProcessingJobsQueryHookResult = ReturnType<typeof useFindAllProcessingJobsQuery>;
export type FindAllProcessingJobsLazyQueryHookResult = ReturnType<typeof useFindAllProcessingJobsLazyQuery>;
export type FindAllProcessingJobsSuspenseQueryHookResult = ReturnType<typeof useFindAllProcessingJobsSuspenseQuery>;
export type FindAllProcessingJobsQueryResult = Apollo.QueryResult<FindAllProcessingJobsQuery, FindAllProcessingJobsQueryVariables>;
export const StreamVideoProcessDocument = gql`
    subscription StreamVideoProcess($jobId: String!) {
  videoJobProgress(jobId: $jobId) {
    jobId
    percent
    quality
    speed
  }
}
    `;

/**
 * __useStreamVideoProcessSubscription__
 *
 * To run a query within a React component, call `useStreamVideoProcessSubscription` and pass it any options that fit your needs.
 * When your component renders, `useStreamVideoProcessSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamVideoProcessSubscription({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useStreamVideoProcessSubscription(baseOptions: Apollo.SubscriptionHookOptions<StreamVideoProcessSubscription, StreamVideoProcessSubscriptionVariables> & ({ variables: StreamVideoProcessSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<StreamVideoProcessSubscription, StreamVideoProcessSubscriptionVariables>(StreamVideoProcessDocument, options);
      }
export type StreamVideoProcessSubscriptionHookResult = ReturnType<typeof useStreamVideoProcessSubscription>;
export type StreamVideoProcessSubscriptionResult = Apollo.SubscriptionResult<StreamVideoProcessSubscription>;
export const FindAllContentDocument = gql`
    query FindAllContent {
  findAllContent {
    id
    title
    description
    releaseYear
    posterUrl
    backdropUrl
    trailerUrl
    updatedAt
  }
}
    `;

/**
 * __useFindAllContentQuery__
 *
 * To run a query within a React component, call `useFindAllContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllContentQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllContentQuery(baseOptions?: Apollo.QueryHookOptions<FindAllContentQuery, FindAllContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllContentQuery, FindAllContentQueryVariables>(FindAllContentDocument, options);
      }
export function useFindAllContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllContentQuery, FindAllContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllContentQuery, FindAllContentQueryVariables>(FindAllContentDocument, options);
        }
export function useFindAllContentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllContentQuery, FindAllContentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllContentQuery, FindAllContentQueryVariables>(FindAllContentDocument, options);
        }
export type FindAllContentQueryHookResult = ReturnType<typeof useFindAllContentQuery>;
export type FindAllContentLazyQueryHookResult = ReturnType<typeof useFindAllContentLazyQuery>;
export type FindAllContentSuspenseQueryHookResult = ReturnType<typeof useFindAllContentSuspenseQuery>;
export type FindAllContentQueryResult = Apollo.QueryResult<FindAllContentQuery, FindAllContentQueryVariables>;
export const FindContentByIdDocument = gql`
    query FindContentById($contentId: String!) {
  findContentById(contentId: $contentId) {
    id
    title
    releaseYear
    genres {
      id
      name
    }
    actors {
      id
      name
    }
    type
    backdropUrl
    posterUrl
    trailerUrl
    description
    rating
    movie {
      id
    }
    series {
      id
    }
  }
}
    `;

/**
 * __useFindContentByIdQuery__
 *
 * To run a query within a React component, call `useFindContentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindContentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindContentByIdQuery({
 *   variables: {
 *      contentId: // value for 'contentId'
 *   },
 * });
 */
export function useFindContentByIdQuery(baseOptions: Apollo.QueryHookOptions<FindContentByIdQuery, FindContentByIdQueryVariables> & ({ variables: FindContentByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindContentByIdQuery, FindContentByIdQueryVariables>(FindContentByIdDocument, options);
      }
export function useFindContentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindContentByIdQuery, FindContentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindContentByIdQuery, FindContentByIdQueryVariables>(FindContentByIdDocument, options);
        }
export function useFindContentByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindContentByIdQuery, FindContentByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindContentByIdQuery, FindContentByIdQueryVariables>(FindContentByIdDocument, options);
        }
export type FindContentByIdQueryHookResult = ReturnType<typeof useFindContentByIdQuery>;
export type FindContentByIdLazyQueryHookResult = ReturnType<typeof useFindContentByIdLazyQuery>;
export type FindContentByIdSuspenseQueryHookResult = ReturnType<typeof useFindContentByIdSuspenseQuery>;
export type FindContentByIdQueryResult = Apollo.QueryResult<FindContentByIdQuery, FindContentByIdQueryVariables>;
export const IsContentFavoriteDocument = gql`
    query IsContentFavorite($contentId: String!) {
  isContentFavorite(contentId: $contentId)
}
    `;

/**
 * __useIsContentFavoriteQuery__
 *
 * To run a query within a React component, call `useIsContentFavoriteQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsContentFavoriteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsContentFavoriteQuery({
 *   variables: {
 *      contentId: // value for 'contentId'
 *   },
 * });
 */
export function useIsContentFavoriteQuery(baseOptions: Apollo.QueryHookOptions<IsContentFavoriteQuery, IsContentFavoriteQueryVariables> & ({ variables: IsContentFavoriteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsContentFavoriteQuery, IsContentFavoriteQueryVariables>(IsContentFavoriteDocument, options);
      }
export function useIsContentFavoriteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsContentFavoriteQuery, IsContentFavoriteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsContentFavoriteQuery, IsContentFavoriteQueryVariables>(IsContentFavoriteDocument, options);
        }
export function useIsContentFavoriteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IsContentFavoriteQuery, IsContentFavoriteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsContentFavoriteQuery, IsContentFavoriteQueryVariables>(IsContentFavoriteDocument, options);
        }
export type IsContentFavoriteQueryHookResult = ReturnType<typeof useIsContentFavoriteQuery>;
export type IsContentFavoriteLazyQueryHookResult = ReturnType<typeof useIsContentFavoriteLazyQuery>;
export type IsContentFavoriteSuspenseQueryHookResult = ReturnType<typeof useIsContentFavoriteSuspenseQuery>;
export type IsContentFavoriteQueryResult = Apollo.QueryResult<IsContentFavoriteQuery, IsContentFavoriteQueryVariables>;
export const SearchContentDocument = gql`
    query SearchContent($query: String!) {
  searchContent(query: $query) {
    id
    title
    posterUrl
  }
}
    `;

/**
 * __useSearchContentQuery__
 *
 * To run a query within a React component, call `useSearchContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchContentQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchContentQuery(baseOptions: Apollo.QueryHookOptions<SearchContentQuery, SearchContentQueryVariables> & ({ variables: SearchContentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, options);
      }
export function useSearchContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchContentQuery, SearchContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, options);
        }
export function useSearchContentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchContentQuery, SearchContentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, options);
        }
export type SearchContentQueryHookResult = ReturnType<typeof useSearchContentQuery>;
export type SearchContentLazyQueryHookResult = ReturnType<typeof useSearchContentLazyQuery>;
export type SearchContentSuspenseQueryHookResult = ReturnType<typeof useSearchContentSuspenseQuery>;
export type SearchContentQueryResult = Apollo.QueryResult<SearchContentQuery, SearchContentQueryVariables>;
export const FindAllGenresDocument = gql`
    query FindAllGenres {
  findAllGenres {
    id
    name
    slug
  }
}
    `;

/**
 * __useFindAllGenresQuery__
 *
 * To run a query within a React component, call `useFindAllGenresQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllGenresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllGenresQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllGenresQuery(baseOptions?: Apollo.QueryHookOptions<FindAllGenresQuery, FindAllGenresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllGenresQuery, FindAllGenresQueryVariables>(FindAllGenresDocument, options);
      }
export function useFindAllGenresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllGenresQuery, FindAllGenresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllGenresQuery, FindAllGenresQueryVariables>(FindAllGenresDocument, options);
        }
export function useFindAllGenresSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllGenresQuery, FindAllGenresQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllGenresQuery, FindAllGenresQueryVariables>(FindAllGenresDocument, options);
        }
export type FindAllGenresQueryHookResult = ReturnType<typeof useFindAllGenresQuery>;
export type FindAllGenresLazyQueryHookResult = ReturnType<typeof useFindAllGenresLazyQuery>;
export type FindAllGenresSuspenseQueryHookResult = ReturnType<typeof useFindAllGenresSuspenseQuery>;
export type FindAllGenresQueryResult = Apollo.QueryResult<FindAllGenresQuery, FindAllGenresQueryVariables>;
export const FindCurrentSessionDocument = gql`
    query FindCurrentSession {
  findCurrentSession {
    id
    createdAt
    metadata {
      location {
        country
        city
        latitude
        longitude
      }
      device {
        browser
        os
      }
      ip
    }
  }
}
    `;

/**
 * __useFindCurrentSessionQuery__
 *
 * To run a query within a React component, call `useFindCurrentSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCurrentSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCurrentSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindCurrentSessionQuery(baseOptions?: Apollo.QueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
      }
export function useFindCurrentSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export function useFindCurrentSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export type FindCurrentSessionQueryHookResult = ReturnType<typeof useFindCurrentSessionQuery>;
export type FindCurrentSessionLazyQueryHookResult = ReturnType<typeof useFindCurrentSessionLazyQuery>;
export type FindCurrentSessionSuspenseQueryHookResult = ReturnType<typeof useFindCurrentSessionSuspenseQuery>;
export type FindCurrentSessionQueryResult = Apollo.QueryResult<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>;
export const FindProfileDocument = gql`
    query FindProfile {
  findProfile {
    id
    firstName
    lastName
    email
    dateOfBirth
    isTotpEnabled
  }
}
    `;

/**
 * __useFindProfileQuery__
 *
 * To run a query within a React component, call `useFindProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindProfileQuery(baseOptions?: Apollo.QueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
      }
export function useFindProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export function useFindProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export type FindProfileQueryHookResult = ReturnType<typeof useFindProfileQuery>;
export type FindProfileLazyQueryHookResult = ReturnType<typeof useFindProfileLazyQuery>;
export type FindProfileSuspenseQueryHookResult = ReturnType<typeof useFindProfileSuspenseQuery>;
export type FindProfileQueryResult = Apollo.QueryResult<FindProfileQuery, FindProfileQueryVariables>;
export const FindSessionByUserDocument = gql`
    query FindSessionByUser {
  findSessionsByUser {
    id
    createdAt
    metadata {
      location {
        country
        city
        latitude
        longitude
      }
      device {
        browser
        os
      }
      ip
    }
  }
}
    `;

/**
 * __useFindSessionByUserQuery__
 *
 * To run a query within a React component, call `useFindSessionByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSessionByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSessionByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSessionByUserQuery(baseOptions?: Apollo.QueryHookOptions<FindSessionByUserQuery, FindSessionByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSessionByUserQuery, FindSessionByUserQueryVariables>(FindSessionByUserDocument, options);
      }
export function useFindSessionByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSessionByUserQuery, FindSessionByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSessionByUserQuery, FindSessionByUserQueryVariables>(FindSessionByUserDocument, options);
        }
export function useFindSessionByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSessionByUserQuery, FindSessionByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSessionByUserQuery, FindSessionByUserQueryVariables>(FindSessionByUserDocument, options);
        }
export type FindSessionByUserQueryHookResult = ReturnType<typeof useFindSessionByUserQuery>;
export type FindSessionByUserLazyQueryHookResult = ReturnType<typeof useFindSessionByUserLazyQuery>;
export type FindSessionByUserSuspenseQueryHookResult = ReturnType<typeof useFindSessionByUserSuspenseQuery>;
export type FindSessionByUserQueryResult = Apollo.QueryResult<FindSessionByUserQuery, FindSessionByUserQueryVariables>;
export const GenerateTotpSecretDocument = gql`
    query GenerateTotpSecret {
  generateTotpSecret {
    qrcodeUrl
    secret
  }
}
    `;

/**
 * __useGenerateTotpSecretQuery__
 *
 * To run a query within a React component, call `useGenerateTotpSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateTotpSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateTotpSecretQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTotpSecretQuery(baseOptions?: Apollo.QueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
      }
export function useGenerateTotpSecretLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export type GenerateTotpSecretQueryHookResult = ReturnType<typeof useGenerateTotpSecretQuery>;
export type GenerateTotpSecretLazyQueryHookResult = ReturnType<typeof useGenerateTotpSecretLazyQuery>;
export type GenerateTotpSecretSuspenseQueryHookResult = ReturnType<typeof useGenerateTotpSecretSuspenseQuery>;
export type GenerateTotpSecretQueryResult = Apollo.QueryResult<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>;