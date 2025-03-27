import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Users,
  Award,
  Shield,
  Car,
  Star,
  Clock,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const AboutUs = () => {
  // Team members data
  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      bio: "With over 15 years of experience in the automotive industry, John leads our mission to revolutionize car buying.",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      bio: "Sarah ensures smooth operations and exceptional customer service across all our platforms.",
    },
    {
      name: "Michael Chen",
      role: "Technical Director",
      image: "https://randomuser.me/api/portraits/men/28.jpg",
      bio: "Michael leads our technical innovations, making car discovery seamless and enjoyable.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      bio: "Emily crafts our brand story and drives engagement through innovative marketing strategies.",
    },
  ];

  // Company values
  const values = [
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Trust & Transparency",
      description:
        "We believe in building lasting relationships through honest communication and reliable information.",
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We're committed to providing exceptional service at every step.",
    },
    {
      icon: <Award className="w-8 h-8 text-red-600" />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from our platform to our customer service.",
    },
    {
      icon: <Zap className="w-8 h-8 text-red-600" />,
      title: "Innovation",
      description:
        "We continuously push boundaries to create cutting-edge solutions that enhance the car buying experience.",
    },
  ];

  // Company milestones
  const milestones = [
    {
      year: "2018",
      title: "Foundation",
      description:
        "Moto Elegance was founded with a vision to transform the automotive industry.",
    },
    {
      year: "2019",
      title: "Platform Launch",
      description:
        "Successfully launched our digital platform, featuring 500+ cars from premium brands.",
    },
    {
      year: "2020",
      title: "Expansion",
      description:
        "Expanded our services nationwide and partnered with 25 additional luxury car brands.",
    },
    {
      year: "2022",
      title: "Revolution",
      description:
        "Introduced AI-powered car matching technology to personalize the car discovery process.",
    },
    {
      year: "2023",
      title: "Going Global",
      description:
        "Started international operations, bringing the Moto Elegance experience to global markets.",
    },
  ];

  // Stats information
  const stats = [
    {
      icon: <Car className="w-6 h-6 text-red-600" />,
      value: "1,500+",
      label: "Premium Cars",
    },
    {
      icon: <Users className="w-6 h-6 text-red-600" />,
      value: "15,000+",
      label: "Happy Customers",
    },
    {
      icon: <Star className="w-6 h-6 text-red-600" />,
      value: "50+",
      label: "Brand Partners",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-red-600" />,
      value: "100%",
      label: "Satisfaction Guarantee",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Hero Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://wallpapercat.com/w/full/c/c/5/608360-3840x2160-desktop-4k-vintage-car-wallpaper-photo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: "scale(1.1)",
            filter: "blur(2px)",
          }}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-0" />

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h5 className="text-red-600 text-lg font-semibold mb-3 tracking-wider">
              ABOUT MOTO ELEGANCE
            </h5>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Redefining Luxury Car Experience
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed">
              At Moto Elegance, we combine passion for automobiles with
              cutting-edge technology to deliver an unparalleled luxury car
              discovery experience.
            </p>
            <a
              href="#mission"
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/20"
            >
              Discover Our Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Company Overview Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              A Heritage of Excellence
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded in 2018, Moto Elegance has quickly established itself as
              the premier destination for automotive enthusiasts and luxury car
              buyers. Our journey is built on a foundation of passion,
              innovation, and unwavering commitment to excellence.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission & Vision Section */}
          <div id="mission" className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-red-600 mr-2" />
                <h3 className="text-2xl font-bold text-black">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                At Moto Elegance, our mission is to revolutionize the car buying
                experience by providing a transparent, efficient, and enjoyable
                platform for automotive enthusiasts and buyers. We strive to
                make the process of discovering, comparing, and choosing the
                perfect vehicle as seamless as possible, while maintaining the
                highest standards of service and integrity.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-red-600 mr-2" />
                <h3 className="text-2xl font-bold text-black">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where finding your ideal car is an exciting
                journey, not a daunting task. Through cutting-edge technology
                and personalized experiences, we aim to be the leading platform
                for automotive discovery and information worldwide, creating a
                community of passionate car enthusiasts who share our commitment
                to quality, performance, and elegance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Journey
          </h2>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="relative pl-8 pb-10 mb-6 border-l-2 border-red-600 last:border-0 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-red-600 -translate-x-1/2"></div>
                <div className="flex flex-col md:flex-row md:items-center mb-2">
                  <div className="text-red-600 text-xl font-bold mr-4">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold">{milestone.title}</h3>
                </div>
                <p className="text-gray-400">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg">
              Our talented team brings together decades of experience in
              automotive, technology, and customer service industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x400?text=Team+Member";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              These principles guide every decision we make and every
              interaction we have.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 md:py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-300 text-lg">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="font-medium text-xl">Visit Us</h3>
              </div>
              <p className="text-gray-400 ml-9">
                123 Car Street, Auto City, AC 12345
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="font-medium text-xl">Email Us</h3>
              </div>
              <p className="text-gray-400 ml-9">contact@motoelegance.com</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="font-medium text-xl">Call Us</h3>
              </div>
              <p className="text-gray-400 ml-9">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
