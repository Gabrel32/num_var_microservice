// @ts-check
const { test, expect } = require('@playwright/test');
const artifact = 'artifact_1';


test('get started link', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/src/book/mobile/view/cap_1/pag_1.html');

  // Click the get started link.

  //const inputA = await page.locator(`#${artifact} .inpA`);
  await page.locator(`#${artifact} .inpB`).fill('NO');

  // const inputC = await page.locator(`#${artifact} .inpC`);

  /*  console.log(inputA);
   console.log(inputB);
   console.log(inputC);
 
   if (await inputA.isEditable()) {
     await inputA.fill('value1');
   };
 
   if (await inputB.isEditable()) {
     await inputB.fill('value2');
   };
 
   if (await inputC.isEditable()) {
     await inputC.fill('value3');
   };
  */




  /* botones */
  const validar = await page.locator(`#${artifact} .check`);

  await validar.click();
});