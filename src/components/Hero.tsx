import { Button } from "./UI/Button"

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight">
            Get Simplified Banking
          </h1>
          <p className="text-xl text-gray-600">
            Get full visibility over your business spending—Saving your time
          </p>
          <Button className="rounded-full" size="lg">
            Apply Now →
          </Button>
        </div>

        <div className="relative">
          <div className="rounded-2xl overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/prime-health-611ef.appspot.com/o/auth%2Fnational-cancer-institute-L8tWZT4CcVQ-unsplash%20(3).jpg?alt=media&token=0ba9d3ce-f928-4d36-989b-0909a8c15b79"
                alt="Business banking"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-medium mb-4">
                  Apply in 10 — Minutes for business banking
                </h2>
                <div className="flex gap-3">
                  <Button variant="default" className="rounded-full" size="lg">
                    Try Grab — Free
                  </Button>
                  <Button variant="outline" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20" size="lg">
                    Book Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 space-y-12">
        <div className="flex flex-wrap gap-8 items-center justify-center grayscale opacity-70">
          <img src="/placeholder.svg?height=40&width=120" alt="Rakuten" width={120} height={40} />
          <img src="/placeholder.svg?height=40&width=120" alt="NCR" width={120} height={40} />
          <img src="/placeholder.svg?height=40&width=120" alt="Monday.com" width={120} height={40} />
          <img src="/placeholder.svg?height=40&width=120" alt="Disney" width={120} height={40} />
          <img src="/placeholder.svg?height=40&width=120" alt="Dropbox" width={120} height={40} />
        </div>

        <p className="text-2xl md:text-3xl lg:text-4xl text-center max-w-4xl mx-auto">
          Now we&apos;ve made — capital accessible even more companies{" "}
          <span className="inline-flex items-center gap-2 text-gray-600">
            <span className="w-6 h-6 rounded-full bg-gray-200" />
            directly through embedded{" "}
            <svg className="w-4 h-4 rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            {" "}the software platforms
          </span>
        </p>
      </div>
    </div>
  )
}

export default Hero;