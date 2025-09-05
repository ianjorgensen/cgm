import UIKit

enum IconGenerator {
  static func generateAGPInspiredIcon(size: CGFloat = 1024) throws -> URL {
    let scale: CGFloat = 1
    let format = UIGraphicsImageRendererFormat.default()
    format.opaque = true
    format.scale = scale
    let renderer = UIGraphicsImageRenderer(size: CGSize(width: size, height: size), format: format)

    let img = renderer.image { ctx in
      let c = ctx.cgContext
      // Background
      UIColor.white.setFill()
      c.fill(CGRect(x: 0, y: 0, width: size, height: size))

      // Helpers
      func y(_ v: CGFloat) -> CGFloat { return size * v }
      func x(_ v: CGFloat) -> CGFloat { return size * v }

      // Colors inspired by the app
      let green = UIColor(red: 0.10, green: 0.60, blue: 0.31, alpha: 1.0)
      let greenLight = UIColor(red: 0.53, green: 0.77, blue: 0.62, alpha: 0.35)
      let greenLighter = UIColor(red: 0.79, green: 0.90, blue: 0.82, alpha: 0.35)
      let orange = UIColor(red: 0.99, green: 0.66, blue: 0.38, alpha: 1.0)
      let orangeBand = UIColor(red: 1.00, green: 0.78, blue: 0.57, alpha: 0.50)
      let redBand = UIColor(red: 0.97, green: 0.73, blue: 0.70, alpha: 0.45)

      // Create smooth path generator using a few sine components
      func pathLine(yBase: CGFloat, amp: CGFloat, freq: CGFloat, phase: CGFloat, thickness: CGFloat = 0) -> UIBezierPath {
        let p = UIBezierPath()
        let steps = 64
        for i in 0...steps {
          let t = CGFloat(i)/CGFloat(steps)
          let xx = x(t)
          let yy = y( yBase + sin((t*freq + phase) * .pi * 2) * amp )
          if i == 0 { p.move(to: CGPoint(x: xx, y: yy)) } else { p.addLine(to: CGPoint(x: xx, y: yy)) }
        }
        if thickness > 0 {
          p.lineWidth = thickness
          p.lineJoinStyle = .round
          p.lineCapStyle = .round
        }
        return p
      }

      // Bands: draw soft stacked areas (bottom green, middle green, top orange/red)
      func fillArea(base: CGFloat, amp: CGFloat, freq: CGFloat, phase: CGFloat, color: UIColor) {
        let p = pathLine(yBase: base, amp: amp, freq: freq, phase: phase)
        p.addLine(to: CGPoint(x: size, y: size))
        p.addLine(to: CGPoint(x: 0, y: size))
        p.close()
        color.setFill()
        p.fill()
      }

      // Lower soft green layers
      fillArea(base: 0.63, amp: 0.03, freq: 1.3, phase: 0.2, color: greenLighter)
      fillArea(base: 0.60, amp: 0.02, freq: 1.0, phase: 0.6, color: greenLight)

      // Middle target band highlight (subtle)
      let targetBand = UIBezierPath(rect: CGRect(x: 0, y: y(0.58), width: size, height: y(0.10)))
      UIColor(red: 0.13, green: 0.53, blue: 0.34, alpha: 0.12).setFill()
      targetBand.fill()

      // Upper orange area + faint red at top
      fillArea(base: 0.35, amp: 0.04, freq: 1.0, phase: 0.1, color: orangeBand)
      fillArea(base: 0.18, amp: 0.05, freq: 0.8, phase: 0.4, color: redBand)

      // Reference threshold lines
      c.setLineWidth(6)
      green.withAlphaComponent(0.9).setStroke()
      c.move(to: CGPoint(x: 0, y: y(0.58)))
      c.addLine(to: CGPoint(x: size, y: y(0.58)))
      c.strokePath()
      c.move(to: CGPoint(x: 0, y: y(0.35)))
      c.addLine(to: CGPoint(x: size, y: y(0.35)))
      c.strokePath()

      // Main green line (median-like)
      let line = pathLine(yBase: 0.58, amp: 0.03, freq: 1.2, phase: 0.0)
      green.setStroke()
      line.lineWidth = 14
      line.stroke()

      // Orange outline above for contrast
      let top = pathLine(yBase: 0.62, amp: 0.04, freq: 0.9, phase: 0.35)
      orange.setStroke()
      top.lineWidth = 10
      top.stroke()
    }

    // Write to temp
    let url = FileManager.default.temporaryDirectory.appendingPathComponent("AppIcon_AGP_1024.png")
    guard let data = img.pngData() else { throw NSError(domain: "Icon", code: -1, userInfo: [NSLocalizedDescriptionKey: "Failed to encode PNG"]) }
    try data.write(to: url, options: .atomic)
    return url
  }
}

