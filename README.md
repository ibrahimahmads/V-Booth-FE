# V-Booth Frontend

Web client for **V-Booth**, a digital guestbook and photo booth for events such as weddings, graduations, and gatherings. Event owners manage their guestbook; guests open a link or scan a QR code, take a photo, apply a collage frame, and record a voice message, all from the browser with no login.

> Backend repository: [V-Booth-BE](https://github.com/ibrahimahmads/V-Booth-BE)
> Deployment: [v-booth.vercel.app](https://v-booth.vercel.app) (currently showing a maintenance page because the backend is offline)

## Background

I built V-Booth for a family member's wedding. It ran in production and was used by guests during the event. The backend free trial has since ended, so the frontend is pinned to a "under development" page.

## Features

**Guest flow (no login)**
- Open the event gallery from a slug URL or QR code
- Capture a photo with the device camera (`react-webcam`) or pick one from the phone gallery
- Crop the photo (`react-image-crop`)
- Compose it into the host's collage frame on a canvas (`konva` / `react-konva`)
- Record and send a voice message
- Review sent messages in the gallery and download the edited photo
- Edit a previously sent message by repeating the flow (messages cannot be deleted)

**Host flow**
- Sign in with Google
- Pay to create an event
- Edit event details and the URL slug
- Share the slug link or generated QR code
- Configure the collage frame
- Download guests' photos from the gallery

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| Routing | React Router 7 |
| State | Zustand |
| Forms | React Hook Form |
| HTTP | Axios |
| Styling | Tailwind CSS 4, shadcn/ui, Base UI, class-variance-authority |
| Canvas editing | Konva, React Konva, use-image |
| Camera and crop | react-webcam, react-image-crop |
| Auth | @react-oauth/google (Google sign in) |
| UI feedback | Sonner (toasts), Lucide and React Icons |
| SEO | React Helmet Async |
| Hosting | Vercel |

## Getting Started

### Prerequisites
- Node.js 20 or newer
- A running instance of the [backend](https://github.com/ibrahimahmads/V-Booth-BE) (Spring Boot + PostgreSQL)

### Install and run

```bash
git clone https://github.com/ibrahimahmads/V-Booth-FE.git
cd V-Booth-FE
npm install
npm run dev
```

### Environment variables

Create a `.env` file (it is git-ignored) with the values your code reads through `import.meta.env`, for example:

```
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

<!-- TODO: replace with the exact variable names used in src -->

Because the backend uses an HTTP-only cookie for JWT, the API base URL must be configured with credentials enabled and the backend CORS must allow this frontend origin.

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
.
├── public           # Static assets
├── src              # Application source
├── components.json  # shadcn/ui config
├── vercel.json      # Vercel routing config
├── vite.config.ts   # Vite config
└── package.json
```

## Screenshots

<!-- TODO: add screenshots or a short demo video link -->

## Status

- Used in production for a real wedding event
- Frontend deployed on Vercel; backend currently offline
- Planned: demo mode with dummy data so the app can be tried without the backend

## Author

[@ibrahimahmads](https://github.com/ibrahimahmads)