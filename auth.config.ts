import type { NextAuthConfig } from 'next-auth'

// Notice this is only an object, not a full Auth.js instance
// export default {
//   providers: [],
//   trustHost: true, // ✅ this fixes UntrustedHost errors

//   callbacks: {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     authorized({ request, auth }: any) {
//       const protectedPaths = [
//         /\/checkout(\/.*)?/,
//         /\/account(\/.*)?/,
//         /\/admin(\/.*)?/,
//       ]
//       const { pathname } = request.nextUrl
//       if (protectedPaths.some((p) => p.test(pathname))) return !!auth
//       return true
//     },
//   },
// } satisfies NextAuthConfig

export default {
  providers: [],
  trustHost: true,
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /^\/checkout(\/.*)?$/,
        /^\/account(\/.*)?$/,
        /^\/admin(\/.*)?$/,
      ]
      const pathname = request.nextUrl.pathname

      // protected path হলে session থাকা লাগবে
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth

      // অন্য path সব public
      return true
    },
  },
} satisfies NextAuthConfig

