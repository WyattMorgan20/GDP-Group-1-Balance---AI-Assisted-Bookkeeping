export default function About() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">About Balance</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Transforming month-end close operations through intelligent
            automation and AI-assisted bookkeeping
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Balance exists to eliminate the inefficiencies and frustrations of
              traditional month-end close processes. We believe accountants and
              financial professionals should spend their time on strategic
              analysis and decision-making—not manual data entry and repetitive
              reconciliation tasks.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              By combining cutting-edge automation, AI assistance, and
              enterprise-grade security, we&apos;re empowering businesses of all
              sizes to close their books faster, more accurately, and with
              greater confidence.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              The Problem We&apos;re Solving
            </h2>

            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                While tools like QuickBooks Online have streamlined many aspects
                of bookkeeping, the month-end close process remains a
                repetitive, manual, and time-consuming task for most companies.
                Despite being a critical financial activity performed every
                month, it is still largely handled using Excel spreadsheets with
                little automation or integration.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                This lack of efficiency not only increases the risk of human
                error but also delays reporting, consumes valuable staff time,
                and creates bottlenecks in financial operations as well as
                accountant communication.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-slate-900 mb-2 text-lg">
                  Days of Work
                </h3>
                <p className="text-slate-600">
                  Traditional month-end close can take days or even weeks to
                  complete
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-slate-900 mb-2 text-lg">
                  Manual Errors
                </h3>
                <p className="text-slate-600">
                  Spreadsheet-based processes are prone to costly human mistakes
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-slate-900 mb-2 text-lg">
                  Poor Visibility
                </h3>
                <p className="text-slate-600">
                  Lack of transparency and audit trails creates compliance risks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Our Solution
            </h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-6 shrink-0">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Intelligent Automation
                  </h3>
                  <p className="text-slate-600">
                    Balance automatically prepares reconciliations, flags
                    anomalies, and highlights variances—reducing manual work by
                    20% or more while improving accuracy.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-6 shrink-0">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Complete in Under 1 Hour
                  </h3>
                  <p className="text-slate-600">
                    What used to take days now takes less than an hour. Balance
                    streamlines every step of the month-end close process, from
                    data import to final approval.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-6 shrink-0">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Enterprise-Grade Security
                  </h3>
                  <p className="text-slate-600">
                    With comprehensive audit trails, role-based access control,
                    two-factor authentication, and robust data retention, your
                    financial data is always secure and compliant.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-6 shrink-0">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Built for Teams
                  </h3>
                  <p className="text-slate-600">
                    Role-based dashboards for Managers, Accountants, IT Admins,
                    and Admins ensure everyone has the right tools and
                    permissions for their responsibilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Our Core Values
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Accuracy First
                </h3>
                <p className="text-slate-600">
                  We prioritize precision and reliability in everything we
                  build. Financial data is too important to get wrong.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  User-Centric Design
                </h3>
                <p className="text-slate-600">
                  Balance is built for real accountants and financial
                  professionals, with intuitive interfaces that anyone can use.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Continuous Innovation
                </h3>
                <p className="text-slate-600">
                  We&apos;re constantly improving Balance with new features,
                  integrations, and AI capabilities to stay ahead.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Security & Compliance
                </h3>
                <p className="text-slate-600">
                  Protecting your financial data is our top priority. We meet
                  the highest standards for security and privacy.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Customer Success
                </h3>
                <p className="text-slate-600">
                  Your success is our success. We&apos;re committed to providing
                  exceptional support and helping you achieve your goals.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Open & Transparent
                </h3>
                <p className="text-slate-600">
                  We believe in transparency with our users, our pricing, and
                  our product roadmap. No hidden fees or surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Meet the Team
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12">
              Balance is built by a dedicated team of developers, designers, and
              accounting professionals
            </p>

            <div className="grid md:grid-cols-3 max-w-3xl mx-auto">
              {/* Team Member Placeholder */}
              <div className="text-center">
                <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Wyatt Morgan
                </h3>
                <p className="text-sm text-slate-600">
                  Developer/Project Manager
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Corey Unruh
                </h3>
                <p className="text-sm text-slate-600">Developer/Researcher</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Owen Graham
                </h3>
                <p className="text-sm text-slate-600">
                  Developer/Documentation Handler
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">&lt;1 Hour</div>
                <p className="text-slate-200">Average Month-End Close Time</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">20%+</div>
                <p className="text-slate-200">Time Reduction</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">95%+</div>
                <p className="text-slate-200">System Uptime</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">5s</div>
                <p className="text-slate-200">Page Load Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Ready to Transform Your Month-End Close?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join the people already saving hours every month with Balance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/download"
              className="bg-blue-900 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all inline-block shadow-lg"
            >
              Get Started Today
            </a>
            <a
              href="/pricing"
              className="bg-slate-200 text-slate-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-slate-300 transition-all inline-block"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
