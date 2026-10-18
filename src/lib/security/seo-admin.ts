import { createClient } from '@supabase/supabase-js'
export async function seoAdminDenied(request: Request): Promise<Response | null> {
  const token = request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1]
  if (!token) return Response.json({error:'Sign in as a GDP administrator to use SEO tools.'},{status:401})
  const origin=request.headers.get('origin')
  if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Invalid origin'},{status:403})
  const url=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!url||!key)return Response.json({error:'Administrator verification unavailable'},{status:503})
  const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}})
  const {data:{user},error}=await db.auth.getUser(token)
  if(error||!user?.email)return Response.json({error:'Sign in again to use SEO tools.'},{status:401})
  const role=await db.from('admin_users').select('role,is_active').eq('site_id','gdp').eq('email',user.email.toLowerCase()).maybeSingle()
  if(role.error)return Response.json({error:'Administrator verification unavailable'},{status:503})
  if(!role.data?.is_active||!['super_admin','admin'].includes(role.data.role))return Response.json({error:'GDP administrator access required'},{status:403})
  return null
}
