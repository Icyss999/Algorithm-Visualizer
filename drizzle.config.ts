import {defineConfig} from "drizzle-kit"
import "dotenv/config"
import * as dotenv from "dotenv"


dotenv.config({path: ".env.local"})

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migration",
    dialect: "postgresql",

    dbCredentials:{
        url: process.env.DATABASE_URL!
    },

    verbose: true,
    strict: true

})