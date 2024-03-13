import {test, expect} from "@playwright/test";
import "dotenv/config";

test('verify background table', async ({ page }) => {
  const artifacts = [
    "artifact_1",
    "artifact_2",
    "artifact_3",
    "artifact_4",
    "artifact_5",
    "artifact_6",
    "artifact_7",
    "artifact_8",
    "artifact_9",
    "artifact_10"
  ]
  await page.goto(process.env.SERVERHOST+"/src/book/mobile/view/cap_1/pag_17.html");
  
  for (let i = 0; i < artifacts.length; i++) {
    const artifact = artifacts[i];
    let selects = await page.locator(`#${artifact} select`).all();
    let mathFields = await page.locator(`#${artifact} .mathfield`).all()
    for(const mathField of mathFields){
      await mathField.fill("42")
    }
    for (const selectElement of selects) {
      await selectElement.selectOption({ index: 2 });
    }
    
    await page.locator(`#${artifact} .check`).click()
    await page.locator(".modalGenericClose").click()
    for(const selectElement of selects){
      const padre = await selectElement.evaluateHandle((el) => el.parentElement);
      const bgColor = await padre.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.backgroundColor;
      })
      const expectedColors = ['rgb(234, 184, 165)', 'rgb(182, 243, 191)'];
      await expect(expectedColors).toContainEqual(bgColor);
    }
    for(const mathField of mathFields){
      const padre = await mathField.evaluateHandle((el) => el.parentElement);
      const bgColor = await padre.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.backgroundColor;
      })
      const expectedColors = ['rgb(234, 184, 165)', 'rgb(182, 243, 191)'];
      await expect(expectedColors).toContainEqual(bgColor);
    }

  }

  
});
