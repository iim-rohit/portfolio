import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.join(__dirname, '..', 'src', 'data', 'portfolio.json')
const outputPath = path.join(
  __dirname,
  '..',
  'public',
  'Rohit-Kumar-Resume.pdf'
)

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
const { person, skills, education, projects, certification, interests } = data

const doc = new PDFDocument({
  size: 'A4',
  margin: 0,
  info: {
    Title: `${person.name} - Resume`,
    Author: person.name,
    Subject: person.role,
    Keywords: skills.map((skill) => skill.name).join(', ')
  }
})

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
doc.pipe(fs.createWriteStream(outputPath))

const pageWidth = doc.page.width
const pageHeight = doc.page.height
const margin = 48
const contentWidth = pageWidth - margin * 2

const colors = {
  ink: '#111011',
  body: '#3F3839',
  muted: '#6F6465',
  faint: '#9A8F90',
  accent: '#C1122B',
  accentSoft: '#E01E37',
  line: '#E7E1E1'
}

// Header
doc.rect(0, 0, pageWidth, 168).fill('#0A0A0A')
doc.save()
doc.fillOpacity(0.28)
doc.circle(pageWidth - 60, 20, 130).fill('#E01E37')
doc.circle(40, 170, 110).fill('#7D0A18')
doc.restore()

doc
  .fillColor('#FFFFFF')
  .font('Helvetica-Bold')
  .fontSize(30)
  .text(person.name.toUpperCase(), margin, 38, { characterSpacing: 1.4 })

doc
  .fillColor('#FF9AA4')
  .font('Helvetica')
  .fontSize(9.5)
  .text(person.tagline.toUpperCase(), margin, 79, { characterSpacing: 0.8 })

doc
  .fillColor('#B8ADAE')
  .fontSize(9)
  .text(`${person.email}  |  ${person.location}`, margin, 103)

doc
  .fillColor('#FF7A88')
  .fontSize(8.5)
  .text(
    `${person.degree}  |  ${person.college}  |  ${person.graduation}`,
    margin,
    121
  )

doc
  .roundedRect(pageWidth - 110, 40, 62, 62, 15)
  .lineWidth(1)
  .fillAndStroke('#141011', '#E01E37')
doc
  .fillColor('#FF9AA4')
  .font('Helvetica-Bold')
  .fontSize(20)
  .text(person.initials, pageWidth - 110, 60, { width: 62, align: 'center' })

let y = 190

function sectionTitle(title) {
  doc
    .fillColor(colors.accent)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text(title, margin, y, { characterSpacing: 1.6 })

  doc
    .strokeColor(colors.line)
    .lineWidth(0.7)
    .moveTo(margin, y + 13)
    .lineTo(pageWidth - margin, y + 13)
    .stroke()

  y += 21
}

// Profile
sectionTitle('PROFILE')
doc
  .fillColor(colors.body)
  .font('Helvetica')
  .fontSize(9.2)
  .text(person.aboutBody, margin, y, {
    width: contentWidth,
    lineGap: 2.2,
    align: 'left'
  })
y = doc.y + 14

// Skills
sectionTitle('TECHNICAL SKILLS')
doc
  .fillColor(colors.ink)
  .font('Helvetica-Bold')
  .fontSize(9.4)
  .text(skills.map((skill) => skill.name).join('  |  '), margin, y, {
    width: contentWidth
  })
y = doc.y + 15

// Education
sectionTitle('EDUCATION')
education.forEach((item) => {
  const meta = [item.institution, item.location, item.period, item.score]
    .filter(Boolean)
    .join('  |  ')

  doc
    .fillColor(colors.ink)
    .font('Helvetica-Bold')
    .fontSize(9.3)
    .text(item.degree, margin, y, { width: contentWidth - 110 })

  doc
    .fillColor(colors.muted)
    .font('Helvetica')
    .fontSize(8.2)
    .text(item.period, pageWidth - margin - 105, y + 0.5, {
      width: 105,
      align: 'right'
    })

  doc
    .fillColor(colors.body)
    .fontSize(8.4)
    .text(meta, margin, y + 13, { width: contentWidth })

  y = doc.y + 10
})

y += 2

// Projects
sectionTitle('PROJECTS')
projects.forEach((project) => {
  doc
    .fillColor(colors.ink)
    .font('Helvetica-Bold')
    .fontSize(9.3)
    .text(project.title, margin, y, { width: contentWidth })

  doc
    .fillColor(colors.body)
    .font('Helvetica')
    .fontSize(8.5)
    .text(project.description, margin, y + 13, {
      width: contentWidth,
      lineGap: 1.5
    })

  doc
    .fillColor(colors.muted)
    .fontSize(7.8)
    .text(
      `${project.college}  |  Tools: ${project.tools.join(', ')}`,
      margin,
      doc.y + 2,
      { width: contentWidth }
    )

  y = doc.y + 10
})

y += 2

// Certification
sectionTitle('CERTIFICATION')
doc
  .fillColor(colors.ink)
  .font('Helvetica-Bold')
  .fontSize(9.3)
  .text(certification.title, margin, y, { width: contentWidth })

doc
  .fillColor(colors.body)
  .font('Helvetica')
  .fontSize(8.5)
  .text(
    `${certification.institute}  |  ${certification.provider}`,
    margin,
    y + 13,
    { width: contentWidth }
  )

y = doc.y + 16

// Interests
sectionTitle('INTERESTS')
doc
  .fillColor(colors.body)
  .font('Helvetica')
  .fontSize(8.8)
  .text(interests.map((interest) => interest.name).join('  |  '), margin, y, {
    width: contentWidth
  })

y = doc.y + 20

// Small accent bar and footer
doc
  .rect(margin, y, 52, 2)
  .fill('#E01E37')

doc
  .fillColor(colors.faint)
  .font('Helvetica')
  .fontSize(7.5)
  .text(
    `${person.name}  |  ${person.role}`,
    margin,
    pageHeight - 50,
    { width: contentWidth, align: 'left' }
  )

doc
  .fillColor(colors.muted)
  .text(person.email, margin, pageHeight - 50, {
    width: contentWidth,
    align: 'right'
  })

doc.end()
console.log(`Resume written to ${outputPath}`)
