import Link from "next/link"
import { MessageSquare, Users, UserPlus } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

async function getContactRequests() {
  const { userId } = await auth()
  if (!userId) return []

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      receivedContactRequests: {
        include: {
          sender: true,
        },
      },
    },
  })

  return user?.receivedContactRequests ?? []
}

export default async function MainPage() {
  const contactRequests = await getContactRequests()

  return (
    <div className="flex-1 flex flex-col px-8 py-12">
      <div className="mb-16 text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to ConnectHub
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Your communication platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        <Link
          href="/chat"
          className="group relative flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm shadow-sm rounded-2xl 
            hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-gray-100 
            hover:border-blue-100 hover:bg-gradient-to-b hover:from-blue-50/50 hover:to-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <MessageSquare className="w-12 h-12 text-blue-500 mb-4 group-hover:text-blue-600 transition-colors" />
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Chat Room</h2>
          <p className="text-gray-600 text-center text-sm">Join conversations and connect with others in real-time</p>
        </Link>

        <Link
          href="/contacts"
          className="group relative flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm shadow-sm rounded-2xl 
            hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-gray-100 
            hover:border-purple-100 hover:bg-gradient-to-b hover:from-purple-50/50 hover:to-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Users className="w-12 h-12 text-purple-500 mb-4 group-hover:text-purple-600 transition-colors" />
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Contact Network</h2>
          <p className="text-gray-600 text-center text-sm">Manage your connections and grow your network</p>
        </Link>

        <Link
          href="/contact-requests"
          className="group relative flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm shadow-sm rounded-2xl 
            hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-gray-100 
            hover:border-green-100 hover:bg-gradient-to-b hover:from-green-50/50 hover:to-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-teal-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <UserPlus className="w-12 h-12 text-green-500 mb-4 group-hover:text-green-600 transition-colors" />
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Contact Requests</h2>
          <p className="text-gray-600 text-center text-sm">
            {contactRequests.length
              ? `You have ${contactRequests.length} pending request${contactRequests.length === 1 ? "" : "s"}`
              : "No pending requests"}
          </p>
        </Link>
      </div>
    </div>
  )
}
