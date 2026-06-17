import { expect, test } from '@playwright/test'

test.describe('Search', () => {
  test('filters the list and updates the URL after debouncing', async ({ page }) => {
    await page.goto('/people')
    // Wait for the client fetch to render — proves React has hydrated, so the
    // input's onChange is wired up before we type (otherwise the keystroke is
    // dropped and the URL never updates, especially on webkit).
    await expect(page.getByText('87 results — page 1 of 9')).toBeVisible()
    await page.getByPlaceholder('Search…').fill('skywalker')

    await expect(page).toHaveURL(/\?search=skywalker$/)
    await expect(page.getByText('3 results — page 1 of 1')).toBeVisible()

    const items = page.locator('main ul > li')
    await expect(items).toHaveCount(3)
    for (const text of await items.allTextContents()) {
      expect(text.toLowerCase()).toContain('skywalker')
    }
  })

  test('reflects a search query already present in the URL', async ({ page }) => {
    await page.goto('/people?search=skywalker')
    await expect(page.getByPlaceholder('Search…')).toHaveValue('skywalker')
    await expect(page.getByText('3 results — page 1 of 1')).toBeVisible()
  })

  test('clearing the query restores the full unfiltered list', async ({ page }) => {
    await page.goto('/people?search=skywalker')
    await page.getByPlaceholder('Search…').fill('')

    await expect(page).toHaveURL('/people')
    await expect(page.getByText('87 results — page 1 of 9')).toBeVisible()
  })

  test('a query with no matches shows zero results without erroring', async ({ page }) => {
    await page.goto('/people')
    await expect(page.getByText('87 results — page 1 of 9')).toBeVisible()
    await page.getByPlaceholder('Search…').fill('zzzznomatch')

    await expect(page).toHaveURL(/\?search=zzzznomatch$/)
    await expect(page.getByText('0 results — page 1 of 0')).toBeVisible()
    await expect(page.locator('main ul > li')).toHaveCount(0)
  })
})
