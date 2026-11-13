// Défi 60 — widget Scriptable
// À coller dans une nouvelle script Scriptable, puis à choisir dans le widget.
const WIDGET_URL = 'https://defi60-widget.yann-negre.workers.dev/v1/48eec4ad78274655fecbf5cac8ad9b2743292e4980de6655'
const APP_URL = 'https://f-duck.github.io/defi60/?v=4formats'

const widget = new ListWidget()
const smallWidget = config.widgetFamily === 'small'
widget.backgroundColor = new Color('#111827')
widget.setPadding(smallWidget ? 8 : 14, smallWidget ? 10 : 16, smallWidget ? 8 : 14, smallWidget ? 10 : 16)
widget.url = APP_URL
// iOS peut retarder cette demande, mais elle évite de laisser le widget figé.
widget.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000)

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
  const small = smallWidget

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
  text(`${count} / 4 séances`, Font.boldSystemFont(21), data.weekSuccess ? '#34D399' : '#F9FAFB')
  const sub = text(small ? (data.weekSuccess ? 'Semaine validée' : '4 séances = validée') : (data.weekSuccess ? 'Semaine validée · objectif atteint' : '4 séances pour valider'), Font.systemFont(11), '#9CA3AF')
  sub.minimumScaleFactor = 0.7
  widget.addSpacer(10)

  const labels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const activitySymbol = day => day.mixte ? 'flame.fill' : day.sport ? 'basketball.fill' : day.joker ? 'rectangle.portrait.fill' : null
  const row = widget.addStack()
  row.spacing = 0
  days.forEach((day, index) => {
    const cell = row.addStack()
    cell.size = new Size(small ? 17 : 31, small ? 28 : 38)
    cell.layoutVertically()
    cell.centerAlignContent()
    const label = cell.addText(labels[index])
    label.font = Font.mediumSystemFont(small ? 8 : 10)
    label.textColor = new Color('#9CA3AF')
    label.minimumScaleFactor = 0.5
    label.lineLimit = 1
    const symbolName = activitySymbol(day)
    if (symbolName) {
      const mark = cell.addImage(SFSymbol.named(symbolName).image)
      mark.imageSize = new Size(small ? 10 : 15, small ? 10 : 15)
      mark.tintColor = new Color('#F9FAFB')
    } else {
      const mark = cell.addText('·')
      mark.font = Font.systemFont(small ? 10 : 15)
      mark.textColor = new Color('#6B7280')
      mark.minimumScaleFactor = 0.5
      mark.lineLimit = 1
    }
  })
} catch (error) {
  text('🔥  Défi 60', Font.boldSystemFont(16))
  widget.addSpacer(8)
  text('Ouvre l’application pour synchroniser', Font.systemFont(12), '#FBBF24')
}

Script.setWidget(widget)
Script.complete()
