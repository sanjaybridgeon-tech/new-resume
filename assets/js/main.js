/**
 * Sanjay A — Portfolio Interactive Engine
 * Handles Navigation, Certificate Lightbox, Zoom, Copy-to-Clipboard & Mobile Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDocumentLightbox();
  initClipboardActions();
  initContactForm();
});

/* ==========================================================================
   NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const siteNav = document.getElementById('siteNav');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], div[id].section');

  // Mobile menu toggle
  if (mobileToggle && siteNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('mobile-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link scroll spy
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   CERTIFICATES & DOCUMENTS LIGHTBOX WITH ZOOM
   ========================================================================== */
const DOC_REGISTRY = {
  'beagle-cert': {
    title: 'Beagle Security — Internship Certificate',
    subtitle: 'Beagle Cyber Innovations Private Limited · Technopark, Kerala',
    imageSrc: 'assets/images/cert_beagle.png',
    docPdf: 'assets/docs/Beagle_Security_Internship_Certificate.pdf',
    verification: 'Issued: Oct 16, 2026 · Product Development Dept · HR Ashwin K',
    downloadName: 'Beagle_Security_Internship_Certificate.pdf'
  },
  'beagle-photo': {
    title: 'Beagle Security — Original Document Photograph',
    subtitle: 'Official Paper Verification & Stamp · Technopark Phase 3',
    imageSrc: 'assets/images/cert_beagle_photo.jpg',
    docPdf: 'assets/docs/Beagle_Security_Internship_Certificate.pdf',
    verification: 'Original scanned camera capture of certificate',
    downloadName: 'Beagle_Security_Certificate_Photo.jpg'
  },
  'java-basic': {
    title: 'HackerRank — Java (Basic) Skill Certification',
    subtitle: 'HackerRank CTO Harishankaran K · Certificate of Accomplishment',
    imageSrc: 'assets/images/cert_java_basic.png',
    docPdf: 'assets/docs/HackerRank_Java_Basic_Certificate.pdf',
    verification: 'Credential ID: CDOETOB5EE7C · Earned: Apr 02, 2026',
    downloadName: 'HackerRank_Java_Basic_Certificate.pdf'
  },
  'headshot': {
    title: 'Sanjay A — Professional Portrait',
    subtitle: 'Java Backend Developer · Kerala, India',
    imageSrc: 'assets/images/headshot.png',
    docPdf: 'assets/docs/professional-resume.pdf',
    verification: 'High-definition original profile headshot',
    downloadName: 'Sanjay_A_Portrait.png'
  }
};

let currentZoom = 1;

function initDocumentLightbox() {
  const modal = document.getElementById('docModal');
  if (!modal) return;

  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalFooterInfo = document.getElementById('modalFooterInfo');
  const modalDownload = document.getElementById('modalDownload');
  const closeBtn = document.getElementById('modalCloseBtn');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const zoomResetBtn = document.getElementById('zoomResetBtn');

  // Trigger buttons
  document.querySelectorAll('[data-open-doc]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const docKey = trigger.getAttribute('data-open-doc');
      openDocument(docKey);
    });
  });

  function openDocument(key) {
    const data = DOC_REGISTRY[key];
    if (!data) return;

    currentZoom = 1;
    applyZoom();

    modalImg.src = data.imageSrc;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalFooterInfo.textContent = data.verification;
    modalDownload.href = data.docPdf || data.imageSrc;
    modalDownload.setAttribute('download', data.downloadName);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    currentZoom = 1;
    applyZoom();
  }

  function applyZoom() {
    if (modalImg) {
      modalImg.style.transform = `scale(${currentZoom})`;
      modalImg.style.cursor = currentZoom > 1 ? 'grab' : 'default';
    }
  }

  // Zoom controls
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (currentZoom < 2.5) {
        currentZoom += 0.25;
        applyZoom();
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (currentZoom > 0.75) {
        currentZoom -= 0.25;
        applyZoom();
      }
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', () => {
      currentZoom = 1;
      applyZoom();
    });
  }

  // Close triggers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function initClipboardActions() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy');
      const label = el.getAttribute('data-copy-label') || 'Copied to clipboard!';
      
      try {
        await navigator.clipboard.writeText(text);
        showToast(label);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(label);
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   CONTACT FORM / QUICK MESSAGE
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('quickMessageForm');
  if (!form) return;

  const btnMailApp = document.getElementById('btnSendMailApp');
  const btnCopyDraft = document.getElementById('btnCopyDraft');

  function getMessageDetails() {
    const sender = document.getElementById('senderName')?.value.trim() || 'Recruiter / Hiring Team';
    const email = document.getElementById('senderEmail')?.value.trim() || '';
    const message = document.getElementById('senderMessage')?.value.trim() || '';

    if (!message) {
      showToast('Please enter a message before sending.');
      return null;
    }

    const subject = `Portfolio Inquiry from ${sender}`;
    let body = message + '\n\n----------------------------\nFrom: ' + sender;
    if (email) {
      body += '\nReply-To Email: ' + email;
    }

    return { sender, email, message, subject, body };
  }

  // Primary action: Send via Gmail (Web)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const details = getMessageDetails();
    if (!details) return;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sanjaysr2902@gmail.com&su=${encodeURIComponent(details.subject)}&body=${encodeURIComponent(details.body)}`;
    window.open(gmailUrl, '_blank');
    showToast('Opening Gmail Compose in a new tab...');
  });

  // Secondary action: Native desktop mail client (Apple Mail, Outlook)
  if (btnMailApp) {
    btnMailApp.addEventListener('click', (e) => {
      e.preventDefault();
      const details = getMessageDetails();
      if (!details) return;

      const mailtoUrl = `mailto:sanjaysr2902@gmail.com?subject=${encodeURIComponent(details.subject)}&body=${encodeURIComponent(details.body)}`;
      window.location.href = mailtoUrl;
      showToast('Opening desktop mail client...');
    });
  }

  // Tertiary action: Copy draft to clipboard
  if (btnCopyDraft) {
    btnCopyDraft.addEventListener('click', async (e) => {
      e.preventDefault();
      const details = getMessageDetails();
      if (!details) return;

      const fullDraft = `To: sanjaysr2902@gmail.com\nSubject: ${details.subject}\n\n${details.body}`;
      try {
        await navigator.clipboard.writeText(fullDraft);
        showToast('Email draft copied to clipboard!');
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = fullDraft;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email draft copied to clipboard!');
      }
    });
  }
}

