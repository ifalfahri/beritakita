import NewsHeader from "@/components/news-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Eye, Heart, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Tentang BeritaKita</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Platform berita terpercaya yang menghadirkan informasi terkini dari berbagai sumber media Indonesia
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Misi Kami</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Menyediakan akses mudah dan cepat terhadap berita-berita terkini dari berbagai sumber terpercaya di
                  Indonesia. Kami berkomitmen untuk memberikan informasi yang akurat, berimbang, dan mudah diakses oleh
                  semua kalangan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span>Visi Kami</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Menjadi platform berita digital terdepan yang menghubungkan masyarakat Indonesia dengan informasi
                  berkualitas tinggi, mendorong literasi digital, dan membantu masyarakat membuat keputusan yang
                  berdasarkan informasi yang tepat.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* About Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Tentang Platform</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                BeritaKita adalah platform agregasi berita yang mengumpulkan dan menyajikan berita dari berbagai sumber
                media terpercaya di Indonesia. Kami menghadirkan berita dari CNN Indonesia, CNBC Indonesia, Republika,
                Kumparan, dan VOA Indonesia dalam satu platform yang mudah digunakan.
              </p>
              <p className="text-muted-foreground">
                Platform kami dirancang dengan teknologi modern untuk memberikan pengalaman membaca yang optimal, dengan
                fitur pencarian yang canggih, tampilan yang responsif, dan loading yang cepat. Kami juga menyediakan
                mode gelap untuk kenyamanan membaca di berbagai kondisi pencahayaan.
              </p>
              <p className="text-muted-foreground">
                Semua berita yang ditampilkan di platform kami bersumber langsung dari website resmi media partner kami.
                Kami tidak mengubah atau memodifikasi konten berita, melainkan menyajikannya dalam format yang lebih
                mudah diakses dan dibaca.
              </p>
            </CardContent>
          </Card>

          {/* Data Source & Credits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExternalLink className="w-5 h-5 text-blue-600" />
                <span>Sumber Data & Kredit</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-muted-foreground mb-2">
                  Data berita di platform ini bersumber dari{" "}
                  <a
                    href="https://github.com/satyawikananda/berita-indo-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium underline"
                  >
                    Berita Indo API
                  </a>{" "}
                  yang dikembangkan oleh Satya Wikananda. Terima kasih yang sebesar-besarnya atas kontribusi luar biasa
                  dalam menyediakan API yang memudahkan akses terhadap berita Indonesia.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Disclaimer:</strong> Semua berita yang ditampilkan diambil secara legal dari RSS feed resmi
                  masing-masing media partner. Kami menghormati hak cipta dan tidak mengklaim kepemilikan atas konten
                  berita yang ditampilkan.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  Sebagian besar website ini dibuat dengan bantuan{" "}
                  <span className="font-medium text-purple-600">vibe coding</span> untuk mempercepat proses pengembangan
                  dan memastikan kualitas kode yang optimal.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Creator Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Github className="w-5 h-5 text-blue-600" />
                <span>Pembuat</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Image
                  src="https://avatars.githubusercontent.com/u/114784709?v=4"
                  alt="Ifal Fahri A"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Ifal Fahri A</h3>
                  <p className="text-muted-foreground mb-3">Full Stack Developer & Tech Enthusiast</p>
                  <div className="flex space-x-3">
                    <a
                      href="https://github.com/ifalfahri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      GitHub
                    </a>
                    <Link href="/contact">
                      <Button size="sm" variant="outline">
                        Contact Me
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Values */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <span>Nilai-Nilai Kami</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold">Kredibilitas</h3>
                  <p className="text-sm text-muted-foreground">
                    Hanya menyajikan berita dari sumber-sumber media yang terpercaya dan terverifikasi
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold">Aksesibilitas</h3>
                  <p className="text-sm text-muted-foreground">
                    Memastikan informasi dapat diakses dengan mudah oleh semua kalangan masyarakat
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold">Inovasi</h3>
                  <p className="text-sm text-muted-foreground">
                    Terus mengembangkan teknologi untuk memberikan pengalaman terbaik bagi pengguna
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
