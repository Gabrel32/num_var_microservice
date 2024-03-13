import {test, expect} from "@playwright/test";
import "dotenv/config";


test('test verify data', async ({ page }) => {
  const artifacts = [
    {id:"artifact_1"},
    {id:"artifact_2"},
    {id:"artifact_3"},
    {id:"artifact_4"},
    {id:"artifact_5"},
    {id:"artifact_6"},
    {id:"artifact_7"},
    {id:"artifact_8"},
    {id:"artifact_9"},
    {id:"artifact_10"},
  ]
  await page.goto(process.env.SERVERHOST+"/src/book/mobile/view/cap_1/pag_17.html");
  
  for (let i = 0; i < artifacts.length; i++) {
    const artifact = artifacts[i];
    let selects = await page.locator(`#${artifact.id} select`).all();
    let mathFields = await page.locator(`#${artifact.id} .mathfield`).all()
    for(const mathField of mathFields){
      await mathField.fill("42")
    }
    for (const selectElement of selects) {
      await selectElement.selectOption({ index: 2 });
    }
    
    await page.locator(`#${artifact.id} .check`).click()
    const correctas = await page.locator(".modalGeneric-content .correct");
    const inCorrect = await page.locator(".modalGeneric-content .inCorrect");
    const forAswer = await page.locator(".modalGeneric-content .forAswer");

    artifact.correcta = await correctas.textContent()
    artifact.inCorrecta = await inCorrect.textContent()
    artifact.forAswer= await forAswer.textContent()

    await expect(correctas).toHaveText(`${artifact.correcta}`); 
    await expect(correctas).toHaveText(`${artifact.correcta}`); 
    await expect(correctas).toHaveText(`${artifact.correcta}`);
    await page.locator(".modalGenericClose").click() 
    console.log(artifact);
  } 
});
