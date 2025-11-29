export default function Features() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Balance Documentation</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
            Everything you need to get started with Balance and master month-end
            close automation
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-6 py-4 rounded-lg text-slate-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Quick Start Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href=""
                className="bg-linear-to-br from-blue-900 to-blue-700 p-8 rounded-lg text-white hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">5-Minute Setup</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Get Balance installed and configured in just 5 minutes
                </p>
                <span className="text-white font-semibold group-hover:underline">
                  Start here →
                </span>
              </a>

              <a
                href=""
                className="bg-linear-to-br from-slate-700 to-slate-600 p-8 rounded-lg text-white hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">First Close</h3>
                </div>
                <p className="text-slate-200 mb-4">
                  Complete your first month-end close with Balance
                </p>
                <span className="text-white font-semibold group-hover:underline">
                  Learn how →
                </span>
              </a>

              <a
                href=""
                className="bg-linear-to-br from-slate-600 to-slate-500 p-8 rounded-lg text-white hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Video Tutorials</h3>
                </div>
                <p className="text-slate-200 mb-4">
                  Watch step-by-step video guides for visual learners
                </p>
                <span className="text-white font-semibold group-hover:underline">
                  Watch now →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation by Role */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Documentation by Role
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12">
              Find guides tailored to your specific role and responsibilities
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Manager Documentation */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Manager Guides
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Managing Projects and Assignments
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Reviewing and Approving Reconciliations
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Understanding Alerts and Notifications
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Reading Weekly Progress Reports
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Monitoring Accountant Activity
                    </a>
                  </li>
                </ul>
              </div>

              {/* Accountant Documentation */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Accountant Guides
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Adding and Updating Records
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Uploading Supporting Documents
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Preparing Reconciliations
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Working with Task Checklists
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Accessing Prior-Period Records
                    </a>
                  </li>
                </ul>
              </div>

              {/* IT Admin Documentation */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    IT Admin Guides
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      User Account Management
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Managing Role-Based Access
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Configuring Authentication Methods
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      System Monitoring and Troubleshooting
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Viewing Audit Trails and Logs
                    </a>
                  </li>
                </ul>
              </div>

              {/* Admin Documentation */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-slate-500 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Admin Guides
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Setting Up Organization Structure
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      System-Wide Configuration
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Security Settings and Policies
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      Database Management (Cloud/Local)
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium flex items-center"
                    >
                      System Analytics and Reporting
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Guides */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Feature Guides
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  Reconciliation
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Auto-Reconciliation Setup
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Manual Reconciliation
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Reviewing Variances
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Best Practices
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  Anomaly Detection
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Understanding Anomalies
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Configuring Thresholds
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Investigating Flags
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Resolution Workflow
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  Audit Trail
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Viewing Transaction History
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Tracking Changes
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Linked Documents
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Compliance Reporting
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  AI Assistant
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Enabling AI Features
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Using the Chatbot
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Auto-Link Auditing
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      AI Best Practices
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  Integrations
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Excel Import/Export
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      QuickBooks Online Sync
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Xero Integration
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      File Format Support
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  Security
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Two-Factor Authentication
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Password Management
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Data Encryption
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-blue-900 hover:underline">
                      Access Control
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Documentation */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Technical Documentation
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  Installation & Setup
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      System Requirements
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      Installation Guide (Windows/Mac/Linux)
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      Database Configuration
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      Network Setup
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      Cloud vs Local Deployment
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  Administration
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      Database Backup & Recovery
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      Performance Optimization
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      Troubleshooting Common Issues
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      Update and Patch Management
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-blue-900 hover:underline font-medium"
                    >
                      System Monitoring
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Additional Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <a
                href=""
                className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <h3 className="text-xl font-bold text-slate-900">FAQs</h3>
                </div>
                <p className="text-slate-600">
                  Common questions and answers about Balance features
                </p>
              </a>

              <a
                href=""
                className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    Knowledge Base
                  </h3>
                </div>
                <p className="text-slate-600">
                  In-depth articles on bookkeeping and best practices
                </p>
              </a>

              <a
                href=""
                className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    Training Resources
                  </h3>
                </div>
                <p className="text-slate-600">
                  Courses and certifications for Balance power users
                </p>
              </a>

              <a
                href=""
                className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    Release Notes
                  </h3>
                </div>
                <p className="text-slate-600">
                  Latest updates, features, and improvements
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-blue-900 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you get the most out of Balance
          </p>
          <a
            href="/support"
            className="bg-white text-blue-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-all inline-block shadow-xl"
          >
            Contact Support
          </a>
        </div>
      </section>
    </main>
  );
}
