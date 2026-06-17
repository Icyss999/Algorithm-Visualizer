export type AlgorithmResponse = {
    type : "visualization",
    name: string,
    template: "bars" | "array" | "grid" | "graph" | "tree",
    complexity: {
        time: string,
        space: string,
    },
    steps: AlgorithmSpace,
    code: string,
    explanation: string
}

export type AlgorithmSpace = {
    
    state : any[],
    highlight : number[],
    label: string,
    
}[]

export type ErrorResponse = {
    type : "error",
    message : string
}

export type ApiErrorResponse = {
    type : "api_error",
    message: string
}

export type ResponseType = AlgorithmResponse | ErrorResponse | ApiErrorResponse