import z from "zod";

// These are schema for sign in and sign up form
export const signInFormSchema = z.object({
  email: z.string().email("Please input a valid email address"),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[A-Z]/, "Password must coontain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least a number")
    .regex(/[!@#$%^&*]/, "Password must contain at least 1 special character"),
});

export const signUpFormSchema = signInFormSchema
  .extend({
    name: z
      .string()
      .min(1, "Name must contain at least 1 character")
      .regex(/^[a-zA-Z0-9 ]*$/, "Name must not contain special character"),
    confirmPassword: z
      .string()
      .min(8, "Password must contain at least 8 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export type SignInForm = z.infer<typeof signInFormSchema>;
export type SignUpForm = z.infer<typeof signUpFormSchema>;

// Any below are the type for algorithm visualizer in json file

export type BarState =
  | "default"
  | "comparing"
  | "swapping"
  | "sorted"
  | "pivot";

export type BarsStep = {
  state: number[];
  highlight: number[];
  label: string;
};

export type ArrayStep = {
  state: number[];
  highlight: number[];
  label: string;
};

export type GridCell =
  | "open"
  | "wall"
  | "start"
  | "end"
  | "visited"
  | "path"
  | "current";

export type GridStep = {
  state: GridCell[][];
  highlight: number[];
  label: string;
};

export type GraphNode = {
  id: string;
  connections: string[];
  x: number;
  y: number;
};

export type GraphStep = {
  state: GraphNode[];
  highlight: number[];
  label: string;
};

export type TreeNode = {
  id: number;
  value: number;
  left: number | null;
  right: number | null;
};

export type TreeStep = {
  state: TreeNode[];
  highlight: number[];
  label: string;
};

export type AlgorithmSpace = (
  | BarsStep
  | ArrayStep
  | GridStep
  | GraphStep
  | TreeStep
)[];

export type AlgorithmResponse = {
  type: "visualization";
  name: string;
  template: "bars" | "array" | "grid" | "graph" | "tree";
  complexity: {
    time: string;
    space: string;
  };
  steps: AlgorithmSpace;
  code: string;
  explanation: string;
};

export type ErrorResponse = {
  type: "error";
  message: string;
};

export type ApiErrorResponse = {
  type: "api_error";
  message: string;
};

export type ResponseType = AlgorithmResponse | ErrorResponse | ApiErrorResponse;
