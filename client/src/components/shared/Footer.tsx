'use client'

import Link from 'next/link'
import React from 'react'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from 'react-icons/fa'

const Footer = () => {
  const [year, setYear] = React.useState(2025) // default to any year

  React.useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])
  return (
    <footer className='bg-gray-900 text-gray-300 pt-10 pb-6 mt-10'>
      <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Brand Section */}
        <div>
          <h2 className='text-2xl font-bold text-white'>Fixora</h2>
          <p className='text-sm mt-3'>
            Your trusted partner for all home & office services. Book
            professionals in just a few clicks.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-3'>Quick Links</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/' className='hover:text-white'>
                Home
              </Link>
            </li>
            <li>
              <a href='/about' className='hover:text-white'>
                About Us
              </a>
            </li>
            <li>
              <a href='/services' className='hover:text-white'>
                Services
              </a>
            </li>
            <li>
              <a href='/contact' className='hover:text-white'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-3'>
            Our Services
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>Plumbing</li>
            <li>Electrical</li>
            <li>AC Repair</li>
            <li>Cleaning</li>
            <li>Renovation</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-3'>Contact Us</h3>
          <p className='text-sm flex flex-row place-items-center gap-3'>
            <FaLocationArrow /> Kochi, Kerala, India
          </p>
          <p className='text-sm'>📞 +91 98765 43210</p>
          <p className='text-sm'>✉️ support@fixora.com</p>
          <div className='flex space-x-4 mt-3'>
            <a href='#' className='hover:text-white'>
              <FaFacebook />
            </a>
            <a href='#' className='hover:text-white'>
              <FaTwitter />
            </a>
            <a href='#' className='hover:text-white'>
              <FaInstagram />
            </a>
            <a href='#' className='hover:text-white'>
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className='text-center text-xs text-gray-400 mt-8 border-t border-gray-700 pt-4'
        suppressHydrationWarning
      >
        © {year} Fixora. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
