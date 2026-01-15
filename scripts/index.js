import { randomUUID } from "crypto";
import fs from "fs";

const TOTAL_RECORDS = 10000;

const CATEGORIES = ["Electronics", "Clothing", "Home", "Books"];
const REGIONS = ["US-East", "EU-West", "APAC", "LATAM"];

/**
 * Genera una fecha aleatoria entre dos fechas
 */
function randomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString();
}

/**
 * Genera un monto realista según la categoría
 */
function randomAmount(category) {
  switch (category) {
    case "Electronics":
      return +(Math.random() * 900 + 100).toFixed(2);
    case "Clothing":
      return +(Math.random() * 150 + 20).toFixed(2);
    case "Home":
      return +(Math.random() * 300 + 50).toFixed(2);
    case "Books":
      return +(Math.random() * 40 + 5).toFixed(2);
    default:
      return 0;
  }
}

const sales = [];

for (let i = 0; i < TOTAL_RECORDS; i++) {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];

  sales.push({
    transaction_id: randomUUID(),
    timestamp: randomDate(
      new Date("2023-01-01T00:00:00Z"),
      new Date("2023-12-31T23:59:59Z")
    ),
    amount: randomAmount(category),
    category,
    region,
    user_id: `user_${Math.floor(Math.random() * 3000)}`,
  });
}

// BigQuery funciona mejor con JSON delimitado por líneas
const output = sales.map(JSON.stringify).join("\n");

fs.writeFileSync("sales_dataset.json", output, "utf-8");

console.log(`Dataset generado correctamente (${TOTAL_RECORDS} registros) ✔`);
