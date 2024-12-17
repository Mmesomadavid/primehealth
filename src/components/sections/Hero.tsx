import { Button } from "../UI/Button"
import { motion } from "framer-motion"

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
                Revolutionize Healthcare Management
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Manage appointments, patient records, and doctor interactions—all in one place. 
                Experience healthcare management reimagined for the digital age.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  Book Demo
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="relative lg:absolute lg:right-0 lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-lg blur-2xl" />
                <img
                  src="/dashboard-preview.png"
                  alt="PrimeHealth Dashboard"
                  className="relative rounded-lg shadow-2xl"
                />
              </div>

              <div className="absolute -right-8 top-1/4 transform translate-x-1/2">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-lg shadow-lg p-4 max-w-xs"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Appointment Scheduled</p>
                      <p className="text-xs text-gray-500">Dr. Smith - 2:30 PM</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute -left-8 bottom-1/4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-lg shadow-lg p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Medical Records Updated</p>
                      <p className="text-xs text-gray-500">Latest lab results added</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute left-1/3 right-0 top-0 -z-10 m-auto h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-[100px]" />
      </div>
    </section>
  )
}

export default Hero