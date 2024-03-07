import type {MathfieldElement} from "./public/mathfield-element";

import {test, expect} from "@playwright/test";
const artifact = "artifact_1";

test("mixed closing delimiter", async ({page}) => {
  await page.goto(
    "http://127.0.0.1:5501/src/book/mobile/view/cap_1/pag_1.html",
  );
  //await page.locator(`#vale`).pressSequentially("");
  const latex = await page
    .locator(`#artifact_1 .inpB`)
    .evaluate((mfe: MathfieldElement) => {
      console.log("antes", mfe.value);
      mfe.value = "\\left(1+2\\right)";
      console.log("despues", mfe);
      return mfe.value;
    });
  await page.pause();
  expect(latex).toBe(String.raw`\left(1+2\right)`);
});
