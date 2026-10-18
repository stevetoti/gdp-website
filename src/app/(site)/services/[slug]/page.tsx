import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '@/components/site/PageHero'
import JsonLd, { breadcrumbLd } from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'
import { getServiceDetail, serviceDetails } from '@/lib/service-detail'

type Props={params:{slug:string}}
export const dynamicParams=false
export function generateStaticParams(){return serviceDetails.map(({slug})=>({slug}))}
export function generateMetadata({params}:Props):Metadata{const d=getServiceDetail(params.slug);return d?pageMetadata({path:`/services/${d.slug}`,title:`${d.title} | Global Digital Prime`,description:d.intro}):{}}
export default function ServiceDetailPage({params}:Props){const d=getServiceDetail(params.slug);if(!d)notFound();const path=`/services/${d.slug}`
return <>
<JsonLd data={breadcrumbLd([{name:'Home',path:'/'},{name:'Services',path:'/services'},{name:d.title,path}])}/>
<JsonLd data={{'@context':'https://schema.org','@type':'Service',name:d.title,description:d.intro,url:SITE_URL+path,provider:{'@id':`${SITE_URL}/#organization`}}}/>
<JsonLd data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:d.questions.map(q=>({'@type':'Question',name:q.question,acceptedAnswer:{'@type':'Answer',text:q.answer}}))}}/>
<PageHero eyebrow="Global Digital Prime · Services" title={d.title} intro={d.intro} image={d.service.image}/>
<section className="bg-white py-16"><div className="container-custom max-w-4xl"><nav aria-label="Service navigation" className="text-sm text-gray-500 mb-8"><Link href="/services" className="underline">All services</Link></nav><h2 className="section-title">Plan the work around your business</h2><div className="space-y-5 text-lg text-gray-600 leading-relaxed">{d.outcomes.map(text=><p key={text}>{text}</p>)}</div><Link href="/contact" className="btn-primary mt-8 inline-flex">Discuss your project</Link></div></section>
<section className="bg-soft-gray py-16"><div className="container-custom grid lg:grid-cols-2 gap-10"><div><h2 className="section-title">Features to scope together</h2><p className="text-gray-600 mb-6">Choose the capabilities your project needs. Each proposal sets out what is included, external dependencies and ongoing responsibilities.</p><ul className="grid sm:grid-cols-2 gap-4">{d.service.features.map(f=><li key={f} className="bg-white border border-gray-100 p-4 rounded-xl text-deep-blue">{f}</li>)}</ul></div><article className="bg-deep-blue text-white rounded-3xl p-8 lg:p-10 self-start"><p className="text-orange-300 font-semibold text-sm uppercase tracking-wide mb-3">Built by our team</p><h2 className="text-2xl font-bold mb-5">{d.example.title}</h2><p className="text-blue-100 leading-relaxed mb-7">{d.example.text}</p><Link href={d.example.href} className="inline-flex text-white underline underline-offset-4 font-semibold">Explore the product →</Link></article></div></section>
<section className="bg-white py-16"><div className="container-custom max-w-4xl"><h2 className="section-title">Questions before we start</h2><div className="space-y-7">{d.questions.map(q=><article key={q.question} className="border-b border-gray-100 pb-7"><h3 className="text-xl font-semibold text-deep-blue mb-3">{q.question}</h3><p className="text-gray-600 leading-relaxed">{q.answer}</p></article>)}</div></div></section>
<section className="bg-soft-gray py-16"><div className="container-custom"><h2 className="section-title">Related development services</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{serviceDetails.filter(x=>x.slug!==d.slug).map(x=><Link key={x.slug} href={`/services/${x.slug}`} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-vibrant-orange"><h3 className="text-xl font-semibold text-deep-blue mb-3">{x.title} →</h3><p className="text-gray-600 text-sm">{x.intro}</p></Link>)}</div></div></section>
<section className="bg-deep-blue text-white py-16"><div className="container-custom max-w-3xl text-center"><h2 className="text-3xl font-bold mb-5">Bring us the problem you want to solve.</h2><p className="text-blue-100 leading-relaxed mb-8">Tell us about your audience, current tools and desired outcome. We will discuss scope, responsibilities and the next steps before you commit to a build.</p><Link href="/contact" className="btn-primary inline-flex">Start a project conversation</Link></div></section>
</>}
