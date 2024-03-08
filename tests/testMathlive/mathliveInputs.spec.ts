import type { MathfieldElement } from "../mathlive/mathfield-element";
import 'dotenv/config'
/*   "test": "playwright test"  */
import { test, expect } from "@playwright/test";

const artifacts = [
  "artifact_1",
  "artifact_2"
]; // Array con los IDs de los elementos a procesar

test("mixed closing delimiter", async ({ page }) => {
  /* variable de entorno en dado caso de necesitar cambiar esto a probar el moodle seria configurar las rutas */
  /* estas rutas usan html en dado caso el liveserver */
  await page.goto(process.env.SERVERHOST + "/src/book/mobile/view/cap_1/pag_1.html");

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
  };

  await page.locator('#artifact_1').getByRole('button', { name: '✓' }).click();
  page.pause();
  await page.locator('#artifact_1').getByRole('button', { name: '✓' }).click();

});