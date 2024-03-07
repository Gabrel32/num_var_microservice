import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/src/book/mobile/view/cap_1/pag_1.html');
  await page.locator('#artifact_1_board_jxgBoard1T61 math-field').click();
  await page.locator('#artifact_1 .inpB').fill('1');
  await page.locator('#artifact_1 .inpB').click();
  await page.locator('#artifact_1 .inpB').fill('2');
  await page.locator('#artifact_1').getByRole('button', { name: '✓' }).click();
});