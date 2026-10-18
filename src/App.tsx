import { useEffect, useState } from 'react'
import './App.css'

const watermarkedImage = (name: string) => `${import.meta.env.BASE_URL}photos/${name}.webp`
const before1 = watermarkedImage('before1')
const before2 = watermarkedImage('before2')
const before3 = watermarkedImage('before3')
const before4 = watermarkedImage('before4')
const before5 = watermarkedImage('before5')
const before6 = watermarkedImage('before6')
const after1 = watermarkedImage('after1')
const after2 = watermarkedImage('after2')
const after3 = watermarkedImage('after3')
const after4 = watermarkedImage('after4')
const after5 = watermarkedImage('after5')
const after6 = watermarkedImage('after6')
const introPhoto01 = watermarkedImage('intro01')
const introPhoto02 = watermarkedImage('intro02')
const introPhoto03 = watermarkedImage('intro03')
const aboutPhoto = watermarkedImage('dekat')
const forrest = watermarkedImage('forrest')
const stylePhoto = watermarkedImage('style')
const funnyPhoto = watermarkedImage('funny')
const pretyGirl = watermarkedImage('prettyGirl')
const pretyGirl2 = pretyGirl
const processPhoto = watermarkedImage('process')
const comparisonBackdrop = watermarkedImage('comparisonBg')
const clothingBefore = watermarkedImage('clothingBefore')
const clothingAfter = watermarkedImage('clothingAfter')
const portraitBefore = watermarkedImage('portraitBefore')
const portraitAfter = watermarkedImage('portraitAfter')

type Category = 'Potret' | 'Lifestyle' | 'Travel'

type Project = {
  title: string
  category: Category
  place: string
  note: string
  comparisons: {
    before: string
    after: string
    alt: string
  }[]
}

type LightboxImage = {
  src: string
  alt: string
  label: string
}

const projects: Project[] = [
  {
    title: 'Potret — cahaya alami',
    category: 'Potret',
    place: 'Jakarta, Indonesia',
    note: 'Warna kulit dan pencahayaan diseimbangkan agar hasil akhir tampak lebih bersih tanpa menghilangkan tekstur alami.',
    comparisons: [
      {
        before: before1,
        after: after1,
        alt: 'Potret perempuan mengenakan busana merah muda',
      },
    ],
  },
  {
    title: 'Portrait session — dua suasana',
    category: 'Potret',
    place: 'Portrait editing',
    note: 'Warna dan eksposur dirapikan dengan lembut, detail wajah tetap natural, lalu tone akhir dibuat lebih konsisten.',
    comparisons: [
      {
        before: before2,
        after: after2,
        alt: 'Potret perempuan mengenakan busana hitam',
      },
    ],
  },
  {
    title: 'Portrait session — cahaya ruang',
    category: 'Potret',
    place: 'Personal project',
    note: 'Koreksi exposure dan white balance untuk menjaga warna kulit tetap natural, dengan tone akhir yang lebih bersih.',
    comparisons: [
      {
        before: before3,
        after: after3,
        alt: 'Potret pria duduk di kursi rotan',
      },
    ],
  },
  {
    title: 'Portrait — sentuhan akhir',
    category: 'Lifestyle',
    place: 'Lifestyle portrait',
    note: 'Kontras dan tone warna dirapikan agar suasana foto terasa lebih hangat, dengan detail subjek tetap natural.',
    comparisons: [
      {
        before: before4,
        after: after4,
        alt: 'Potret lifestyle bernuansa hangat',
      },
    ],
  },
  {
    title: 'Bridal portrait — cahaya keemasan',
    category: 'Potret',
    place: 'Traditional bridal portrait',
    note: 'Detail riasan, tekstur kulit, dan warna busana dijaga tetap natural dengan sentuhan cahaya yang lembut.',
    comparisons: [
      {
        before: before5,
        after: after5,
        alt: 'Potret pengantin tradisional dengan hiasan kepala keemasan',
      },
    ],
  },
  {
    title: 'Bridal portrait — detail busana',
    category: 'Potret',
    place: 'Traditional bridal portrait',
    note: 'Warna busana dan suasana sekitar diseimbangkan tanpa menghilangkan karakter foto aslinya.',
    comparisons: [
      {
        before: before6,
        after: after6,
        alt: 'Potret detail pengantin dalam busana tradisional',
      },
    ],
  },
]

function App() {
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null)

  useEffect(() => {
    const pages = document.querySelectorAll<HTMLElement>('.editorial-page')

    if (!('IntersectionObserver' in window)) {
      pages.forEach((page) => page.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    pages.forEach((page) => observer.observe(page))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!lightboxImage) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxImage])

  return (
    <div
      className="site-shell"
      onContextMenu={(event) => {
        if (event.target instanceof HTMLImageElement) event.preventDefault()
      }}
      onDragStart={(event) => {
        if (event.target instanceof HTMLImageElement) event.preventDefault()
      }}
    >
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Rafli Triofansyah, beranda">
          <span className="wordmark-mark">R.</span>
          <span>RAFLI TRIOFANSYAH</span>
        </a>
        <nav className="main-nav" aria-label="Navigasi utama">
          <a href="#karya">Karya</a>
          <a href="#tentang">Tentang</a>
          <a href="#kontak" className="nav-contact">
            Hubungi saya <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="cover" id="home" aria-labelledby="cover-title">
          <div className="cover-meta">
            <span>PHOTO EDITOR &amp; VISUAL STORYTELLER</span>
            <span>INDONESIA · 2026</span>
          </div>
          <div className="cover-title-wrap">
            <p className="eyebrow">SELECTED WORKS — 2022 / 2024</p>
            <h1 id="cover-title">PORTOFOLIO</h1>
            <div className="cover-subtitle">
              <span className="cover-caption">PHOTO</span>
              <span className="script-word">Editing</span>
            </div>
            <p className="cover-intro">
              Menciptakan rasa, menjaga cerita — satu frame dalam satu waktu.
            </p>
          </div>
          <div className="cover-gallery" aria-label="Pilihan foto karya">
            <figure className="cover-image cover-image-left">
              <button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: introPhoto01, alt: 'Jam kota tua di depan bangunan beratap merah', label: '01 — CLOCK IN THE CITY' })} aria-label="Perbesar foto jam kota tua">
                <img src={introPhoto01} alt="Jam kota tua di depan bangunan beratap merah" />
              </button>
              <figcaption>01 — CLOCK IN THE CITY</figcaption>
            </figure>
            <figure className="cover-image cover-image-center">
              <button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: introPhoto02, alt: 'Mercusuar di laut dengan perahu melintas', label: '02 — TOWARD THE SEA' })} aria-label="Perbesar foto mercusuar di laut">
                <img src={introPhoto02} alt="Mercusuar di laut dengan perahu melintas" />
              </button>
              <figcaption>02 — TOWARD THE SEA</figcaption>
            </figure>
            <figure className="cover-image cover-image-right">
              <button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: introPhoto03, alt: 'Bangunan putih bergaya kolonial di kawasan kota lama', label: '03 — OLD TOWN' })} aria-label="Perbesar foto bangunan kota lama">
                <img src={introPhoto03} alt="Bangunan putih bergaya kolonial di kawasan kota lama" />
              </button>
              <figcaption>03 — OLD TOWN</figcaption>
            </figure>
          </div>
          <a href="#karya" className="scroll-cue">
            <span>SCROLL UNTUK MENJELAJAH</span>
            <span className="scroll-line" aria-hidden="true" />
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <div className="page-stage" aria-label="Portofolio pilihan">
          <section className="editorial-page about-page" id="tentang" aria-labelledby="about-title">
            <div className="page-index">02 <span>/</span> 11</div>
            <div className="about-layout">
              <div className="about-heading">
                <p className="page-kicker">PHOTO EDITOR · INDONESIA</p>
                <h2 id="about-title">ABOUT<br />ME</h2>
                <p className="about-copy">Saya Rafli Triofansyah, photo editor yang percaya bahwa warna dan cahaya dapat membuat sebuah foto terasa lebih dekat.</p>
                <p className="about-copy about-copy-small">Setiap gambar punya cerita. Tugas saya adalah membantu cerita itu tampil jujur, hangat, dan tetap terasa seperti aslinya.</p>
              </div>
              <div className="about-gallery">
                <p className="gallery-caption">Di balik setiap hasil, selalu ada proses dan rasa ingin tahu.</p>
                <figure className="about-gallery-process"><button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: processPhoto, alt: 'Proses mengedit foto di layar komputer', label: 'PROCESS' })} aria-label="Perbesar foto proses mengedit"><img src={processPhoto} alt="Proses mengedit foto di layar komputer" loading="lazy" /></button><figcaption>PROCESS — COLOR &amp; LIGHT</figcaption></figure>
                <figure className="about-gallery-result"><button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: comparisonBackdrop, alt: 'Potret editorial dengan busana tradisional berwarna emas', label: 'RESULT' })} aria-label="Perbesar potret editorial busana emas"><img src={comparisonBackdrop} alt="Potret editorial dengan busana tradisional berwarna emas" loading="lazy" /></button><figcaption>RESULT — A MOMENT, PRESERVED</figcaption></figure>
              </div>
            </div>
            <span className="page-mark" aria-hidden="true">R.</span>
          </section>

          <section className="editorial-page comparison-page" id="karya" aria-labelledby="personal-title">
            <div className="page-index">03 <span>/</span> 11</div>
            <div className="comparison-intro">
              <h2 className="script-heading" id="personal-title">Personal<br />Project</h2>
              <p>Koreksi exposure dan white balance, retouching kulit dengan tekstur tetap natural, serta grading warna yang lebih sinematik.<br /><strong>Tools:</strong> Lightroom, Photoshop.</p>
            </div>
            <div className="comparison-spread">
              {[projects[2], projects[3]].map((project) => {
                const comparison = project.comparisons[0]
                return (
                  <article className="spread-pair" key={project.title}>
                    <div className="spread-labels"><span>Before</span><span>After</span></div>
                    <div className="spread-images">
                      <button type="button" onClick={() => setLightboxImage({ src: comparison.before, alt: `${comparison.alt} — sebelum diedit`, label: 'BEFORE' })} aria-label={`Perbesar foto sebelum: ${comparison.alt}`}><img src={comparison.before} alt={`Sebelum diedit: ${comparison.alt}`} loading="lazy" /></button>
                      <button type="button" onClick={() => setLightboxImage({ src: comparison.after, alt: `${comparison.alt} — setelah diedit`, label: 'AFTER' })} aria-label={`Perbesar foto setelah: ${comparison.alt}`}><img src={comparison.after} alt={`Setelah diedit: ${comparison.alt}`} loading="lazy" /></button>
                    </div>
                  </article>
                )
              })}
            </div>
            <span className="page-mark" aria-hidden="true">R.</span>
          </section>

          <section className="editorial-page comparison-page" aria-labelledby="portrait-title">
            <div className="page-index">04 <span>/</span> 11</div>
            <div className="comparison-intro">
              <h2 className="script-heading" id="portrait-title">Personal<br />Project</h2>
              <p>Warna kulit, white balance, dan pencahayaan diselaraskan tanpa menghilangkan karakter asli subjek.<br /><strong>Tools:</strong> Lightroom.</p>
            </div>
            <div className="comparison-spread">
              {[projects[0], projects[1]].map((project) => {
                const comparison = project.comparisons[0]
                return (
                  <article className="spread-pair" key={project.title}>
                    <div className="spread-labels"><span>Before</span><span>After</span></div>
                    <div className="spread-images">
                      <button type="button" onClick={() => setLightboxImage({ src: comparison.before, alt: `${comparison.alt} — sebelum diedit`, label: 'BEFORE' })} aria-label={`Perbesar foto sebelum: ${comparison.alt}`}><img src={comparison.before} alt={`Sebelum diedit: ${comparison.alt}`} loading="lazy" /></button>
                      <button type="button" onClick={() => setLightboxImage({ src: comparison.after, alt: `${comparison.alt} — setelah diedit`, label: 'AFTER' })} aria-label={`Perbesar foto setelah: ${comparison.alt}`}><img src={comparison.after} alt={`Setelah diedit: ${comparison.alt}`} loading="lazy" /></button>
                    </div>
                  </article>
                )
              })}
            </div>
            <span className="page-mark" aria-hidden="true">R.</span>
          </section>

          <section className="editorial-page feature-page feature-page-stacked" aria-labelledby="feature-title">
            <div className="page-index">05 <span>/</span> 11</div>
            <div className="feature-copy">
              <p className="page-kicker">BRIDAL EDITING · BEFORE / AFTER</p>
              <h2 className="script-heading" id="feature-title">Portrait<br />Retouching</h2>
              <p>Menjaga detail riasan dan tekstur kulit, sambil merapikan cahaya pada potret pengantin tradisional.</p>
              <span>LIGHTROOM · PHOTOSHOP</span>
            </div>
            <div className="feature-pair">
              <figure>
                <button type="button" onClick={() => setLightboxImage({ src: before5, alt: 'Potret pengantin tradisional sebelum retouching', label: 'BEFORE' })} aria-label="Perbesar foto sebelum retouching">
                  <img src={projects[4].comparisons[0].before} alt="Potret pengantin tradisional sebelum retouching" loading="lazy" />
                </button>
                <figcaption>BEFORE</figcaption>
              </figure>
              <figure>
                <button type="button" onClick={() => setLightboxImage({ src: after5, alt: 'Potret pengantin tradisional setelah retouching', label: 'AFTER' })} aria-label="Perbesar hasil setelah retouching">
                  <img src={after5} alt="Potret pengantin tradisional setelah retouching" loading="lazy" />
                </button>
                <figcaption>AFTER</figcaption>
              </figure>
            </div>
            <span className="page-mark" aria-hidden="true">R.</span>
          </section>

          <section className="editorial-page feature-page feature-page-stacked" aria-labelledby="detail-title">
            <div className="page-index">06 <span>/</span> 11</div>
            <div className="feature-copy">
              <p className="page-kicker">BRIDAL EDITING · BEFORE / AFTER</p>
              <h2 className="script-heading" id="detail-title">Color &amp;<br />Detail</h2>
              <p>Exposure dan warna diseimbangkan untuk menonjolkan detail busana serta suasana lokasi tanpa kehilangan nuansa aslinya.</p>
              <span>LIGHTROOM · COLOR GRADING</span>
            </div>
            <div className="feature-pair">
              <figure>
                <button type="button" onClick={() => setLightboxImage({ src: before6, alt: 'Potret pengantin tradisional sebelum koreksi warna', label: 'BEFORE' })} aria-label="Perbesar foto before keenam">
                  <img src={before6} alt="Potret pengantin tradisional sebelum koreksi warna" loading="lazy" />
                </button>
                <figcaption>BEFORE</figcaption>
              </figure>
              <figure>
                <button type="button" onClick={() => setLightboxImage({ src: after6, alt: 'Potret pengantin tradisional setelah koreksi warna', label: 'AFTER' })} aria-label="Perbesar hasil after keenam">
                  <img src={after6} alt="Potret pengantin tradisional setelah koreksi warna" loading="lazy" />
                </button>
                <figcaption>AFTER</figcaption>
              </figure>
            </div>
            <span className="page-mark" aria-hidden="true">R.</span>
          </section>

          <section className="editorial-page feature-page feature-page-stacked portrait-finish-page" aria-labelledby="portrait-finish-title">
            <div className="page-index">07 <span>/</span> 11</div>
            <div className="feature-copy">
              <p className="page-kicker">BRIDAL EDITING · BEFORE / AFTER</p>
              <h2 className="script-heading" id="portrait-finish-title">Portrait<br />Finishing</h2>
              <p>Warna, cahaya, dan detail potret dirapikan dengan tetap mempertahankan karakter alami subjek.</p>
              <span>LIGHTROOM · PHOTOSHOP</span>
            </div>
            <div className="feature-pair">
              <figure>
                <button type="button" onClick={() => setLightboxImage({ src: portraitBefore, alt: 'Potret sebelum proses editing', label: 'BEFORE' })} aria-label="Perbesar potret sebelum editing">
                  <img src={portraitBefore} alt="Potret sebelum proses editing" loading="lazy" />
                </button>
                <figcaption>BEFORE</figcaption>
              </figure>
              <figure>
                <button type="button" onClick={() => setLightboxImage({ src: portraitAfter, alt: 'Potret setelah proses editing', label: 'AFTER' })} aria-label="Perbesar potret setelah editing">
                  <img src={portraitAfter} alt="Potret setelah proses editing" loading="lazy" />
                </button>
                <figcaption>AFTER</figcaption>
              </figure>
            </div>
            <span className="page-mark" aria-hidden="true">R.</span>
          </section>

          <section className="editorial-page feature-page clothing-feature-page" aria-labelledby="color-title">
            <div className="page-index">08 <span>/</span> 11</div>
            <div className="feature-copy">
              <p className="page-kicker">PRODUCT · BEFORE / AFTER</p>
              <h2 className="script-heading" id="color-title">Color &amp;<br />Light</h2>
              <p>Warna kain dibuat lebih konsisten dan bersih, dengan detail tekstur serta bentuk pakaian tetap terlihat.</p>
              <span>LIGHTROOM · COLOR GRADING</span>
            </div>
            <div className="feature-pair">
              <figure>
                <button type="button" onClick={() => setLightboxImage({ src: clothingBefore, alt: 'Flatlay pakaian sebelum koreksi warna', label: 'BEFORE' })} aria-label="Perbesar flatlay pakaian sebelum koreksi warna">
                  <img src={clothingBefore} alt="Flatlay pakaian sebelum koreksi warna" loading="lazy" />
                </button>
                <figcaption>BEFORE</figcaption>
              </figure>
              <figure>
                <button type="button" onClick={() => setLightboxImage({ src: clothingAfter, alt: 'Flatlay pakaian setelah koreksi warna', label: 'AFTER' })} aria-label="Perbesar flatlay pakaian setelah koreksi warna">
                  <img src={clothingAfter} alt="Flatlay pakaian setelah koreksi warna" loading="lazy" />
                </button>
                <figcaption>AFTER</figcaption>
              </figure>
            </div>
            <span className="page-mark" aria-hidden="true">R.</span>
          </section>

          <section className="editorial-page project-page" aria-labelledby="project-title">
            <div className="page-index">09 <span>/</span> 11</div>
            <h2 className="script-heading" id="project-title">Wedding<br />Stories</h2>
            <figure className="project-image-main"><button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: aboutPhoto, alt: 'Potret pasangan dalam busana tradisional', label: 'THE STORY' })} aria-label="Perbesar potret pasangan"><img src={aboutPhoto} alt="Potret pasangan dalam busana tradisional" loading="lazy" /></button><figcaption>01 <span>·</span> THE STORY</figcaption></figure>
            <figure className="project-image-secondary"><button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: pretyGirl2, alt: 'Potret detail busana pengantin setelah proses editing', label: 'THE DETAILS' })} aria-label="Perbesar potret detail busana pengantin"><img src={pretyGirl2} alt="Potret detail busana pengantin setelah proses editing" loading="lazy" /></button><figcaption>02 <span>·</span> THE DETAILS</figcaption></figure>
            <p className="project-page-copy">Dua potret, satu cerita. Warna dan cahaya dirawat agar kehangatan momen tetap terasa, tanpa mengalihkan perhatian dari subjek.</p>
            <span className="page-mark" aria-hidden="true">R.</span>
          </section>

          <section className="editorial-page fashion-page" aria-labelledby="fashion-title">
            <div className="page-index">10 <span>/</span> 11</div>
            <p className="fashion-description">Potret, perjalanan, dan kehidupan sehari-hari. Setiap frame diberi ruang untuk bercerita dengan warna yang terasa alami.</p>
            <div className="fashion-images">
              <figure className="fashion-card">
                <button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: forrest, alt: 'Wanita sedang duduk di atas pohon', label: 'MOMENTS' })} aria-label="Perbesar Wanita sedang duduk di atas pohon">
                  <img src={forrest} alt="Potret pasangan dalam suasana hangat" loading="lazy" />
                </button>
                <figcaption>01 <span>·</span> MOMENTS</figcaption>
              </figure>
              <figure className="fashion-card">
                <button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: funnyPhoto, alt: 'Wanita sedang membaca buku', label: 'READING' })} aria-label="Perbesar wanita sedang membaca buku">
                  <img src={funnyPhoto} alt="Wanita sedang membaca buku" loading="lazy" />
                </button>
                <figcaption>02 <span>·</span> READING</figcaption>
              </figure>
              <figure className="fashion-card">
                <button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: stylePhoto, alt: 'Pengunjung berjalan di jalur trem di kawasan kota lama', label: 'CITY MOMENT' })} aria-label="Perbesar suasana jalur trem kota lama">
                  <img src={stylePhoto} alt="Pengunjung berjalan di jalur trem di kawasan kota lama" loading="lazy" />
                </button>
                <figcaption>03 <span>·</span> OLD TOWN</figcaption>
              </figure>
            </div>
            <h2 className="script-heading" id="fashion-title">Selected Stories</h2>
            <span className="page-mark" aria-hidden="true">R.</span>
          </section>

          <section className="editorial-page closing-page" id="kontak" aria-labelledby="contact-title">
            <div className="page-index">11 <span>/</span> 11</div>
            <div className="closing-collage">
              <button className="image-lightbox-button" type="button" onClick={() => setLightboxImage({ src: pretyGirl, alt: 'Potret pasangan dalam busana tradisional', label: 'WEDDING PORTRAIT' })} aria-label="Perbesar potret busana tradisional">
                <img className="closing-photo-one" src={pretyGirl} alt="Potret pasangan dalam busana tradisional" loading="lazy" />
              </button>
            </div>
            <div className="closing-title">
              <p>TERBUKA UNTUK CERITA BARU</p>
              <h2 id="contact-title">HOPE TO WORK<br />WITH YOU</h2>
              <span className="closing-script">Soon</span>
            </div>
            <div className="closing-contact">
              <a href="mailto:rtriofansyah@gmail.com">rtriofansyah@gmail.com</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">@raflitriii_</a>
              <span>Cilacap, Indonesia</span>
            </div>
            <footer className="closing-footer"><span>© 2026 RAFLI TRIOFANSYAH</span><a href="#home">KEMBALI KE AWAL ↑</a></footer>
          </section>
        </div>
      </main>

      {lightboxImage && (
        <div
          className="lightbox-backdrop"
          role="presentation"
          onClick={() => setLightboxImage(null)}
        >
          <section
            className="lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${lightboxImage.label}: ${lightboxImage.alt}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="lightbox-close"
              type="button"
              aria-label="Tutup foto"
              onClick={() => setLightboxImage(null)}
              autoFocus
            >
              ×
            </button>
            <div className="lightbox-image-stage">
              <img src={lightboxImage.src} alt={lightboxImage.alt} />
            </div>
            <p className="lightbox-caption"><span>{lightboxImage.label}</span>{lightboxImage.alt}</p>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
