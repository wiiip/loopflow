import { createBrowserClient, createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import type { Database } from './types'

// Environment validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/**
 * Creates a Supabase client for use in browser environments
 * - Client Components
 * - Client-side event handlers
 * - Browser-only operations
 * 
 * This client manages auth state in localStorage and handles browser-specific features
 */
export function createClient() {
  return createBrowserClient<Database>(supabaseUrl!, supabaseAnonKey!)
}

/**
 * Creates a Supabase client for use in server environments
 * - Server Components
 * - API Routes
 * - Server Actions
 * - Middleware
 * 
 * This client manages auth state via cookies for SSR compatibility
 * Requires Next.js environment with cookies() function available
 */
export function createServerClient() {
  // Dynamic import to avoid issues when Next.js is not available
  const { cookies } = require('next/headers')
  const cookieStore = cookies()
  
  return createSupabaseServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options?: any) {
        try {
          cookieStore.set(name, value, options)
        } catch {
          // Server Component context - middleware will handle token refresh
        }
      },
      remove(name: string, options?: any) {
        try {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        } catch {
          // Server Component context
        }
      },
    },
  })
}

/**
 * Creates a Supabase client for use in middleware
 * Requires passing NextRequest for proper cookie handling
 */
export function createMiddlewareClient(request: Request) {
  return createSupabaseServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        const cookies = request.headers.get('cookie')
        if (!cookies) return undefined
        
        const cookie = cookies
          .split('; ')
          .find(c => c.startsWith(`${name}=`))
        
        return cookie?.split('=')[1]
      },
      set(name: string, value: string, options?: any) {
        // In middleware, we typically handle cookie setting in the response
        // This is a simplified implementation
      },
      remove(name: string, options?: any) {
        // In middleware, we typically handle cookie removal in the response
      },
    },
  })
}