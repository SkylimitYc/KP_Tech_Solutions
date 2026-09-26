import { useEffect, useRef, useState } from 'react'
import {
  Code2,
  Rocket,
  Wrench,
  Cloud,
  Mail,
  Phone,
  MessageCircle,
} from 'lucide-react'

import './App.css'

const stack = [
  'React',
  'JavaScript',
  'HTML',
  'CSS',
  'Vite',
  'Git',
  'GitHub',
  'VS Code',
]

const faqBank = [
  {
    keys: ['service', 'services', 'offer', 'website'],
    answer:
      'We currently focus on website development, basic deployment, website maintenance, and support. We are also building our Cloud and DevOps capabilities.',
  },
  {
    keys: ['price', 'cost', 'charge', 'budget'],
    answer:
      'Pricing depends on the scope and requirements. Contact K&P Tech Solutions and we can discuss the project before preparing a quote.',
  },
  {
    keys: ['time', 'long', 'deadline', 'when'],
    answer:
      'The timeline depends on website size, content, features, and revisions. We discuss the expected timeline before starting.',
  },
  {
    keys: ['host', 'hosting', 'server', 'deploy'],
    answer:
      'We can help with basic website deployment and hosting setup. Our advanced cloud and DevOps capability is still being developed.',
  },
  {
    keys: ['maintain', 'support', 'fix', 'update'],
    answer:
      'Yes. We can help with website updates, content changes, basic fixes, and ongoing maintenance.',
  },
  {
    keys: [
      'contact',
      'reach',
      'email',
      'call',
      'phone',
      'whatsapp',
    ],
    answer:
      'You can contact K&P Tech Solutions using Email, Call, or WhatsApp in the Contact section.',
  },
  {
    keys: ['stack', 'tech', 'technology', 'build'],
    answer:
      'Our current website work uses React, JavaScript, HTML, CSS, Vite, Git, GitHub, and VS Code.',
  },
]

function findAnswer(input) {
  const text = input.toLowerCase()

  const match = faqBank.find((item) =>
    item.keys.some((key) => text.includes(key))
  )

  if (match) {
    return match.answer
  }

  return "I don't have a prepared answer for that yet. Please use the Contact section and the K&P Tech Solutions team can respond directly."
}

function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)

  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hi, I'm the K&P Assistant. I can help with pricing, timelines, hosting, support, technology, and contact options.",
    },
  ])

  const scrollRef = useRef(null)

  const quickQuestions = [
    'What services do you offer?',
    'How much does a website cost?',
    'How can I contact you?',
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight
    }
  }, [messages, typing, open])

  const processMessage = (text) => {
    const userMessage = {
      from: 'user',
      text,
    }

    setMessages((previous) => [
      ...previous,
      userMessage,
    ])

    setTyping(true)

    setTimeout(() => {
      const botMessage = {
        from: 'bot',
        text: findAnswer(text),
      }

      setMessages((previous) => [
        ...previous,
        botMessage,
      ])

      setTyping(false)
    }, 650)
  }

  const sendMessage = (event) => {
    event.preventDefault()

    const text = draft.trim()

    if (!text) return

    processMessage(text)
    setDraft('')
  }

  return (
    <div className="assistant">
      {open && (
        <div
          className="assistant-panel"
          role="dialog"
          aria-label="K&P Assistant"
        >
          <div className="assistant-header">
            <div className="assistant-identity">
              <div className="assistant-avatar">
                KP
              </div>

              <div>
                <p className="assistant-title">
                  K&P Assistant
                </p>

                <p className="assistant-subtitle">
                  <span className="assistant-online-dot" />
                  Quick website help
                </p>
              </div>
            </div>

            <button
              type="button"
              className="assistant-close"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              ✕
            </button>
          </div>

          <div
            className="assistant-body"
            ref={scrollRef}
          >
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={`assistant-row assistant-row-${message.from}`}
              >
                {message.from === 'bot' && (
                  <div className="assistant-mini-avatar">
                    KP
                  </div>
                )}

                <div
                  className={`assistant-msg assistant-msg-${message.from}`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="assistant-row assistant-row-bot">
                <div className="assistant-mini-avatar">
                  KP
                </div>

                <div className="assistant-msg assistant-msg-bot assistant-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {messages.length === 1 && !typing && (
              <div className="assistant-suggestions">
                {quickQuestions.map((question) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() =>
                      processMessage(question)
                    }
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="assistant-input-row"
            onSubmit={sendMessage}
          >
            <input
              type="text"
              value={draft}
              onChange={(event) =>
                setDraft(event.target.value)
              }
              placeholder="Ask a question..."
              aria-label="Message"
            />

            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
            >
              →
            </button>
          </form>

          <p className="assistant-disclaimer">
            Quick FAQ assistant · Not live human support
          </p>
        </div>
      )}

      <button
        type="button"
        className="assistant-toggle"
        onClick={() =>
          setOpen((value) => !value)
        }
        aria-label={
          open
            ? 'Close assistant'
            : 'Open assistant'
        }
      >
        {open ? '✕' : '✦'}
      </button>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const elements =
      document.querySelectorAll('.reveal')

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                'reveal-visible'
              )

              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.12,
        }
      )

    elements.forEach((element) => {
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const target =
      document.getElementById(sectionId)

    if (!target) return

    const headerOffset = 72

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset

    const startPosition = window.scrollY
    const distance =
      targetPosition - startPosition

    const duration = 1220
    let startTime = null

    const animation = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed =
        currentTime - startTime

      const progress = Math.min(
        elapsed / duration,
        1
      )

      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 -
            Math.pow(
              -2 * progress + 2,
              2
            ) /
              2

      window.scrollTo(
        0,
        startPosition + distance * ease
      )

      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  const handleNavClick = (
    event,
    sectionId
  ) => {
    event.preventDefault()

    setMenuOpen(false)

    scrollToSection(sectionId)
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">
            K&P Tech Solutions
          </div>

          <button
            type="button"
            className="menu-toggle"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <div
            className={`nav-links ${
              menuOpen ? 'nav-open' : ''
            }`}
          >
            <a
              href="#home"
              onClick={(event) =>
                handleNavClick(event, 'home')
              }
            >
              Home
            </a>

            <a
              href="#about"
              onClick={(event) =>
                handleNavClick(event, 'about')
              }
            >
              About
            </a>

            <a
              href="#services"
              onClick={(event) =>
                handleNavClick(event, 'services')
              }
            >
              Services
            </a>
            <a
  href="#pricing"
  onClick={(event) =>
    handleNavClick(event, 'pricing')
  }
>
  Pricing
</a>
            <a
              href="#stack"
              onClick={(event) =>
                handleNavClick(event, 'stack')
              }
            >
              Stack
            </a>

            <a
              href="#projects"
              onClick={(event) =>
                handleNavClick(event, 'projects')
              }
            >
              Projects
            </a>

            <a
              href="#contact"
              onClick={(event) =>
                handleNavClick(event, 'contact')
              }
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main>

        {/* HERO */}

        <section
          id="home"
          className="hero-section"
        >
          <div
            className="hero-grid"
            aria-hidden="true"
          />

          <div
            className="hero-orb hero-orb-one"
            aria-hidden="true"
          />

          <div
            className="hero-orb hero-orb-two"
            aria-hidden="true"
          />

          <div className="hero-content">
            <div className="hero-copy">
              <p className="hero-tag">
                <span className="hero-status-dot" />

                IT · CLOUD · DEVOPS · DEVSECOPS
              </p>

              <h1>
                Technology that moves
                <span className="hero-gradient-text">
                  {' '}
                  business forward.
                </span>
              </h1>

              <p className="hero-description">
                We build practical technology
                solutions for modern businesses —
                starting with websites and gradually
                expanding into cloud and automation.
              </p>

              <div className="hero-buttons">
                <a
                  href="#contact"
                  className="primary-btn"
                  onClick={(event) =>
                    handleNavClick(
                      event,
                      'contact'
                    )
                  }
                >
                  Get started
                  <span>→</span>
                </a>

                <a
                  href="#services"
                  className="secondary-btn"
                  onClick={(event) =>
                    handleNavClick(
                      event,
                      'services'
                    )
                  }
                >
                  Explore services
                </a>
              </div>
            </div>

            <div
              className="hero-visual"
              aria-label="Technology deployment preview"
            >
              <div className="terminal-card">
                <div className="terminal-top">
                  <div className="terminal-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className="terminal-title">
                    deployment
                  </span>
                </div>

                <div className="terminal-body">
                  <p>
                    <span className="terminal-muted">
                      $
                    </span>{' '}
                    npm run build
                  </p>

                  <p className="terminal-success">
                    ✓ React application built
                  </p>

                  <p>
                    <span className="terminal-muted">
                      $
                    </span>{' '}
                    deploy --production
                  </p>

                  <p className="terminal-info">
                    → preparing deployment...
                  </p>

                  <p className="terminal-success">
                    ✓ deployment ready
                  </p>

                  <div className="terminal-progress">
                    <span />
                  </div>
                </div>
              </div>

              <div className="floating-chip floating-chip-react">
                React
              </div>

              <div className="floating-chip floating-chip-git">
                Git
              </div>

              <div className="floating-chip floating-chip-vite">
                Vite
              </div>
            </div>
          </div>
        </section>


        {/* ABOUT */}

        <section
          id="about"
          className="about-section reveal"
        >
          <p className="section-label">
            About us
          </p>

          <h2>
            Built for practical business technology
          </h2>

          <p>
            K&P Tech Solutions is being built
            around practical, reliable, and
            understandable technology solutions
            for growing businesses.
          </p>
        </section>


        {/* SERVICES */}

        <section
          id="services"
          className="services-section reveal"
        >
          <div className="services-heading">
            <div>
              <p className="section-label">
                What we do
              </p>

              <h2>
                Services built around real business
                needs.
              </h2>
            </div>

            <p className="services-intro">
              We start with practical website work
              today, while steadily building deeper
              cloud and automation capability for
              tomorrow.
            </p>
          </div>

          <div className="services-bento">

            {/* WEBSITE DEVELOPMENT */}

            <article className="service-bento-card service-featured">
              <div>
                <div className="service-card-top">
                  <span className="service-icon">
                    <Code2 size={20} />
                  </span>

                  <span className="service-number">
                    01
                  </span>
                </div>

                <p className="service-kicker">
                  CORE SERVICE
                </p>

                <h3>
                  Website Development
                </h3>

                <p>
                  Responsive business websites
                  built with clean design,
                  usability, and performance in
                  mind.
                </p>
              </div>

              <div className="service-mini-browser">
                <div className="mini-browser-bar">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="mini-browser-content">
                  <div className="mini-line mini-line-large" />
                  <div className="mini-line" />
                  <div className="mini-line mini-line-short" />
                  <div className="mini-button" />
                </div>
              </div>
            </article>


            {/* DEPLOYMENT */}

            <article className="service-bento-card service-small">
              <div className="service-card-top">
                <span className="service-icon">
                  <Rocket size={20} />
                </span>

                <span className="service-number">
                  02
                </span>
              </div>

              <h3>
                Website Deployment
              </h3>

              <p>
                Practical help getting websites
                online, including hosting setup and
                basic deployment.
              </p>

              <div className="deployment-flow">
                <span>Code</span>
                <i>→</i>
                <span>Build</span>
                <i>→</i>
                <span>Live</span>
              </div>
            </article>


            {/* SUPPORT */}

            <article className="service-bento-card service-small">
              <div className="service-card-top">
                <span className="service-icon">
                  <Wrench size={20} />
                </span>

                <span className="service-number">
                  03
                </span>
              </div>

              <h3>
                Maintenance & Support
              </h3>

              <p>
                Website updates, content changes,
                basic fixes, and ongoing
                maintenance.
              </p>

              <div className="support-status">
                <div>
                  <span className="support-dot" />

                  Website
                </div>

                <strong>
                  Operational
                </strong>
              </div>
            </article>


            {/* CLOUD */}

            <article className="service-bento-card service-wide">
              <div className="service-wide-copy">
                <div className="service-card-top">
                  <span className="service-icon">
                    <Cloud size={20} />
                  </span>

                  <span className="service-number">
                    04
                  </span>
                </div>

                <p className="service-kicker">
                  BUILDING CAPABILITY
                </p>

                <h3>
                  Cloud & DevOps
                </h3>

                <p>
                  We are actively developing our
                  skills in cloud, automation,
                  containers, and modern deployment
                  workflows.
                </p>
              </div>

              <div className="capability-track">
                <div>
                  <span>Git</span>

                  <strong>
                    Working
                  </strong>
                </div>

                <div>
                  <span>
                    Deployment
                  </span>

                  <strong>
                    Building
                  </strong>
                </div>

                <div>
                  <span>Cloud</span>

                  <strong>
                    Learning
                  </strong>
                </div>

                <div>
                  <span>
                    Containers
                  </span>

                  <strong>
                    Planned
                  </strong>
                </div>
              </div>
            </article>
          </div>
        </section>
                  <section className="pricing-section" id="pricing">
  <div className="section-header">
    <span className="section-tag">PRICING</span>
    <h2>Simple pricing to get started.</h2>
    <p>
      Choose a starting point. Final pricing depends on your business needs,
      features, pages, and project scope.
    </p>
  </div>

  <div className="pricing-grid">
    <article className="pricing-card">
      <span className="pricing-label">STARTER</span>

      <h3>Starter Website</h3>

      <div className="pricing-price">
        <span>₹4,999</span>
        <small>starting from</small>
      </div>

      <p>
        A clean and professional website for individuals and small businesses
        getting online.
      </p>

      <ul>
        <li>Responsive website</li>
        <li>Essential business sections</li>
        <li>Contact & WhatsApp integration</li>
        <li>Basic deployment support</li>
      </ul>

      <a
        href="https://wa.me/919871624457?text=Hi%20K%26P%20Tech%20Solutions%2C%20I%20am%20interested%20in%20the%20Starter%20Website%20package."
        target="_blank"
        rel="noreferrer"
        className="pricing-btn"
      >
        Discuss on WhatsApp
      </a>
    </article>

    <article className="pricing-card pricing-card-featured">
      <span className="pricing-label">POPULAR</span>

      <h3>Business Website</h3>

      <div className="pricing-price">
        <span>₹8,999</span>
        <small>starting from</small>
      </div>

      <p>
        For businesses that need a stronger online presence and more
        customization.
      </p>

      <ul>
        <li>Custom business-focused design</li>
        <li>Multiple sections or pages</li>
        <li>WhatsApp & contact integration</li>
        <li>Basic SEO setup</li>
        <li>Deployment support</li>
      </ul>

      <a
        href="https://wa.me/919871624457?text=Hi%20K%26P%20Tech%20Solutions%2C%20I%20am%20interested%20in%20the%20Business%20Website%20package."
        target="_blank"
        rel="noreferrer"
        className="pricing-btn"
      >
        Discuss Your Project
      </a>
    </article>

    <article className="pricing-card">
      <span className="pricing-label">CUSTOM</span>

      <h3>Business Plus</h3>

      <div className="pricing-price">
        <span>₹14,999+</span>
        <small>custom scope</small>
      </div>

      <p>
        For businesses requiring more pages, customization, integrations, or
        advanced website features.
      </p>

      <ul>
        <li>Custom project structure</li>
        <li>Advanced UI requirements</li>
        <li>Additional pages & features</li>
        <li>Custom deployment requirements</li>
      </ul>

      <a
        href="https://wa.me/919871624457?text=Hi%20K%26P%20Tech%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20custom%20website%20project."
        target="_blank"
        rel="noreferrer"
        className="pricing-btn"
      >
        Request a Discussion
      </a>
    </article>
  </div>

  <div className="pricing-note">
    <strong>Need something different?</strong>
    <p>
      Every business is different. Detailed requirements, timelines, and final
      quotation are discussed privately over WhatsApp, call, or an online
      meeting.
    </p>
  </div>

  <div className="pricing-addons">
    <span>Deployment support from ₹999</span>
    <span>Website maintenance from ₹999/month</span>
  </div>

  <p className="pricing-disclaimer">
    Launch pricing. Final cost may vary depending on project scope and
    requirements. Domain, hosting, and paid third-party services are charged
    separately where applicable.
  </p>
</section>

        {/* STACK */}

        <section
          id="stack"
          className="stack-section reveal"
        >
          <p className="section-label">
            Tooling
          </p>

          <h2>
            Tools we currently work with
          </h2>

          <p className="stack-intro">
            Our current workflow is focused on
            practical frontend development,
            version control, and modern development
            tooling.
          </p>

          <div className="stack-marquee">
            <div className="stack-track">
              {[...stack, ...stack].map(
                (tool, index) => (
                  <span
                    className="stack-chip"
                    key={`${tool}-${index}`}
                  >
                    <span className="stack-dot" />

                    {tool}
                  </span>
                )
              )}
            </div>
          </div>
        </section>


        {/* PROJECTS */}

        <section
          id="projects"
          className="projects-section reveal"
        >
          <p className="section-label">
            Our work
          </p>

          <h2>
            Projects
          </h2>

          <p className="projects-intro">
            Real demo projects and proof-of-work
            built as we grow our technical
            capabilities.
          </p>

          <div className="projects-grid">
            <article className="project-showcase-card">

              <div className="project-preview">
                <div className="project-browser-bar">
                  <div className="project-browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span>
                    kptechsolutions.local
                  </span>
                </div>

                <div className="project-preview-body">
                  <div className="preview-navbar">
                    <strong>
                      K&P
                    </strong>

                    <div>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="preview-hero">
                    <div>
                      <span className="preview-small-line" />

                      <span className="preview-title-line" />

                      <span className="preview-title-line preview-title-short" />

                      <span className="preview-text-line" />

                      <div className="preview-buttons">
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="preview-terminal">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-details">
                <div className="project-details-top">
                  <span className="project-status">
                    In Progress
                  </span>

                  <span className="project-number">
                    01
                  </span>
                </div>

                <h3>
                  K&P Tech Solutions Company Website
                </h3>

                <p>
                  Responsive React website being
                  built as the digital foundation
                  for K&P Tech Solutions.
                </p>

                <div className="project-tags">
                  <span className="project-tag">
                    React
                  </span>

                  <span className="project-tag">
                    Vite
                  </span>

                  <span className="project-tag">
                    Responsive Design
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>


        {/* CONTACT */}

        <section
          id="contact"
          className="contact-section reveal"
        >
          <p className="section-label">
            Contact
          </p>

          <h2>
            Let&apos;s build something useful
          </h2>

          <p className="contact-intro">
            Have a website or technology
            requirement? Get in touch with K&P
            Tech Solutions.
          </p>

          <div className="contact-actions">
            <a
              href="mailto:kptechsolution2026@gmail.com"
              className="primary-btn"
            >
              <Mail size={17} />
              Email us
            </a>

            <a
              href="tel:+919871624457"
              className="secondary-btn"
            >
              <Phone size={17} />
              Call us
            </a>

            <a
              href="https://wa.me/919871624457"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>
        </section>
      </main>


      {/* FOOTER */}

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()}{' '}
          K&P Tech Solutions. All rights reserved.
        </p>
      </footer>


      {/* FAQ ASSISTANT */}

      <AssistantWidget />
    </>
  )
}

export default App