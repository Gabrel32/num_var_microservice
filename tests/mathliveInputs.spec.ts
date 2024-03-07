import type { MathfieldElement } from "./mathlive/mathfield-element";

import { test, expect } from "@playwright/test";

const artifacts = [
  "artifact_1",
  "artifact_2"
]; // Array con los IDs de los elementos a procesar

test("mixed closing delimiter", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/src/book/mobile/view/cap_1/pag_1.html");

  const values = ["\\left(1+2\\right)", "\\frac{3}{4}"]; // Array con los valores a asignar dinámicamente

  for (let i = 0; i < artifacts.length; i++) {
    const artifactId = artifacts[i];
    const value = values[i];

    const latex = await page.locator(`#${artifactId} .inpC`).evaluate(
      (mathfield: MathfieldElement, value) => {
        const setValue = (mfe: MathfieldElement, val) => {
          mfe.value = val;
          return mfe.value;
        }

        setValue(mathfield, value);
        return mathfield.value;
      }, value);

    expect(latex).toBe(String.raw`${value}`);
  }
  await page.locator('#artifact_1').getByRole('button', { name: '✓' }).click();
  page.pause();
  await page.locator('#artifact_1').getByRole('button', { name: '✓' }).click();

});