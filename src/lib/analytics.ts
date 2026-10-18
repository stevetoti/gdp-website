'use client'

type EventName = 'generate_lead' | 'phone_click' | 'whatsapp_click'
export function trackEnquiryEvent(name:EventName, parameters:Record<string,string>={}) {
  if(typeof window==='undefined')return
  const analytics=window as Window & {gtag?:(command:'event',name:EventName,parameters:Record<string,string>)=>void}
  try { analytics.gtag?.('event',name,{...parameters,site_id:'gdp'}) } catch { /* Analytics failure must never turn a saved enquiry into a failed submission. */ }
}
