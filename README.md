## AstroChessAuth

This repository contains authentication service written in nodejs

#### Setup
```bash
npm install
npx tsc index.ts
node index.js
```

#### Endpoints

Login:
```Rust
POST /login
{ "username": form_username, "password": form_password }

Returns
{ "status": http_status_code, "message": message_from_api }
```
