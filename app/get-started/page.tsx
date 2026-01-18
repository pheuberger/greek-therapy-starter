import Link from 'next/link'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Get Started - Launch Your Therapy Website',
  description: 'Create your own professional therapy practice website in 15 minutes. Free setup with Sanity CMS and Netlify hosting.',
}

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-sand-2">
      {/* Header */}
      <header className="border-b border-sand-6 bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-xl font-bold text-gray-900">Therapy Site Template</span>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            View Demo
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="mb-6 font-serif text-4xl text-gray-900 md:text-5xl">
            Launch Your Therapy Website<br />in 15 Minutes
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            A professional, multilingual website template built for therapists and mental health practitioners.
            Full content management, blog, services pages, and contact forms included.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#setup"
              className="inline-flex items-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
            >
              Start Setup
            </a>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border-2 border-gray-900 px-8 py-4 text-lg font-semibold text-gray-900 transition-transform hover:scale-105"
            >
              View Demo Site
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center font-serif text-3xl text-gray-900">What You Get</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Professional Design',
                description: 'Clean, modern design optimized for therapy practices. Mobile-responsive and accessible.',
              },
              {
                title: 'Full CMS',
                description: 'Sanity Studio gives you complete control over all content. No coding required.',
              },
              {
                title: 'Multilingual',
                description: 'Built-in support for Greek and English. Easy to add more languages.',
              },
              {
                title: 'Blog & Articles',
                description: 'Share your expertise with a full-featured blog including categories and authors.',
              },
              {
                title: 'Service Pages',
                description: 'Showcase your therapy offerings with detailed service pages and FAQs.',
              },
              {
                title: 'Contact Forms',
                description: 'Netlify Forms integration for reliable message delivery. No email setup needed.',
              },
            ].map((feature, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Steps */}
      <section id="setup" className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <h2 className="mb-4 text-center font-serif text-3xl text-gray-900">Setup Your Site</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Follow these three steps to launch your own therapy website. Each step takes just a few minutes.
          </p>

          <div className="mx-auto max-w-3xl space-y-8">
            {/* Step 1 */}
            <div className="rounded-lg border border-sand-6 bg-sand-2 p-6">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  1
                </span>
                <h3 className="text-xl font-semibold text-gray-900">Create Your Sanity Project</h3>
              </div>
              <p className="mb-4 text-gray-600">
                Sanity is the content management system that powers your website. The free plan includes
                generous limits for most therapy practices.
              </p>
              <ol className="mb-4 list-inside list-decimal space-y-2 text-gray-600">
                <li>Go to <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-accent-hover">sanity.io/manage</a></li>
                <li>Click &quot;Create new project&quot;</li>
                <li>Name your project (e.g., &quot;My Therapy Practice&quot;)</li>
                <li>Choose the Free plan</li>
                <li>Use &quot;production&quot; as your dataset name</li>
                <li>Note down your Project ID</li>
              </ol>
              <p className="mb-2 text-sm font-medium text-gray-700">Then create an API token:</p>
              <ol className="list-inside list-decimal space-y-2 text-gray-600">
                <li>Go to API → Tokens</li>
                <li>Click &quot;Add API token&quot;</li>
                <li>Name it &quot;Read Token&quot; with &quot;Viewer&quot; permissions</li>
                <li>Copy and save the token</li>
              </ol>
              <a
                href="https://www.sanity.io/manage"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                Open Sanity →
              </a>
            </div>

            {/* Step 2 */}
            <div className="rounded-lg border border-sand-6 bg-sand-2 p-6">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  2
                </span>
                <h3 className="text-xl font-semibold text-gray-900">Deploy to Netlify</h3>
              </div>
              <p className="mb-4 text-gray-600">
                Netlify hosts your website for free. Click the button below and enter your Sanity
                credentials when prompted.
              </p>
              <div className="mb-4 rounded-lg bg-white p-4">
                <p className="mb-2 text-sm font-medium text-gray-700">You&apos;ll need these values:</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><code className="rounded bg-sand-3 px-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code> - Your project ID</li>
                  <li><code className="rounded bg-sand-3 px-1">NEXT_PUBLIC_SANITY_DATASET</code> - production</li>
                  <li><code className="rounded bg-sand-3 px-1">NEXT_PUBLIC_SANITY_API_VERSION</code> - 2025-01-01</li>
                  <li><code className="rounded bg-sand-3 px-1">SANITY_API_READ_TOKEN</code> - Your viewer token</li>
                  <li><code className="rounded bg-sand-3 px-1">SANITY_DRAFT_SECRET</code> - Any random string</li>
                  <li><code className="rounded bg-sand-3 px-1">SANITY_WEBHOOK_SECRET</code> - Any random string</li>
                </ul>
              </div>
              {/* Note: Update the repository URL when you have the actual template repo */}
              <a
                href="https://app.netlify.com/start/deploy?repository=https://github.com/[your-username]/[your-repo]"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://www.netlify.com/img/deploy/button.svg"
                  alt="Deploy to Netlify"
                  className="h-12"
                />
              </a>
            </div>

            {/* Step 3 */}
            <div className="rounded-lg border border-sand-6 bg-sand-2 p-6">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  3
                </span>
                <h3 className="text-xl font-semibold text-gray-900">Add Your Content</h3>
              </div>
              <p className="mb-4 text-gray-600">
                Once deployed, go to your site&apos;s /studio path to access Sanity Studio.
                Sign in and start adding your content.
              </p>
              <ul className="mb-4 space-y-2 text-gray-600">
                <li>✓ Update Site Settings (logo, contact info, navigation)</li>
                <li>✓ Create your Home and About pages</li>
                <li>✓ Add your therapy services</li>
                <li>✓ Write your first blog post</li>
              </ul>
              <p className="text-sm text-gray-500">
                Tip: Check the README in your GitHub repo for customization options like changing colors and fonts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sand-6 bg-white py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          <p>
            Built with{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Next.js</a>,{' '}
            <a href="https://www.sanity.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Sanity</a>, and{' '}
            <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Netlify</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
