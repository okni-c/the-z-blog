import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord"
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || 'hello',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || 'hello'
    })
  ],
}
export default NextAuth(authOptions)