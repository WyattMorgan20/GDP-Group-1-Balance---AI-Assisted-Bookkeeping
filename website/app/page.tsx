//Main landing page. Make new folders in /app, then add a page.tsx in those folders to create new pages.
export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Transform Your Month-End Close from
            <span className="text-blue-900"> Days to Hours</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Balance is an AI-assisted bookkeeping platform that automates the
            repetitive, manual tasks of month-end close operations. Reducing
            errors, saving time, and streamlining financial operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/download"
              className="bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              Download Now
            </a>
            <a
              href="/features"
              className="bg-slate-200 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-300 transition-all"
            >
              View Features
            </a>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              The Month-End Close Problem
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed text-center mb-8">
              While tools like QuickBooks Online have streamlined many aspects
              of bookkeeping, the month-end close process remains repetitive,
              manual, and time-consuming. Despite being a critical financial
              activity performed every month, it&apos;s still largely handled
              using Excel spreadsheets with little to no automation or
              integration.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-slate-900 mb-2">
                  Time-Consuming Process
                </h3>
                <p className="text-slate-600">
                  Month-end close operations can take days or weeks of manual
                  work with Excel spreadsheets
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-slate-900 mb-2">
                  Increased Errors
                </h3>
                <p className="text-slate-600">
                  Manual data entry and spreadsheet management lead to costly
                  human errors and delays
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-slate-900 mb-2">
                  Communication Gaps
                </h3>
                <p className="text-slate-600">
                  Poor coordination between accountants, managers, and clients
                  creates bottlenecks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Highlights */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            How Balance Solves It
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Built for accounting teams of all sizes with role-based access for
            Managers, Accountants, IT, and Admins
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Close in Under 1 Hour
              </h3>
              <p className="text-slate-600">
                Complete month-end close operations in less than an hour—down
                from days or weeks
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                20%+ Time Reduction
              </h3>
              <p className="text-slate-600">
                Reduce accounting time by at least 20%, improving profitability
                and freeing up staff resources
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Role-Based Access
              </h3>
              <p className="text-slate-600">
                Customized dashboards and permissions for Managers, Accountants,
                IT admins, and more
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                95%+ Uptime
              </h3>
              <p className="text-slate-600">
                Reliable, stable platform accessible at least 95% of the time
                with fast 5-second load times
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Auto Reconciliation
              </h3>
              <p className="text-slate-600">
                Automatically prepare reconciliations and highlight variances
                between documents
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
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
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                PBC Workflows
              </h3>
              <p className="text-slate-600">
                Streamlined Prepared By Client workflows for better
                communication and collaboration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Role-Based Workflows for Your Team
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Everyone gets the tools they need with customized dashboards and
            permissions
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-slate-50 p-6 rounded-lg border-t-4 border-blue-900">
              <div className="bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Managers
              </h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Review & approve reconciliations</li>
                <li>• Monitor project updates</li>
                <li>• Receive alerts for requests</li>
                <li>• Weekly progress reports</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border-t-4 border-blue-700">
              <div className="bg-blue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Accountants
              </h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Add & update records</li>
                <li>• Upload supporting documents</li>
                <li>• Prepare reconciliations</li>
                <li>• View task checklists</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border-t-4 border-slate-700">
              <div className="bg-slate-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                IT Admins
              </h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Manage user accounts</li>
                <li>• Assign role-based access</li>
                <li>• Monitor system health</li>
                <li>• View audit trail logs</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border-t-4 border-slate-500">
              <div className="bg-slate-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">Admins</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Full system access</li>
                <li>• Organization setup</li>
                <li>• Security settings</li>
                <li>• Complete oversight</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Built for Performance & Reliability
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-900 mb-2">
                &lt;1 Hour
              </div>
              <p className="text-slate-600 font-semibold">
                Month-End Close Time
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-900 mb-2">20%+</div>
              <p className="text-slate-600 font-semibold">Time Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-900 mb-2">95%</div>
              <p className="text-slate-600 font-semibold">Uptime Guarantee</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-slate-600 max-w-2xl mx-auto">
              Fast 5-second page load times • Secure data retention •
              Comprehensive audit trails • Prevent accidental or malicious data
              deletion
            </p>
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Built for Every Size Business
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Small Businesses
              </h3>
              <p className="text-slate-600">
                Streamline your books without hiring a full accounting team
              </p>
            </div>
            <div className="text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-900"
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Accounting Firms
              </h3>
              <p className="text-slate-600">
                Serve more clients efficiently with automated workflows
              </p>
            </div>
            <div className="text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Enterprises
              </h3>
              <p className="text-slate-600">
                Local database options and complex organizational structures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Month-End Close?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join businesses already saving hours every month with Balance
          </p>
          <a
            href="/download"
            className="bg-white text-blue-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-all inline-block shadow-xl"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </main>
  );
}
