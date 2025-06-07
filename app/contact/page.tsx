import NewsHeader from "@/components/news-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Github, Linkedin } from "lucide-react"

export default function ContactPage() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/ifalfahri",
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Connect with me professionally",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/ifalfahri",
      color: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600",
      description: "Check out my projects",
    },
    {
      name: "Dribbble",
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.692 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
        </svg>
      ),
      url: "https://dribbble.com/ifalfahri",
      color: "bg-pink-500 hover:bg-pink-600",
      description: "View my design portfolio",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:ifalfahri@gmail.com",
      color: "bg-green-600 hover:bg-green-700",
      description: "Send me an email",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Hubungi Saya</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mari terhubung! Saya senang mendengar dari Anda tentang proyek, kolaborasi, atau sekadar menyapa.
            </p>
          </div>

          {/* Social Media Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg text-white ${social.color} transition-colors`}>
                          <IconComponent />
                        </div>
                        <span>{social.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{social.description}</p>
                    </CardContent>
                  </Card>
                </a>
              )
            })}
          </div>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Tambahan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Waktu Respon</h3>
                <p className="text-sm text-muted-foreground">
                  Saya biasanya merespon email dalam 24-48 jam. Untuk urusan mendesak, silakan hubungi melalui LinkedIn.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Jenis Kolaborasi</h3>
                <p className="text-sm text-muted-foreground">
                  Terbuka untuk proyek web development, mobile app development, UI/UX design, dan konsultasi teknologi.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Lokasi</h3>
                <p className="text-sm text-muted-foreground">
                  Berbasis di Indonesia, tersedia untuk proyek remote dan on-site (area Jabodetabek).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-4 py-8">
            <h2 className="text-2xl font-bold text-foreground">Mari Berkolaborasi!</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Apakah Anda memiliki ide proyek yang menarik? Atau ingin berdiskusi tentang teknologi? Jangan ragu untuk
              menghubungi saya melalui platform mana pun di atas.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
