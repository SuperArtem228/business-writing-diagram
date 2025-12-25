import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs"

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: "basis",
  },
})

// Accordion functionality
document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling
    const isActive = content.classList.contains("active")

    content.classList.toggle("active")
    btn.classList.toggle("active")
  })
})

// Copy functionality for code blocks
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target")
    const targetElement = document.getElementById(targetId)
    const text = targetElement.textContent

    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent
      btn.textContent = "Copied!"
      btn.classList.add("copied")

      setTimeout(() => {
        btn.textContent = originalText
        btn.classList.remove("copied")
      }, 2000)
    })
  })
})

// Copy functionality for small buttons (templates)
document.querySelectorAll(".copy-small").forEach((btn) => {
  btn.addEventListener("click", () => {
    const text = btn.getAttribute("data-copy")

    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent
      btn.textContent = "Copied!"
      btn.classList.add("copied")

      setTimeout(() => {
        btn.textContent = originalText
        btn.classList.remove("copied")
      }, 2000)
    })
  })
})

// Screenshot mode toggle
const screenshotToggle = document.getElementById("screenshot-toggle")
screenshotToggle.addEventListener("click", () => {
  document.body.classList.toggle("screenshot-mode")
  screenshotToggle.classList.toggle("active")

  if (document.body.classList.contains("screenshot-mode")) {
    screenshotToggle.textContent = "✓ Screenshot Mode ON"
  } else {
    screenshotToggle.textContent = "📸 Screenshot Mode"
  }
})

// Print functionality
document.getElementById("print-btn").addEventListener("click", () => {
  window.print()
})

// Copy Mermaid code
document.getElementById("copy-mermaid").addEventListener("click", () => {
  const mermaidElement = document.getElementById("main-diagram")
  const mermaidCode = mermaidElement.textContent

  navigator.clipboard.writeText(mermaidCode).then(() => {
    const btn = document.getElementById("copy-mermaid")
    const originalText = btn.textContent
    btn.textContent = "✓ Copied!"

    setTimeout(() => {
      btn.textContent = originalText
    }, 2000)
  })
})

// Download SVG
document.getElementById("download-svg").addEventListener("click", async () => {
  // Wait a bit to ensure Mermaid has fully rendered
  await new Promise((resolve) => setTimeout(resolve, 500))

  const diagramWrapper = document.querySelector(".diagram-wrapper")
  const svgElement = diagramWrapper.querySelector("svg")

  if (svgElement) {
    // Clone the SVG to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true)

    // Get the SVG string
    const svgData = new XMLSerializer().serializeToString(clonedSvg)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    // Create download link
    const downloadLink = document.createElement("a")
    downloadLink.href = svgUrl
    downloadLink.download = "business-writing-workflow.svg"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(svgUrl)

    // Update button text temporarily
    const btn = document.getElementById("download-svg")
    const originalText = btn.textContent
    btn.textContent = "✓ Downloaded!"

    setTimeout(() => {
      btn.textContent = originalText
    }, 2000)
  } else {
    alert("Diagram not fully loaded. Please wait a moment and try again.")
  }
})

// Tone slider functionality
const toneSlider = document.getElementById("tone-slider")
const phrases = {
  opening: [
    "I need information about...",
    "I hope this email finds you well.",
    "I trust this message finds you in good health and spirits. I am reaching out to you with a request...",
  ],
  request: [
    "Send the report by Friday.",
    "Could you please send the report by Friday?",
    "I would be most grateful if you could kindly send the report by Friday, if that is convenient for you.",
  ],
  deadline: [
    "The deadline is January 15.",
    "The deadline is January 15.",
    "We would appreciate if you could aim for January 15, though we understand if you need additional time.",
  ],
  closing: [
    "Thanks.",
    "Thank you for your assistance.",
    "I sincerely appreciate your time and valuable assistance with this matter.",
  ],
}

toneSlider.addEventListener("input", (e) => {
  const level = Number.parseInt(e.target.value)

  document.getElementById("opening-phrase").textContent = phrases.opening[level]
  document.getElementById("request-phrase").textContent = phrases.request[level]
  document.getElementById("deadline-phrase").textContent = phrases.deadline[level]
  document.getElementById("closing-phrase").textContent = phrases.closing[level]
})

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-links a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const navHeight = document.getElementById("main-nav").offsetHeight
      const targetPosition = targetElement.offsetTop - navHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

console.log("[v0] Business Writing Guide loaded successfully")
