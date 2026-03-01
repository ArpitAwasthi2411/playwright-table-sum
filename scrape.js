const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let i = 0; i <= 9; i++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${i}`;
    console.log(`Visiting ${url}`);
    await page.goto(url);

    // Wait for tables to load
    await page.waitForSelector("table");

    // Extract all numbers inside table cells
    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${i} sum: ${pageSum}`);

    totalSum += pageSum;
  }

  console.log("FINAL TOTAL:", totalSum);

  await browser.close();
})();
