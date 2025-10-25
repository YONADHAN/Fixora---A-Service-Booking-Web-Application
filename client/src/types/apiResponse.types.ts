export interface TValidationIssue {
  message: string
}

export interface TErrorResponse {
  success: false
  statusCode: number
  message: string
  errors?: TValidationIssue[]
  stack?: string
}

export interface TOkResponse<T = unknown> {
  success: true
  statusCode: number
  message: string
  data?: T
}

export type TApiResponse<T = unknown> = TOkResponse<T> | TErrorResponse
