"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    // Initialize animation
    setIsAnimating(true)

    // Cleanup animation on unmount
    return () => setIsAnimating(false)
  }, [])

  useEffect(() => {
    let interval
    if (isLoading) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + Math.random() * 5
          return newProgress > 100 ? 100 : newProgress
        })
      }, 150)
    } else {
      setScanProgress(0)
    }

    return () => clearInterval(interval)
  }, [isLoading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    setResult("")

    try {
      // Simulate scanning animation
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const response = await axios.post("https://cyberr-backend.onrender.com/api/check-link", { url })
      setResult(response.data.message)
    } catch (err) {
      setResult("Error: Unable to analyze link. Please try again.")
    } finally {
      setIsLoading(false)
      setScanProgress(0)
    }
  }

  const getStatusClass = () => {
    if (!result) return ""
    return result.includes("safe") ? "safe-status" : "danger-status"
  }

  return (
    <div className="app-container">
      <div className="cyber-background">
        <div className="grid-overlay"></div>
        <div className="glow-effect"></div>
      </div>

      <header className="app-header">
        <div className="logo">
          <span className="logo-text">CYBER</span>
          <span className="logo-sub">SHIELD</span>
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            About
          </a>
          <a href="#" className="nav-link">
            Services
          </a>
          <a href="#" className="nav-link">
            Contact
          </a>
        </nav>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <h1 className="glitch-text" data-text="LINK SECURITY SCANNER">
            Check the link that you got in sms
          </h1>
          <p className="sub-heading">Analyze is it a scam or legit</p>

          <div className="scanner-container">
            <form onSubmit={handleSubmit} className="scanner-form">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter URL to scan..."
                  className="url-input"
                  disabled={isLoading}
                />
                <div className="input-focus-line"></div>
              </div>

              <button
                type="submit"
                className={`scan-button ${isLoading ? "scanning" : ""}`}
                disabled={isLoading || !url}
              >
                {isLoading ? "SCANNING..." : "ANALYZE"}
                <span className="button-glow"></span>
              </button>
            </form>

            {isLoading && (
              <div className="scan-progress-container">
                <div className="scan-progress-bar">
                  <div className="scan-progress-fill" style={{ width: `${scanProgress}%` }}></div>
                </div>
                <div className="scan-status">
                  <span className="scan-percentage">{Math.floor(scanProgress)}%</span>
                  <span className="scan-text">Analyzing security parameters...</span>
                </div>
              </div>
            )}

            {result && (
              <div className={`result-container ${getStatusClass()}`}>
                <div className="result-icon"></div>
                <div className="result-text">{result}</div>
              </div>
            )}
          </div>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon threat-icon"></div>
            <h3>Threat Detection</h3>
            <p>Advanced algorithms to identify malicious URLs and phishing attempts</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon privacy-icon"></div>
            <h3>Privacy Analysis</h3>
            <p>Check if websites respect your data and privacy regulations</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon security-icon"></div>
            <h3>Security Rating</h3>
            <p>Comprehensive security score based on multiple parameters</p>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>Cyber Fraud Detection.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

