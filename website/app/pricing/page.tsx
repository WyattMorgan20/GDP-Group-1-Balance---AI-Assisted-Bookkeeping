export default function Features() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Choose the plan that fits your organization&apos;s needs. All plans
            include our core automation features.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-slate-400">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Starter
                </h3>
                <p className="text-slate-600 mb-4">
                  Perfect for small businesses
                </p>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  $XX
                  <span className="text-lg font-normal text-slate-600">
                    /month
                  </span>
                </div>
                <p className="text-sm text-slate-500">Billed monthly</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Up to 5 users</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                    Automated reconciliation
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Anomaly detection</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Basic audit trail</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Cloud storage (50GB)</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                    Excel, QBO, Xero integration
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Email support</span>
                </li>
              </ul>

              <a
                href="/download"
                className="block w-full bg-slate-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Professional Plan - Featured */}
            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-blue-900 relative transform md:scale-105">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Professional
                </h3>
                <p className="text-slate-600 mb-4">
                  For growing accounting firms
                </p>
                <div className="text-4xl font-bold text-blue-900 mb-2">
                  $XX
                  <span className="text-lg font-normal text-slate-600">
                    /month
                  </span>
                </div>
                <p className="text-sm text-slate-500">Billed monthly</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Up to 25 users</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">All Starter features</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Advanced audit trail</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                    AI assistant (optional)
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Cloud storage (250GB)</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">PBC workflows</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                    Priority email & chat support
                  </span>
                </li>
              </ul>

              <a
                href="/download"
                className="block w-full bg-blue-900 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-slate-700">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Enterprise
                </h3>
                <p className="text-slate-600 mb-4">For large organizations</p>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  Custom
                </div>
                <p className="text-sm text-slate-500">Contact for pricing</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Unlimited users</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                    All Professional features
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Local database option</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                    Unlimited cloud storage
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                  <span className="text-slate-700">Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                    Dedicated account manager
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0"
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
                    24/7 phone & email support
                  </span>
                </li>
              </ul>

              <a
                href="/support"
                className="block w-full bg-slate-700 text-white text-center py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Compare Plans
          </h2>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 text-slate-900 font-bold">
                    Features
                  </th>
                  <th className="text-center py-4 px-4 text-slate-900 font-bold">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 text-blue-900 font-bold">
                    Professional
                  </th>
                  <th className="text-center py-4 px-4 text-slate-900 font-bold">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">Number of Users</td>
                  <td className="text-center py-4 px-4">Up to 5</td>
                  <td className="text-center py-4 px-4 bg-blue-50">Up to 25</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">
                    Automated Reconciliation
                  </td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4 bg-blue-50">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">
                    Anomaly Detection
                  </td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4 bg-blue-50">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">Audit Trail</td>
                  <td className="text-center py-4 px-4">Basic</td>
                  <td className="text-center py-4 px-4 bg-blue-50">Advanced</td>
                  <td className="text-center py-4 px-4">Advanced</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">AI Assistant</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4 bg-blue-50">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">Cloud Storage</td>
                  <td className="text-center py-4 px-4">50GB</td>
                  <td className="text-center py-4 px-4 bg-blue-50">250GB</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">
                    Local Database Option
                  </td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4 bg-blue-50">-</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">PBC Workflows</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4 bg-blue-50">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">
                    Integration Support
                  </td>
                  <td className="text-center py-4 px-4">Standard</td>
                  <td className="text-center py-4 px-4 bg-blue-50">Standard</td>
                  <td className="text-center py-4 px-4">Custom</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">Support</td>
                  <td className="text-center py-4 px-4">Email</td>
                  <td className="text-center py-4 px-4 bg-blue-50">
                    Email & Chat
                  </td>
                  <td className="text-center py-4 px-4">24/7 Phone</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-slate-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-slate-600">
                We offer a 14-day free trial for all plans so you can test
                Balance with your team before committing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-slate-600">
                We accept all major credit cards, ACH transfers, and can provide
                invoicing for Enterprise customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Do you offer annual billing discounts?
              </h3>
              <p className="text-slate-600">
                Yes! Save 20% when you choose annual billing instead of monthly.
                Contact us for more details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-900 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Month-End Close?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/download"
              className="bg-white text-blue-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-all inline-block shadow-xl"
            >
              Start Free Trial
            </a>
            <a
              href="/support"
              className="bg-slate-700 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-slate-600 transition-all inline-block"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
