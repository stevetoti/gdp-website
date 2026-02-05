import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Global Digital Prime terms of service — terms and conditions governing the use of our website and services.',
}

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-deep-blue text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-300">Last updated: January 1, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">1. Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing and using the Global Digital Prime website (globaldigitalprime.com) and our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not access or use our website or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">2. Services</h2>
              <p className="leading-relaxed">
                Global Digital Prime provides enterprise digital solutions including software development, AI and machine learning services, cloud infrastructure, digital transformation consulting, cybersecurity, and data analytics. The specific scope of services will be defined in individual service agreements between Global Digital Prime and the client.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">3. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Global Digital Prime or its content suppliers and is protected by international copyright laws. The compilation of all content on this website is the exclusive property of Global Digital Prime.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">4. Use of Website</h2>
              <p className="leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with or disrupt the website or its servers</li>
                <li>Reproduce, duplicate, or copy any material from the website</li>
                <li>Use automated systems to extract data from the website</li>
                <li>Transmit any viruses, malware, or harmful code</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">5. Client Engagements</h2>
              <p className="leading-relaxed">
                All professional service engagements are governed by separate service agreements, statements of work, or master service agreements executed between Global Digital Prime and the client. These Terms of Service apply to website usage and do not supersede any executed service agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">6. Confidentiality</h2>
              <p className="leading-relaxed">
                Global Digital Prime respects the confidentiality of client information. Any confidential information shared through our contact forms or during consultations will be treated with the utmost care and used solely for the purpose of evaluating and delivering our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">7. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by applicable law, Global Digital Prime shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or in connection with your use of our website or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">8. Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold harmless Global Digital Prime and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">9. Third-Party Links</h2>
              <p className="leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and privacy policies of any third-party websites you visit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">10. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms of Service are governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law principles. Any legal disputes shall be resolved in the courts located in New York, New York.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">11. Modifications</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes your acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">12. Contact Information</h2>
              <p className="leading-relaxed">
                For questions regarding these Terms of Service, please contact us at:
              </p>
              <div className="bg-soft-gray rounded-xl p-6 mt-4">
                <p className="font-semibold text-deep-blue">Global Digital Prime</p>
                <p>Email: legal@globaldigitalprime.com</p>
                <p>Website: <Link href="/contact" className="text-vibrant-orange hover:underline">Contact Form</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
