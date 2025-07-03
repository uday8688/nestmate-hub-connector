# Welcome to the AptCircle Community Hub

## Project info

**URL**: https://lovable.dev/projects/f239b218-1c07-4426-8c40-dbf6e5abb0ee

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f239b218-1c07-4426-8c40-dbf6e5abb0ee) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

Once the command finishes you can view the site at [http://localhost:8080/](http://localhost:8080/).

To preview the production build instead, run:

```sh
npm run build
npm run preview
```
This starts a preview server on [http://localhost:4173/](http://localhost:4173/).

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Customer feedback

You can now share your thoughts directly through the new **Contact** page at `/contact`.
This page lets visitors send a quick message to the team so we can keep improving AptCircle.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f239b218-1c07-4426-8c40-dbf6e5abb0ee) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

### Connecting a GoDaddy domain

1. Log in to your GoDaddy dashboard and open the DNS settings for your domain.
2. Create a new **CNAME** record pointing your subdomain (e.g. `www`) to the domain provided in Lovable's domain settings.
3. Save your changes and wait for the record to propagate (this may take a few minutes).
4. Back in Lovable, click **Verify** next to your domain to finish the setup.

### Troubleshooting 404s on custom domains

If you see a 404 page when clicking the **Login** or **Sign Up** buttons, make sure
you navigate using React Router's `<Link>` components and that your host is
configured to serve `index.html` for unknown routes. This allows client-side
routing to work correctly when using a custom domain.

### Configuring GitHub Pages

To use your domain with GitHub Pages, create a file named `CNAME` in the root of the publishing branch containing your domain name. This repository already includes `aptcircle.com` as the CNAME.

