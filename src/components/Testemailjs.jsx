import React, { useState } from 'react'
import sendEmail from './SendEmail' // Import the sendEmail function from SendEmail component

function Testemailjs() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log("Form Data:", formData); 
    // Create test user data object
    const userData = {
      email: formData.email,
      name: "Test User",
      subject: formData.subject
    }

    // Send email through SendEmail component
    const result = await sendEmail(userData)
    
    // Reset form
    setFormData({
      email: '',
      subject: ''
    })
  }

  return (
    <div>
      <center>
        <h1 className='text-3xl text-emerald-950 mb-6'>
          Test EmailJS
        </h1>
        {status && (
          <p className={`mb-4 ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {status}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col max-w-md gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-left mb-1">Email</label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='border m-2 p-2 rounded'
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="subject" className="text-left mb-1">Subject</label>
            <textarea 
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className='border m-2 p-2 rounded min-h-[100px]'
              required
            />
          </div>
          
          <button 
            type="submit" 
            className='bg-emerald-950 text-white p-3 rounded hover:bg-emerald-800 transition-colors'
          >
            Send Email
          </button>
        </form>
      </center>
    </div>
  )
}

export default Testemailjs