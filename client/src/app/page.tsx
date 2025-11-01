'use client'

import React, { useState } from 'react'
import {
  Search,
  Wrench,
  Zap,
  Droplet,
  Scissors,
  PaintBucket,
  Home,
  CheckCircle,
  Clock,
  Shield,
  Star,
} from 'lucide-react'

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('')

  const services = [
    { icon: Zap, name: 'Electrician', color: 'from-yellow-400 to-orange-500' },
    { icon: Droplet, name: 'Plumber', color: 'from-blue-400 to-cyan-500' },
    { icon: Wrench, name: 'Carpenter', color: 'from-amber-400 to-orange-600' },
    {
      icon: PaintBucket,
      name: 'Painter',
      color: 'from-purple-400 to-pink-500',
    },
    { icon: Scissors, name: 'Tailor', color: 'from-rose-400 to-red-500' },
    { icon: Home, name: 'Cleaning', color: 'from-green-400 to-emerald-500' },
  ]

  const features = [
    {
      icon: CheckCircle,
      title: 'Verified Professionals',
      desc: 'All service providers are background checked',
    },
    {
      icon: Clock,
      title: 'Quick Booking',
      desc: 'Get service within 2 hours or schedule for later',
    },
    {
      icon: Shield,
      title: 'Service Guarantee',
      desc: '100% satisfaction or money back guarantee',
    },
    {
      icon: Star,
      title: 'Top Rated',
      desc: 'Only the best professionals with 4.5+ ratings',
    },
  ]

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      {/* HERO SECTION */}
      <section className='relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
          <div
            className='absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse'
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className='relative z-10 max-w-5xl mx-auto text-center space-y-8'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 font-medium'>
            <span className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></span>
            Trusted by 50,000+ happy customers
          </div>

          {/* Main heading */}
          <h1 className='text-5xl md:text-7xl font-bold text-gray-900 leading-tight'>
            Your Home Services,
            <span className='block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2'>
              Just a Click Away
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Connect with verified local professionals for all your home service
            needs. Fast, reliable, and affordable.
          </p>

          {/* Enhanced Search Bar */}
          <div className='max-w-2xl mx-auto mt-12'>
            <div className='relative group'>
              <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300'></div>
              <div className='relative flex items-center bg-white rounded-2xl shadow-2xl p-2'>
                <Search className='text-gray-400 ml-4' size={24} />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='What service do you need today?'
                  className='flex-1 px-4 py-4 text-lg outline-none text-gray-800 bg-transparent'
                />
                <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200'>
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Popular searches */}
          <div className='flex flex-wrap items-center justify-center gap-3 text-sm'>
            <span className='text-gray-500'>Popular:</span>
            {['Electrician', 'Plumber', 'Cleaning', 'AC Repair'].map((term) => (
              <button
                key={term}
                className='px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-400 hover:text-blue-600 transition'
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className='py-24 px-4 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              Popular Services
            </h2>
            <p className='text-xl text-gray-600'>
              Book the most in-demand home services
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
            {services.map((service, idx) => (
              <div key={idx} className='group cursor-pointer'>
                <div className='relative overflow-hidden rounded-2xl p-6 h-40 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                  <service.icon className='relative z-10 w-12 h-12 text-gray-700 group-hover:text-white transition-colors duration-300' />
                  <span className='relative z-10 mt-3 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300'>
                    {service.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className='py-24 px-4 bg-gradient-to-b from-gray-50 to-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              Why Choose Fixora?
            </h2>
            <p className='text-xl text-gray-600'>
              Your satisfaction is our top priority
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, idx) => (
              <div
                key={idx}
                className='group p-8 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300'
              >
                <div className='w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                  <feature.icon className='text-white' size={28} />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className='relative py-24 px-4 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700'></div>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'></div>

        <div className='relative z-10 max-w-4xl mx-auto text-center text-white'>
          <h2 className='text-4xl md:text-6xl font-bold mb-6'>
            Ready to Get Started?
          </h2>
          <p className='text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed'>
            Join thousands of satisfied customers who trust Fixora for their
            home service needs
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <button className='group relative px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200'>
              <span className='relative z-10'>Book a Service Now</span>
            </button>
            <button className='px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200'>
              Become a Professional
            </button>
          </div>

          <div className='mt-16 flex flex-wrap justify-center gap-12 text-center'>
            <div>
              <div className='text-4xl font-bold mb-2'>50K+</div>
              <div className='text-blue-200'>Happy Customers</div>
            </div>
            <div>
              <div className='text-4xl font-bold mb-2'>2,500+</div>
              <div className='text-blue-200'>Verified Pros</div>
            </div>
            <div>
              <div className='text-4xl font-bold mb-2'>4.8★</div>
              <div className='text-blue-200'>Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
