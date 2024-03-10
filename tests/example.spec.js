import {test, expect} from "@playwright/test";


test('should clear text input field when an item is added', async ({ page }) => {
  const artifacts = [
    "artifact_1",
    "artifact_2",
    "artifact_3",
    "artifact_4",
    "artifact_5",
    "artifact_6",
    "artifact_7"
  ]
  await page.goto("http://127.0.0.1:5503/src/book/mobile/view/cap_1/pag_17.html");
  
  for (let i = 0; i < artifacts.length; i++) {
    const artifact = artifacts[i];
    let tds = await page.locator(`#${artifact} select`).all();
    for (const selectElement of tds) {
      await selectElement.selectOption({ index: 2 });
    }
    await page.locator("#artifact_1 .check").click()
  }
  
});
