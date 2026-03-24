import * as animations from "./gsap-utils.js"

import { sendGemini } from "./sendGemini.js"
import { waitForTranscription } from "./waitForTranscription.js"

// ========== Configuração ========== 
const cloudName = "drkymypjb"
const uploadPreset = "upload_nlw"

// ========== Elementos DO DOM ==========
const apiKeyInput = document.querySelector('#apikey')
const video = document.querySelector('#video')
const statusSection = document.querySelector('#status-section')
const statusDiv = document.querySelector('#status')
const statusTitle = document.querySelector('#status-title')
const statusMessage = document.querySelector('#status-message')
const videoSection = document.querySelector('#video-section')
const uploadWrapper = document.querySelector('#upload_widget_wrapper')
const downloadBtn = document.querySelector('#download-btn')
const newUploadBtn = document.querySelector('#new-upload-btn')

// ========== Inicializar Lucide Icons ==========
lucide.createIcons()

// ========== GSAP Config ==========
if (typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

gsap.config({ nullTargetAction: "ignore" })

// ========== Funções de UI State ==========

function resetUI() {
    statusSection.classList.add('hidden')
    videoSection.classList.add('hidden')
    apiKeyInput.disabled = false
    uploadWrapper.style.pointerEvents = 'auto'
}

function showStatus(title, message) {
    statusTitle.textContent = title
    statusMessage.textContent = message
    statusSection.classList.remove('hidden')
    videoSection.classList.add('hidden')

    refreshIcons()

    // Animação de entrada
    gsap.from(statusDiv, {
        duration: 0.4,
        opacity: 0.5,
        y: 20,
        ease: "power2.out"
    })

}

function showVideoResult() {
    statusSection.classList.add('hidden')
    videoSection.classList.remove('hidden')

    // Animação da seção de vídeo
    gsap.from(videoSection, {
        duration: 0.6,
        opacity: 0,
        y: 40,
        ease: "power2.out"
    })

    // Animação do vídeo em cascata
    gsap.from('#video', {
        delay: 0.2,
        duration: 0.5,
        scale: 0.95,
        opacity: 0,
        ease: "power2.out"
    })

    // Animação dos botões
    gsap.from(["#download-btn", "#new-upload-btn"], {
        delay: 0.4,
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
    })

    refreshIcons()

    // Scroll suave para o resultado
    animations.smoothScrollTo("#video-section");
}

// ========== Event Listeners para Interatividade ==========

// Efeito hover no upload wrapper
uploadWrapper.addEventListener('mouseenter', () => {
    gsap.to(uploadWrapper.querySelector('[data-lucide="video"]'), {
        duration: 0.3,
        scale: 1.2,
        ease: "back.out"
    })
})

uploadWrapper.addEventListener('mouseleave', () => {
    gsap.to(uploadWrapper.querySelector('[data-lucide="video"]'), {
        duration: 0.3,
        scale: 1,
        ease: "back.out"
    })
})

// Animação de entrada para cards de features - efeito "queda do topo"
const featureCards = document.querySelectorAll('.bg-white\\/10')
gsap.from(featureCards, {
    scrollTrigger: {
        trigger: featureCards[0],
        start: "top 85%"
    },
    duration: 0.8,
    opacity: 0,
    y: -120, // Começam muito acima
    rotation: -5, // Leve rotação para efeito de queda
    scale: 0.9, // Ligeiramente menor
    stagger: 0.15, // Delay entre cada card caindo
    ease: "back.out(1.2)", // Easing elástico para efeito de "quicada" ao chegar
    onStart: () => {
        // Adiciona classe para efeito visual durante a animação
        featureCards.forEach(card => card.classList.add('falling'))
    },
    onComplete: () => {
        // Remove classe após animação
        featureCards.forEach(card => card.classList.remove('falling'))
    }
})

// Animação de hover avançada para cards de features
featureCards.forEach((card, index) => {
    const icon = card.querySelector('i[data-lucide]')
    const title = card.querySelector('h4')
    const description = card.querySelector('p')

    // Timeline para hover - efeito de levitação dramática
    const hoverTl = gsap.timeline({ paused: true })
        .to(card, {
            duration: 0.4,
            y: -12, // Levitação mais alta
            scale: 1.03, // Crescimento sutil
            rotation: 1, // Leve inclinação
            ease: "back.out(2)" // Easing mais elástico
        }, 0)
        .to(icon, {
            duration: 0.4,
            scale: 1.3, // Crescimento maior
            rotation: 10, // Rotação mais pronunciada
            ease: "back.out(2)"
        }, 0)
        .to(title, {
            duration: 0.3,
            color: "#06b6d4", // cyan-500
            scale: 1.05, // Leve crescimento do texto
            ease: "power2.out"
        }, 0.1)
        .to(description, {
            duration: 0.3,
            color: "#cbd5e1", // slate-300
            ease: "power2.out"
        }, 0.1)

    card.addEventListener('mouseenter', () => hoverTl.play())
    card.addEventListener('mouseleave', () => hoverTl.reverse())
})

// ========== Cloudinary Widget Setup ==========

const myWidget = cloudinary.createUploadWidget({
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    multiple: false,
    resourceType: "video",
    maxFileSize: 100000000 // 100MB 
}, async (error, result) => {
    if (!error && result && result.event === "success") {
        resetUI()
        showStatus("⏳ Processando...", "Transcrevendo seu vídeo...")

        const data = result.info

        console.log('✅ Upload bem-sucedido:', data)

        try {
            // Aguardar transcrição
            showStatus("🎙️ Transcrevendo...", "Analisando áudio do vídeo...")
            const url = await waitForTranscription(data, cloudName)

            if (!url) {
                showStatus("❌ Erro", "Não foi possível transcrever o vídeo. Tente novamente.")
                return
            }

            // Enviar para Gemini
            showStatus("🤖 Analisando com IA...", "Buscando o momento viral...")

            const apikey = apiKeyInput.value.trim()

            const viralMoment = await sendGemini(url, apikey)

            if (!viralMoment) {
                showStatus("❌ Erro", "Não foi possível processar o vídeo. Tente novamente.")
                return
            }

            // Construir URL do vídeo processado
            const viralMomentURL = `https://res.cloudinary.com/${cloudName}/${data.resource_type}/upload/${viralMoment.viralMoment}/${data.public_id}.mp4`

            console.log('✅ Vídeo processado:', viralMomentURL)

            // Atualizar vídeo e mostrar resultado
            video.src = viralMomentURL
            showVideoResult()

        } catch (error) {
            console.error('❌ Erro durante processamento:', error)
            showStatus("❌ Erro", "Algo deu errado. Tente novamente mais tarde.")
        }
    } else if (error) {
        console.error('❌ Erro no upload:', error)
    }
})

document.querySelector('#upload_widget').addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim()

    if (apiKey) {
        // Salvar API key no localStorage
        localStorage.setItem('gemini_api_key', apiKey)
    }

    // Abrir widget
    myWidget.open()

})

// ========== Botões de Ação ==========

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a')
    link.href = video.src
    link.download = 'clipmaker-viral-moment.mp4'
    document.body.appendChild(link)

    gsap.to(downloadBtn, {
        duration: 0.2,
        scale: 0.95,
        ease: "power2.inOut",
        onComplete: () => {
            link.click()
            document.body.removeChild(link)
            gsap.to(downloadBtn, { duration: 0.2, scale: 1 })
        }
    })
})

newUploadBtn.addEventListener('click', () => {
    resetUI()
    apiKeyInput.focus()

    gsap.to(window, {
        duration: 0.6,
        scrollTo: { y: 0, offsetY: 0 },
        ease: "power2.inOut"
    })
})

// ========== Recuperar API Key ao carregar ==========

window.addEventListener('load', () => {
    const savedApiKey = localStorage.getItem('gemini_api_key')
    if (savedApiKey) {
        apiKeyInput.value = savedApiKey
    }

    // Animações de entrada da página
    gsap.from('header', {
        duration: 0.6,
        opacity: 0,
        y: -30,
        ease: "power2.out"
    })

    gsap.from('h2', {
        delay: 0.2,
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: "power2.out"
    })

    gsap.from('p:first-of-type', {
        delay: 0.3,
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: "power2.out"
    })

    const cards = document.querySelectorAll('main > section:first-child [class*="bg-white"]')
    gsap.from(cards, {
        delay: 0.4,
        duration: 0.6,
        opacity: 0,
        y: 40,
        stagger: 0.1,
        ease: "power2.out"
    })

    refreshIcons()
})

// ========== Smooth Scroll Behavior ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href')
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault()
            gsap.to(window, {
                duration: 0.8,
                scrollTo: { y: href, offsetY: 80 },
                ease: "power2.inOut"
            })
        }
    })
})

// ========== Reatualizar Lucide Icons após DOM updates ==========

function refreshIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

