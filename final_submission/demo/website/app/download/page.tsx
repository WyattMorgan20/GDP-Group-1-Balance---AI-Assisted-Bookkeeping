export default function Download() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Download Balance</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
            Get started in minutes. Choose your platform and download the latest
            version of Balance.
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-white text-slate-900 bg-opacity-10 px-4 py-2 rounded-lg">
              <span className="font-semibold">Version:</span> 1.0.0
            </div>
            <div className="bg-white text-slate-900 bg-opacity-10 px-4 py-2 rounded-lg">
              <span className="font-semibold black">Released:</span> Nov 2024
            </div>
            <div className="bg-white text-slate-900 bg-opacity-10 px-4 py-2 rounded-lg">
              <span className="font-semibold">Size:</span> ~250 MB
            </div>
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Choose Your Platform
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Windows */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-blue-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Windows
                </h3>
                <p className="text-slate-600 mb-6">
                  Windows 10 or later (64-bit)
                </p>
                <a
                  href="#"
                  className="block w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors mb-3"
                >
                  Download for Windows
                </a>
                <a href="#" className="text-blue-900 text-sm hover:underline">
                  View system requirements
                </a>
              </div>

              {/* macOS */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-slate-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  macOS
                </h3>
                <p className="text-slate-600 mb-6">
                  macOS 11+ (Intel & Apple Silicon)
                </p>
                <a
                  href="#"
                  className="block w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors mb-3"
                >
                  Download for macOS
                </a>
                <a href="#" className="text-blue-900 text-sm hover:underline">
                  View system requirements
                </a>
              </div>

              {/* Linux */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-slate-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.555-.348 2.557.137 1.798 1.232 3.743 2.626 4.578 1.311.784 2.652.676 3.887.196 1.02-.396 1.779-1.082 2.364-1.897.66-.921 1.01-1.986 1.01-3.103 0-2.053-1.146-3.759-2.73-4.77-1.049-.67-2.232-1.023-3.523-1.092z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Linux
                </h3>
                <p className="text-slate-600 mb-6">
                  Ubuntu 20.04+ / Debian-based
                </p>
                <a
                  href="#"
                  className="block w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors mb-3"
                >
                  Download for Linux
                </a>
                <a href="#" className="text-blue-900 text-sm hover:underline">
                  View system requirements
                </a>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-600 mb-4">Looking for something else?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#"
                  className="text-blue-900 hover:underline font-medium"
                >
                  Docker Image
                </a>
                <span className="text-slate-400">•</span>
                <a
                  href="#"
                  className="text-blue-900 hover:underline font-medium"
                >
                  Source Code (GitHub)
                </a>
                <span className="text-slate-400">•</span>
                <a
                  href="#"
                  className="text-blue-900 hover:underline font-medium"
                >
                  Previous Versions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              System Requirements
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Minimum
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>
                    <strong>CPU:</strong> Dual-core 2.0 GHz
                  </li>
                  <li>
                    <strong>RAM:</strong> 4 GB
                  </li>
                  <li>
                    <strong>Storage:</strong> 2 GB available
                  </li>
                  <li>
                    <strong>Network:</strong> Broadband internet
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-900">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    Recommended
                  </h3>
                  <span className="ml-2 bg-blue-900 text-white text-xs px-2 py-1 rounded-full">
                    Best
                  </span>
                </div>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>
                    <strong>CPU:</strong> Quad-core 3.0 GHz+
                  </li>
                  <li>
                    <strong>RAM:</strong> 8 GB or more
                  </li>
                  <li>
                    <strong>Storage:</strong> 5 GB SSD
                  </li>
                  <li>
                    <strong>Network:</strong> High-speed internet
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Enterprise
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>
                    <strong>CPU:</strong> 8-core 3.5 GHz+
                  </li>
                  <li>
                    <strong>RAM:</strong> 16 GB or more
                  </li>
                  <li>
                    <strong>Storage:</strong> 10 GB+ SSD (local DB)
                  </li>
                  <li>
                    <strong>Network:</strong> Dedicated connection
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Quick Installation Guide
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6 shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Download the Installer
                  </h3>
                  <p className="text-slate-600">
                    Click the download button for your platform above.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6 shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Run the Installer
                  </h3>
                  <p className="text-slate-600">
                    Double-click the downloaded file and follow the on-screen
                    instructions.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6 shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Create Your Account
                  </h3>
                  <p className="text-slate-600">
                    Launch Balance and create your account with two-factor
                    authentication.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6 shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Configure Your Organization
                  </h3>
                  <p className="text-slate-600">
                    Set up your organization structure, departments, teams, and
                    user roles.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6 shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Start Your First Close
                  </h3>
                  <p className="text-slate-600">
                    Upload your documents and let Balance automate your
                    month-end close.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="/documentation"
                className="text-blue-900 hover:underline font-medium text-lg"
              >
                View detailed installation guide →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-blue-900 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Check out our documentation or contact support for assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/documentation"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              View Documentation
            </a>
            <a
              href="/support"
              className="bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
