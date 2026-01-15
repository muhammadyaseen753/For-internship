"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, Trash2 } from "lucide-react"

interface Post {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  content: string
  imageUrl?: string
  likes: number
  timestamp: string
  isLiked: boolean
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: { name: "Sarah Chen", handle: "@sarahchen", avatar: "S" },
      content:
        "Just shipped a new feature using TypeScript and React Server Components. The developer experience is incredible!",
      likes: 234,
      timestamp: "2 hours ago",
      isLiked: false,
    },
    {
      id: "2",
      author: { name: "Dev Mike", handle: "@devmike", avatar: "M" },
      content: "Building an AI-powered code reviewer. Already saved my team 10 hours of review time this week.",
      imageUrl: "/code-editor-screen.jpg",
      likes: 567,
      timestamp: "4 hours ago",
      isLiked: true,
    },
    {
      id: "3",
      author: { name: "Alex Morgan", handle: "@alexmorgan", avatar: "A" },
      content: "Debugging production at 3 AM with cold coffee. Send help",
      likes: 89,
      timestamp: "6 hours ago",
      isLiked: false,
    },
  ])

  const [newPost, setNewPost] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const handleCreatePost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: String(posts.length + 1),
      author: { name: "You", handle: "@yourhandle", avatar: "Y" },
      content: newPost,
      imageUrl: imageUrl || undefined,
      likes: 0,
      timestamp: "just now",
      isLiked: false,
    }

    setPosts([post, ...posts])
    setNewPost("")
    setImageUrl("")
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  const handleLikePost = (id: string) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h1 className="text-3xl font-bold">Feed</h1>
      </div>

      {/* Create Post Box */}
      <Card className="bg-card border border-border p-6 space-y-4">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
            Y
          </div>
          <div className="flex-1 space-y-3">
            <textarea
              placeholder="Share your coding thoughts, achievements, or questions..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full bg-input border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground resize-none focus:border-primary focus:outline-none transition-colors"
              rows={3}
            />
            <Input
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-input border-border"
            />
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="bg-card border border-border p-6 space-y-4 hover:border-border/80 transition-colors"
          >
            {/* Post Header */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                {post.author.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.handle}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-foreground leading-relaxed">{post.content}</p>

            {/* Post Image */}
            {post.imageUrl && (
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt="Post"
                className="w-full rounded-lg border border-border max-h-96 object-cover"
              />
            )}

            {/* Post Footer */}
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              <button
                onClick={() => handleLikePost(post.id)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Heart
                  size={18}
                  fill={post.isLiked ? "currentColor" : "none"}
                  className={post.isLiked ? "text-primary" : ""}
                />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle size={18} />
                <span className="text-sm">0</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Share2 size={18} />
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
