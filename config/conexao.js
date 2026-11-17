import dns from "node:dns";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "../.env")
if (existsSync(envPath)) {
	process.loadEnvFile(envPath)
}

const url = process.env.MONGODB_URI

if (!url) {
	throw new Error('Defina a variável de ambiente MONGODB_URI para conectar ao MongoDB.')
}

const conexao = await mongoose.connect(url)

export default conexao