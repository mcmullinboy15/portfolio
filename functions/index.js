const { onRequest } = require('firebase-functions/v2/https');

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function parseDateInput(rawValue, label) {
  if (!rawValue) {
    throw new Error(`${label} is required. Use YYYY-MM-DD.`);
  }

  const parsed = new Date(rawValue);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${label} is invalid. Use YYYY-MM-DD.`);
  }

  return parsed;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeHexColor(rawValue, fallback) {
  if (!rawValue || typeof rawValue !== 'string') {
    return fallback;
  }

  const trimmed = rawValue.trim();
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;

  if (/^#[0-9a-fA-F]{3}$/.test(withHash)) {
    const expanded = withHash
      .slice(1)
      .split('')
      .map((digit) => `${digit}${digit}`)
      .join('');
    return `#${expanded.toLowerCase()}`;
  }

  if (/^#[0-9a-fA-F]{6}$/.test(withHash)) {
    return withHash.toLowerCase();
  }

  return fallback;
}

function buildGridSvg({
  completedWeeks,
  totalWeeks,
  columns,
  dotSize,
  gap,
  margin,
  completedColor,
  remainingColor,
  backgroundColor,
  textColor,
  title,
  subtitle,
  detailLine,
}) {
  const rows = Math.ceil(totalWeeks / columns);
  const width = margin * 2 + columns * dotSize + (columns - 1) * gap;
  const chartHeight = rows * dotSize + (rows - 1) * gap;
  const titleHeight = 96;
  const height = margin * 2 + titleHeight + chartHeight;

  let circles = '';
  for (let i = 0; i < totalWeeks; i += 1) {
    const row = Math.floor(i / columns);
    const col = i % columns;
    const cx = margin + col * (dotSize + gap) + dotSize / 2;
    const cy = margin + titleHeight + row * (dotSize + gap) + dotSize / 2;
    const fill = i < completedWeeks ? completedColor : remainingColor;
    circles += `<circle cx="${cx}" cy="${cy}" r="${dotSize / 2}" fill="${fill}"/>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${backgroundColor}"/>
  <text x="${margin}" y="${margin + 18}" fill="${textColor}" font-size="24" font-family="Arial, sans-serif" font-weight="700">${title}</text>
  <text x="${margin}" y="${margin + 45}" fill="${textColor}" font-size="16" font-family="Arial, sans-serif" opacity="0.9">${subtitle}</text>
  <text x="${margin}" y="${margin + 70}" fill="${textColor}" font-size="14" font-family="Arial, sans-serif" opacity="0.8">${detailLine}</text>
  ${circles}
</svg>`;
}

exports.lifeWeeksImage = onRequest({ cors: true }, (req, res) => {
  try {
    const birthDate = parseDateInput(req.query.birthDate, 'birthDate');
    const deathDate = parseDateInput(req.query.deathDate, 'deathDate');

    if (deathDate <= birthDate) {
      throw new Error('deathDate must be after birthDate.');
    }

    const now = new Date();
    const totalWeeks = Math.ceil((deathDate - birthDate) / WEEK_MS);
    const elapsedWeeksRaw = Math.floor((now - birthDate) / WEEK_MS);
    const completedWeeks = clamp(elapsedWeeksRaw, 0, totalWeeks);
    const remainingWeeks = totalWeeks - completedWeeks;
    const daysLeft = remainingWeeks * 7;
    const progressPercent = totalWeeks > 0 ? (completedWeeks / totalWeeks) * 100 : 0;
    const remainingPercent = 100 - progressPercent;
    const ageYears = Math.floor((now - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
    const daysLived = completedWeeks * 7;

    const columns = clamp(parseInt(req.query.columns, 10) || 52, 10, 120);
    const dotSize = clamp(parseInt(req.query.dotSize, 10) || 9, 4, 28);
    const gap = clamp(parseInt(req.query.gap, 10) || 4, 0, 20);
    const margin = clamp(parseInt(req.query.margin, 10) || 24, 8, 100);

    const completedColor = normalizeHexColor(
      req.query.color || req.query.completedColor,
      '#22c55e',
    );
    const remainingColor = normalizeHexColor(req.query.remainingColor, '#3f3f46');
    const backgroundColor = normalizeHexColor(req.query.backgroundColor, '#09090b');
    const textColor = normalizeHexColor(req.query.textColor, '#fafafa');

    const title = req.query.title || 'Life in Weeks';
    const subtitle = `${completedWeeks.toLocaleString()} weeks completed • ${remainingWeeks.toLocaleString()} weeks left • ${daysLeft.toLocaleString()} days left`;
    const detailLine = `${progressPercent.toFixed(1)}% lived • ${remainingPercent.toFixed(1)}% to go • ~${ageYears} years old • ${daysLived.toLocaleString()} days lived`;

    if (req.query.format === 'json') {
      res.status(200).json({
        birthDate: birthDate.toISOString(),
        deathDate: deathDate.toISOString(),
        generatedAt: now.toISOString(),
        totalWeeks,
        completedWeeks,
        remainingWeeks,
        daysLeft,
        progressPercent: Number(progressPercent.toFixed(2)),
        remainingPercent: Number(remainingPercent.toFixed(2)),
        ageYears,
        daysLived,
        columns,
      });
      return;
    }

    const svg = buildGridSvg({
      completedWeeks,
      totalWeeks,
      columns,
      dotSize,
      gap,
      margin,
      completedColor,
      remainingColor,
      backgroundColor,
      textColor,
      title,
      subtitle,
      detailLine,
    });

    res.set('Content-Type', 'image/svg+xml; charset=utf-8');
    res.set('Cache-Control', 'no-store');
    res.status(200).send(svg);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      example:
        '/api/life-weeks?birthDate=1998-04-12&deathDate=2078-04-12&columns=52&dotSize=9&gap=4&margin=24&completedColor=22c55e&remainingColor=3f3f46&backgroundColor=09090b&textColor=fafafa&title=Life%20in%20Weeks&format=svg',
    });
  }
});
