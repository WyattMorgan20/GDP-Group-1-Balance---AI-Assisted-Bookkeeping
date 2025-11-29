export default function Features() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Powerful Features for Modern Bookkeeping
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-4">
            Balance combines automation, AI assistance, and enterprise-grade
            security to transform your month-end close process
          </p>
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold">&lt;1 Hour</div>
              <div className="text-slate-300">Month-End Close Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">20%+</div>
              <div className="text-slate-300">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-slate-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Automated Reconciliation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Automated Reconciliation
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Stop spending hours matching transactions manually. Balance
                automatically prepares reconciliations for all inputted
                documents, dramatically reducing the time spent on this
                repetitive task.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Auto-match transactions across bank statements and journal
                    entries
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Support for multiple document formats including CSV, TXT,
                    and Excel
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Intelligent matching algorithms that learn from your
                    patterns
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <svg
                  className="w-32 h-32 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <p className="text-sm">Reconciliation Demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anomaly Detection */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-100 rounded-lg p-8 h-64 flex items-center justify-center order-2 md:order-1">
              <div className="text-center text-slate-400">
                <svg
                  className="w-32 h-32 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-sm">Anomaly Detection</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Smart Anomaly Detection
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Catch errors before they become problems. Balance automatically
                highlights variances and anomalies between inputted documents,
                ensuring accuracy throughout the month-end close process.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Real-time variance detection across all documents
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Flag unusual transactions that don&apos;t match historical
                    patterns
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Customizable thresholds for what constitutes an anomaly
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Audit Trail */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Complete Audit Trail
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Every action is tracked and traceable. Balance maintains a
                comprehensive audit trail that logs who made changes, when they
                were made, and links to all connected documents and entries.
                Robust data retention prevents accidental or malicious deletion.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Track who added or modified every transaction
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Timestamp logs for creation and modification dates
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    View transaction context with links to connected entries and
                    documents
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Full history stored as a list with multi-factor deletion
                    protection
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Links to bank statements, journal entries, and supporting
                    documents
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <svg
                  className="w-32 h-32 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm">Audit Trail View</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-100 rounded-lg p-8 h-64 flex items-center justify-center order-2 md:order-1">
              <div className="text-center text-slate-400">
                <svg
                  className="w-32 h-32 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <p className="text-sm">AI Assistant Chat</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                AI Assistant (Optional)
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Get help when you need it with an optional AI chatbot assistant
                that guides you through month-end close operations. Built with
                open-source AI, it runs locally to ensure your data stays
                private. The system AI can also automatically audit transaction
                links.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    On-screen assistant for real-time guidance
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Open-source AI runs locally—no API calls, no data sharing
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Automatic transaction link auditing capabilities
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration & Compatibility */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Seamless Integration
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Balance works with the tools you already use, making it easy to
                integrate into your existing workflow
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Excel Integration
                </h3>
                <p className="text-slate-600">
                  Export and import data seamlessly with Microsoft Excel for
                  familiar reporting and analysis
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  QuickBooks Online
                </h3>
                <p className="text-slate-600">
                  Connect with QuickBooks Online for streamlined data transfer
                  and synchronization
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
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
                <h3 className="text-xl font-bold text-slate-900 mb-3">Xero</h3>
                <p className="text-slate-600">
                  Full integration with Xero accounting software for
                  comprehensive financial management
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">
                <strong>Supported file formats:</strong> CSV, TXT, Excel (.xlsx,
                .xls)
              </p>
              <p className="text-slate-600 mb-4">
                <strong>PBC Workflows:</strong> Prepared By Client features for
                easier client communication and collaboration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Access Control */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Enterprise-Grade Security
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Your financial data is protected with multiple layers of
                security and flexible access controls
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Authentication & Access
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">
                      Account-based login system with role-based permissions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">
                      Two-factor authentication with multiple options
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">
                      IT/Admin-level access for installations and
                      troubleshooting
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">
                      Different login types for different account roles
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Data Management & Storage
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">
                      Secure cloud database with domestic data storage
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">
                      Local database storage option for large enterprises
                      requiring faster data access
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">
                      Automatic data isolation per organization with robust
                      retention policies
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">
                      Multi-factor deletion protection to prevent accidental or
                      malicious data loss
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Flexible Organizational Structure
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Build a complete simulation of how your company is structured.
                Balance adapts to organizations of any size and complexity, from
                small businesses to large enterprises with multiple departments
                and teams.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">Create hierarchies</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Define custom roles and permissions at any level
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Scale from single-user to enterprise-wide deployments
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <svg
                  className="w-32 h-32 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <p className="text-sm">Organization Structure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Dashboards */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Customized Dashboards by Role
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Each user gets a personalized dashboard with the exact tools and
                information they need
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
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
                    Manager Dashboard
                  </h3>
                </div>
                <ul className="space-y-2 text-slate-700">
                  <li>• Record deletion request alerts</li>
                  <li>• Final month-end close confirmation requests</li>
                  <li>• Weekly reports on project updates</li>
                  <li>• Create, delete, and update assigned projects</li>
                  <li>• Accountant activity monitoring (2-day check-ins)</li>
                  <li>• Review and approve reconciliations</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
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
                    Accountant Dashboard
                  </h3>
                </div>
                <ul className="space-y-2 text-slate-700">
                  <li>• Add and update records in assigned projects</li>
                  <li>• Upload supporting documents</li>
                  <li>• View task checklists</li>
                  <li>• Prepare reconciliations</li>
                  <li>• Receive approval/rejection notifications</li>
                  <li>• Read-only access to prior-period records</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
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
                    IT Admin Dashboard
                  </h3>
                </div>
                <ul className="space-y-2 text-slate-700">
                  <li>• Create, modify, and deactivate accounts</li>
                  <li>• Assign or revoke role-based access</li>
                  <li>• Manage authentication methods</li>
                  <li>• View read-only logs and audit trails</li>
                  <li>• Monitor system health and troubleshoot</li>
                  <li>• Manage integrated software/systems</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
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
                    Admin Dashboard
                  </h3>
                </div>
                <ul className="space-y-2 text-slate-700">
                  <li>• Full system access and oversight</li>
                  <li>• Organization structure setup</li>
                  <li>• Security settings configuration</li>
                  <li>• Complete user and data management</li>
                  <li>• System-wide configuration control</li>
                  <li>• Comprehensive reporting and analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-16 bg-white" style={{ display: "none" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Flexible Organizational Structure
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Build a complete simulation of how your company is structured.
                Balance adapts to organizations of any size and complexity, from
                small businesses to large enterprises with multiple departments
                and teams.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Create hierarchies: Organizations → Departments → Teams →
                    Employees
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Define custom roles and permissions at any level
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Scale from single-user to enterprise-wide deployments
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <svg
                  className="w-32 h-32 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <p className="text-sm">Organization Structure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-900 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Download Balance today and see how it transforms your month-end
            close process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/download"
              className="bg-white text-blue-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-all inline-block shadow-xl"
            >
              Download Now
            </a>
            <a
              href="/pricing"
              className="bg-slate-700 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-slate-600 transition-all inline-block"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
