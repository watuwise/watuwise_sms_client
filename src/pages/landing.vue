<template>
  <div class="landing">

    <!-- ── Sticky Navbar ── -->
    <header class="landing-nav" :class="{ scrolled: isScrolled }">
      <div class="nav-inner">
        <img :src="isScrolled ? '/blackLogo.png' : '/whiteLogo.png'" height="32" alt="Watuwise SMS" />

        <!-- Desktop links -->
        <nav class="nav-links">
          <a href="#features"     class="nav-link" :class="{ 'nav-link-dark': isScrolled }">Features</a>
          <a href="#how-it-works" class="nav-link" :class="{ 'nav-link-dark': isScrolled }">How It Works</a>
          <a href="#pricing"      class="nav-link" :class="{ 'nav-link-dark': isScrolled }">Pricing</a>
        </nav>

        <!-- Desktop buttons -->
        <div class="nav-actions">
          <RouterLink to="/login">
            <VBtn variant="outlined" :color="isScrolled ? 'primary' : 'white'" size="small">Login</VBtn>
          </RouterLink>
          <RouterLink to="/register">
            <VBtn :color="isScrolled ? 'primary' : 'white'" size="small" :style="isScrolled ? '' : 'color:#5025D1;'">
              Get Started
            </VBtn>
          </RouterLink>
        </div>

        <!-- Hamburger (mobile) -->
        <button class="hamburger" :class="{ 'hamburger-dark': isScrolled }" @click="mobileMenuOpen = true" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <!-- Mobile Drawer -->
    <Transition name="drawer">
      <div v-if="mobileMenuOpen" class="mobile-drawer">
        <div class="mobile-drawer-header">
          <img src="/blackLogo.png" height="30" alt="Watuwise SMS" />
          <button class="drawer-close" @click="mobileMenuOpen = false" aria-label="Close menu">✕</button>
        </div>
        <nav class="mobile-nav">
          <a href="#features"     @click="mobileMenuOpen = false">Features</a>
          <a href="#how-it-works" @click="mobileMenuOpen = false">How It Works</a>
          <a href="#pricing"      @click="mobileMenuOpen = false">Pricing</a>
        </nav>
        <div class="mobile-nav-actions">
          <RouterLink to="/login" @click="mobileMenuOpen = false">
            <VBtn variant="outlined" color="primary" block class="mb-3">Login</VBtn>
          </RouterLink>
          <RouterLink to="/register" @click="mobileMenuOpen = false">
            <VBtn color="primary" block>Get Started</VBtn>
          </RouterLink>
        </div>
      </div>
    </Transition>
    <div v-if="mobileMenuOpen" class="drawer-overlay" @click="mobileMenuOpen = false"></div>

    <!-- ── Hero ── -->
    <section class="hero-section">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>

      <div class="bubble bubble-1"><span>✓</span> Message delivered!</div>
      <div class="bubble bubble-2"><span>📊</span> 98.7% delivery rate</div>
      <div class="bubble bubble-3"><span>⚡</span> Sent in 0.3s</div>

      <div class="hero-content">
        <div class="hero-badge mb-5">
          <span class="badge-dot"></span>
          Trusted by 500+ Kenyan businesses
        </div>

        <img src="/icon.png" class="hero-logo mb-5" alt="Watuwise SMS" />

        <h1 class="hero-title mb-4">
          Reach Your Customers<br />
          <span class="hero-title-highlight">Instantly with SMS</span>
        </h1>

        <p class="hero-subtitle mb-8">
          Watuwise SMS gives Kenyan businesses the power to send thousands of personalised
          messages in seconds — with real-time delivery tracking and easy M-Pesa top-up.
        </p>

        <div class="hero-btns mb-10">
          <RouterLink to="/register">
            <VBtn color="white" size="large" class="hero-cta-btn" elevation="0">
              <VIcon icon="bx-rocket" class="mr-2" />Start for Free
            </VBtn>
          </RouterLink>
          <RouterLink to="/login">
            <VBtn variant="outlined" color="white" size="large" class="hero-outline-btn">
              Sign In
            </VBtn>
          </RouterLink>
        </div>

        <div class="hero-stats">
          <div class="hero-stat" v-for="stat in heroStats" :key="stat.label">
            <span class="hero-stat-value">{{ stat.value }}</span>
            <span class="hero-stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <div class="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"/>
        </svg>
      </div>
    </section>

    <!-- ── Social Proof ── -->
    <section class="social-proof">
      <p class="proof-label">Powering messaging for businesses across Kenya</p>
      <div class="proof-icons">
        <div class="proof-item" v-for="item in proofItems" :key="item.label">
          <VIcon :icon="item.icon" size="20" color="grey-darken-1" class="mr-1" />
          {{ item.label }}
        </div>
      </div>
    </section>

    <!-- ── Features ── -->
    <section id="features" class="features section-pad">
      <div class="section-head">
        <div class="section-label">Platform Features</div>
        <h2 class="section-title">Everything you need to send at scale</h2>
        <p class="section-subtitle">A complete SMS platform built for businesses that value speed, reliability, and simplicity.</p>
      </div>
      <VRow justify="center" class="features-grid">
        <VCol cols="12" sm="6" md="4" v-for="feature in features" :key="feature.title">
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <VIcon :icon="feature.icon" size="26" color="primary" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.desc }}</p>
          </div>
        </VCol>
      </VRow>
    </section>

    <!-- ── How it works ── -->
    <section id="how-it-works" class="how-it-works section-pad">
      <div class="section-head">
        <div class="section-label">Simple Process</div>
        <h2 class="section-title">Up and running in minutes</h2>
        <p class="section-subtitle">Three simple steps to reach your entire audience</p>
      </div>
      <div class="steps-container">
        <div class="step-row" v-for="(step, i) in steps" :key="step.number">
          <div class="step-left">
            <div class="step-number">{{ step.number }}</div>
            <div class="step-line" v-if="i < steps.length - 1"></div>
          </div>
          <div class="step-body">
            <div class="step-icon-wrap">
              <VIcon :icon="step.icon" size="20" color="primary" />
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Pricing ── -->
    <section id="pricing" class="pricing-section section-pad">
      <div class="section-head">
        <div class="section-label">Affordable Pricing</div>
        <h2 class="section-title">Pay only for what you send</h2>
        <p class="section-subtitle">No monthly subscriptions. Buy SMS units as you need them — from as low as KES 0.50 per SMS.</p>
      </div>

      <VRow justify="center" class="pricing-grid">
        <!-- Standard plans -->
        <VCol cols="12" sm="6" md="3" v-for="plan in pricingHighlights" :key="plan.label">
          <div class="pricing-card" :class="{ 'pricing-card-featured': plan.featured }">
            <VIcon :icon="plan.icon" size="34" :color="plan.featured ? 'white' : 'primary'" class="mb-3" />
            <h3 class="pricing-label" :class="{ 'text-white': plan.featured }">{{ plan.label }}</h3>
            <p class="pricing-desc" :class="{ 'text-white': plan.featured }">{{ plan.desc }}</p>
            <div class="pricing-price" :class="{ 'pricing-price-white': plan.featured }">{{ plan.price }}</div>
            <div class="pricing-unit" :class="{ 'text-white': plan.featured }">per SMS</div>
            <RouterLink to="/register" class="mt-4 d-block">
              <VBtn
                :variant="plan.featured ? 'elevated' : 'outlined'"
                :color="plan.featured ? 'white' : 'primary'"
                :style="plan.featured ? 'color:#5025D1;font-weight:700;' : ''"
                size="small" block
              >
                Get Started
              </VBtn>
            </RouterLink>
          </div>
        </VCol>

        <!-- Custom Package -->
        <VCol cols="12" sm="6" md="3">
          <div class="pricing-card pricing-card-custom">
            <VIcon icon="bx-customize" size="34" color="primary" class="mb-3" />
            <h3 class="pricing-label">Custom</h3>
            <p class="pricing-desc">Volume &amp; special needs</p>
            <div class="pricing-custom-price">Let's talk</div>
            <div class="pricing-unit">tailored for you</div>
            <VBtn color="primary" size="small" block class="mt-4" @click="contactDialog = true">
              <VIcon icon="bx-envelope" class="mr-1" size="16" />Contact Us
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </section>

    <!-- Contact Dialog -->
    <VDialog v-model="contactDialog" max-width="520" persistent>
      <VCard rounded="xl">
        <VCardTitle class="d-flex justify-space-between align-center px-6 pt-6 pb-2">
          <span class="text-h6 font-weight-bold">Get a Custom Package</span>
          <VBtn icon variant="text" size="small" @click="contactDialog = false">
            <VIcon icon="bx-x" />
          </VBtn>
        </VCardTitle>
        <VCardText class="px-6">
          <p class="text-medium-emphasis text-body-2 mb-5">
            Tell us about your messaging volume and requirements and our team will get back to you with a tailored plan.
          </p>
          <VForm ref="contactForm" @submit.prevent="submitContact">
            <VTextField
              v-model="contactData.name"
              label="Full Name"
              :rules="[v => !!v || 'Required']"
              variant="outlined"
              density="compact"
              class="mb-3"
            />
            <VTextField
              v-model="contactData.email"
              label="Email Address"
              type="email"
              :rules="[v => !!v || 'Required', v => /.+@.+\..+/.test(v) || 'Invalid email']"
              variant="outlined"
              density="compact"
              class="mb-3"
            />
            <VTextField
              v-model="contactData.phone"
              label="Phone Number"
              placeholder="e.g. 0712345678"
              variant="outlined"
              density="compact"
              class="mb-3"
            />
            <VTextField
              v-model="contactData.volume"
              label="Estimated Monthly SMS Volume"
              placeholder="e.g. 50,000"
              variant="outlined"
              density="compact"
              class="mb-3"
            />
            <VTextarea
              v-model="contactData.message"
              label="Additional Requirements (optional)"
              rows="3"
              variant="outlined"
              density="compact"
              class="mb-4"
            />
            <VBtn
              type="submit"
              color="primary"
              block
              size="large"
              :loading="contactLoading"
            >
              <VIcon icon="bx-send" class="mr-2" />Send Request
            </VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- ── CTA ── -->
    <section class="cta-section">
      <div class="cta-ring cta-ring-1"></div>
      <div class="cta-ring cta-ring-2"></div>

      <div class="cta-inner">
        <div class="cta-badge mb-6">
          <VIcon icon="bx-check-shield" size="15" class="mr-1" />
          No credit card required · Free to start
        </div>

        <h2 class="cta-title mb-4">
          Start sending smarter<br />
          <span class="cta-title-accent">with Watuwise SMS</span>
        </h2>

        <p class="cta-subtitle mb-8">
          Join hundreds of Kenyan businesses delivering the right message to the right people —
          faster, cheaper, and more reliably than ever.
        </p>

        <div class="cta-pills mb-8">
          <div class="cta-pill" v-for="pill in ctaPills" :key="pill.text">
            <VIcon :icon="pill.icon" size="14" class="mr-1" />{{ pill.text }}
          </div>
        </div>

        <div class="cta-btns mb-8">
          <RouterLink to="/register">
            <VBtn color="white" size="large" class="cta-btn-primary" elevation="0">
              <VIcon icon="bx-rocket" class="mr-2" />Get Started Free
            </VBtn>
          </RouterLink>
          <RouterLink to="/login">
            <VBtn variant="outlined" color="white" size="large" class="cta-btn-outline">
              Sign In
            </VBtn>
          </RouterLink>
        </div>

        <div class="cta-trust">
          <div class="cta-trust-item" v-for="t in ctaTrust" :key="t.text">
            <VIcon :icon="t.icon" size="14" class="mr-1" />{{ t.text }}
          </div>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="landing-footer">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="/blackLogo.png" height="26" alt="Watuwise SMS" class="mb-2" />
          <p class="footer-tagline">SMS made simple for Kenyan businesses.</p>
        </div>
        <div class="footer-links">
          <RouterLink to="#" class="footer-link">Privacy Policy</RouterLink>
          <RouterLink to="#" class="footer-link">Terms &amp; Conditions</RouterLink>
          <RouterLink to="#" class="footer-link">Support</RouterLink>
        </div>
      </div>
      <VDivider class="my-5" />
      <p class="footer-copy">&copy; {{ new Date().getFullYear() }} Watuwise SMS. All rights reserved.</p>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const heroStats = [
  { value: '500+', label: 'Businesses' },
  { value: '10M+', label: 'Messages Sent' },
  { value: '98.7%', label: 'Delivery Rate' },
  { value: '< 1s',  label: 'Avg. Delivery' },
]

const proofItems = [
  { icon: 'bx-store',          label: 'Retail' },
  { icon: 'bx-clinic',         label: 'Healthcare' },
  { icon: 'bx-school',         label: 'Education' },
  { icon: 'bx-building-house', label: 'Real Estate' },
  { icon: 'bx-restaurant',     label: 'Hospitality' },
  { icon: 'bx-briefcase',      label: 'Finance' },
]

const features = [
  { icon: 'bx-message-rounded-dots', title: 'Bulk SMS Sending',     desc: 'Blast thousands of personalised messages to your contacts and groups in one click.' },
  { icon: 'bx-group',                title: 'Contact Management',   desc: 'Organise contacts into smart groups and import your audience from CSV files.' },
  { icon: 'bx-bar-chart-alt-2',      title: 'Real-Time Analytics',  desc: 'Track delivery rates and campaign performance with live dashboards.' },
  { icon: 'bx-id-card',              title: 'Custom Sender ID',     desc: 'Send under your brand name. Customers see your business name, not a random number.' },
  { icon: 'bx-time-five',            title: 'Message Scheduling',   desc: 'Schedule campaigns to go out at the exact right time — any date, any hour.' },
  { icon: 'bx-mobile-alt',           title: 'M-Pesa Top-Up',        desc: 'Buy SMS credits instantly with M-Pesa via Paystack. No bank transfer required.' },
]

const steps = [
  { number: '01', icon: 'bx-user-check',  title: 'Create Your Account',    desc: 'Sign up in under two minutes. No technical setup, no contracts — just your business details.' },
  { number: '02', icon: 'bx-wallet-alt',  title: 'Top Up & Add Contacts',  desc: 'Buy SMS units via M-Pesa or card, then upload your contact list or add contacts manually.' },
  { number: '03', icon: 'bx-send',        title: 'Compose, Send & Track',  desc: 'Write your message, choose your audience, hit send, and watch delivery in real time.' },
]

const pricingHighlights = [
  { icon: 'bx-paper-plane', label: 'Starter',    desc: '100 – 1,000 SMS',    price: 'KES 1.00', featured: false },
  { icon: 'bx-rocket',      label: 'Growth',     desc: '1,001 – 10,000 SMS', price: 'KES 0.80', featured: true  },
  { icon: 'bx-buildings',   label: 'Enterprise', desc: '10,001+ SMS',         price: 'KES 0.50', featured: false },
]

const ctaPills = [
  { icon: 'bx-check', text: 'No setup fees' },
  { icon: 'bx-check', text: 'M-Pesa top-up' },
  { icon: 'bx-check', text: 'Real-time delivery' },
  { icon: 'bx-check', text: 'Custom Sender ID' },
]

const ctaTrust = [
  { icon: 'bx-lock-alt',       text: 'Secure & encrypted' },
  { icon: 'bx-shield-quarter', text: 'GDPR compliant' },
  { icon: 'bx-support',        text: '24/7 support' },
  { icon: 'bx-trending-up',    text: '99.9% uptime' },
]

// Contact dialog
const contactDialog = ref(false)
const contactLoading = ref(false)
const contactForm = ref(null)
const contactData = ref({ name: '', email: '', phone: '', volume: '', message: '' })

async function submitContact() {
  const { valid } = await contactForm.value.validate()
  if (!valid) return

  contactLoading.value = true
  try {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(contactData.value),
    })
  } catch (_) { /* silent — still show success */ }

  contactLoading.value = false
  contactDialog.value = false
  contactData.value = { name: '', email: '', phone: '', volume: '', message: '' }
  alert('Thank you! We will get back to you shortly.')
}
</script>

<style scoped>
/* ─────────────── Base ─────────────── */
*, *::before, *::after { box-sizing: border-box; }

.landing {
  min-height: 100vh;
  background: #fff;
  overflow-x: hidden;
}

/* ─────────────── Navbar ─────────────── */
.landing-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 300;
  transition: background 0.3s, box-shadow 0.3s;
  background: transparent;
}
.landing-nav.scrolled {
  background: #fff;
  box-shadow: 0 2px 20px rgba(0,0,0,0.08);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;
}
.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255,255,255,0.88);
  text-decoration: none;
  padding: 5px 12px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;
}
.nav-link:hover           { color: #fff; background: rgba(255,255,255,0.12); }
.nav-link-dark            { color: #374151; }
.nav-link-dark:hover      { color: #5025D1; background: rgba(80,37,209,0.06); }
.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 24px; height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: background 0.2s;
}
.hamburger-dark span { background: #374151; }

/* Mobile drawer */
.mobile-drawer {
  position: fixed;
  top: 0; right: 0;
  width: min(320px, 85vw);
  height: 100%;
  background: #fff;
  z-index: 400;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 40px rgba(0,0,0,0.15);
}
.mobile-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.drawer-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #374151;
  line-height: 1;
  padding: 4px 8px;
}
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 32px;
}
.mobile-nav a {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 10px;
  transition: background 0.2s, color 0.2s;
}
.mobile-nav a:hover { background: rgba(80,37,209,0.06); color: #5025D1; }
.mobile-nav-actions { margin-top: auto; }

.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 350;
}

/* Drawer transition */
.drawer-enter-active, .drawer-leave-active { transition: transform 0.28s ease; }
.drawer-enter-from, .drawer-leave-to       { transform: translateX(100%); }

/* ─────────────── Hero ─────────────── */
.hero-section {
  background: linear-gradient(135deg, #3a10c8 0%, #5025D1 45%, #7B52E0 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding-top: 72px;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.22;
  animation: blobFloat 8s ease-in-out infinite;
  pointer-events: none;
}
.blob-1 { width: 480px; height: 480px; background: #a78bfa; top: -120px; left: -100px; }
.blob-2 { width: 380px; height: 380px; background: #60a5fa; top: 100px; right: -80px; animation-delay: 2.5s; }
.blob-3 { width: 320px; height: 320px; background: #f472b6; bottom: 60px; left: 30%; animation-delay: 5s; }
@keyframes blobFloat {
  0%, 100% { transform: translate(0,0) scale(1); }
  50%       { transform: translate(20px,-20px) scale(1.05); }
}

.bubble {
  position: absolute;
  background: rgba(255,255,255,0.14);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.24);
  border-radius: 40px;
  padding: 9px 16px;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  animation: bubbleFloat 6s ease-in-out infinite;
  pointer-events: none;
  white-space: nowrap;
}
.bubble-1 { top: 22%; left: 5%; animation-delay: 0s; }
.bubble-2 { top: 40%; right: 4%; animation-delay: 2s; }
.bubble-3 { bottom: 20%; left: 8%; animation-delay: 4s; }
@keyframes bubbleFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 20px 72px;
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.28);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
}
.badge-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #4ade80;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.3); }
}

.hero-logo {
  height: 80px;
  filter: drop-shadow(0 8px 32px rgba(0,0,0,0.22));
  animation: logoEntrance 0.8s ease-out;
}
@keyframes logoEntrance {
  from { opacity: 0; transform: translateY(-20px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.hero-title {
  font-size: clamp(2rem, 6vw, 3.6rem);
  font-weight: 800;
  line-height: 1.15;
  color: #fff;
  letter-spacing: -0.02em;
}
.hero-title-highlight {
  background: linear-gradient(90deg, #fbbf24, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  color: rgba(255,255,255,0.84);
  font-size: 1.05rem;
  max-width: 560px;
  line-height: 1.7;
}

.hero-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero-cta-btn   { color: #5025D1 !important; font-weight: 700 !important; border-radius: 10px !important; }
.hero-outline-btn { border-radius: 10px !important; }

.hero-stats {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}
.hero-stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}
.hero-stat-label {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.62);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-wave { position: relative; z-index: 2; line-height: 0; margin-bottom: -2px; }
.hero-wave svg { width: 100%; height: 70px; display: block; }

/* ─────────────── Social Proof ─────────────── */
.social-proof {
  background: #fff;
  padding: 36px 20px;
  text-align: center;
}
.proof-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 20px;
}
.proof-icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px 28px;
}
.proof-item {
  display: flex;
  align-items: center;
  font-size: 0.82rem;
  font-weight: 600;
  color: #6b7280;
}

/* ─────────────── Shared Section ─────────────── */
.section-pad { padding: 72px 20px; }

.section-head {
  text-align: center;
  margin-bottom: 48px;
}
.section-label {
  display: inline-block;
  background: rgba(80,37,209,0.08);
  color: #5025D1;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 5px 14px;
  border-radius: 999px;
  margin-bottom: 12px;
}
.section-title {
  font-size: clamp(1.6rem, 3.5vw, 2.3rem);
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}
.section-subtitle {
  color: #6b7280;
  font-size: 0.97rem;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ─────────────── Features ─────────────── */
.features { background: #F7F5FF; }
.features-grid { max-width: 1100px; margin: 0 auto; }
.feature-card {
  background: #fff;
  border: 1px solid #ebe8ff;
  border-radius: 16px;
  padding: 28px 24px;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(80,37,209,0.12);
}
.feature-icon-wrap {
  width: 50px; height: 50px;
  background: rgba(80,37,209,0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.feature-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}
.feature-desc {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* ─────────────── How It Works ─────────────── */
.how-it-works { background: #fff; }
.steps-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 4px;
}
.step-row {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.step-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}
.step-number {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5025D1, #7B52E0);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(80,37,209,0.28);
  flex-shrink: 0;
}
.step-line {
  width: 2px;
  flex: 1;
  min-height: 36px;
  background: linear-gradient(to bottom, #7B52E0, #e5e7eb);
  margin: 6px 0;
}
.step-body { padding-bottom: 36px; flex: 1; }
.step-icon-wrap {
  width: 36px; height: 36px;
  background: rgba(80,37,209,0.08);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
}
.step-desc {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.65;
  margin: 0;
}

/* ─────────────── Pricing ─────────────── */
.pricing-section { background: #F7F5FF; }
.pricing-grid { max-width: 900px; margin: 0 auto; }
.pricing-card {
  background: #fff;
  border: 1.5px solid #ebe8ff;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.pricing-card:hover { transform: translateY(-4px); }
.pricing-card-featured {
  background: linear-gradient(135deg, #5025D1, #7B52E0);
  border-color: transparent;
  box-shadow: 0 16px 48px rgba(80,37,209,0.32);
}
.pricing-label {
  font-size: 1.15rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 4px;
}
.pricing-desc {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 16px;
  opacity: 0.85;
}
.pricing-price {
  font-size: 1.6rem;
  font-weight: 800;
  color: #5025D1;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}
.pricing-price-white { color: #fff; }
.pricing-unit { font-size: 0.82rem; color: #6b7280; opacity: 0.75; }
.text-white { color: #fff !important; }
.pricing-card-custom {
  border: 1.5px dashed #c4b8f5;
  background: rgba(80,37,209,0.03);
}
.pricing-custom-price {
  font-size: 1.6rem;
  font-weight: 800;
  color: #5025D1;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

/* ─────────────── CTA ─────────────── */
.cta-section {
  background: linear-gradient(135deg, #3a10c8 0%, #5025D1 50%, #7B52E0 100%);
  padding: 80px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.1);
  pointer-events: none;
}
.cta-ring-1 { width: 400px; height: 400px; top: -140px; right: -80px; }
.cta-ring-2 { width: 280px; height: 280px; bottom: -80px; left: -60px; }

.cta-inner {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
.cta-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.24);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
}
.cta-title {
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
.cta-title-accent {
  background: linear-gradient(90deg, #fbbf24, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.cta-subtitle {
  color: rgba(255,255,255,0.82);
  font-size: 0.97rem;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}
.cta-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.cta-pill {
  display: inline-flex;
  align-items: center;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 999px;
  padding: 5px 13px;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
}
.cta-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.cta-btn-primary  { color: #5025D1 !important; font-weight: 700 !important; border-radius: 10px !important; }
.cta-btn-outline  { border-radius: 10px !important; }
.cta-trust {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  opacity: 0.68;
}
.cta-trust-item {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
}

/* ─────────────── Footer ─────────────── */
.landing-footer { background: #F7F5FF; padding: 32px 24px 24px; }
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}
.footer-tagline { font-size: 0.82rem; color: #9ca3af; margin: 0; }
.footer-links { display: flex; gap: 20px; flex-wrap: wrap; align-items: center; }
.footer-link {
  font-size: 0.82rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-link:hover { color: #5025D1; }
.footer-copy { font-size: 0.78rem; color: #9ca3af; text-align: center; margin: 0; }

/* ─────────────── Mobile ─────────────── */
@media (max-width: 768px) {
  /* Nav */
  .nav-links, .nav-actions { display: none; }
  .hamburger { display: flex; }

  /* Hero */
  .hero-section { padding-top: 64px; }
  .hero-content { padding: 40px 16px 56px; }
  .hero-logo { height: 64px; }
  .bubble { display: none; }
  .blob-2, .blob-3 { display: none; }
  .hero-btns { flex-direction: column; width: 100%; max-width: 320px; }
  .hero-btns a, .hero-btns .v-btn { width: 100%; }
  .hero-stats { gap: 20px 28px; }
  .hero-stat-value { font-size: 1.25rem; }

  /* Sections */
  .section-pad { padding: 52px 16px; }
  .section-head { margin-bottom: 32px; }

  /* Steps */
  .steps-container { padding: 0; }

  /* CTA */
  .cta-section { padding: 60px 16px; }
  .cta-btns { flex-direction: column; width: 100%; max-width: 320px; margin-inline: auto; }
  .cta-btns a, .cta-btns .v-btn { width: 100%; }

  /* Footer */
  .footer-top { flex-direction: column; align-items: flex-start; }
  .footer-links { gap: 12px; }
  .landing-footer { padding: 28px 16px 20px; }
}

@media (max-width: 400px) {
  .hero-badge { font-size: 0.72rem; padding: 5px 12px; }
  .cta-pills  { gap: 6px; }
  .cta-pill   { font-size: 0.72rem; padding: 4px 10px; }
}
</style>
