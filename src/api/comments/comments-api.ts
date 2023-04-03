import { AxiosResponse } from 'axios';

import { instance } from '../api-instance';

import { RequestCommentType, ResponseCommentType } from './comments-api-types';

export const commentsApi = {
  addComment: (payload: RequestCommentType) =>
    instance.post<RequestCommentType, AxiosResponse<ResponseCommentType>>('/comments', payload),
  updateComment: (payload: RequestCommentType, commentId: number) =>
    instance.put<RequestCommentType, AxiosResponse<ResponseCommentType>>(`/comments/${commentId}`, payload),
};
