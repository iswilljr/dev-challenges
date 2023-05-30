# Dev Challenges

Web Development Resources that help you to become a Web Developer by working with Real-life projects and practices. Create your own challenges with InfoJobs Offers.

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Create a **.env.local** file in the root folder and paste your variables:

```bash
cp -r .env.example .env
```

## How to setup local environment

### Setup local PostgreSQL database

- Create the database password and paste it to `POSTGRES_PASSWORD`

```bash
docker-compose up -d
```

### Get Github OAuth Client ID and Client Secret

- [Click here to create new Github OAuth app](https://github.com/settings/applications/new)
- Set the Application name. Example: `Dev Challenges development`
- Set the Homepage URL to `http://localhost:3000`
- Set the Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
- Go to "Client secrets" and generate new client secret
- Copy the Client ID and Client Secret
- Go to `.env` and paste the Client ID and Client Secret

### Other env variables

- `INFOJOBS_TOKEN`
- `NEXTAUTH_SECRET`

### Start developing

Now you can run:

```bash
pnpm dev
```
