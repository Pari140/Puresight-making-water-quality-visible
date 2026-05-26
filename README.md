
# Puresight-making-water-quality-visible
PureSight is a frontend concept for an IoT water safety device by Shreshthtam. The device attaches to existing water purifiers and makes water safety visible in real time on a built-in screen, without requiring a phone, app, QR code, or extra user effort.

This submission treats PureSight less like a landing page and more like a product experience: the visitor can see the device interface, simulate safety states, understand the monitoring logic, and imagine how the product could exist in real shared spaces.

Live Demo
https://puresight123.netlify.app/

Core Idea
Most people drink from shared water coolers without knowing whether the filter is healthy, the UV lamp is working, or the water quality is still safe. PureSight solves that trust gap by putting the answer directly where the decision happens: on the purifier itself.

The website is built around one simple belief:

If water safety matters to everyone, the signal should be visible to everyone.

What The Site Shows
A premium hero section that introduces the trust problem behind public and shared water coolers.
A live device screen simulation with trust score, TDS, turbidity, temperature, filter health, UV status, and filter authenticity.
Scenario controls for safe, warning, and critical states so the product behavior is not just described, but experienced.
A future concept section showing how PureSight could be integrated into next-generation purifier systems.
A clear explanation of how the device attaches, monitors, and displays water safety.
Design decision cards that explain the thinking behind the product experience.
Use-case cards showing where PureSight matters most: offices, schools, colleges, hospitals, and clinics.

Key Features
Real-time trust score interface
Interactive safety scenario simulation
Filter health and remaining life visibility
UV lamp operational status
TDS, turbidity, and temperature monitoring
Filter fraud detection concept
Responsive layout for desktop and mobile
Custom canvas particle background
Scroll reveal animations
Clean static deployment with no build step
Product Thinking
No app, no friction
PureSight is designed for public and shared spaces. If someone has to unlock a phone or scan something before drinking water, the product has already added friction. The device screen gives the answer immediately.

One score, with details underneath
TDS, NTU, UV health, and filter status are useful, but not everyone understands them. The Trust Score gives a clear first answer while still keeping detailed readings visible for people who want them.

Alerts should be impossible to miss
A critical water issue should not look like a normal metric update. In the critical state, the interface changes color, updates status labels, and flashes the screen to make the risk feel urgent.

Trust made public
Water purifier maintenance is usually invisible. PureSight turns it into a public signal that anyone can verify at a glance.

Tech Stack
This project is intentionally lightweight and framework-free.

HTML5
CSS3
Vanilla JavaScript
Canvas API
Google Fonts
Static image assets
No framework was used because the submission focuses on interaction design, visual polish, and product storytelling without adding unnecessary build complexity.

File Structure
puresight/
├── index.html
├── puresight.html
├── puresight.css
├── puresight.js
├── logo.jpeg
├── future_aqua.png
└── README.md
index.html is included for deployment platforms that serve the root file by default. puresight.html is kept as the original working page.

design direction:
The visual system uses deep charcoal, off-white, and PureSight teal to match the feeling of a serious hardware product. The interface avoids looking like a generic SaaS landing page. Instead, it leans into the physical nature of the device: screen glow, measurement cards, status indicators, alert states, and product-context imagery.

The goal was to make the website feel like a working product demo, not just a pitch.

Future Scope
Add real sensor data integration
Add maintenance history and service logs
Add location-based purifier status for institutions
Add admin dashboard for facility managers
Add accessibility improvements for public installations
Convert the visual device simulation into a reusable component
Built For
PureSight Frontend Competition by Shreshthtam.

This project was built to show product thinking, interaction design, visual execution, and the ability to turn a brief into a complete frontend experience.
