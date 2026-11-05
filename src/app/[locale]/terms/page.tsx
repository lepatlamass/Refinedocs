import { getTranslations } from 'next-intl/server';
import { Link } from '../../../navigation';
import Navbar from '../../../components/layout/Navbar';
import ToolsDirectory from '../../../components/layout/ToolsDirectory';
import Footer from '../../../components/layout/Footer';
import type { Metadata } from 'next';
import { locales } from '../../../i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = 'https://refinedocs.com';

  const languages: Record<string, string> = {
    'x-default': `${siteUrl}/en/terms`,
  };
  for (const loc of locales) {
    languages[loc] = `${siteUrl}/${loc}/terms`;
  }

  return {
    title: 'Terms of Service | Refinedocs',
    description: 'Terms of Service and Conditions for using Refinedocs.',
    alternates: {
      canonical: `${siteUrl}/${locale}/terms`,
      languages,
    },
    openGraph: {
      title: 'Terms of Service | Refinedocs',
      description: 'Terms of Service and Conditions for using Refinedocs.',
      url: `${siteUrl}/${locale}/terms`,
      type: 'website',
    },
  };
}

export default async function TermsPage() {
  const tCommon = await getTranslations('Common');
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-[#d4ff33] selection:text-black">
      <Navbar />
      
      <main className="py-20 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#d4ff33] hover:underline mb-12 inline-block text-sm">
          ← {tCommon('home')}
        </Link>
        <h1 className="text-2xl font-bold mb-16 tracking-tight">{tCommon('termsConditions')}</h1>
        <div className="prose prose-sm prose-invert max-w-none text-[14px] font-normal prose-p:text-black dark:text-gray-400 prose-headings:text-[16px] prose-headings:font-medium prose-headings:text-black dark:text-white prose-a:text-[#d4ff33] prose-strong:text-black dark:text-white prose-p:leading-10 prose-p:mb-20 prose-headings:mt-32 prose-headings:mb-16 prose-li:mb-8 prose-ul:mb-12 prose-p:indent-8">
          <p className="text-black dark:text-gray-400 mb-20 italic">Douala, April 2026. Replaces the prior versions in their entirety.</p>
          
          <p>These terms govern your use of our website and services such as Refinedocs (collectively, “Services”) and software that we include as part of the Services, including any applications, scripts, instruction sets, and any related documentation (collectively “Software”). By using the Services or Software, you agree to these terms. If you have entered into another agreement with us concerning specific Services or Software, then the terms of that agreement control where it conflicts with these terms. As discussed further in Section 3 below, you retain all rights and ownership you have in your content that you make available through the Services. By using our services, you may upload or otherwise provide files and information and process such files and information using our services (collectively “User Files”).</p>

          <h3 id="1-how-this-agreement-works">1. How this Agreement Works</h3>
          
          <h4 id="1-1-choice-of-law">1.1 Choice of Law</h4>
          <p>Your relationship is with DtempoLabs, a company incorporated under the laws of Cameroon, with its registered offices at Douala Kotto, Cameroon, and the Services and Software are governed by the laws of Cameroon.</p>

          <h4 id="1-2-privacy">1.2 Privacy</h4>
          <p>The <Link href="/privacy">Privacy Notice</Link> governs any personal data you provide to us. By using the Services or Software you agree to the terms of the Privacy Notice.</p>

          <h4 id="1-3-browser-based-usage-data">1.3 Browser-Based Usage Data</h4>
          <p>Whilst using the Services via your web browser, you will share information with Refinedocs about how you use our web-based tools. This shared information is associated with your Refinedocs account (where applicable) and allows us to provide you with a more personalized experience, and helps us improve product quality and features. This data is primarily processed within the browser environment and any data stored on our servers pertains mainly to your account information and preferences.</p>

          <h4 id="1-4-modification">1.4 Modification</h4>
          <p>We may modify, update, or discontinue the Services, Software (including any of their portions or features) at any time without liability to you or anyone else. If we discontinue a Service in its entirety, then we will provide you with a pro rata refund for any unused fees for that Service that you may have prepaid.</p>

          <h3 id="2-use-of-service">2. Use of Service</h3>
          
          <h4 id="2-1-license">2.1 License</h4>
          <p>Subject to your compliance with these terms and the law, you may access and use the Services.</p>

          <h4 id="2-2-refinedocs-intellectual-property">2.2 Refinedocs Intellectual Property</h4>
          <p>We (and our licensors) remain the sole owner of all right, title, and interest in the Services and Software. We reserve all rights not granted under these terms. You are especially not allowed to resell any of our products, Software and/or Services.</p>

          <h4 id="2-3-pre-release-version">2.3 Pre-release Version</h4>
          <p>We may designate the Software or Services, or a feature of the Software or Services, as a pre-release or beta version (“Pre-release Version”). Pre-release Version does not represent the final product and may contain bugs that may cause system or other failures and data loss. We may choose not to commercially release the Pre-release Version. You must promptly cease using the Pre-release Version and destroy all copies of Pre-release Version if we request you to do so, or if we release a commercial version of the Pre-release Version. Any separate agreement we enter into with you governing the Pre-release Version will supersede the provisions on Pre-Release Version set out in this section.</p>

          <h3 id="3-your-content">3. Your Content</h3>
          
          <h4 id="3-1-ownership">3.1 Ownership</h4>
          <p>You retain all rights and ownership of your content. We do not claim any ownership rights to your content.</p>

          <h4 id="3-2-our-access-and-storage">3.2 Our Access and Storage</h4>
          <p>We will only access, view, or process your content in limited ways, primarily to provide the requested service within your browser. Generally, User Files are processed temporarily within the browser environment and are not permanently stored on our servers. We may temporarily hold User Files on our servers solely for the duration of the processing task, after which they are deleted according to our Privacy Notice (Section 6). We only store minimal account-related information (like login credentials and preferences) on our servers as outlined in our Privacy Notice. We do not store copies of your processed documents permanently unless explicitly enabled by a feature you activate (e.g., saving to a connected account, if implemented). We do not store copies of your processed documents permanently unless explicitly enabled by a feature you activate. You should always have a copy of your document saved on your own device.</p>

          <h3 id="4-account-information">4. Account Information</h3>
          <p>You are responsible for all activity that occurs via your account. Please notify Customer Support immediately if you become aware of any unauthorized use of your account. You may not (a) share your account information (except with an authorized account administrator) or (b) use another person’s account. Your account administrator may use your account information to manage your use and access to the Services.</p>

          <h3 id="5-user-conduct">5. User Conduct</h3>
          
          <h4 id="5-1-responsible-use">5.1 Responsible Use</h4>
          <p>You must use the Services responsibly.</p>
          <p>Children under <strong>16</strong> are not allowed to use Refinedocs Services. If you are based in a region with specific digital consent laws, you may only use Refinedocs Services if you are over the age at which you can provide consent under the laws of your country or if verifiable parental consent for your use of our Services has been provided to us. If you are a parent and you learn that your child is using our Services and you don’t want them to, please contact us.</p>

          <h4 id="5-2-misuse">5.2 Misuse</h4>
          <p>You must not misuse the Services, Software, or content that we provide to you as part of the Services or Software. For example, you must not:</p>
          <ul>
            <li>(a) copy, modify, host, stream, sublicense, or resell the Services, Software, or content;</li>
            <li>(b) enable or allow others to use the Service, Software, or content using your account information;</li>
            <li>(c) use the content or Software included in the Services to construct any kind of database;</li>
            <li>(d) access or attempt to access the Services by any means other than the interface we provided or authorized;</li>
            <li>(e) circumvent any access or use restrictions put into place to prevent certain uses of the Services;</li>
            <li>(f) share content or engage in behavior that violates anyone’s Intellectual Property Right (“Intellectual Property Rights” means copyright, moral rights, trademark, trade dress, patent, trade secret, unfair competition, right of privacy, right of publicity, and any other proprietary rights.);</li>
            <li>(i) attempt to disable, impair, or destroy the Services, software, or hardware;</li>
            <li>(k) engage in chain letters, junk mails, pyramid schemes, spamming, or other unsolicited messages;</li>
            <li>(l) place advertisement of any products or services in the Services except with our prior written approval;</li>
            <li>(m) use any data mining or similar data gathering and extraction methods in connection with the Services;</li>
            <li>(n) violate applicable law; or</li>
            <li>(o) encrypt or protect files in countries where this is prohibited</li>
          </ul>

          <h3 id="6-fees-and-payment">6. Free and Open-Source Service</h3>
          
          <h4 id="6-1-fees">6.1 100% Free to Use</h4>
          <p>Refinedocs is provided as a free, open-source utility application. All document conversion, image editing, and media tools are free of charge. No payment details, subscriptions, or credit packages are required.</p>

          <h3 id="7-indemnification">7. Your Indemnification Obligations</h3>
          <p>You will indemnify us and our subsidiaries, affiliates, officers, agents, employees, partners, and licensors from any claim, demand, loss, or damages, including reasonable attorneys’ fees, arising out of or related to your content, your use of the Services or Software, or your violation of these terms.</p>

          <h3 id="8-disclaimers">8. Disclaimers of Warranties</h3>
          
          <h4 id="8-1-warranties">8.1 Warranties of Services and Software</h4>
          <p>The Services and Software are provided “AS-IS”. To the maximum extent permitted by law, we disclaim and exclude any and all warranties express or implied, including the implied warranties of non-infringement, merchantability, or fitness for a particular purpose. We make no commitments about the content within the Services. We further disclaim and exclude any and all warranty that (a) the Services or Software will meet your requirements or will be constantly available, uninterrupted, timely, secure, or error-free; (b) the results that may be obtained from the use of the Services or Software will be effective, accurate, or reliable; (c) the quality of the Services or Software will meet your expectations; or that (d) any errors or defects in the Services or Software will be corrected.</p>

          <h4 id="8-2-liability">8.2 Liability for Services and Software, information and templates</h4>
          <p>We specifically disclaim any liability for any actions resulting from your use of any Services or Software. You may use and access the Services or Software at your own discretion and risk, and you are solely responsible for any damage to your computer system or loss of data that results from the use and access of any Service or Software. The information and templates provided by DtempoLabs (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;) on <strong>refinedocs.com</strong> (&quot;website&quot;) and our services are provided for information purposes only. All information on the website is provided in good faith, however under no circumstance we shall have any liability to you as a result of your use and/or your reliance on the information, templates, Services or Software.</p>

          <h4 id="8-3-storage">8.3 Local-Only Execution</h4>
          <p>Refinedocs operates entirely client-side in your web browser. No user documents or processed files are permanently hosted on our servers. Files are processed locally on your device and saved directly to your local storage. You are responsible for maintaining backup copies of your files.</p>

          <h3 id="9-limitation-of-liability">9. Limitation of Liability</h3>
          
          <h4 id="9-1-liability-of-refinedocs">9.1 Liability of Refinedocs</h4>
          <p>Refinedocs is not liable to you or anyone else for: (a) any loss of use, data, goodwill, or profits, whether or not foreseeable; and (b) any special, incidental, indirect, consequential, or punitive damages whatsoever (even if we have been advised of the possibility of these damages), including those (x) resulting from loss of use, data, or profits, whether or not foreseeable, (y) based on any theory of liability, including breach of contract or warranty, negligence or other tortious action, or (z) arising from any other claim arising out of or in connection with your use of or access to the Services or Software.</p>

          <h4 id="9-2-limitation">9.2 Limitation</h4>
          <p>The limitations and exclusions in this Section 9 apply to the maximum extent permitted by applicable law.</p>

          <h3 id="10-termination">10. Termination</h3>
          <p>You may discontinue your use of the Services at any time. Refinedocs may modify, suspend, or discontinue the Software or Services, in whole or in part, at any time without liability.</p>

          <h3 id="11-investigations">11. Open Source Licensing</h3>
          <p>Refinedocs source code is licensed under the Apache License, Version 2.0 (and/or MIT License as specified in the repository). You may inspect, fork, modify, and distribute the software in compliance with the applicable open-source license terms.</p>

          <h3 id="14-modification-terms">14. Modification</h3>
          <p>We may modify these terms or any additional terms that apply to a Service or Software in order to, for example, reflect changes to the law or changes to our Services or Software. You should look at the terms regularly. We will post notice of modifications to these terms on this page. We will post notice of modified additional terms in the applicable Service or Software. By continuing to use or access the Services or Software after the revisions come into effect, you agree to be bound by the revised terms.</p>

          <h3 id="15-miscellaneous">15. Miscellaneous</h3>
          
          <h4 id="15-1-version">15.1 English/French Version</h4>
          <p>The English and French versions of these terms will be the versions used when interpreting or construing these terms.</p>

          <h4 id="15-2-notice-refinedocs">15.2 Notice to Refinedocs</h4>
          <p>You may send notices to us at the following address: DtempoLabs, Douala Kotto, Cameroon, or via email at <strong>Konwoubuntu@gmail.com</strong>.</p>

          <h4 id="15-3-notice-you">15.3 Notice to You</h4>
          <p>We may notify you by email, postal mail, postings within the Services, or other legally acceptable means.</p>

          <h4 id="15-4-agreement">15.4 Entire Agreement</h4>
          <p>These terms constitute the entire agreement between you and us regarding your use of the Services and Software and supersede any prior agreements between you and us relating to the Services.</p>

          <h4 id="15-5-non-assignment">15.5 Non-Assignment</h4>
          <p>You may not assign or otherwise transfer these terms, or your rights and obligations under these terms, in whole or in part, without our written consent and any such attempt will be void. We may transfer our rights under these terms to a third party.</p>

          <h4 id="15-6-severability">15.6 Severability</h4>
          <p>If a particular term is not enforceable, the unenforceability of that term will not affect any other terms.</p>

          <h4 id="15-7-no-waiver">15.7 No Waiver</h4>
          <p>Our failure to enforce or exercise any of these terms is not a waiver of that section.</p>

          <h3 id="16-dpa">16. Data Processing Agreement</h3>
          <p>The Data Processing Agreement (DPA) reflects our mutual agreement with respect to the Processing of Personal Data by us on behalf of you in connection with our services. The DPA is supplemental to, and forms an integral part of, these Terms of Service. In case of any conflict or inconsistency, the DPA will take precedence over these Terms to the extent of such conflict or inconsistency.</p>
        </div>
        </div>
      </main>

      <ToolsDirectory />
      <Footer />
    </div>
  );
}
