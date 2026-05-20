const pre = document.getElementById("ascii-bg");

const colors = [
  "#f4f4f1",
  "#dbeafe",
  "#93c5fd",
  "#3b82f6",
  "#1d4ed8",
  "#000000"
];

const minusColors = [
  "#f4f4f1",
  "#e0f2fe",
  "#60a5fa",
  "#2563eb",
  "#1e40af",
  "#000000"
];

const boostedColors = [
  "#f4f4f1",
  "#93c5fd",
  "#3b82f6",
  "#1d4ed8",
  "#0f172a",
  "#000000"
];

const values = " ░▒▓██";

let w;
let h;
let t = 0;

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

function tixy(t, i, x, y) {
  t = t * 2e-3;

  x *= 0.5 * (0.5 + 0.25 * Math.sin(t * 0.01));
  y *= 0.5 * (0.5 + 0.25 * Math.sin(t * 0.01));

  const n1 = 0.6 + 0.4 * Math.sin(x * 0.2) * Math.cos(y * 0.2);

  return (
    n1 *
    Math.sin(
      x * 0.7 +
        t -
        Math.sin(y + t * 0.1 + Math.cos(x + t * 1e-3))
    ) *
    Math.cos(
      y * 0.5 +
        t +
        Math.sin(x + t * 0.1 - Math.cos(y + t))
    )
  );
}

function paint() {
  h = Math.round(window.innerHeight / 18);
  w = Math.round(window.innerWidth / 9);

  let result = "";
  t = Math.floor(performance.now());

  const cellW = window.innerWidth / w;
  const cellH = window.innerHeight / h;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const r = tixy(t, i, x, y);

      const screenX = x * cellW;
      const screenY = y * cellH;

      const dx = screenX - mouse.x;
      const dy = screenY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const radius = 140;
      const influence = Math.max(0, 1 - distance / radius);

      let intensity = Math.abs(r);
      intensity += influence * 0.26;
      intensity = Math.min(1, intensity);

      const v = (intensity * (values.length - 1)) | 0;

      const color =
        influence > 0.05
          ? boostedColors[v]
          : r < 0
            ? minusColors[v]
            : colors[v];

      const char = values[v] ?? " ";

      result += `<span style="color:${color}">${char}</span>`;
    }

    result += "\n";
  }

  pre.innerHTML = result;
}

window.addEventListener("resize", paint);

function loop() {
  requestAnimationFrame(loop);
  paint();
}

loop();
