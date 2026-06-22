import type { AlgorithmResponse, ApiErrorResponse, ErrorResponse } from "../types/schema"



export const sendSuccess = (data:AlgorithmResponse)=>{
   const body = {
    success: true,
    data : data
   } 
   return Response.json(body,{status:200})
}

export const sendError = (data: ErrorResponse | ApiErrorResponse, )=>{
   const body = {
    success : false,
    data : data
   }
   return Response.json(body, {status : data.type === "api_error"? 500 : 400})
}