import Image from "next/image";
import ThemeToggle from './components/ThemeToggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-blue-100 dark:border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Ashtree Studio
              </span>
            </a>
            
            <nav className="hidden sm:flex items-center space-x-8">
              <a href="#work" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Work
              </a>
              <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Services
              </a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </a>
              <a href="#contact" className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-500 dark:hover:to-purple-500 transition-all duration-300">
                Contact
              </a>
              <ThemeToggle />
            </nav>

            {/* Mobile menu button */}
            <button className="sm:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Adjust main padding to account for fixed header */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Ashtree Studio
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mb-8">
            Crafting digital experiences that leave lasting impressions. We blend creativity 
            with precision to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#work"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-500 dark:hover:to-purple-500 transition-all duration-300"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-full border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-900 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24">
          {['Design', 'Development', 'Branding'].map((service) => (
            <div 
              key={service} 
              className="p-6 rounded-2xl backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/20 dark:hover:shadow-blue-900/30"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">{service}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Innovative solutions that elevate your brand and engage your audience.
              </p>
            </div>
          ))}
        </div>

        {/* Featured Work Section */}
        <section id="work" className="mt-32">
          <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((project) => (
              <div 
                key={project}
                className="group relative overflow-hidden rounded-2xl aspect-video bg-slate-100 dark:bg-slate-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Project {project}</h3>
                    <p className="text-slate-200 mb-4">Brand identity & website design</p>
                    <a href="#" className="inline-flex items-center text-white hover:text-blue-400 transition-colors">
                      View Case Study
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                About Ashtree Studio
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                We're a collective of passionate designers and developers, dedicated to crafting exceptional digital experiences that make a lasting impact.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Projects Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Team Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">98%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
              {/* Add your team image here */}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-32">
          <div className="rounded-3xl backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border border-blue-100 dark:border-blue-800 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Let's Work Together
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              We're always looking for new projects and collaborations. Whether you're a startup, a small business, or an established brand, we'd love to hear from you.
            </p>
            <a href="mailto:contact@ashtreestudio.com" className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-500 dark:hover:to-purple-500 transition-all duration-300">
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-100 dark:border-blue-800 backdrop-blur-sm bg-white/30 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} Ashtree Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
