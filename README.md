# Operazioni preliminari

Prima di continurare, creare un file `.env` dal template `example.env`, esso deve contenere:

- `MONGO_CONNECTION_STR` -> Stringa di connessione al database MongoDB
- `JWT_SECRET` -> Stringa utilizzata per criptare i JWT (`require('crypto').randomBytes(64).toString('hex')`)
- `IMGDB_KEY` -> Chiave API per ImgBB (utilizzata per hostare le immagini, si può ottenere a https://imgbb.com)

Dopo aver impostato .env, è necessario impostare la proprietà `host` nel file `src/config.ts` all nome del server dove è hostata la API.

## Test

Per eseguire il server in un ambiente di test

1. `npm i`
2. `npm run dev`

# Hosting

La API può essere facilmente hostata su vercel
