import {test, expect} from '@playwright/test';

test('navigate to whiteflag', async ({page}) => {
  // Go to host
  await page.goto('/');

  // Click text=Whiteflag
  await page.locator('text=Whiteflag').click();
  await expect(page).toHaveURL('/whiteflag');
});

test('encode/decode work', async ({page}) => {
  await page.goto('/whiteflag');
  //await page.waitForNavigation();

  await widgetTest(
    'encode',
    '5746313020800000000000000000000000000000000000000000000000000000000000000000b43a3a38399d1797b7b933b0b734b9b0ba34b7b71734b73a17bbb434ba32b33630b380'
  );

  // Click text=Whiteflag

  // Click button:has-text("Encode")
  //await page.locator('button:has-text("Encode")').click();

  // Double click text=5746313020800000000000000000000000000000000000000000000000000000000000000000b43a >> nth=0
  //await page.locator('text=5746313020800000000000000000000000000000000000000000000000000000000000000000b43a').first().dblclick();

  // Click button:has-text("Decode")
  //await page.locator('button:has-text("Decode")').click();

  //expect(page.locator('pre')).toHaveText('')

  async function widgetTest(id, expected_value) {
    await expect(await result()).toBeFalsy();
    await page.waitForSelector(`#${id} .widget__button`);
    const button = page.locator(`#${id} .widget__button`);
    await button.click();

    const actual = await result();

    if (expected_value) {
      await expect(actual).toBe(expected_value);
    } else {
      await expect(actual).toBeTruthy();
    }

    async function result() {
      const r = await page.locator(`#${id} .widget__result`);
      return await r.innerText();
    }
  }
});
