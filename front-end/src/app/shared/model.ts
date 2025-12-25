export interface HttpResponse<T>{
    statuscode: number,status:boolean, data: T, message: string
}