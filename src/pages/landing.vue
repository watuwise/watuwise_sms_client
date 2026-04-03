<template>
  <div class="landing">

    <!-- Hero + Navbar as one section -->
    <section class="hero-section">

      <!-- Navbar — transparent over hero, sticky+white after scroll -->
      <header class="landing-nav px-6 py-4 d-flex align-center justify-space-between" :class="{ scrolled: isScrolled }">
        <div class="d-flex align-center gap-x-3">
          <img :src="isScrolled ? '/blackLogo.png' : '/whiteLogo.png'" height="36" alt="Watuwise" />
        </div>
        <div class="d-flex gap-x-3">
          <RouterLink to="/login">
            <VBtn :variant="isScrolled ? 'outlined' : 'outlined'" :color="isScrolled ? 'primary' : 'white'" size="small">
              Login
            </VBtn>
          </RouterLink>
          <RouterLink to="/register">
            <VBtn :color="isScrolled ? 'primary' : 'white'" size="small" :style="isScrolled ? '' : 'color:#5025D1;'">
              Get Started
            </VBtn>
          </RouterLink>
        </div>
      </header>

      <!-- Hero content -->
      <div class="hero-content d-flex align-center justify-center flex-column text-center px-4">
        <img src="/icon.png" height="90" alt="Watuwise" class="mb-6 hero-logo" />
        <h1 class="text-white font-weight-bold mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height:1.2;">
          Bulk SMS Made Simple<br />for Kenyan Businesses
        </h1>
        <p class="text-white mb-8" style="max-width:600px; opacity:0.88; font-size:1.1rem;">
          Send thousands of messages in seconds. Manage contacts, track delivery,
          and pay easily with M-Pesa. Watuwise SMS puts powerful messaging in your hands.
        </p>
        <div class="d-flex gap-x-4 flex-wrap justify-center">
          <RouterLink to="/register">
            <VBtn color="white" size="large" style="color:#5025D1; font-weight:700;">
              Start for Free
            </VBtn>
          </RouterLink>
          <RouterLink to="/login">
            <VBtn variant="outlined" color="white" size="large">
              Sign In
            </VBtn>
          </RouterLink>
        </div>
      </div>

    </section>

    <!-- Features -->
    <section class="features py-16 px-4">
      <div class="text-center mb-12">
        <h2 class="text-h4 font-weight-bold mb-3">Everything you need to send at scale</h2>
        <p class="text-medium-emphasis" style="max-width:520px; margin:0 auto;">
          A complete bulk SMS platform built for businesses that value speed, reliability, and simplicity.
        </p>
      </div>
      <VRow justify="center" class="features-grid">
        <VCol cols="12" sm="6" md="4" v-for="feature in features" :key="feature.title">
          <VCard class="feature-card pa-6 text-center h-100" rounded="lg" elevation="0">
            <VIcon :icon="feature.icon" size="40" color="primary" class="mb-4" />
            <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
            <p class="text-medium-emphasis text-body-2">{{ feature.desc }}</p>
          </VCard>
        </VCol>
      </VRow>
    </section>

    <!-- How it works -->
    <section class="how-it-works py-16 px-4">
      <div class="text-center mb-12">
        <h2 class="text-h4 font-weight-bold mb-3">How It Works</h2>
        <p class="text-medium-emphasis">Three simple steps to reach your audience</p>
      </div>
      <VRow justify="center">
        <VCol cols="12" sm="4" v-for="step in steps" :key="step.number" class="text-center">
          <div class="step-number mb-4">{{ step.number }}</div>
          <h3 class="text-h6 font-weight-bold mb-2">{{ step.title }}</h3>
          <p class="text-medium-emphasis text-body-2">{{ step.desc }}</p>
        </VCol>
      </VRow>
    </section>

    <!-- CTA -->
    <section class="cta-section py-16 px-4 text-center">
      <h2 class="text-h4 font-weight-bold text-white mb-4">Ready to get started?</h2>
      <p class="text-white mb-8" style="opacity:0.88;">
        Join businesses across Kenya using Watuwise SMS to connect with their customers.
      </p>
      <RouterLink to="/register">
        <VBtn color="white" size="large" style="color:#5025D1; font-weight:700;">
          Create a Free Account
        </VBtn>
      </RouterLink>
    </section>

    <!-- Footer -->
    <footer class="landing-footer py-6 px-6 d-flex align-center justify-space-between flex-wrap gap-y-2">
      <span class="text-medium-emphasis text-body-2">
        &copy; {{ new Date().getFullYear() }} Watuwise SMS. All rights reserved.
      </span>
      <div class="d-flex gap-x-4">
        <RouterLink to="#" class="text-medium-emphasis text-body-2 text-decoration-none">Privacy Policy</RouterLink>
        <RouterLink to="#" class="text-medium-emphasis text-body-2 text-decoration-none">Terms & Conditions</RouterLink>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const features = [
  {
    icon: 'bx-message-rounded-detail',
    title: 'Bulk SMS Sending',
    desc: 'Send thousands of personalised messages to your contacts and groups instantly.',
  },
  {
    icon: 'bx-group',
    title: 'Contact Management',
    desc: 'Organise your audience into groups and import contacts easily via CSV.',
  },
  {
    icon: 'bx-bar-chart-alt-2',
    title: 'Delivery Tracking',
    desc: 'Monitor message delivery rates in real time with detailed analytics.',
  },
  {
    icon: 'bx-mobile-vibration',
    title: 'Custom Sender ID',
    desc: 'Send messages under your brand name with approved sender identities.',
  },
  {
    icon: 'bx-time',
    title: 'Message Scheduling',
    desc: 'Schedule messages to go out at the perfect time for your audience.',
  },
  {
    icon: 'bx-credit-card',
    title: 'M-Pesa Top Up',
    desc: 'Purchase SMS units instantly using M-Pesa — no bank transfer needed.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create an Account',
    desc: 'Register and get approved in minutes. No technical setup required.',
  },
  {
    number: '02',
    title: 'Top Up & Add Contacts',
    desc: 'Buy SMS units via M-Pesa and upload your contact list.',
  },
  {
    number: '03',
    title: 'Send & Track',
    desc: 'Compose your message, hit send, and monitor delivery in real time.',
  },
]
</script>

<style scoped>
.landing {
  min-height: 100vh;
  background: #ffffff;
}

/* ── Hero section (navbar + hero as one unit) ── */
.hero-section {
  background: linear-gradient(135deg, #5025D1 0%, #7B52E0 100%);
  display: flex;
  flex-direction: column;
}

/* Navbar */
.landing-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.25s ease, box-shadow 0.25s ease;
  background: transparent;
}

/* Scrolled state — white with shadow */
.landing-nav.scrolled {
  background: #ffffff;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

/* Hero content */
.hero-content {
  flex: 1;
  padding: 80px 16px 100px;
}

.hero-logo {
  filter: drop-shadow(0 4px 24px rgba(0, 0, 0, 0.18));
}

/* ── Features ── */
.features {
  background: #F5F5F9;
}

.feature-card {
  background: #ffffff;
  border: 1px solid #ebebeb;
  transition: box-shadow 0.2s;
}

.feature-card:hover {
  box-shadow: 0 8px 32px rgba(80, 37, 209, 0.10) !important;
}

/* ── How it works ── */
.how-it-works {
  background: #ffffff;
}

.step-number {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #5025D1;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

/* ── CTA ── */
.cta-section {
  background: linear-gradient(135deg, #5025D1 0%, #7B52E0 100%);
}

/* ── Footer ── */
.landing-footer {
  background: #F5F5F9;
  border-top: 1px solid #ebebeb;
}
</style>
