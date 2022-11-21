import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord"
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  callbacks: {
    async signIn({user}) {
      if (user.email === process.env.EMAIL_AUTH) {
        return true
      } else {
        return '/unauthorized'
      }
    }
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || 'hello',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || 'hello'
    })
  ],
}
export default NextAuth(authOptions)