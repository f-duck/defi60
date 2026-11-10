// Défi 60 — widget Scriptable
// À coller dans une nouvelle script Scriptable, puis à choisir dans le widget.
const WIDGET_URL = 'https://defi60-widget.yann-negre.workers.dev/v1/48eec4ad78274655fecbf5cac8ad9b2743292e4980de6655'
const APP_URL = 'https://f-duck.github.io/defi60/?v=ce21d3f'

const widget = new ListWidget()
widget.backgroundColor = new Color('#111827')
widget.setPadding(14, 16, 14, 16)
widget.url = APP_URL
widget.refreshAfterDate = new Date(Date.now() + 5 * 60 * 1000)

function text(value, font, color = '#F9FAFB') {
  const item = widget.addText(value)
  item.font = font
  item.textColor = new Color(color)
  return item
}

try {
  const data = await new Request(`${WIDGET_URL}?t=${Date.now()}`).loadJSON()
  const days = Array.isArray(data.days) ? data.days : []
  const count = Number(data.weeklyCount || 0)
  const small = config.widgetFamily === 'small'

  const heading = widget.addStack()
  heading.centerAlignContent()
  const title = heading.addText('🔥  Défi 60')
  title.font = Font.boldSystemFont(16)
  title.textColor = Color.white()
  heading.addSpacer()
  const mixte = heading.addText(`M${data.nextMixte || 1}`)
  mixte.font = Font.boldSystemFont(13)
  mixte.textColor = new Color('#FBBF24')

  widget.addSpacer(8)
  text(`${count} / 5 séances`, Font.boldSystemFont(21), data.weekSuccess ? '#34D399' : '#F9FAFB')
  const sub = text(small ? (data.weekSuccess ? 'Semaine validée' : '5 séances = validée') : (data.weekSuccess ? 'Semaine validée · objectif atteint' : '5 séances pour valider'), Font.systemFont(11), '#9CA3AF')
  sub.minimumScaleFactor = 0.7
  widget.addSpacer(10)

  const labels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const activityIcon = day => day.mixte ? '🔥' : day.sport ? '🏀' : day.joker ? '🃏' : '·'
  if (small) {
    const labelRow = widget.addStack()
    const iconRow = widget.addStack()
    labelRow.spacing = 1
    iconRow.spacing = 1
    days.forEach((day, index) => {
      const label = labelRow.addText(labels[index])
      label.size = new Size(18, 14)
      label.font = Font.mediumSystemFont(9)
      label.textColor = new Color('#9CA3AF')
      label.minimumScaleFactor = 0.5
      label.lineLimit = 1
      const icon = iconRow.addText(activityIcon(day))
      icon.size = new Size(18, 16)
      icon.font = Font.systemFont(11)
      icon.textColor = day.mixte || day.sport ? Color.white() : new Color('#6B7280')
      icon.minimumScaleFactor = 0.5
      icon.lineLimit = 1
      if (index < days.length - 1) {
        labelRow.addSpacer()
        iconRow.addSpacer()
      }
    })
  } else {
    const row = widget.addStack()
    row.spacing = 1
    days.forEach((day, index) => {
      const cell = row.addStack()
      cell.size = new Size(31, 38)
      cell.layoutVertically()
      cell.centerAlignContent()
      const label = cell.addText(labels[index])
      label.font = Font.mediumSystemFont(10)
      label.textColor = new Color('#9CA3AF')
      const icon = activityIcon(day)
      const mark = cell.addText(icon)
      mark.font = Font.systemFont(15)
      mark.textColor = day.mixte || day.sport ? Color.white() : new Color('#6B7280')
      mark.minimumScaleFactor = 0.5
      mark.lineLimit = 1
    })
  }
} catch (error) {
  text('🔥  Défi 60', Font.boldSystemFont(16))
  widget.addSpacer(8)
  text('Ouvre l’application pour synchroniser', Font.systemFont(12), '#FBBF24')
}

Script.setWidget(widget)
Script.complete()
