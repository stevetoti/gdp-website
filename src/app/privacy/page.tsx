import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Global Digital Prime privacy policy — how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-deep-blue text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: January 1, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Global Digital Prime (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website globaldigitalprime.com, use our services, or interact with us in any way.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-deep-blue mb-2">Personal Information</h3>
              <p className="leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you fill out forms, subscribe to our newsletter, request a consultation, or contact us. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and job title</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Project details and requirements</li>
              </ul>

              <h3 className="text-lg font-semibold text-deep-blue mt-6 mb-2">Automatically Collected Information</h3>
              <p className="leading-relaxed">
                When you visit our website, we may automatically collect certain information, including your IP address, browser type, operating system, referring URLs, and browsing behavior through cookies and similar technologies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send you relevant communications about our services</li>
                <li>Improve our website and user experience</li>
                <li>Analyze usage patterns and trends</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraudulent or unauthorized activity</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">4. Data Sharing</h2>
              <p className="leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements. We may also disclose information when required by law or to protect our rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">6. Cookies</h2>
              <p className="leading-relaxed">
                Our website uses cookies and similar tracking technologies to enhance your experience, analyze traffic, and personalize content. You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">7. International Data Transfers</h2>
              <p className="leading-relaxed">
                As we operate in both the United States and Indonesia, your information may be transferred to and processed in either country. We ensure appropriate safeguards are in place for all international data transfers in compliance with applicable data protection laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">8. Your Rights</h2>
              <p className="leading-relaxed mb-4">Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">9. Children&apos;s Privacy</h2>
              <p className="leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">10. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of our website after any changes indicates your acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">11. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-soft-gray rounded-xl p-6 mt-4">
                <p className="font-semibold text-deep-blue">Global Digital Prime</p>
                <p>Email: privacy@globaldigitalprime.com</p>
                <p>Website: <Link href="/contact" className="text-vibrant-orange hover:underline">Contact Form</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
