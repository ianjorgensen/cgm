import SwiftUI

struct SplashView: View {
  var body: some View {
    ZStack {
      Color(.systemBackground).ignoresSafeArea()
      VStack(spacing: 20) {
        ZStack {
          if let _ = UIImage(named: "Ripple") {
            Image("Ripple")
              .resizable()
              .scaledToFit()
              .frame(width: 140, height: 140)
              .clipShape(Circle())
          } else {
            // Fallback stylized circle
            ZStack {
              Circle().fill(LinearGradient(colors: [Color.orange, Color.yellow], startPoint: .top, endPoint: .center))
              Circle().stroke(Color.black.opacity(0.05))
              WaveShape(amplitude: 10, frequency: 2)
                .fill(Color.teal.opacity(0.9))
                .clipShape(Circle())
                .offset(y: 20)
            }
            .frame(width: 140, height: 140)
          }
        }
        Text("Ripple").font(.title).fontWeight(.semibold)
        ProgressView().progressViewStyle(.circular)
      }
    }
  }
}

struct WaveShape: Shape {
  var amplitude: CGFloat
  var frequency: CGFloat
  func path(in rect: CGRect) -> Path {
    var p = Path()
    let midY = rect.midY
    p.move(to: CGPoint(x: rect.minX, y: midY))
    for x in stride(from: rect.minX, through: rect.maxX, by: 2) {
      let rel = (x - rect.minX) / rect.width
      let y = midY + sin(rel * .pi * frequency) * amplitude
      p.addLine(to: CGPoint(x: x, y: y))
    }
    p.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
    p.addLine(to: CGPoint(x: rect.minX, y: rect.maxY))
    p.closeSubpath()
    return p
  }
}

#Preview { SplashView() }
