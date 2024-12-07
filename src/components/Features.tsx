import { BarChart3, Bell, Calendar, FileText, MessageCircle, Target, Users2, CheckSquare } from 'lucide-react'

interface FeatureCard {
  icon: JSX.Element
  title: string
  description: string
  iconClassName?: string
}

const features: FeatureCard[] = [
  {
    icon: <CheckSquare className="h-6 w-6" />,
    title: "Task Management",
    description: "Organize and prioritize tasks efficiently for your team's success.",
    iconClassName: "bg-red-100 text-red-500",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Real-time Updates",
    description: "Stay informed with instant notifications on project progress.",
    iconClassName: "bg-blue-100 text-blue-500",
  },
  {
    icon: <Users2 className="h-6 w-6" />,
    title: "Team Collaboration",
    description: "Foster teamwork with integrated communication tools.",
    iconClassName: "bg-green-100 text-green-500",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Goal Tracking",
    description: "Set and monitor project milestones and objectives easily.",
    iconClassName: "bg-yellow-100 text-yellow-500",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Analytics Dashboard",
    description: "Gain insights with comprehensive project performance metrics.",
    iconClassName: "bg-purple-100 text-purple-500",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Resource Scheduling",
    description: "Optimize resource allocation for maximum efficiency.",
    iconClassName: "bg-orange-100 text-orange-500",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Client Communication",
    description: "Streamline client interactions within the project platform.",
    iconClassName: "bg-pink-100 text-pink-500",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Project Templates",
    description: "Kickstart projects quickly with customizable templates.",
    iconClassName: "bg-gray-100 text-gray-500",
  },
]

const Features = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="inline-flex items-center text-sm font-semibold text-blue-600 gap-2">
            <span className="h-6 flex items-center border border-blue-600 rounded-full px-3">Our Features </span>
          </p>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            We do it for the love of the{" "}
            <span className="block">Game. (Managing Projects)</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your projects with our powerful features and gain insights with comprehensive project performance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.iconClassName}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-16">
          Myauti offers comprehensive project management solutions for businesses of all sizes.
        </p>
      </div>
    </section>
  )
}

export default Features

