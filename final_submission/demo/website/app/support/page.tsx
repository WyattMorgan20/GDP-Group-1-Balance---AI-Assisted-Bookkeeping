export default function Features() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">We&apos;re Here to Help</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Get the support you need to make the most of Balance. Our team is
            ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              How Can We Help You?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Email Support */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-blue-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Email Support
                </h3>
                <p className="text-slate-600 mb-4">
                  Get help via email within 24 hours
                </p>
                <a
                  href="mailto:support@balance.com"
                  className="text-blue-900 font-semibold hover:underline"
                >
                  support@our-url
                </a>
                <p className="text-sm text-slate-500 mt-4">
                  Response time: 24 hours
                </p>
              </div>

              {/* Live Chat */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center border-2 border-blue-900">
                <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Live Chat
                </h3>
                <p className="text-slate-600 mb-6">
                  Chat with our team in real-time
                </p>
                <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                  Start Chat
                </button>
                <p className="text-sm text-slate-500 mt-4">
                  Available: Mon-Fri, 9am-5pm EST
                </p>
              </div>

              {/* Phone Support */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-slate-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Phone Support
                </h3>
                <p className="text-slate-600 mb-4">
                  Speak with our support team
                </p>
                <a
                  href="tel:+1-800-BALANCE"
                  className="text-slate-900 font-semibold hover:underline text-lg"
                >
                  1-XXX-XXX-XXXX
                </a>
                <p className="text-sm text-slate-500 mt-4">
                  Enterprise customers only
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Send Us a Message
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    placeholder="test@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Support Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="category"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Pricing</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Please provide as much detail as possible..."
                  required
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="mt-1 mr-3 w-4 h-4 text-blue-900 border-slate-300 rounded focus:ring-blue-900"
                />
                <label htmlFor="newsletter" className="text-sm text-slate-600">
                  I would like to receive product updates and news from Balance
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-10 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12">
              Quick answers to common questions about Balance
            </p>

            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm group">
                <summary className="text-xl font-bold text-slate-900 cursor-pointer flex items-center justify-between">
                  How do I reset my password?
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="text-slate-600 mt-4">
                  Click on &quot;Forgot Password&quot; on the login screen,
                  enter your email address, and follow the instructions sent to
                  your inbox. If you don&apos;t receive an email within 5
                  minutes, check your spam folder or contact support.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm group">
                <summary className="text-xl font-bold text-slate-900 cursor-pointer flex items-center justify-between">
                  What file formats does Balance support?
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="text-slate-600 mt-4">
                  Balance supports CSV, TXT, and Excel files (.xlsx, .xls) for
                  data import. We also integrate directly with QuickBooks Online
                  and Xero for seamless data synchronization.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm group">
                <summary className="text-xl font-bold text-slate-900 cursor-pointer flex items-center justify-between">
                  How do I add new users to my organization?
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="text-slate-600 mt-4">
                  IT Admins and Admins can add users from their dashboard.
                  Navigate to User Management, click &quot;Add User,&quot; enter
                  their information, and assign the appropriate role (Manager,
                  Accountant, IT Admin, etc.). The new user will receive an
                  email invitation to set up their account.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm group">
                <summary className="text-xl font-bold text-slate-900 cursor-pointer flex items-center justify-between">
                  Can I use Balance offline?
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="text-slate-600 mt-4">
                  Balance requires an internet connection for cloud-based
                  features and real-time synchronization. However, Enterprise
                  customers with local database deployments can work offline
                  with limited functionality, and data will sync when
                  reconnected.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm group">
                <summary className="text-xl font-bold text-slate-900 cursor-pointer flex items-center justify-between">
                  How secure is my data?
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="text-slate-600 mt-4">
                  Balance uses enterprise-grade security including two-factor
                  authentication, encrypted data storage, role-based access
                  control, and comprehensive audit trails. Your data is stored
                  domestically in secure data centers with automatic backups and
                  95%+ uptime guarantee.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm group">
                <summary className="text-xl font-bold text-slate-900 cursor-pointer flex items-center justify-between">
                  What is your refund policy?
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="text-slate-600 mt-4">
                  We offer a 30-day money-back guarantee for all new
                  subscriptions. If you&apos;re not satisfied with Balance
                  within the first 30 days, contact support for a full refund.
                  Annual subscriptions are prorated for cancellations after the
                  first 30 days.
                </p>
              </details>
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-600 mb-4">Still have questions?</p>
              <a
                href="/documentation"
                className="text-blue-900 hover:underline font-semibold text-lg"
              >
                Visit our Documentation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Additional Resources
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              <a
                href="/documentation"
                className="bg-slate-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-900"
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Documentation
                </h3>
                <p className="text-sm text-slate-600">
                  Comprehensive guides and tutorials
                </p>
              </a>

              <a
                href=""
                className="bg-slate-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-900"
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Video Tutorials
                </h3>
                <p className="text-sm text-slate-600">
                  Step-by-step video guides
                </p>
              </a>

              <a
                href=""
                className="bg-slate-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Community Forum
                </h3>
                <p className="text-sm text-slate-600">
                  Connect with other users
                </p>
              </a>

              <a
                href=""
                className="bg-slate-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Knowledge Base
                </h3>
                <p className="text-sm text-slate-600">
                  In-depth articles & tips
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
            Enterprise Support Available
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Need dedicated support? Contact us about our Enterprise plans with
            24/7 phone support and a dedicated account manager.
          </p>
          <a
            href="/pricing"
            className="bg-white text-blue-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-all inline-block shadow-xl"
          >
            View Enterprise Plans
          </a>
        </div>
      </section>
    </main>
  );
}
