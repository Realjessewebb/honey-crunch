# Honey Crunch Website

A simple, clean website with click tracking analytics powered by Cloudflare Pages and Workers KV.

## Features

- 🎯 **Page Visit Tracking** - Automatically tracks every page load
- 🖱️ **Button Click Tracking** - Tracks "Order Now" button clicks
- 📊 **Admin Dashboard** - View real-time analytics at `/admin.html`
- 🎨 **Branding Ready** - CSS variables for easy customization
- 🚀 **Free Hosting** - Powered by Cloudflare Pages (100% free)
- 📦 **Persistent Storage** - Analytics stored in Workers KV

## Setup Instructions

### 1. Connect to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages** in the left sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your GitHub account and choose the `honey-crunch` repository
6. Configure the build settings:
   - **Project name**: `honey-crunch` (or your choice)
   - **Production branch**: `main`
   - **Build command**: Leave empty (static site)
   - **Build output directory**: `/`
7. Click **Save and Deploy**

### 2. Create Workers KV Namespace

1. In Cloudflare Dashboard, go to **Workers & Pages** → **KV**
2. Click **Create namespace**
3. Name it: `honey-crunch-analytics` (or your choice)
4. Copy the **Namespace ID** that appears

### 3. Bind KV to Your Pages Project

1. Go to **Workers & Pages** → **Pages**
2. Select your `honey-crunch` project
3. Go to **Settings** → **Functions**
4. Scroll to **KV namespace bindings**
5. Click **Add binding**
   - **Variable name**: `ANALYTICS` (must match the code)
   - **KV namespace**: Select the namespace you created
6. Click **Save**

### 4. Update wrangler.toml (Optional)

If you want to use Wrangler CLI for local development:

1. Open `wrangler.toml`
2. Uncomment the KV namespace section
3. Replace `YOUR_KV_NAMESPACE_ID_HERE` with your actual Namespace ID from step 2

```toml
[[kv_namespaces]]
binding = "ANALYTICS"
id = "your-actual-namespace-id"
```

### 5. Customize the Website

#### Update the "Order Now" Link

1. Open [index.html](index.html)
2. Find this line (around line 23):
   ```html
   <a href="https://example.com" id="orderNowBtn" class="btn-primary">Order Now</a>
   ```
3. Replace `https://example.com` with your actual order link

#### Customize Branding

1. Open [styles.css](styles.css)
2. Modify the CSS variables at the top:
   ```css
   :root {
       --primary-color: #000000;        /* Your brand color */
       --background-color: #ffffff;     /* Background */
       --text-color: #000000;           /* Text color */
       /* ... more variables ... */
   }
   ```

#### Add Logo and Images

1. Upload your logo/images to the repository
2. Update [index.html](index.html):
   - Replace the logo placeholder with `<img src="your-logo.png">`
   - Replace the image placeholder with your product images

### 6. Deploy Updates

Every time you push to GitHub, Cloudflare Pages will automatically rebuild and deploy your site!

```bash
git add .
git commit -m "Update content"
git push origin main
```

## File Structure

```
honey-crunch/
├── index.html              # Main landing page
├── admin.html              # Analytics dashboard
├── styles.css              # Styling with CSS variables
├── functions/
│   ├── track-visit.js      # Track page visits
│   ├── track-click.js      # Track button clicks
│   └── get-stats.js        # Retrieve analytics data
├── wrangler.toml           # Cloudflare configuration
└── README.md               # This file
```

## Accessing Your Site

- **Live Site**: `https://honey-crunch.pages.dev` (or your custom domain)
- **Admin Dashboard**: `https://honey-crunch.pages.dev/admin.html`

The admin dashboard auto-refreshes every 30 seconds and shows:
- Total page visits
- Total "Order Now" button clicks

## Free Tier Limits (Cloudflare)

- ✅ **100,000 requests/day** to Pages Functions
- ✅ **100,000 KV reads/day**
- ✅ **1,000 KV writes/day**
- ✅ **Unlimited bandwidth**
- ✅ **Unlimited static requests**

These limits are more than enough for most small-to-medium websites!

## Troubleshooting

### Analytics not working?

1. Make sure you created the KV namespace
2. Verify the binding name is exactly `ANALYTICS`
3. Check the Functions logs in Cloudflare Dashboard
4. Open browser console (F12) to see any JavaScript errors

### Stats showing "Error"?

- The KV binding might not be configured correctly
- Check Cloudflare Dashboard → Workers & Pages → Your Project → Settings → Functions
- Ensure the binding exists and points to the correct namespace

## Support

For Cloudflare Pages documentation: https://developers.cloudflare.com/pages/

For Workers KV documentation: https://developers.cloudflare.com/kv/

---

Built with ❤️ using Cloudflare Pages + Workers KV
